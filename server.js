import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static('dist')); // Serve the built files

// Store photo metadata
let photos = [];
const PHOTOS_FILE = join(__dirname, 'photos.json');

// Load existing photos data
try {
  if (fs.existsSync(PHOTOS_FILE)) {
    photos = JSON.parse(fs.readFileSync(PHOTOS_FILE, 'utf8'));
  }
} catch (error) {
  console.error('Error loading photos data:', error);
}

// Save photos data
const savePhotos = () => {
  fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photos, null, 2));
};

// API Routes
app.get('/api/photos', (req, res) => {
  res.json(photos);
});

app.post('/api/photos', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { name, category } = req.body;
  const newPhoto = {
    id: Date.now().toString(),
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
    name: name || 'Untitled',
    category: category || 'Uncategorized'
  };

  photos.push(newPhoto);
  savePhotos();
  res.json(newPhoto);
});

app.delete('/api/photos/:id', (req, res) => {
  const photo = photos.find(p => p.id === req.params.id);
  if (!photo) {
    return res.status(404).json({ error: 'Photo not found' });
  }

  try {
    const filepath = join(__dirname, 'uploads', photo.filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    photos = photos.filter(p => p.id !== req.params.id);
    savePhotos();
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
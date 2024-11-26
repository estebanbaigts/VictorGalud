import React from 'react';

interface AdminModalProps {
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  password,
  onPasswordChange,
  onLogin,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold mb-4">Admin Login</h3>
        <input
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Enter password"
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
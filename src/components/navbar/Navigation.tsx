import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    scrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
    isMenuOpen,
    setIsMenuOpen,
    scrolled,
}) => {
    const location = useLocation();

    const handleNavClick = (anchor: string) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${anchor}`;
        } else {
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-sm py-2' : 'py-4'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Link to="/" onClick={() => handleNavClick('top')} className={`text-xl font-bold transition-all duration-300 ${scrolled ? 'text-white' : 'text-white text-shadow'}`}>
                        Victor Galud
                    </Link>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-white"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto ${scrolled ? 'bg-black/90 lg:bg-transparent' : 'bg-black/50 lg:bg-transparent'}`}>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
                        <button onClick={() => handleNavClick('home')} className="text-white hover:text-gray-300 transition-all duration-300 relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </button>
                        <button onClick={() => handleNavClick('gallery')} className="text-white hover:text-gray-300 transition-all duration-300 relative group">
                            Gallery
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </button>
                        <Link to="/about" className="text-white hover:text-gray-300 transition-all duration-300 relative group">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            BlogFlow
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                            Home
                        </Link>
                        {token ? (
                            <>
                                <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-sm">
                                    Write Post
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-red-500 font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

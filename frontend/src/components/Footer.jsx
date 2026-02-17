import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-gray-800">BlogFlow</span>
                        <p className="text-gray-500 text-sm mt-1">Share your stories with the world.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">GitHub</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">LinkedIn</a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} BlogFlow. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

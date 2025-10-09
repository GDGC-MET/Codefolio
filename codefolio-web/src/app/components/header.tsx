"use client";
import React, { useState, useEffect } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (menuOpen) setMenuOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    return (
        <header
            className={`fixed w-full top-0 left-0 z-[1000] transition-all duration-300 ease-in-out ${
                scrolled
                    ? 'py-3 px-12 bg-black/98 backdrop-blur-md shadow-lg'
                    : 'py-5 px-12 bg-black/95 backdrop-blur-md'
            } border-b-2 border-blue-500/30`}
        >
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                <div
                    className="flex items-center text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => scrollToSection('home')}
                    aria-label="Home"
                >
                    <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                        MorganTaylor
                    </span>
                    <span className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></span>
                </div>

                <ul className="hidden md:flex gap-8 list-none">
                    {[
                        { name: "Home", id: "home" },
                        { name: "About", id: "about" },
                        { name: "Skills", id: "skills" },
                        { name: "Projects", id: "projects" },
                        { name: "Contact", id: "contact" }
                    ].map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className="relative text-gray-300 text-base font-medium transition-all duration-300 hover:text-blue-500 hover:-translate-y-0.5 group"
                                aria-label={`${link.name} section`}
                            >
                                {link.name}
                                <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div
                    className="flex flex-col md:hidden cursor-pointer z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(!menuOpen);
                    }}
                    aria-label="Toggle navigation menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-blue-500 mb-1 transition-all duration-300 ${
                            menuOpen ? 'rotate-45 translate-y-1.5' : ''
                        }`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-blue-500 mb-1 transition-all duration-300 ${
                            menuOpen ? 'opacity-0' : ''
                        }`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-blue-500 transition-all duration-300 ${
                            menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                        }`}
                    ></span>
                </div>
            </nav>

            <ul
                className={`fixed top-[70px] left-0 w-full bg-black/95 backdrop-blur-md flex flex-col items-center md:hidden transition-all duration-300 ease-in-out border-b-2 border-blue-500/30 ${
                    menuOpen
                        ? 'translate-y-0 opacity-100 visible'
                        : '-translate-y-full opacity-0 invisible'
                }`}
            >
                {[
                    { name: "Home", id: "home" },
                    { name: "About", id: "about" },
                    { name: "Skills", id: "skills" },
                    { name: "Projects", id: "projects" },
                    { name: "Contact", id: "contact" }
                ].map((link) => (
                    <li key={link.id} className="w-full">
                        <button
                            onClick={() => scrollToSection(link.id)}
                            className="block w-full py-5 text-center text-gray-300 font-medium transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/10"
                            aria-label={`${link.name} section`}
                        >
                            {link.name}
                        </button>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;

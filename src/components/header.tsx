"use client";
import { Camera, Menu, X, Phone, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const contactItems = [
    {
      icon: Phone,
      label: "+62 895 700503193",
      href: "tel:+6289570503193",
      className: "hover:text-green-600"
    },
    {
      icon: AtSign,
      label: "Hafiportrait",
      href: "https://instagram.com/hafiportrait",
      className: "hover:text-pink-600"
    }
  ];

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-rose-gold/20 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <nav className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-rose-gold flex-shrink-0" />
              <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-playfair font-bold text-gray-800 truncate">
                Hafiportrait
              </h1>
            </div>
            <div className="lg:hidden flex-shrink-0 ml-2">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-rose-gold/20 shadow-sm">
        {/* Container yang konsisten dengan komponen lain */}
        <div className="container mx-auto px-4 py-3 md:py-4">
          <nav className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-rose-gold flex-shrink-0" />
              <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-playfair font-bold text-gray-800 truncate">
                Hafiportrait
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-gray-700 hover:text-rose-gold transition-colors font-medium text-sm xl:text-base"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-rose-gold transition-colors font-medium text-sm xl:text-base"
              >
                Paket Harga
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="text-gray-700 hover:text-rose-gold transition-colors font-medium text-sm xl:text-base"
              >
                Event
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-rose-gold transition-colors font-medium text-sm xl:text-base"
              >
                Kontak
              </button>
            </div>

            {/* Desktop Contact Icons & Admin */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-rose-gold ml-1 xl:ml-2 text-sm xl:text-base"
                onClick={() => router.push('/admin')}
              >
                Admin
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-shrink-0 ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-rose-gold p-1 h-8 w-8 sm:h-9 sm:w-9"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Dipindah ke luar header untuk z-index yang lebih tinggi */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white/98 backdrop-blur-sm z-[60] top-0 left-0 right-0 bottom-0">
          <div className="flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 px-4 space-y-3 sm:space-y-4 md:space-y-6 h-full overflow-y-auto">
            {/* Navigation Links */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full max-w-sm">
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-center py-3 sm:py-4 text-base sm:text-lg md:text-xl text-gray-700 hover:text-rose-gold transition-colors font-medium border-b border-gray-100"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-center py-3 sm:py-4 text-base sm:text-lg md:text-xl text-gray-700 hover:text-rose-gold transition-colors font-medium border-b border-gray-100"
              >
                Paket Harga
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="block w-full text-center py-3 sm:py-4 text-base sm:text-lg md:text-xl text-gray-700 hover:text-rose-gold transition-colors font-medium border-b border-gray-100"
              >
                Event
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-center py-3 sm:py-4 text-base sm:text-lg md:text-xl text-gray-700 hover:text-rose-gold transition-colors font-medium border-b border-gray-100"
              >
                Kontak
              </button>
            </div>

            {/* Mobile Contact Info */}
            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 w-full max-w-sm">
              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center justify-center space-x-2 sm:space-x-3 text-gray-700 transition-colors py-3 w-full ${item.className}`}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-medium">{item.label}</span>
                </a>
              ))}
              <Button 
                variant="outline"
                className="w-full mt-4 sm:mt-6 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white text-sm sm:text-base py-3"
                onClick={() => {
                  router.push('/admin');
                  setIsMobileMenuOpen(false);
                }}
              >
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
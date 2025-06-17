import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAppContext } from "@/hooks/useAppContext"

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode, setIsAuthenticated } = useAppContext();
  
  // Aplicar modo oscuro al elemento raíz
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-blue-900 transition-all duration-500">
      <header className="border-2 border-blue-200 dark:border-blue-700 rounded-tl-lg rounded-br-lg p-4 shadow-lg sticky top-0 z-50 bg-white/95 dark:bg-blue-800/95 backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-top">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <a href="#inicio" className="px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                  <span className="text-xl font-bold text-blue-800 dark:text-blue-100">REPARACIONES</span>
                </a>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#servicios" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                Servicios
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#nosotros" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                Nosotros
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Botón modo oscuro/ligero */}
              <button 
                onClick={toggleDarkMode}
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 p-2 rounded-full focus:outline-none transition-all duration-300 hover:scale-110 hover:bg-blue-100 dark:hover:bg-blue-700"
                aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                <div className="transform transition-transform duration-500 hover:rotate-180">
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </div>
              </button>
              
              <Link to="/login" className="text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                Iniciar Sesión
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 p-2 rounded-full focus:outline-none transition-all duration-300 hover:scale-110"
              >
                <div className="transform transition-transform duration-500 hover:rotate-180">
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 focus:outline-none transition-all duration-300 hover:scale-110"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                <div className="transform transition-transform duration-300">
                  {mobileMenuOpen ? (
                    <svg className="h-6 w-6 rotate-180" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-blue-800 border-t border-blue-200 dark:border-blue-700 animate-in slide-in-from-top">
              <a 
                href="#servicios" 
                className="text-blue-900 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 block px-3 py-2 text-base font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Servicios
              </a>
              <a 
                href="#nosotros" 
                className="text-blue-900 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 block px-3 py-2 text-base font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </a>
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white block px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 mt-4 w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <section id="inicio" className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-800 dark:to-blue-900 py-20 lg:py-28 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-in slide-in-from-left duration-700">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 dark:text-blue-100 leading-tight">
                Reparamos tu <span className="text-blue-600 dark:text-blue-400 animate-pulse">tecnología</span> como nueva
              </h1>
              <p className="mt-6 text-xl text-blue-700 dark:text-blue-200 max-w-2xl animate-in slide-in-from-left duration-700 delay-200">
                Servicios profesionales de reparación para smartphones, tablets, laptops y más. 
                Técnicos especializados con más de 10 años de experiencia.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in slide-in-from-left duration-700 delay-300">
                <a href="#servicios" className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform bg-transparent">
                  Ver Servicios
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-blue-600 dark:text-blue-300 animate-in slide-in-from-left duration-700 delay-400">
                <div className="flex items-center transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Garantía incluida
                </div>
                <div className="flex items-center transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Diagnóstico gratuito
                </div>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right duration-700">
              <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105">
                <div className="bg-blue-100 dark:bg-blue-700 border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-xl w-full h-96 flex items-center justify-center text-blue-500 dark:text-blue-300 overflow-hidden">
                  <img src="https://th.bing.com/th/id/OIP.-fTWjtqRcm8d-q9YdOsaWAAAAA?rs=1&pid=ImgDetMain&cb=idpwebpc1" alt="Imagen de técnico reparando dispositivo" className="w-full h-96 object-cover rounded-lg transition-all duration-300 hover:scale-110" />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute bg-blue-900 dark:bg-blue-700 -top-4 -right-4 text-white p-4 rounded-lg shadow-lg animate-bounce hover:animate-none transition-all duration-300 hover:scale-110">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Años experiencia</div>
              </div>
              <div className="absolute bg-blue-900 dark:bg-blue-600 -bottom-4 -left-4 text-white p-4 rounded-lg shadow-lg animate-bounce hover:animate-none transition-all duration-300 hover:scale-110" style={{animationDelay: '1s'}}>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Dispositivos reparados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-20 bg-white dark:bg-blue-900 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in slide-in-from-top duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100">Nuestros Servicios</h2>
            <p className="mt-4 text-xl text-blue-700 dark:text-blue-200 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios de reparación para todos tus dispositivos electrónicos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smartphone Repair */}
            <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-blue-700 hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM8 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Reparación de Smartphones</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-6">Pantallas rotas, problemas de batería, fallos de software y más. Reparamos todas las marcas.</p>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  iPhone, Samsung, Huawei, Xiaomi y más...
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Garantía de 6 meses
                </li>
              </ul>
            </div>
            
            {/* Tablet Repair */}
            <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-blue-700 hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Reparación de Tablets</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-6">Soluciones completas para iPad, tablets Android y Windows. Pantallas, puertos de carga y más.</p>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  iPad, Samsung Galaxy Tab
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Reparación rápida
                </li>
              </ul>
            </div>
            
            {/* Laptop Repair */}
            <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-blue-700 hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700 delay-200">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 4a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Reparación de Laptops</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-6">Desde problemas de hardware hasta instalación de software. Optimización y limpieza incluida.</p>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Windows, Mac, Linux
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Diagnóstico completo
                </li>
              </ul>
            </div>
            
            {/* Console Repair */}
            <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-blue-700 hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700 delay-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 000 1.788l4 2.104V11a1 1 0 011-1zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788L9.553 8.658a1 1 0 00.894 0l4.764-2.382zM5.553 9.658L6 9.438V15a1 1 0 00.553.894l4 2A1 1 0 0012 17v-5.562l-.553-.276a1 1 0 00-.894 0L6 13.562V10.562l-.447-.224a1 1 0 00-.894 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Consolas de Videojuegos</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-6">PlayStation, Xbox, Nintendo Switch y más. Reparación de controles y sistemas completos.</p>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  PS4/PS5, Xbox, Nintendo
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Controles y sistemas
                </li>
              </ul>
            </div>
            
            {/* Data Recovery */}
            <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-blue-700 hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700 delay-400">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 7a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM17 4a1 1 0 10-2 0 1 1 0 002 0zM5 4a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Recuperación de Datos</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-6">Recuperamos información perdida de discos duros, memorias USB y dispositivos dañados.</p>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  HDD, SSD, USB, SD
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Evaluación gratuita
                </li>
              </ul>
            </div>
            
            {/* Custom Service */}
            <div className="bg-white dark:bg-blue-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-blue-700 hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom duration-700 delay-500">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Consultoría Técnica</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-6">Asesoramiento profesional para compra de equipos y soluciones tecnológicas personalizadas.</p>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Asesoramiento especializado
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Soporte personalizado
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-20 bg-blue-50 dark:bg-blue-800 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in slide-in-from-left duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                Más de 10 años reparando lo que más importa
              </h2>
              <p className="text-lg text-blue-700 dark:text-blue-200 mb-8">
                En REPARACIONES entendemos que tus dispositivos son una parte esencial de tu vida diaria. 
                Por eso nos dedicamos a brindar servicios de reparación de la más alta calidad, 
                utilizando repuestos originales y técnicas especializadas.
              </p>
              <div className="space-y-6">
                <div className="flex items-start transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:rotate-12">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Técnicos Certificados</h3>
                    <p className="text-blue-700 dark:text-blue-200">Nuestro equipo está formado por profesionales certificados con años de experiencia en el sector.</p>
                  </div>
                </div>
                <div className="flex items-start transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:rotate-12">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Garantía Extendida</h3>
                    <p className="text-blue-700 dark:text-blue-200">Ofrecemos garantía de hasta 6 meses en todas nuestras reparaciones para tu tranquilidad.</p>
                  </div>
                </div>
                <div className="flex items-start transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:rotate-12">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Servicio Rápido</h3>
                    <p className="text-blue-700 dark:text-blue-200">La mayoría de reparaciones las completamos en 24-48 horas, para que no estés sin tu dispositivo.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right duration-700">
              <div className="bg-blue-100 dark:bg-blue-700 border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-2xl shadow-xl w-full h-96 flex items-center justify-center text-blue-500 dark:text-blue-300 overflow-hidden transition-all duration-300 hover:scale-105">
                <img src="https://th.bing.com/th/id/OIP.NA3i0QaVtkML8ilrcIs6rAHaEo?rs=1&pid=ImgDetMain&cb=idpwebpc1" alt="Imagen del taller de reparación" className="w-full h-96 object-cover rounded-lg transition-all duration-300 hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom duration-700">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                <span className="animate-pulse">1000</span>+
              </div>
              <div className="text-blue-700 dark:text-blue-200 mt-2">Dispositivos Reparados</div>
            </div>
            <div className="transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                <span className="animate-pulse">10</span>+
              </div>
              <div className="text-blue-700 dark:text-blue-200 mt-2">Años de Experiencia</div>
            </div>
            <div className="transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom duration-700 delay-200">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                <span className="animate-pulse">95</span>%
              </div>
              <div className="text-blue-700 dark:text-blue-200 mt-2">Tasa de Éxito</div>
            </div>
            <div className="transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom duration-700 delay-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                <span className="animate-pulse">24</span>h
              </div>
              <div className="text-blue-700 dark:text-blue-200 mt-2">Tiempo Promedio</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 dark:bg-blue-950 text-white py-16 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2 animate-in slide-in-from-left duration-700">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span className="text-2xl font-bold">REPARACIONES</span>
              </div>
              <p className="text-blue-200 dark:text-blue-300 mb-6 max-w-md">
                Especialistas en reparación de dispositivos electrónicos con más de 10 años de experiencia. 
                Tu tecnología en las mejores manos.
              </p>
              <div className="flex space-x-4">
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-800 dark:bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-800 dark:bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-800 dark:bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="animate-in slide-in-from-right duration-700">
              <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="#inicio" className="text-blue-200 dark:text-blue-300 hover:text-white transition-all duration-300 hover:translate-x-2">Inicio</a></li>
                <li><a href="#servicios" className="text-blue-200 dark:text-blue-300 hover:text-white transition-all duration-300 hover:translate-x-2">Servicios</a></li>
                <li><a href="#nosotros" className="text-blue-200 dark:text-blue-300 hover:text-white transition-all duration-300 hover:translate-x-2">Nosotros</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="border-t border-blue-800 dark:border-blue-900 pt-6 flex flex-col md:flex-row justify-between items-center animate-in slide-in-from-bottom duration-700">
            <p className="text-blue-300 dark:text-blue-400 text-sm mb-4 md:mb-0">© 2025 REPARACIONES. Todos los derechos reservados.</p>
            <div className="flex space-x-6">
              <p className="text-blue-300 dark:text-blue-400 hover:text-white text-sm transition-all duration-300 hover:scale-105">Política de Privacidad</p>
              <p className="text-blue-300 dark:text-blue-400 hover:text-white text-sm transition-all duration-300 hover:scale-105">Términos de Servicio</p>
              <p className="text-blue-300 dark:text-blue-400 hover:text-white text-sm transition-all duration-300 hover:scale-105">Garantía</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
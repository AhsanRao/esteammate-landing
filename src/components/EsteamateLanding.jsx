import { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, ArrowRight, ChevronDown, Play, Moon, Sun, Upload, Sparkles, Building, Users, CreditCard, Shield, ArrowUpRight, Clock, Star, ChevronRight } from 'lucide-react';

// Animation utility function
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// Animated component wrapper
const AnimatedElement = ({ children, animation = "fade", delay = 0, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animations = {
    fade: `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`,
    slideRight: `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`,
    slideLeft: `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`,
    scale: `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`,
    bounce: `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`,
  };

  return (
    <div 
      ref={ref} 
      className={`${animations[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Main component
const EsteamateLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle scroll for parallax and other scroll-based effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Floating animation for hero image
  const floatAnimation = {
    transform: `translateY(${Math.sin(scrollPosition / 500) * 10}px)`,
    transition: 'transform 0.3s ease-out'
  };

  // Sample FAQ data
  const faqs = [
    {
      question: "How does Esteammate compare estimates from different contractors?",
      answer: "Esteammate uses AI to analyze line items across multiple bids, identifying price differences, material quality variations, and scope discrepancies. The system highlights these differences and provides insights on market rates, helping you make informed decisions."
    },
    
    {
      question: "How accurate is the AI in understanding construction terminology?",
      answer: "Our AI model is specifically trained on construction and real estate documentation, with over 10 million bid documents in its training data. It accurately recognizes industry-specific terminology, regional pricing variations, and common scoping patterns."
    },
    {
      question: "Is there a limit to how many quotes I can upload and compare?",
      answer: "Free accounts can compare up to 3 quotes per project. Premium plans allow unlimited quote comparisons and storage, plus additional features like historical bid analysis and custom reporting."
    }
  ];

  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} font-sans overflow-x-hidden`}>
      {/* Background gradient elements */}
      <div className="fixed w-full h-full pointer-events-none z-0 overflow-hidden">
        <div 
          className={`absolute -top-[30vh] -right-[20vw] w-[70vw] h-[70vh] rounded-full ${isDarkMode ? 'bg-pink-900/20' : 'bg-pink-300/20'} blur-[120px] transform -rotate-12`}
          style={{ transform: `rotate(-12deg) translateY(${scrollPosition * 0.05}px)` }}
        ></div>
        <div 
          className={`absolute -bottom-[20vh] -left-[20vw] w-[60vw] h-[60vh] rounded-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-300/20'} blur-[120px]`}
          style={{ transform: `translateY(${scrollPosition * -0.03}px)` }}
        ></div>
      </div>
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav className={`w-full ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md shadow-sm transition-all duration-300`}
        style={{ height: scrollPosition > 100 ? '64px' : '80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
            <div className="flex justify-between items-center h-full">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#" className="flex items-center">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-400 transition-all duration-300">Esteammate</span>
                </a>
              </div>
              
              <div className="-mr-2 -my-2 md:hidden">
                <button
                  type="button"
                  className={`p-2 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} focus:outline-none transition-all duration-300`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <div className="flex items-center space-x-6">
                  <a href="#features" className={`text-sm font-medium relative group whitespace-nowrap ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300`}>
                    Features
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="#ai" className={`text-sm font-medium relative group whitespace-nowrap ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300`}>
                    AI Superpowers
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="#who" className={`text-sm font-medium relative group whitespace-nowrap ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300`}>
                    Who It's For
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="#pricing" className={`text-sm font-medium relative group whitespace-nowrap ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-300`}>
                    Pricing
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
                
                <div className="flex items-center ml-6">
                  <button 
                    onClick={toggleDarkMode} 
                    className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:scale-110 transition-all duration-300`}
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                  
                  <a href="#" className={`ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-blue-400 hover:from-pink-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md`}>
                    Get Early Access
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className={`md:hidden absolute w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg overflow-hidden animate-[slideDown_0.3s_ease-out_forwards]`}>
              <div className="pt-2 pb-4 px-5 space-y-1">
                <a href="#features" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'} transition-all duration-300`}>Features</a>
                <a href="#ai" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'} transition-all duration-300`}>AI Superpowers</a>
                <a href="#who" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'} transition-all duration-300`}>Who It's For</a>
                <a href="#pricing" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'} transition-all duration-300`}>Pricing</a>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300">
                  <span className="text-sm text-gray-500">Toggle dark mode</span>
                  <button 
                    onClick={toggleDarkMode} 
                    className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} transition-all duration-300`}
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-gray-300">
                <a href="#" className={`block w-full px-5 py-3 text-center font-medium text-white bg-gradient-to-r from-pink-600 to-blue-400 rounded-md shadow hover:from-pink-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105`}>
                  Get Early Access
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
      
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="pt-20 pb-20 md:pt-28 md:pb-28 flex flex-col-reverse md:flex-row items-center">
            <AnimatedElement animation="slideRight" className="md:w-1/2 lg:pr-8 mt-10 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-400">
                  Smarter Bids. Faster Quotes.
                </span>
                <span className="mt-2 block relative">
                  Powered by 
                  <span className="relative inline-block ml-2">
                    AI
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-blue-400/20 animate-pulse rounded"></span>
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-pink-600 to-blue-400 rounded"></span>
                </span>
              </h1>
              <p className={`mt-6 text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage quotes, compare bids, and automate estimating tasks with one powerful tool.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#" className="flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-600 to-blue-400 hover:from-pink-700 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group">
                  Get Early Access
                  <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
                {/* <a href="#" className="flex items-center justify-center px-8 py-4 text-base font-medium rounded-md border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
                  <Play size={18} className="mr-2 text-pink-600" />
                  Watch Demo
                </a> */}
              </div>

              {/* Added stats section */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-400`}>85%</div>
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time Saved</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-400`}>1.2k+</div>
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-400`}>92%</div>
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Satisfaction</div>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slideLeft" className="md:w-1/2 flex justify-end" delay={300}>
              {/* Enhanced Hero Image/Mockup with animation */}
              <div 
                className={`relative rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 max-w-lg transform transition-all duration-500 hover:scale-[1.02]`}
                style={floatAnimation}
              >
                <div className="absolute top-0 left-0 right-0 h-6 flex items-center px-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <div className="flex items-center mb-6 relative">
                    <div className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mr-4 shadow-md group cursor-pointer hover:bg-gradient-to-r hover:from-pink-600/10 hover:to-blue-400/10 transition-all duration-300`}
                         onMouseEnter={() => setShowTooltip(true)}
                         onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Upload size={20} className="text-blue-400" />
                      {showTooltip && (
                        <div className="absolute -top-12 left-0 bg-blue-500 text-white text-xs p-2 rounded shadow-lg z-10 w-40 animate-fadeIn">
                          Click to upload any quote format - PDF, images, or text
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium">Quote Uploaded</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Project: Downtown Renovation</div>
                    </div>
                    <div className={`ml-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center text-xs`}>
                      <Clock size={12} className="mr-1" />
                      Just now
                    </div>
                  </div>
                  
                  <div className={`p-4 mb-6 rounded-md text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md relative overflow-hidden group`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-600/50 to-blue-400/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    <div className="text-sm font-medium text-blue-500 flex items-center mb-3">
                      <Sparkles size={16} className="mr-2 animate-pulse" /> AI Summary
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Total cost: <span className="font-semibold">$28,450</span>. Includes:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Demolition</span>
                        <span className="font-medium">$4,250</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Electrical</span>
                        <span className="font-medium">$6,800</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plumbing</span>
                        <span className="font-medium">$5,400</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Flooring</span>
                        <span className="font-medium">$8,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Finishes</span>
                        <span className="font-medium">$4,000</span>
                      </li>
                    </ul>
                    <div className="mt-3 flex items-center justify-between">
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Clock size={12} className="mr-1" /> Timeline: 4-6 weeks
                      </div>
                      <div className="flex">
                        <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} cursor-pointer hover:underline`}>View full details</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mb-5">
                    <div className={`flex-1 p-3 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l-2 border-green-500 shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105 cursor-pointer`}>
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium mb-1">Bid #1</div>
                        <div className="flex">
                          <Star size={10} className="text-green-500" fill="#10B981" />
                          <Star size={10} className="text-green-500" fill="#10B981" />
                          <Star size={10} className="text-green-500" fill="#10B981" />
                          <Star size={10} className="text-green-500" fill="#10B981" />
                          <Star size={10} className="text-gray-400" />
                        </div>
                      </div>
                      <div className="text-lg font-bold">$28,450</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Clock size={12} className="mr-1" /> 4-6 weeks
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Recommended</span>
                      </div>
                    </div>
                    <div className={`flex-1 p-3 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l-2 border-yellow-500 shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105 cursor-pointer`}>
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium mb-1">Bid #2</div>
                        <div className="flex">
                          <Star size={10} className="text-yellow-500" fill="#F59E0B" />
                          <Star size={10} className="text-yellow-500" fill="#F59E0B" />
                          <Star size={10} className="text-yellow-500" fill="#F59E0B" />
                          <Star size={10} className="text-gray-400" />
                          <Star size={10} className="text-gray-400" />
                        </div>
                      </div>
                      <div className="text-lg font-bold">$32,100</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Clock size={12} className="mr-1" /> 3-4 weeks
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">Faster Timeline</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-blue-400 rounded-md hover:from-pink-700 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-2px] flex items-center justify-center">
                    <span>Compare Details</span>
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Animated typing cursor */}
                <div className="absolute bottom-6 right-6">
                  <div className="h-4 w-0.5 bg-blue-500 animate-pulse"></div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
      
      {/* Client logos section */}
      <div className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-md py-8 w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="fade" delay={200}>
            <p className={`text-center text-sm font-medium mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`h-8 w-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded opacity-50 hover:opacity-100 transition-opacity duration-300`}></div>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      {/* Problem → Solution Section */}
      <div className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-md py-20 w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="scale" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Estimating shouldn't feel like firefighting.</h2>
            <div className="mt-10 max-w-3xl mx-auto grid gap-8 md:grid-cols-2 relative">
              {/* Connector line between problem and solution */}
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-pink-600 to-blue-400"></div>
              
              <AnimatedElement animation="slideRight" delay={200} className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <X size={20} className="text-red-500" />
                  </div>
                  The Problem
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <X size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manual quote entry in multiple systems, wasting hours on data entry</span>
                  </li>
                  <li className="flex items-start">
                    <X size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Endless spreadsheets with complex formulas that only one person understands</span>
                  </li>
                  <li className="flex items-start">
                    <X size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Scattered notes and lost information leading to costly errors</span>
                  </li>
                </ul>
              </AnimatedElement>
              
              <AnimatedElement animation="slideLeft" delay={200} className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <Check size={20} className="text-green-500" />
                  </div>
                  The Solution
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>One unified workspace for all quotes and bids with automated capture</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>AI-powered comparisons and summaries that highlight what matters</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Smart organization with browser extension that works where you do</span>
                  </li>
                </ul>
              </AnimatedElement>
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      {/* Key Features Section with Interactive Tabs */}
      <div id="features" className={`py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="fade">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
                Key Features
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-pink-600 to-blue-400 rounded"></span>
              </h2>
              <p className={`mt-6 max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Everything you need to streamline your estimation workflow.
              </p>
            </div>
          </AnimatedElement>
          
          {/* Feature tabs */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 mb-16">
            <div className="md:w-1/3 pr-0 md:pr-8">
              <AnimatedElement animation="slideRight" delay={100} className="space-y-2">
                {['Quote Capture', 'Bid Analysis', 'Team Collaboration', 'Project Dashboard'].map((tab, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer ${activeTab === index 
                      ? `${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-l-4 border-pink-600` 
                      : `${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-white/50'} hover:shadow-sm transition-all duration-300`}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <div className="font-medium flex items-center justify-between">
                      {tab}
                      {activeTab === index && <ChevronRight size={16} className="text-pink-600" />}
                    </div>
                  </div>
                ))}
              </AnimatedElement>
            </div>
            
            <div className="md:w-2/3">
              <AnimatedElement animation="slideLeft" delay={200} className={`rounded-xl shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
                {/* Tab content */}
                {activeTab === 0 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Instant Quote Capture</h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Capture quotes from any source - PDF files, emails, websites, or even photos of paper documents. Our AI automatically extracts key details.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white flex flex-col items-center">
                          <Upload size={40} className="mb-2" />
                          <span className="text-sm">Drag & Drop files or click to browse</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-blue-400"></div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Supports PDF, DOCX, XLSX, JPG
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Extracts line items
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 1 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Smart Bid Comparison</h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      AI-powered analysis automatically compares bids, highlights differences, and helps you identify the best option based on multiple factors.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-4 p-4 w-full">
                          <div className="bg-white/10 rounded p-3">
                            <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                            <div className="h-8 w-full bg-white/20 rounded mb-2"></div>
                            <div className="h-2 w-16 bg-white/20 rounded"></div>
                          </div>
                          <div className="bg-white/10 rounded p-3">
                            <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                            <div className="h-8 w-full bg-green-500/40 rounded mb-2"></div>
                            <div className="h-2 w-16 bg-white/20 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-blue-400"></div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Side-by-side comparisons
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Highlights discrepancies
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 2 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Share projects with team members, assign roles, track changes, and collaborate in real-time with notifications and shared annotations.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex space-x-3">
                          <div className="w-10 h-10 rounded-full bg-pink-500/70 flex items-center justify-center text-white text-sm">AS</div>
                          <div className="w-10 h-10 rounded-full bg-blue-500/70 flex items-center justify-center text-white text-sm">JD</div>
                          <div className="w-10 h-10 rounded-full bg-green-500/70 flex items-center justify-center text-white text-sm">RK</div>
                          <div className="w-10 h-10 rounded-full bg-purple-500/70 flex items-center justify-center text-white text-sm">MB</div>
                          <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-500 flex items-center justify-center text-white text-sm">+</div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-blue-400"></div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Real-time updates
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Role-based permissions
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 3 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Project Dashboard</h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Get a bird's-eye view of all your projects, track bid status, monitor budgets, and see team activity all from one centralized dashboard.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4">
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-2 w-16 bg-white/20 rounded mb-2"></div>
                          <div className="h-16 w-full bg-gradient-to-r from-blue-500/40 to-blue-600/40 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-2 w-20 bg-white/20 rounded mb-2"></div>
                          <div className="h-16 w-full bg-gradient-to-r from-pink-500/40 to-pink-600/40 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                          <div className="h-16 w-full bg-gradient-to-r from-green-500/40 to-green-600/40 rounded"></div>
                        </div>
                        <div className="bg-white/10 rounded p-2">
                          <div className="h-2 w-12 bg-white/20 rounded mb-2"></div>
                          <div className="h-16 w-full bg-gradient-to-r from-purple-500/40 to-purple-600/40 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-blue-400"></div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Project status tracking
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline-block text-green-500 mr-1" /> Budget visualization
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedElement>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Feature cards */}
            {[
              {
                icon: <Upload size={24} className="text-white" />,
                title: "Quote Upload",
                desc: "Upload quotes directly from any webpage using our browser extension."
              },
              {
                icon: <Sparkles size={24} className="text-white" />,
                title: "Smart Bid Comparison",
                desc: "AI automatically compares bids and highlights key differences."
              },
              {
                icon: <Building size={24} className="text-white" />,
                title: "Company Dashboard",
                desc: "Centralized workspace for teams to manage all projects."
              },
              {
                icon: <Users size={24} className="text-white" />,
                title: "Team Collaboration",
                desc: "Share projects, notes, and quotes with team members in real-time."
              },
              {
                icon: <CreditCard size={24} className="text-white" />,
                title: "Payment Tracking",
                desc: "Monitor payments, installments, and contractor billing."
              },
              {
                icon: <Shield size={24} className="text-white" />,
                title: "Admin Controls",
                desc: "Manage user roles, permissions, and account settings."
              }
            ].map((feature, index) => (
              <AnimatedElement 
                key={index} 
                animation={index % 2 === 0 ? "fade" : "scale"} 
                delay={100 * index}
                className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] group`}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 to-blue-400 flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:rotate-12">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
                <div className="mt-4">
                  <a href="#" className={`inline-flex items-center text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    Learn more <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Superpowers Section */}
      <div id="ai" className={`py-24 ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-md w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="fade" className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
                <span className="mr-3 rounded-full bg-gradient-to-r from-pink-600/20 to-blue-400/20 p-2">
                  <Sparkles size={26} className="text-blue-400" />
                </span>
                AI Superpowers
              </h2>
              <div className="space-y-6">
                <AnimatedElement animation="slideRight" delay={100} className={`p-5 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}>
                  <h3 className="text-lg font-medium flex items-center">
                    <Sparkles size={18} className="text-blue-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Quote Summarization
                  </h3>
                  <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    AI instantly extracts key details from any PDF, image, or webpage quote, saving hours of manual data entry.
                  </p>
                </AnimatedElement>
                
                <AnimatedElement animation="slideRight" delay={200} className={`p-5 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}>
                  <h3 className="text-lg font-medium flex items-center">
                    <Sparkles size={18} className="text-blue-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Bid Comparison
                  </h3>
                  <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Highlight differences between multiple bids to spot inconsistencies, scope gaps, and potential risks.
                  </p>
                </AnimatedElement>
                
                <AnimatedElement animation="slideRight" delay={300} className={`p-5 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}>
                  <h3 className="text-lg font-medium flex items-center">
                    <Sparkles size={18} className="text-blue-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Document Generation
                  </h3>
                  <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Turn quick notes into formal proposals, reports, and contracts with proper formatting and terminology.
                  </p>
                </AnimatedElement>
                
                <AnimatedElement animation="slideRight" delay={400} className={`p-5 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}>
                  <h3 className="text-lg font-medium flex items-center">
                    <Sparkles size={18} className="text-blue-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Smart Suggestions
                  </h3>
                  <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Get intelligent insights on pricing, timeline, and material recommendations based on historical data.
                  </p>
                </AnimatedElement>
              </div>
            </div>
            
            <AnimatedElement animation="slideLeft" delay={200} className="md:w-1/2">
              <div className={`rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 relative group`}>
                {/* Sparkles animation */}
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-blue-400/30 blur-lg animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full bg-pink-600/30 blur-lg animate-pulse"></div>
                
                <div className="mb-6">
                  <div className={`h-4 w-28 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-2`}></div>
                  <div className={`h-4 w-40 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
                </div>
                
                <div className={`p-5 mb-6 rounded border-l-3 border-blue-400 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} relative overflow-hidden group`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-600 to-blue-400"></div>
                  <div className="flex items-center mb-3">
                    <Sparkles size={18} className="text-blue-400 mr-2 animate-pulse" />
                    <span className="text-sm font-medium">AI Insights</span>
                  </div>
                  <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p className="text-sm">Bid #1 includes premium materials ($8k more than standard grade)</p>
                    <p className="text-sm">Bid #2 has shorter timeline but 20% higher labor costs</p>
                    <p className="text-sm">Both bids missing permit fees (~$1,200 based on local regulations)</p>
                    <p className="text-sm">Recommendation: Request itemized breakdown of material costs</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transform transition-all duration-300 hover:scale-[1.02] cursor-pointer`}>
                    <div className="flex items-center mb-3">
                      <div className={`h-10 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mr-3`}></div>
                      <div>
                        <div className={`h-3 w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-1`}></div>
                        <div className={`h-2 w-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
                      </div>
                    </div>
                    <div className={`h-10 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className={`p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transform transition-all duration-300 hover:scale-[1.02] cursor-pointer`}>
                    <div className="flex items-center mb-3">
                      <div className={`h-10 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mr-3`}></div>
                      <div>
                        <div className={`h-3 w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-1`}></div>
                        <div className={`h-2 w-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
                      </div>
                    </div>
                    <div className={`h-10 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-blue-500 transform transition-all duration-300 hover:scale-105 cursor-pointer">
                    <Sparkles size={16} className="mr-1" />
                    <span className="font-medium">Generate Detailed Report</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Animated typing cursor */}
                <div className="absolute bottom-6 right-6">
                  <div className="h-4 w-0.5 bg-blue-500 animate-pulse"></div>
                </div>
              </div>
            </AnimatedElement>
          </AnimatedElement>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} w-full`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Everything you need to know about Esteammate</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AnimatedElement key={index} animation="fade" delay={100 * index}>
                  <div 
                    className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md overflow-hidden transition-all duration-300 ${activeFAQ === index ? 'shadow-xl' : ''}`}
                  >
                    <div 
                      className="p-5 flex justify-between items-center cursor-pointer"
                      onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                    >
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <div className={`transform transition-transform duration-300 ${activeFAQ === index ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${activeFAQ === index ? 'max-h-60' : 'max-h-0'}`}
                    >
                      <div className={`p-5 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      {/* Who It's For Section */}
      <div id="who" className={`py-24 ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-md w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="fade" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Who It's For</h2>
            <p className={`mt-6 max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tailored for construction and real estate professionals.
            </p>
          </AnimatedElement>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Estimators",
                desc: "Streamline quote creation and comparison process, saving hours on each project.",
                icon: "https://via.placeholder.com/64"
              },
              {
                title: "General Contractors",
                desc: "Manage subcontractor bids and project budgets with greater accuracy and oversight.",
                icon: "https://via.placeholder.com/64"
              },
              {
                title: "Renovation Firms",
                desc: "Track project quotes and contractor performance across multiple simultaneous projects.",
                icon: "https://via.placeholder.com/64"
              },
              {
                title: "Bidding Companies",
                desc: "Create professional bids and track client responses with automated follow-ups.",
                icon: "https://via.placeholder.com/64"
              }
            ].map((persona, index) => (
              <AnimatedElement 
                key={index} 
                animation="scale" 
                delay={100 * index}
                className={`rounded-xl p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 group`}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-600 to-blue-400 flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110">
                  <img src={persona.icon} alt={persona.title} className="w-12 h-12 object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{persona.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {persona.desc}
                </p>
                <div className="mt-6">
                  <a href="#" className={`inline-flex items-center text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    Learn more <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pricing Teaser Section */}
      <div id="pricing" className={`py-24 ${isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50/90'} backdrop-blur-md w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="fade" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple plans for individuals and teams</h2>
            <p className={`mb-10 max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Choose the plan that works best for your estimation needs.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <AnimatedElement animation="slideRight" delay={100} className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Basic</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>For solo estimators</p>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">$19</span>
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Up to 10 projects</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>3 quotes per project</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Basic AI features</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Browser extension</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a href="#" className={`block w-full py-3 text-center rounded-md border-2 ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} font-medium transition-all duration-300`}>
                    Get Started
                  </a>
                </div>
              </AnimatedElement>
              
              {/* Pro Plan */}
              <AnimatedElement animation="scale" delay={100} className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative`}>
                {/* Popular badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-pink-600 to-blue-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                </div>
                
                <div className="p-6 relative">
                  {/* Accent border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-blue-400"></div>
                  
                  <h3 className="text-xl font-semibold mb-1">Pro</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>For small teams</p>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">$49</span>
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Unlimited projects</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 quotes per project</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Advanced AI analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Team collaboration (up to 5)</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a href="#" className="block w-full py-3 text-center font-medium text-white bg-gradient-to-r from-pink-600 to-blue-400 rounded-md hover:from-pink-700 hover:to-blue-500 shadow-md transition-all duration-300">
                    Get Started
                  </a>
                </div>
              </AnimatedElement>
              
              {/* Enterprise Plan */}
              <AnimatedElement animation="slideLeft" delay={100} className={`rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Enterprise</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>For large organizations</p>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">$99</span>
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Everything in Pro, plus:</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Unlimited team members</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>SSO & advanced security</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Custom integrations</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a href="#" className={`block w-full py-3 text-center rounded-md border-2 ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} font-medium transition-all duration-300`}>
                    Contact Sales
                  </a>
                </div>
              </AnimatedElement>
            </div>
            
            <p className={`mt-12 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              All plans include a 14-day free trial. No credit card required.
            </p>
          </AnimatedElement>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className={`py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} relative overflow-hidden w-full`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-[20vh] -right-[10vw] w-[50vw] h-[50vh] rounded-full ${isDarkMode ? 'bg-pink-900/10' : 'bg-pink-300/10'} blur-[100px]`}></div>
          <div className={`absolute -bottom-[20vh] -left-[10vw] w-[50vw] h-[50vh] rounded-full ${isDarkMode ? 'bg-blue-900/10' : 'bg-blue-300/10'} blur-[100px]`}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedElement animation="scale" className={`rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-2xl overflow-hidden`}>
            <div className="px-6 py-12 md:px-12 md:py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your estimating process?</h2>
              <p className={`mb-10 max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Join thousands of professionals who are saving time and improving accuracy with Esteammate.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-white bg-gradient-to-r from-pink-600 to-blue-400 hover:from-pink-700 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px] group">
                  Get Early Access
                  <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
                  <Play size={18} className="mr-2 text-pink-600" />
                  Watch Demo
                </a>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-12 md:mb-0">
              <a href="#" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-400">Esteammate</span>
              </a>
              <p className={`mt-4 text-sm max-w-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Smarter Bids. Faster Quotes. Powered by AI.
                Simplifying the estimating process for construction professionals.
              </p>
              <div className="mt-6">
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Powered by OpenAI</span>
              </div>
              <div className="mt-8 flex space-x-5">
                <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:scale-110 transition-transform duration-300`}>
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-1 0-1.8-.8-1.8-1.7s.8-1.7 1.8-1.7 1.8.8 1.8 1.7-.8 1.7-1.8 1.7zm12.5 12.3h-3v-5.6c0-3.4-4-3.1-4 0v5.6h-3v-11h3v1.9c1.4-2.6 7-2.8 7 2.5v6.6z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:scale-110 transition-transform duration-300`}>
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:scale-110 transition-transform duration-300`}>
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-4`}>Product</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#features" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Features</a>
                  </li>
                  <li>
                    <a href="#ai" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>AI Capabilities</a>
                  </li>
                  <li>
                    <a href="#pricing" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Pricing</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>FAQ</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-4`}>Company</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>About</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Blog</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Careers</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Press</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-4`}>Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Documentation</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Guides</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>API</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Support</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-4`}>Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Privacy</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Terms</a>
                  </li>
                  <li>
                    <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Cookie Policy</a>
                  </li>
                  <li>
                  <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              &copy; 2025 Esteammate. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-300 mr-4`}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span className="sr-only">{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
              </button>
              <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} hover:underline transition-all duration-300`}>
                Change region
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating CTA for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-pink-600 to-blue-400 animate-slideUpIn z-30">
        <a href="#" className="block w-full py-3 text-center font-medium text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-pink-600 transition-all duration-300">
          Get Early Access
        </a>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-pink-600 to-blue-400 text-white shadow-lg z-30 transition-all duration-300 ${scrollPosition > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Add animations to CSS */}
      <style jsx="true">{`
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 400px;
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUpIn {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideUpIn {
          animation: slideUpIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EsteamateLanding;
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
          <div className="pt-20 pb-20 md:pt-28 md:pb-28 flex flex-col md:flex-row items-center">
            <AnimatedElement animation="slideRight" className="md:w-1/2 lg:pr-8 mt-10 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-400">
                  Comparing Quotes Sucks
                </span>
                <span className="mt-2 block relative">
                  So We do it for you
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

            </AnimatedElement>

            <AnimatedElement animation="slideLeft" className="md:w-1/2 mt-10 flex justify-end" delay={300}>
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
      
      {/* Problem → Solution Section */}
      <div className={`${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-md py-20 w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedElement animation="scale" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Comparing quotes shouldn’t be chaos</h2>
            <div className="mt-10 max-w-3xl mx-auto grid gap-8 md:grid-cols-2 relative">
              {/* Connector line between problem and solution */}
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-pink-600 to-blue-400"></div>
              
              <AnimatedElement animation="slideRight" delay={200} className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <X size={20} className="text-red-500" />
                  </div>
                  Problems
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <X size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quotes come in all shapes and sizes, making comparing apples to apples a tedious challege</span>
                  </li>
                  <li className="flex items-start">
                    <X size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Time wasted chasing down clarifications and missing information</span>
                  </li>
                  <li className="flex items-start">
                    <X size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Project details alip through the cracks and lead to costly surprises</span>
                  </li>
                </ul>
              </AnimatedElement>
              
              <AnimatedElement animation="slideLeft" delay={200} className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <Check size={20} className="text-green-500" />
                  </div>
                  Solutions
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>AI bid-leveling that creates a single, standardized view for easy comparison</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Flagged scope gaps with tailored clarification scripts for quick follow ups</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Smart organization with browser extension that centralizes notes, clarifications, and follow-ups</span>
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
                {['Scope Creation', 'Qoute Capture', 'Bid Analysis', 'Tailored Clarification Scripts'].map((tab, index) => (
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
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-blue-500/10 text-blue-500 p-1 rounded mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 15L15 12L10 9V15Z" fill="currentColor" />
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      Generative Scope Creation
                    </h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Smartly generated scope areas based on your project notes, quotes, and description eliminate clutter and confusion.
                    </p>
                    <div className={`aspect-video ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-gray-100'} rounded-xl shadow-lg flex flex-col relative overflow-hidden p-5`}>
                      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'} rounded-xl`}></div>
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="text-blue-500 mr-3 bg-blue-500/10 p-2 rounded-lg">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} text-lg font-semibold`}>AI Suggested Scope Areas</h4>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Click on a suggestion to add it to your confirmed scope areas.</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            "Demolition and disposal",
                            "Structural modifications",
                            "Electrical system installation",
                            "Plumbing system installation",
                            "Data and communications",
                            "Interior wall framing"
                          ].map((item, index) => (
                            <div 
                              key={index} 
                              className={`
                                group
                                ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-blue-50'} 
                                rounded-lg p-3 flex items-center cursor-pointer 
                                transition-all duration-300 ease-in-out
                                ${isDarkMode ? 'shadow-md' : 'shadow-md'}
                                hover:shadow-lg transform hover:-translate-y-1
                              `}
                            >
                              <div className={`
                                w-8 h-8 rounded-full 
                                ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'} 
                                flex items-center justify-center 
                                text-green-500 mr-3
                                group-hover:bg-green-500 group-hover:text-white
                                transition-colors duration-300
                              `}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} text-sm font-medium`}>{item}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="mt-auto pt-4 flex justify-end">
                          <button className={`
                            ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} 
                            text-white px-4 py-2 rounded-lg text-sm font-medium
                            transition-colors duration-200
                            flex items-center
                          `}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Add Custom Scope
                          </button>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                      <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
                    </div>
                    
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        AI-generated suggestions
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        One-click scope area creation
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 1 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-blue-500/10 text-blue-500 p-1 rounded mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      Instant Quote Capture
                    </h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Capture quotes from any source - PDF files, emails, websites, or even photos of paper documents. Our AI automatically extracts key details.
                    </p>
                    <div className={`aspect-video ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl shadow-lg flex flex-col relative overflow-auto`}>
                      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl`}></div>
                      
                      <div className="relative z-10 flex flex-col h-full p-6 overflow-auto">
                        {/* Modal-like header */}
                        <div className="flex justify-between items-center mb-3">
                          <h4 className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} text-xl font-medium`}>Add New Quote</h4>
                          <button className="text-gray-400 hover:text-gray-500">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        
                        {/* Instructions */}
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-3`}>
                          Paste the full text of the quote below, or upload a text-based file (.txt, .md, .pdf). 
                          The AI will attempt to extract details.
                        </p>
                        
                        {/* Text input section */}
                        <div className="mb-3">
                          <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-1`}>
                            Paste Quote Text
                          </label>
                          <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-lg p-1 relative overflow-hidden`}>
                            <div className="min-h-16 p-1">
                              <span className="text-gray-400 text-sm">Paste the full content of the quote here...</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-pink-500"></div>
                          </div>
                        </div>
                        
                        {/* OR divider */}
                        <div className="flex items-center my-2">
                          <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                          <span className={`mx-4 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
                          <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                        </div>
                        
                        {/* File upload section */}
                        <div>
                          <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-1`}>
                            Upload Quote File
                          </label>
                          <div className={`flex items-center ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-lg p-2`}>
                            <button className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} px-3 py-1 rounded text-xs mr-2`}>
                              Choose File
                            </button>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>No file chosen</span>
                          </div>
                          <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Supports .txt, .md, .pdf files. For other formats, please copy and paste the text.
                          </p>
                        </div>
                        
                        {/* Action buttons - placed at the bottom */}
                        <div className="mt-auto pt-3 flex justify-end space-x-2">
                          <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-3 py-1 rounded-lg text-xs font-medium`}>
                            Cancel
                          </button>
                          <button className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center`}>
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Process Quote
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        Supports PDF, DOCX, TXT, JPG
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        Extracts line items
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 2 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-blue-500/10 text-blue-500 p-1 rounded mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L12 12L16 10M16 10L20 9.99998V20L16 20M16 10V20M16 20L12 18L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      Smart Bid Comparison
                    </h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      AI-powered analysis automatically compares bids, highlights differences, and helps you identify the best option based on multiple factors.
                    </p>
                    <div className={`aspect-video ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl shadow-lg flex flex-col relative overflow-hidden`}>
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Bid comparison table */}
                        <div className={`w-full h-full ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          <table className="w-full h-full border-collapse">
                            {/* Table header with company names and action buttons */}
                            <thead>
                              <tr>
                                <th className="w-1/3"></th>
                                <th className={`w-1/3 py-2 text-center font-semibold text-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>Titan Concrete</th>
                                <th className={`w-1/3 py-2 text-center font-semibold text-lg border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>Adrahams</th>
                              </tr>
                              <tr>
                                <th></th>
                                <th className="py-3 text-center">
                                  <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded font-medium text-sm inline-block w-3/4`}>
                                    Generate Script
                                  </button>
                                  <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 my-2 rounded font-medium text-sm inline-block w-3/4`}>
                                    View Quote
                                  </button>
                                </th>
                                <th className="py-3 text-center">
                                  <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded font-medium text-sm inline-block w-3/4`}>
                                    Generate Script
                                  </button>
                                  <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 my-2 rounded font-medium text-sm inline-block w-3/4`}>
                                    View Quote
                                  </button>
                                </th>
                              </tr>
                              {/* <tr>
                                <th></th>
                                <th className="py-2 text-center">
                                  <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded font-medium text-sm inline-block w-3/4`}>
                                    View Quote
                                  </button>
                                </th>
                                <th className="py-2 text-center">
                                  <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded font-medium text-sm inline-block w-3/4`}>
                                    View Quote
                                  </button>
                                </th>
                              </tr> */}
                            </thead>
                            
                            {/* Table body - comparing different line items */}
                            <tbody>
                              <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Concrete Cutting</td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Included</span>
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Not Included</span>
                                  </div>
                                </td>
                              </tr>
                              
                              <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Coordination with Demolition Crew</td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Included</span>
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Unclear</span>
                                  </div>
                                </td>
                              </tr>
                              
                              <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>X-Ray Scanning</td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Included</span>
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Included</span>
                                  </div>
                                </td>
                              </tr>
                              
                              <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Protective Super Six Poly Wrap</td>
                                <td className="p-4 text-center">
                                  <div className="flex justify-center">
                                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span className="ml-2">Included</span>
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center">
                                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <span>Includes 3 doorways</span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Add bidder button */}
                        <div className="absolute top-16 left-8">
                          <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded font-medium text-sm flex items-center`}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Invite More Bidders
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        Side-by-side comparisons
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        Highlights discrepancies
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="bg-blue-500/10 text-blue-500 p-1 rounded mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 9L11 12L8 15M13 9H16M13 15H16M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                     Tailored Clarification Scripts
                    </h3>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Professional bid-leveling scripts based on any gaps or omissions discovered, ready for you to share with bidders.
                    </p>
                    <div className={`aspect-video ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl shadow-lg flex flex-col relative overflow-hidden`}>
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Script generator modal */}
                        <div className={`w-full h-full ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} p-0`}>
                          <div className={`w-full h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md relative`}>
                            {/* Modal header */}
                            <div className="flex justify-between items-center px-6 py-2 pt-0 border-b border-gray-200 dark:border-gray-700">
                              <h4 className="text-lg font-medium">Generate Email Script for Titan Concrete</h4>
                              <button className="text-gray-400 hover:text-gray-500">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </div>
                            
                            {/* Modal body */}
                            <div className="px-6 py-3">
                              <p className={`mb-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Select tone and layout, then generate the script.
                              </p>
                              
                              {/* Tone selection */}
                              <div className="mb-3">
                                <label className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  Tone
                                </label>
                                <div className={`relative ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-md`}>
                                  <select className={`appearance-none w-full py-1.5 pl-3 pr-8 rounded-md text-sm ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'} focus:outline-none`}>
                                    <option>Cordial</option>
                                    <option>Formal</option>
                                    <option>Professional</option>
                                    <option>Friendly</option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Layout options */}
                              <div className="mb-3">
                                <label className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  Layout for Missing Items
                                </label>
                                <div className="flex space-x-4">
                                  <label className="flex items-center">
                                    <input type="radio" name="layout" className="hidden" defaultChecked />
                                    <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${isDarkMode ? 'border-blue-500' : 'border-blue-500'} border`}>
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    </div>
                                    <span className="text-sm">Bullet Points</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input type="radio" name="layout" className="hidden" />
                                    <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${isDarkMode ? 'border-gray-400' : 'border-gray-400'} border`}>
                                      <div className="w-0 h-0 rounded-full"></div>
                                    </div>
                                    <span className="text-sm">Paragraph</span>
                                  </label>
                                </div>
                              </div>
                              
                              {/* Generate button */}
                              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md flex items-center justify-center mb-3 text-sm">
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 9L11 12L8 15M13 9H16M13 15H16M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Generate Script
                              </button>
                              
                              {/* Generated script preview */}
                              <div>
                                <label className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  Generated Script:
                                </label>
                                <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-md p-3 h-28 overflow-auto text-sm`}>
                                  <p className="mb-1.5">Dear Titan Concrete team,</p>
                                  <p className="mb-1.5">I hope this email finds you well.</p>
                                  <p className="mb-1.5">We are currently reviewing quotes for the Downtown Office Renovation project and wanted to follow up regarding your submitted proposal. It appears that some scope items may be missing, and we would appreciate clarification on whether these were intentionally excluded or if they can be included in your quote.</p>
                                </div>
                                
                                {/* Copy script button */}
                                <div className="flex justify-center mt-2">
                                  <button className="flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
                                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V17M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V12M20 16V20M20 16H16M20 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Copy Script
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18V15M12 15H7M12 15V11.5M12 15H17M7 11.5H17M7 11.5V8H17V11.5M7 8H5V20H19V8H17M7 8V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        Multiple tone options
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        One-click copy to clipboard
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedElement>
            </div>
          </div>
          
          
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
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                {/* <div className="mt-6">
                  <a href="#" className={`inline-flex items-center text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    Learn more <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div> */}
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
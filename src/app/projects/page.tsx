'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiLayers, FiDatabase, FiServer, FiSmartphone, FiFilter, FiArrowRight, FiTool, FiLink } from 'react-icons/fi';

// Project data structure
const projects = [
  {
    id: 'Hospital Management (Admin Panel)',
    title: 'Hospital Management (Admin Panel)',
    year: '2025',
    description: (
     <p className="text-justify">
     HeavenMed is a hospital management admin panel built to simplify healthcare operations. It provides a modern, intuitive dashboard that helps administrators efficiently manage patients, doctors, appointments, payments, and resources with a focus on clarity, accessibility, and real-time insights.
    </p>
    ),
    imageSrc: '/images/projects/Hospital_Management.png',
    imageAlt: 'Hospital Management Admin Panel',
    featured: true,
    technologies: [
      { name: 'Figma', icon: <FiTool/> },
      { name: 'ChatGpt', icon: <FiLayers/> },
       { name: <a href="https://www.behance.net/gallery/233231473/Hospital-Management-Admin-Panel">Link</a>, icon: <a href="https://www.behance.net/gallery/233231473/Hospital-Management-Admin-Panel"><FiLink/></a> },
      // { name: 'Hardware Sensors', icon: <FiLayers /> }
    ],
    highlights: [
      'Quick insights into patients, appointments, invoices, and hospital revenue',
      'System issues, equipment maintenance, and room cleaning notifications',
      'Live stats like heart rate, blood oxygen, and temperature',
      'Bed availability and departmental overview',
      'Real-time availability of doctors',
    ],
    category: 'UI/UX'
  },
  {
    id: 'Detailed Feature analysis Of The Uber Application',
    title: 'Detailed Feature analysis Of The Uber Application',
    year: '2025',
    description:  (
    <p className="text-justify">
      This case study explores Uber's evolution from a ride-hailing service to a global mobility and logistics platform. 
      It examines Uber's innovative business model, its impact on urban transportation, and the strategies driving its growth. 
      it highlights the challenges Uber faces, including regulatory hurdles, and profitability concerns.
    </p>
    ),
    imageSrc: '/images/projects/uber_case_study.png',
    imageAlt: 'Detailed Feature analysis Of The Uber Application',
    featured: true,
    technologies: [
      { name: 'Figma', icon: <FiTool /> },
      { name: <a href="https://www.behance.net/gallery/220638465/Detailed-Feature-analysis-Of-The-Uber-Application">Link</a>, icon: <a href="https://www.behance.net/gallery/220638465/Detailed-Feature-analysis-Of-The-Uber-Application"><FiLink/></a> },

      // { name: 'HTML/CSS', icon: <FiCode /> },
      // { name: 'JavaScript', icon: <FiCode /> },
      // { name: 'Database', icon: <FiDatabase /> }
    ],
    highlights: [
      'Ride Booking System: The core feature allowing users to request a ride.',
      'Real-Time GPS Tracking: Ensures users and drivers can navigate efficiently.',
      'Safety Features (SOS, Trip Sharing): Critical for user security and trust.',
      'Estimated Fare Calculation: It increases transparency and security.',
      'Multiple Payment Options: It ensures flexibility in transactions.',
    ],
    category: 'UI/UX'
  },
  {
    id: 'Brew Heaven Coffee Shop App UI/UX Case Study',
    title: 'Brew Heaven Coffee Shop App UI/UX Case Study',
    year: '2025',
    description:  (
    <p className="text-justify">
      This case study explores Uber's evolution from a ride-hailing service to a global mobility and logistics platform. 
      It examines Uber's innovative business model, its impact on urban transportation, and the strategies driving its growth. 
      it highlights the challenges Uber faces, including regulatory hurdles, and profitability concerns.
    </p>
    ),
    imageSrc: '/images/projects/brew_project.png', // Image path kept but we'll add fallback
    imageAlt: 'Brew Heaven Coffee Shop App UI/UX Case Study',
    featured: true,
    technologies: [
      { name: 'Cnava', icon: <FiTool /> },
      { name: 'Motiff', icon: <FiTool /> },
      { name: <a href="https://www.behance.net/gallery/221814315/Brew-Heaven-Coffee-Shop-App-UIUX-Case-Study">Link</a>, icon: <a href="https://www.behance.net/gallery/221814315/Brew-Heaven-Coffee-Shop-App-UIUX-Case-Study"><FiLink/></a> },
      // { name: 'Google Maps API', icon: <FiLayers /> },
      // { name: 'Geoapify API', icon: <FiLayers /> }
    ],
    highlights: [
      'Easy Coffee Customization: Users can select coffee type, milk options, flavors, sweetness levels, and toppings.',
      'AI-Powered Smart Recommendations: Personalized drink suggestions based on past orders and preferences.',
      'One-Tap Payment & Digital Wallet Integration: Secure, one-tap payment options with saved payment methods.'
    ],
    category: 'UI/UX'
  },
  {
    id: 'Amazon App UX Improvement Case Study',
    title: 'Amazon App UX Improvement Case Study',
    year: '2025',
    description: (
    <p className="text-justify">
     This case study analyzes Amazon, a leading e-commerce platform, highlighting usability issues such as 
     cluttered search results, overwhelming navigation, and trust concerns with reviews, while proposing 
     improvements to enhance the shopping experience.
    </p>
    ),
    imageSrc: '/images/projects/amazon_project.png',
    imageAlt: 'Amazon App UX Improvement Case Study',
    featured: true,
    technologies: [
      { name: 'Figma', icon: <FiTool /> },
      { name: <a href="https://www.behance.net/gallery/222401765/Amazon-App-UX-Improvement-Case-Study">Link</a>, icon: <a href="https://www.behance.net/gallery/222401765/Amazon-App-UX-Improvement-Case-Study"><FiLink/></a> },

      // { name: 'Tailwind CSS', icon: <FiCode /> },
      // { name: 'Framer Motion', icon: <FiLayers /> },
      // { name: 'TypeScript', icon: <FiCode /> }
    ],
    highlights: [
      'Streamlined Homepage Design: Organize content with collapsible sections and personalized recommendations.',
      'Verified Review System: Introduce AI-driven verification and highlight reviews from frequent buyers.',
      'Enhanced Search Filtering: Prioritize organic results and limit the number of sponsored products.',
    ],
    category: 'UI/UX'
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewportWidth, setViewportWidth] = useState(0);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // Add state for image popup and loading/error state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Enhanced function to open the image popup
  const openImagePopup = (project: typeof projects[0]) => {
    // Reset states when opening a new image
    setImageError(false);
    setImageLoading(true);
    
    // Use basename of image path to ensure we get the correct file
    const imagePath = project.imageSrc;
    console.log("Opening image:", imagePath);
    
    setSelectedImage(imagePath);
    // setSelectedTitle(project.title);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Function to close the image popup
  const closeImagePopup = () => {
    setSelectedImage(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  // Add this function to handle image load errors in the popup
  const handleImageError = () => {
    console.error("Failed to load image in popup");
    setImageError(true);
    setImageLoading(false);
  };
  
  // Add this function to handle successful image loads
  const handleImageLoad = () => {
    console.log("Image loaded successfully in popup");
    setImageLoading(false);
  };

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Filter projects
  const getFilteredProjects = () => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));
  };
  
  // Get unique categories
  const categories = ['all', ...new Set(projects.map(p => p.category.toLowerCase()))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Immersive Hero Section with Tech Elements */}
      <section className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        {/* Digital circuit pattern background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M20,0 L20,100 M40,0 L40,100 M60,0 L60,100 M80,0 L80,100 M0,20 L100,20 M0,40 L100,40 M0,60 L100,60 M0,80 L100,80" 
                        stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3" />
                  <circle cx="60" cy="20" r="2" fill="currentColor" opacity="0.3" />
                  <circle cx="20" cy="60" r="2" fill="currentColor" opacity="0.3" />
                  <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        </div>
        
        {/* Animated gradient blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full filter blur-3xl"></div>
        
        {/* Binary code animation in background - Fixed using static values */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
          {/* Using static positions and binary values to avoid hydration mismatch */}
          <div className="absolute text-xs md:text-sm font-mono top-[15%] left-[10%] opacity-[0.6]">010</div>
          <div className="absolute text-xs md:text-sm font-mono top-[25%] left-[30%] opacity-[0.7]">101</div>
          <div className="absolute text-xs md:text-sm font-mono top-[35%] left-[70%] opacity-[0.5]">110</div>
          <div className="absolute text-xs md:text-sm font-mono top-[45%] left-[20%] opacity-[0.8]">001</div>
          <div className="absolute text-xs md:text-sm font-mono top-[55%] left-[50%] opacity-[0.7]">111</div>
          <div className="absolute text-xs md:text-sm font-mono top-[65%] left-[80%] opacity-[0.6]">100</div>
          <div className="absolute text-xs md:text-sm font-mono top-[75%] left-[40%] opacity-[0.5]">010</div>
          <div className="absolute text-xs md:text-sm font-mono top-[85%] left-[60%] opacity-[0.7]">101</div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity: headerOpacity }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300 flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
                Project Portfolio
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              Creative Showcase
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Where Creativity Meets Strategy - My Journy Through UI/UX Design
            </p>
            
            <motion.div 
              className="mt-12 flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === category 
                      ? 'bg-indigo-600 text-white shadow-md dark:bg-indigo-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toLowerCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Projects Grid */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {getFilteredProjects().map((project, index) => (
              <motion.div 
                key={project.id}
                className="group"
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 70,
                      damping: 15
                    }
                  }
                }}
              >
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800">
                  {/* Project category badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-700 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Project image with hover effect - Clickable to open popup */}
                  <div 
                    className="h-64 sm:h-72 relative overflow-hidden cursor-pointer group" 
                    onClick={() => openImagePopup(project)}
                  >
                    {/* Image container with proper Next.js Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index === 0}
                        onError={(e) => {
                          // If the image fails to load, show the fallback within the same component
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.parentElement) {
                            target.parentElement.classList.add('image-error');
                          }
                        }}
                      />
                      
                      {/* Fallback for image loading errors */}
                      <div className="hidden image-error:flex absolute inset-0 bg-gray-100 dark:bg-gray-800 items-center justify-center">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          <div className="mb-3 mx-auto">
                            {project.category === 'Mobile App' ? (
                              <FiSmartphone className="w-12 h-12 mx-auto text-indigo-500/70 dark:text-indigo-400/70" />
                            ) : project.category === 'Web Development' ? (
                              <FiCode className="w-12 h-12 mx-auto text-indigo-500/70 dark:text-indigo-400/70" />
                            ) : (
                              <FiLayers className="w-12 h-12 mx-auto text-indigo-500/70 dark:text-indigo-400/70" />
                            )}
                          </div>
                          <p className="text-sm font-mefdium">{project.title}</p>
                          <p className="text-xs mt-1">Image unavailable</p>
                        </div>
                      </div>
                      
                      {/* Gradient overlay and view indicator */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6">
                        <span className="text-white font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 3 0 11-6 0 3 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Larger
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400">{project.year}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-5 mb-4">{project.description}</p>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-xs flex items-center gap-1"
                        >
                          {tech.icon}
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    
                    {/* Key highlights */}
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                      {project.highlights.slice(0, 5).map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-indigo-500 dark:text-indigo-400">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      {/* <section className="py-20 px-4 md:px-6 relative overflow-hidden">
        {/* Tech-inspired background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-700 dark:to-violet-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)' }}></div> */}
            {/* Fixed background blobs with static positions instead of random */}
            {/* <div className="absolute bg-white/10 rounded-full w-[250px] h-[250px] top-[10%] left-[20%] opacity-[0.3] blur-[40px]"></div>
            <div className="absolute bg-white/10 rounded-full w-[200px] h-[200px] top-[30%] left-[70%] opacity-[0.4] blur-[40px]"></div>
            <div className="absolute bg-white/10 rounded-full w-[300px] h-[300px] top-[60%] left-[10%] opacity-[0.35] blur-[40px]"></div>
            <div className="absolute bg-white/10 rounded-full w-[180px] h-[180px] top-[70%] left-[60%] opacity-[0.45] blur-[40px]"></div>
            <div className="absolute bg-white/10 rounded-full w-[220px] h-[220px] top-[40%] left-[40%] opacity-[0.25] blur-[40px]"></div>
          </div>
        </div> 
         */}
        {/* <div className="container mx-auto max-w-6xl relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
                <p className="text-indigo-100 mb-6 leading-relaxed">
                  I'm passionate about creating innovative solutions and always looking for exciting new projects and collaborations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact"
                    className="px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center"
                  >
                    Let's Connect
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div> */}
{/*               
              <div className="hidden md:block">
                <motion.div 
                  className="relative h-72 p-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Code editor styled box */}
                  {/* <div className="absolute inset-0 rounded-xl overflow-hidden bg-gray-900 border border-indigo-500/30 shadow-2xl">
                    {/* Code editor header */}
                    {/* <div className="bg-gray-800 p-2 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-4 text-sm text-gray-400 font-mono">collaboration.tsx</div>
                    </div> */}
                    
                    {/* Code content */}
                    {/* <div className="p-4 font-mono text-xs md:text-sm text-left">
                      <div className="text-blue-400">function <span className="text-green-400">startProject</span>&#40;<span className="text-yellow-400">idea</span>: string&#41; &#123;</div>
                      <div className="pl-4 text-gray-300">// Let's build something great together</div>
                      <div className="pl-4 text-purple-400">const <span className="text-indigo-300">collaboration</span> = <span className="text-green-400">new</span> Project&#40;&#41;;</div>
                      <div className="pl-4 text-gray-300">...</div>
                      <div className="pl-4 text-purple-400">collaboration.<span className="text-blue-400">addTechnology</span>&#40;<span className="text-orange-400">'React'</span>&#41;;</div>
                      <div className="pl-4 text-purple-400">collaboration.<span className="text-blue-400">addTechnology</span>&#40;<span className="text-orange-400">'Next.js'</span>&#41;;</div>
                      <div className="pl-4 text-purple-400">collaboration.<span className="text-blue-400">addTechnology</span>&#40;<span className="text-orange-400">'Tailwind CSS'</span>&#41;;</div>
                      <div className="pl-4 text-gray-300">...</div>
                      <div className="pl-4 text-indigo-400">return</div>
                      <div className="pl-8 text-indigo-300">&#123; <span className="text-red-400">success:</span> <span className="text-green-400">true</span> &#125;;</div>
                      <div className="text-blue-400">&#125;</div>
                    </div>
                  </div>
                </motion.div> */}
              {/* </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Enhanced Fullscreen Image Popup with Better Error Handling */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-sm"
          onClick={closeImagePopup}
        >
          <div 
            className="relative w-full max-w-7xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the container
          >
            {/* Close button - more visible on mobile */}
            <button 
              onClick={closeImagePopup}
              className="absolute top-3 right-3 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors duration-200 sm:top-4 sm:right-4"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Project title with better visibility */}
            <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded text-white sm:top-4 sm:left-4 text-sm sm:text-base">
              {selectedTitle}
            </div>
            
            {/* Image container - responsive for mobile */}
            <div className="relative flex-1 w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
              {/* Fallback loading state */}
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Error state */}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                  <div className="text-center text-gray-400">
                    <div className="mb-4">
                      {selectedTitle.includes('Mobile App') ? (
                        <FiSmartphone className="w-16 h-16 mx-auto text-indigo-500/50" />
                      ) : selectedTitle.includes('Web') ? (
                        <FiCode className="w-16 h-16 mx-auto text-indigo-500/50" />
                      ) : (
                        <FiLayers className="w-16 h-16 mx-auto text-indigo-500/50" />
                      )}
                    </div>
                    <h3 className="text-xl font-medium mb-1">Image Not Available</h3>
                    <p className="text-sm text-gray-500">We couldn't load the image for {selectedTitle}</p>
                  </div>
                </div>
              )}
              
              {/* Actual image with better handling */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  className={`max-h-full max-w-full object-contain ${imageError ? 'hidden' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
              
              {/* Mobile swipe hint indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-xs sm:hidden">
                Pinch to zoom • Swipe to dismiss
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

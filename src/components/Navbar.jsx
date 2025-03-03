import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import DecryptedText from './NavDecryptAnim';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // Variants for the sliding menu (slides in from the right)
  const menuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
  };

  // Variants for each link (staggered appearance)
  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="navbar">
      
      {/* Always visible hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <motion.div 
          className="bar"
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div 
          className="bar"
          animate={isOpen ? { rotate: -45, y: -12, width: 25 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Sliding dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            className="navbar-links"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.li variants={linkVariants} transition={{ delay: 0.1 }}>
              <a href="recents.jsx" onClick={toggleMenu}><DecryptedText text="Recents" /></a>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.2 }}>
              <a href="#about" onClick={toggleMenu}><DecryptedText text="Services" /></a>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.3 }}>
              <a href="#services" onClick={toggleMenu}><DecryptedText text="Contact" /></a>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.4 }}>
              <a href="#contact" onClick={toggleMenu}><DecryptedText text="olatubosun" /></a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
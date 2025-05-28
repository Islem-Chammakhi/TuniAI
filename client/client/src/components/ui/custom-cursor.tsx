import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  children: React.ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateLinkHovered = () => {
      const hoveredElements = document.querySelectorAll(":hover");
      const isLinkHovered = Array.from(hoveredElements).some(
        (el) => el.tagName === "A" || el.tagName === "BUTTON" || 
        el.classList.contains("hover-card") || 
        el.classList.contains("cursor-pointer")
      );
      setLinkHovered(isLinkHovered);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    document.addEventListener("mousemove", (e) => {
      updatePosition(e);
      updateLinkHovered();
    });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Only show custom cursor on non-touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
    } else {
      document.body.style.cursor = 'none';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {children}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.7 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.5
        }}
      >
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full" />
          {linkHovered && (
            <motion.div 
              className="absolute -top-4 -left-4 w-8 h-8 border-2 border-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>
    </>
  );
}

import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface DragScrollContainerProps {
  children: ReactNode;
  className?: string;
  initialScrollPosition?: 'start' | 'center' | 'end';
}

export function DragScrollContainer({ 
  children, 
  className = '',
  initialScrollPosition = 'start' 
}: DragScrollContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Set initial scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Wait for content to render
    setTimeout(() => {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      if (initialScrollPosition === 'center') {
        container.scrollLeft = (scrollWidth - clientWidth) / 2;
      } else if (initialScrollPosition === 'end') {
        container.scrollLeft = scrollWidth - clientWidth;
      }
      // 'start' is default (0)
    }, 100);
  }, [initialScrollPosition]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Change cursor
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = '';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab';
        scrollContainerRef.current.style.userSelect = '';
      }
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`overflow-x-auto overflow-y-hidden ${className}`}
      style={{
        cursor: 'grab',
        scrollBehavior: isDragging ? 'auto' : 'smooth',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

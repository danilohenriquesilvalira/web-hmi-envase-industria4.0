import React, { useState, useEffect, useRef } from 'react';

interface DraggableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const DraggableDialog: React.FC<DraggableDialogProps> = ({
  isOpen,
  onClose,
  title,
  width = 720,
  height = 480,
  children
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - (width / 2), y: 120 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - width, prev.x + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 100, prev.y + dy))
      }));
      
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isOpen, width]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={dialogRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.05)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${width}px`,
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: `${height}px`,
        }}
      >
        {/* Header/Drag handle */}
        <div
          style={{
            padding: '12px 16px',
            background: '#2563eb',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'move',
            userSelect: 'none'
          }}
          onMouseDown={handleMouseDown}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
            </svg>
            {title}
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div 
          style={{
            padding: '16px',
            overflow: 'auto',
            maxHeight: 'calc(100% - 48px)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DraggableDialog;
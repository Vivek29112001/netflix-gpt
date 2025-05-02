import React, { useRef } from 'react';

const DragScrollContainer = ({ children }) => {
  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    containerRef.current.classList.add('cursor-grabbing');
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown = false;
    containerRef.current.classList.remove('cursor-grabbing');
  };

  const onMouseUp = () => {
    isDown = false;
    containerRef.current.classList.remove('cursor-grabbing');
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-scroll hide-scrollbar select-none"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
};

export default DragScrollContainer;
import React from 'react';

/**
 * TrainAnimation Component
 * Replicates the professional moving check/parallax background pattern
 * with 3D perspective and subtle infinite scrolling animation.
 */
function TrainAnimation() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#f8fafc'
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes subtleVerticalScroll {
          0% { background-position: 0px 0px; }
          100% { background-position: 0px 80px; }
        }
        .parallax-pattern-bg {
          position: absolute;
          top: -100px;
          left: -100px;
          width: 120%;
          height: 120%;
          background-image:
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
          background-size: 80px 80px;
          transform: perspective(300px) rotateX(15deg);
          transform-origin: center top;
          animation: subtleVerticalScroll 8s linear infinite;
        }
        .parallax-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #f8fafc 0%, #f8fafc 40%, transparent 100%);
          z-index: 1;
        }
      `}</style>
      <div className="parallax-pattern-bg"></div>
      <div className="parallax-overlay"></div>
    </div>
  );
}

export default TrainAnimation;

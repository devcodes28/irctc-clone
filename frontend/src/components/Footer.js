import React from 'react';

/**
 * Standardized Footer Component
 * Consistent across all pages, maintaining exact branding colors & layout.
 */
function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#071936' }}
      className="text-white pt-10 pb-6 border-t-4 border-irctc-orange relative z-30 w-full shadow-xl shrink-0 mt-auto"
    >
      <div className="max-w-300 mx-auto px-4 md:px-8 text-center text-xs text-gray-300">
        <p className="font-medium">Copyright &copy; 2026 - www.irctc.co.in. All Rights Reserved</p>
        <p className="mt-1 text-gray-400 text-[11px]">Designed and Hosted by CRIS</p>
      </div>
    </footer>
  );
}

export default Footer;

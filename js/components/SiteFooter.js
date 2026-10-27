import React from "react";

export default function SiteFooter({ className }) {
  return (
    <footer
      className={className}
      style={{ backgroundColor: "#071936" }}
    >
      <div className="max-w-300 mx-auto px-4 md:px-8 text-center text-xs text-gray-300">
        <p className="font-medium">
          Copyright © 2026 - www.irctc.co.in. All Rights Reserved
        </p>
        <p className="mt-1 text-gray-400 text-[11px]">Designed and Hosted by CRIS</p>
      </div>
    </footer>
  );
}

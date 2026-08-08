document.addEventListener("DOMContentLoaded", () => {
    const trainHTML = `
    <!-- Injecting the CSS directly so we don't rely on the Tailwind compiler -->
    <style>
        @keyframes drive-train {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-150px); }
        }
        .animate-train {
            animation: drive-train 12s linear infinite;
        }
    </style>

    <div class="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0 overflow-hidden">
        <!-- The Railway Track -->
        <div class="absolute bottom-6 left-0 w-full h-1 bg-gray-300"></div>
        <div class="absolute bottom-4 left-0 w-full border-b-2 border-dashed border-gray-400 opacity-50"></div>

        <!-- The Moving Train SVG -->
        <div class="absolute bottom-6 animate-train flex items-end">
            <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scaleX(-1);">
                <path d="M140 25 H 170 Q 180 25 180 50 H 140 Z" fill="#1e40af"/>
                <rect x="20" y="20" width="125" height="30" rx="4" fill="#1e40af"/>
                <rect x="30" y="25" width="20" height="12" rx="2" fill="#bfdbfe"/>
                <rect x="60" y="25" width="20" height="12" rx="2" fill="#bfdbfe"/>
                <rect x="90" y="25" width="20" height="12" rx="2" fill="#bfdbfe"/>
                <rect x="120" y="25" width="20" height="12" rx="2" fill="#bfdbfe"/>
                <circle cx="155" cy="31" r="6" fill="#bfdbfe"/>
                <circle cx="35" cy="50" r="8" fill="#1f2937"/>
                <circle cx="70" cy="50" r="8" fill="#1f2937"/>
                <circle cx="105" cy="50" r="8" fill="#1f2937"/>
                <circle cx="150" cy="50" r="8" fill="#1f2937"/>
                <rect x="160" y="10" width="8" height="15" fill="#4b5563"/>
                <circle cx="164" cy="5" r="5" fill="#9ca3af" opacity="0.6"/>
                <circle cx="154" cy="2" r="7" fill="#9ca3af" opacity="0.4"/>
               <circle cx="140" cy="-2" r="9" fill="#9ca3af" opacity="0.2"/>
        </svg>
    </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', trainHTML);
});
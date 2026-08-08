document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the CSS for the professional parallax pattern
    const style = document.createElement('style');
    style.innerHTML = `
        /* Main container holding the moving background */
        .professional-parallax-grid {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none; /* Crucial: clicks pass through to your UI */
            z-index: -1; /* Behind all content, cards, and even your Tailwind bg */
            overflow: hidden;
            
            /* Sreedev Suresh: The base background color for the page */
            background-color: #f8fafc; /* Tailwind slade-50 (very light blue) */
        }

        /* This pseudo-element contains the moving 'check' pattern */
        .professional-parallax-grid::before {
            content: "";
            position: absolute;
            top: -100px; /* Overscan to hide edges during animation */
            left: -100px;
            width: 120%; /* wider than screen */
            height: 120%; /* taller than screen */
            
            /* Creating the 'check' pattern using gradients:
               Grid line color: Tailwind slade-200 (#e2e8f0)
            */
            background-image: 
                linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 80px 80px; /* Your requested 'check' pattern size */
            
            /* Add professional 3D perspective to simulate motion */
            transform: perspective(300px) rotateX(15deg); 
            transform-origin: center top;
            
            /* Run the vertical animation: very slow, linear infinite loop */
            animation: subtleVerticalScroll 8s linear infinite;
        }

        /* The vertical animation moves the background from top to bottom */
        @keyframes subtleVerticalScroll {
            0% { background-position: 0px 0px; }
            100% { background-position: 0px 80px; } /* Must match the tiled check height (80px) */
        }

        /* The fade effect (The Gradient Overlay) */
        .professional-parallax-grid::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            
            /* Fades from solid background color (top) to clear (bottom)
                letting the pattern shine through with high opacity at the base.
            */
            background: linear-gradient(to bottom, 
                #f8fafc 0%, 
                #f8fafc 40%, 
                transparent 100%);
            z-index: 1; /* Sits on top of the moving pattern */
        }
    `;
    document.head.appendChild(style);

    // 2. Inject the full-screen grid container into the body
    const gridDiv = document.createElement('div');
    gridDiv.className = 'professional-parallax-grid';
    document.body.appendChild(gridDiv);
});
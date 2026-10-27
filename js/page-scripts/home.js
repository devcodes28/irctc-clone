
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof DB_API === 'undefined') return;
            
            // 1. Check if a user is currently logged in
            const currentUser = DB_API.getCurrentUser();
            
            if (currentUser) {
                // 2. Unhide the E-wallet link
                const ewalletLink = document.getElementById('navEwallet');
                if (ewalletLink) {
                    ewalletLink.classList.remove('hidden');
                    ewalletLink.classList.add('flex');
                }
                
                // 3. Find the "Login / Register" button and transform it into a "Logout" button
                const buttons = document.querySelectorAll('button');
                buttons.forEach(btn => {
                    if (btn.textContent.includes('Login')) {
                        btn.textContent = 'Logout';
                        
                        // Change colors from orange to red to match our design system
                        btn.classList.remove('bg-irctc-orange', 'hover:bg-orange-600');
                        btn.classList.add('bg-red-500', 'hover:bg-red-600');
                        
                        // Override the click action to log the user out instead of going to login.html
                        btn.onclick = (e) => {
                            e.preventDefault();
                            DB_API.logoutUser();
                        };
                    }
                });
            }
        });
    

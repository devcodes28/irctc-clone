
        const form = document.getElementById('loginForm');
        const loginId = document.getElementById('loginId');
        const password = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');

        toggleBtn.addEventListener('click', function () {
            const isHidden = password.type === 'password';
            password.type = isHidden ? 'text' : 'password';
            toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
        });

form.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            const idVal = loginId.value.trim();
            const passVal = password.value;

            if (idVal.length < 3 || passVal.length < 6) {
                alert('Please enter valid login details.');
                return;
            }

            try {
                // Added 'await' to pause and wait for the backend response
                const auth = await DB_API.loginUser(idVal, passVal);
                
                if (auth && auth.success) {
                    form.reset();
                    
                    // Check if admin login
                    if (auth.isAdmin || idVal.toLowerCase() === 'admin@irctc.co.in') {
                        localStorage.setItem('is_admin', 'true');
                        window.location.href = 'admin-dashboard.html';
                        return;
                    }

                    // Check if they were interrupted while trying to book a ticket
                    if (localStorage.getItem('redirect_to_booking') === 'true') {
                        localStorage.removeItem('redirect_to_booking'); 
                        window.location.href = 'booking.html'; 
                    } else {
                        window.location.href = 'dashboard.html'; 
                    }

                } else {
                    // Alert the specific error message from the backend (e.g., "Incorrect password")
                    alert(auth?.message || "Login failed."); 
                }
            } catch (error) {
                alert("Server connection failed. Is your backend running?");
                console.error(error);
            }
        });
    

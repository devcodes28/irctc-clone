
        document.getElementById('loginBtn').addEventListener('click', () => {
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;

            // Hardcoded admin credentials
            if (user === 'admin' && pass === 'admin123') {
                localStorage.setItem('irctc_admin_auth', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                document.getElementById('errorMsg').classList.remove('hidden');
            }
        });
    

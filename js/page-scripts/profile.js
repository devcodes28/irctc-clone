
        document.addEventListener('DOMContentLoaded', async () => {
            const currentUser = DB_API.getCurrentUser();
            
            if (!currentUser) {
                alert('Please login to view your profile.');
                window.location.href = 'login.html';
                return;
            }

            const userId = currentUser._id || currentUser.id;

            // Fetch live user profile and live wallet balance directly from MongoDB
            try {
                const res = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await res.json();
                if (data.success && data.user) {
                    localStorage.setItem('current_user', JSON.stringify(data.user));
                    Object.assign(currentUser, data.user);
                }
            } catch (err) {
                console.error("Failed to sync profile from DB:", err);
            }

            // Populate header banner details
            const fullName = currentUser.fullName || 'User';
            document.getElementById('userNameDisplay').textContent = fullName;
            document.getElementById('userIdDisplay').textContent = `IRCTC User ID: ${currentUser.username || currentUser._id || currentUser.id || 'N/A'}`;
            
            const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            document.getElementById('userAvatar').textContent = initials || 'U';

            // Populate live wallet balance
            const bal = (currentUser.walletBalance !== undefined && !isNaN(currentUser.walletBalance))
                ? Number(currentUser.walletBalance)
                : 5000.00;
            const profileWalletEl = document.getElementById('profileWalletBal');
            if (profileWalletEl) {
                profileWalletEl.textContent = `₹${bal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }

            // Populate form fields with real database data
            document.getElementById('p_fullName').value = fullName;
            document.getElementById('p_email').value = currentUser.email || '';
            document.getElementById('p_mobile').value = currentUser.mobile || '';
            
            const dobInput = document.getElementById('p_dob');
            if (dobInput && currentUser.dob) {
                dobInput.value = currentUser.dob.split('T')[0];
            }


            // Handle Profile Update Submission
            const profileForm = document.getElementById('profileForm');
            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const updatedData = {
                    fullName: document.getElementById('p_fullName').value.trim(),
                    email: document.getElementById('p_email').value.trim(),
                    mobile: document.getElementById('p_mobile').value.trim(),
                    dob: document.getElementById('p_dob').value
                };

                const userId = currentUser._id || currentUser.id;
                const result = await DB_API.updateProfile(userId, updatedData);

                if (result && result.success) {
                    alert('Profile updated successfully!');
                    location.reload();
                } else {
                    alert(result?.message || 'Failed to update profile.');
                }
            });
        });
    

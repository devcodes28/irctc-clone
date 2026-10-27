
        function setAmount(amount) {
            document.getElementById('topupAmount').value = amount;
        }

        document.addEventListener('DOMContentLoaded', async () => {
            // 1. AUTH GUARD
            const currentUser = DB_API.getCurrentUser();
            if (!currentUser) {
                alert('Please login to access your E-Wallet.');
                window.location.href = 'login.html';
                return;
            }

            const userId = currentUser._id || currentUser.id;
            const balanceEl = document.getElementById('displayBalance');

            // 2. Auto-Refresh Wallet Balance from MongoDB Database on Load
            try {
                const res = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await res.json();
                if (data.success && data.user) {
                    localStorage.setItem('current_user', JSON.stringify(data.user));
                    currentUser.walletBalance = data.user.walletBalance;
                }
            } catch (e) {
                console.error("Error fetching live wallet balance:", e);
            }

            // 3. Display Initial / Refreshed Balance
            const balance = currentUser.walletBalance !== undefined ? currentUser.walletBalance : 0;
            balanceEl.textContent = `₹${balance.toFixed(2)}`;

            // 4. Handle Logout
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                DB_API.logoutUser();
            });

            // 5. Handle Top-up Form Submission
            const form = document.getElementById('topupForm');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const amountInput = document.getElementById('topupAmount').value;
                const amount = parseFloat(amountInput);

                if (isNaN(amount) || amount <= 0) {
                    alert('Please enter a valid amount greater than 0.');
                    return;
                }

                const result = await DB_API.addWalletFunds(userId, amount);
                
                if (result && result.success) {
                    alert(`Successfully added ₹${amount.toFixed(2)} to your wallet!`);
                    balanceEl.textContent = `₹${result.newBalance.toFixed(2)}`;
                    form.reset();
                } else {
                    alert(result?.message || 'Error adding funds. Please try again.');
                }
            });
        });
    

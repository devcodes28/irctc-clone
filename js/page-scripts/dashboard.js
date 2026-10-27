
        document.addEventListener('DOMContentLoaded', async () => {
            // 1. Get logged-in user from active session
            const currentUser = DB_API.getCurrentUser();

            // 2. Auth Guard: If no user is logged in, send to login page
            if (!currentUser) {
                alert('Please login to access your dashboard.');
                window.location.href = 'login.html';
                return;
            }

            const userId = currentUser._id || currentUser.id;

            // 3. Auto-Refresh Wallet Balance from MongoDB Database
            try {
                const res = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await res.json();
                if (data.success && data.user) {
                    localStorage.setItem('current_user', JSON.stringify(data.user));
                    currentUser.walletBalance = data.user.walletBalance;
                }
            } catch (e) {
                console.error("Error syncing dashboard user data:", e);
            }

            // 4. Render Current User's Name & Live Balance
            document.getElementById('welcomeTitle').textContent = `Welcome back, ${currentUser.fullName.split(' ')[0]}`;
            const walletBal = currentUser.walletBalance !== undefined ? currentUser.walletBalance : 5000.00;
            document.getElementById('walletBalance').textContent = `₹${walletBal.toFixed(2)}`;

            // 5. Load their upcoming journey (if any exist)
            const upcomingBooking = await DB_API.getRecentBooking(userId);
            if (upcomingBooking) {
                const trainDetails = await DB_API.getTrainDetails(upcomingBooking.trainNumber);
                const passenger = upcomingBooking.passengers[0];
                
                const journeyCard = document.getElementById('upcomingJourneyCard');
                
                if (trainDetails) {
                    journeyCard.classList.remove('hidden'); // Show the card since we have a booking
                    
                    document.getElementById('journeyTrainInfo').textContent = `${trainDetails.trainNumber} · ${trainDetails.trainName}`;
                    document.getElementById('journeyRoute').textContent = `${trainDetails.originName} → ${trainDetails.destinationName}`;
                    document.getElementById('journeyDetails').innerHTML = `Date: <strong>${upcomingBooking.travelDate}</strong> | Coach: <strong>${passenger.coach}</strong> | Seat: <strong>${passenger.berth}</strong>`;
                    
                    document.getElementById('viewTicketBtn').onclick = () => {
                        window.location.href = `ticket.html?pnr=${upcomingBooking.pnr}`;
                    };
                }
            }

            // 6. Wire up the Logout Button
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    DB_API.logoutUser();
                });
            }
        });
    

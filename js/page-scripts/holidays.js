
        let currentPackagePrice = 0;
        let currentPackageName = "";

        // 1. Open Modal Function
        function openBookingModal(packageName, basePrice) {
            if (typeof DB_API === 'undefined') return;
            
            const currentUser = DB_API.getCurrentUser();
            
            // Auth Check
            if (!currentUser) {
                alert("Please login to book a holiday package.");
                window.location.href = 'login.html';
                return;
            }

            // Set variables
            currentPackageName = packageName;
            currentPackagePrice = basePrice;

            // Populate Modal Data
            document.getElementById('modalPackageName').textContent = packageName;
            document.getElementById('modalBasePrice').textContent = `₹${basePrice.toLocaleString('en-IN')}`;
            document.getElementById('h_email').value = currentUser.email;
            document.getElementById('modalWalletBalance').textContent = `Bal: ₹${currentUser.walletBalance.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
            
            // Reset form and update total
            document.getElementById('h_travelers').value = 1;
            document.getElementById('h_date').value = "";
            document.querySelector('input[name="paymentMode"][value="ewallet"]').checked = true;
            updateTotal();

            // Show Modal
            const modal = document.getElementById('bookingModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        // 2. Close Modal Function
        function closeBookingModal() {
            const modal = document.getElementById('bookingModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // 3. Update Total Calculation
        function updateTotal() {
            const travelers = parseInt(document.getElementById('h_travelers').value) || 1;
            const total = travelers * currentPackagePrice;
            document.getElementById('modalTotalCost').textContent = `₹${total.toLocaleString('en-IN')}`;
        }

        // 4. Submit Booking and Handle Payment Mode
        async function submitHolidayBooking() {
            const date = document.getElementById('h_date').value;
            const travelers = parseInt(document.getElementById('h_travelers').value);

            if (!date) {
                alert("Please select a travel date.");
                return;
            }

            const currentUser = DB_API.getCurrentUser();
            const totalCost = travelers * currentPackagePrice;
            const paymentMode = document.querySelector('input[name="paymentMode"]:checked').value;

            if (paymentMode === 'ewallet' && currentUser.walletBalance < totalCost) {
                alert(`Insufficient E-Wallet Balance!\n\nPackage Cost: ₹${totalCost.toLocaleString('en-IN')}\nYour Balance: ₹${currentUser.walletBalance.toLocaleString('en-IN')}\n\nPlease top up your E-Wallet to proceed.`);
                window.location.href = 'e-wallet.html';
                return;
            }

            // Create a mock train booking format for the holiday package
            const holidayBookingData = {
                trainNumber: "HOLIDAY-01",
                travelDate: date,
                passengers: [{ name: currentUser.fullName, age: 20, gender: "Other", berthPreference: "Standard", status: "Confirmed", coach: "PKG", berth: 1 }],
                fareDetails: { totalFare: totalCost },
                bookingStatus: "Confirmed"
            };

            const result = await DB_API.saveBooking(holidayBookingData, currentUser._id || currentUser.id, paymentMode);

            if (result && result.success) {
                alert(`HOLIDAY BOOKED SUCCESSFULLY!\n\nPackage: ${currentPackageName}\nTravelers: ${travelers}\nDate: ${date}\nAmount Paid: ₹${totalCost.toLocaleString('en-IN')}`);
                closeBookingModal();
                location.reload(); 
            } else {
                alert(result?.message || "Booking failed.");
            }
        }
    

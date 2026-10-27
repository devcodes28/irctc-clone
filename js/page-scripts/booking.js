
        let selectedTrain = null;
        let selectedClassObj = null;
        let searchContext = null;

        const CLASS_NAMES = {
            'SL': 'Sleeper (SL)',
            '3A': 'AC 3 Tier (3A)',
            '2A': 'AC 2 Tier (2A)',
            '1A': 'AC First Class (1A)'
        };

        function switchClass(newClassType) {
            if (!selectedTrain || !selectedTrain.availableClasses) return;
            const found = selectedTrain.availableClasses.find(c => c.classType === newClassType);
            if (!found) return;
            selectedClassObj = found;
            localStorage.setItem('selected_class_type', found.classType);
            renderTrainSummary();
            updateTotalFare();
        }

        function renderTrainSummary() {
            if (!selectedTrain || !selectedClassObj) return;

            const classOptionsHtml = selectedTrain.availableClasses.map(c => {
                const isSelected = c.classType === selectedClassObj.classType;
                return `
                    <button type="button" onclick="switchClass('${c.classType}')" 
                        class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${isSelected 
                            ? 'bg-irctc-orange text-white shadow-sm ring-2 ring-orange-300' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}">
                        <span>${c.classType}</span>
                        <span class="text-[10px] opacity-80">(₹${c.baseFare})</span>
                    </button>
                `;
            }).join('');

            document.getElementById('trainSummaryCard').innerHTML = `
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span class="text-xs font-bold text-irctc-orange uppercase tracking-wider">${selectedTrain.trainNumber} - ${selectedTrain.trainName}</span>
                        <h3 class="text-xl font-bold text-gray-900 mt-1">${searchContext.sourceName} &rarr; ${searchContext.destName}</h3>
                        <p class="text-xs text-gray-500 mt-1">Date: <strong>${searchContext.date}</strong> | Selected Class: <strong class="text-irctc-blue">${CLASS_NAMES[selectedClassObj.classType] || selectedClassObj.classType}</strong></p>
                    </div>
                    <div class="text-left sm:text-right">
                        <p class="text-xs text-gray-400 uppercase">Fare per traveler</p>
                        <p class="text-2xl font-black text-irctc-blue">₹${selectedClassObj.baseFare.toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    <span class="text-xs font-bold text-gray-600 mr-1">Choose Class:</span>
                    ${classOptionsHtml}
                </div>
            `;
        }

        document.addEventListener('DOMContentLoaded', async () => {
            if (typeof DB_API === 'undefined') return;

            const currentUser = DB_API.getCurrentUser();
            if (!currentUser) {
                alert("Please login to proceed with booking.");
                localStorage.setItem('redirect_to_booking', 'true');
                window.location.href = 'login.html';
                return;
            }

            const userId = currentUser._id || currentUser.id;

            // Fetch live wallet balance from MongoDB database
            try {
                const userRes = await fetch(`http://localhost:5000/api/users/${userId}`);
                const userData = await userRes.json();
                if (userData.success && userData.user) {
                    localStorage.setItem('current_user', JSON.stringify(userData.user));
                    Object.assign(currentUser, userData.user);
                }
            } catch (err) {
                console.error("Failed to sync live wallet:", err);
            }

            const walletBal = (currentUser.walletBalance !== undefined && !isNaN(currentUser.walletBalance))
                ? Number(currentUser.walletBalance)
                : 5000.00;
            document.getElementById('displayWalletBal').textContent = `₹${walletBal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;

            searchContext = JSON.parse(localStorage.getItem('last_search'));
            let trainNum = localStorage.getItem('selected_train_num') || localStorage.getItem('selected_train');
            let classType = localStorage.getItem('selected_class_type') || "SL";

            if (!searchContext || !trainNum) {
                // Fallback
                searchContext = { sourceCode: "TVC", sourceName: "Trivandrum", destCode: "NDLS", destName: "New Delhi", date: "2026-08-15" };
                trainNum = "12625"; 
                classType = "SL";
            }

            selectedTrain = await DB_API.getTrainDetails(trainNum);
            if (!selectedTrain) {
                alert("Train details not found.");
                window.location.href = 'TrainSearch.html';
                return;
            }

            selectedClassObj = selectedTrain.availableClasses.find(c => c.classType === classType) || selectedTrain.availableClasses[0];

            renderTrainSummary();
            updateTotalFare();
        });

        // 1. Add Passenger Row
        function addPassengerRow() {
            const container = document.getElementById('passengerContainer');
            const rowCount = container.getElementsByClassName('passenger-row').length;

            if (rowCount >= 6) {
                alert("You can book a maximum of 6 passengers in a single transaction.");
                return;
            }

            const newRow = document.createElement('div');
            newRow.className = "passenger-row grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 relative";
            newRow.innerHTML = `
                <div class="sm:col-span-5">
                    <label class="block text-[11px] font-semibold text-gray-600 mb-1">Full Name</label>
                    <input type="text" required name="p_name" placeholder="Passenger Name" class="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-[11px] font-semibold text-gray-600 mb-1">Age</label>
                    <input type="number" required name="p_age" min="1" max="100" placeholder="Age" class="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-[11px] font-semibold text-gray-600 mb-1">Gender</label>
                    <select name="p_gender" class="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="sm:col-span-3">
                    <label class="block text-[11px] font-semibold text-gray-600 mb-1">Berth Preference</label>
                    <div class="flex items-center gap-2">
                        <select name="p_berth" class="w-full border border-gray-300 rounded p-2 text-sm bg-white outline-none">
                            <option value="No Preference">No Preference</option>
                            <option value="Lower">Lower</option>
                            <option value="Middle">Middle</option>
                            <option value="Upper">Upper</option>
                            <option value="Side Lower">Side Lower</option>
                        </select>
                        <button type="button" onclick="removePassengerRow(this)" class="text-gray-400 hover:text-red-500 font-bold px-2 py-1 remove-btn">✕</button>
                    </div>
                </div>
            `;
            container.appendChild(newRow);
            updateRemoveButtons();
            updateTotalFare();
        }

        // 2. Remove Passenger Row
        function removePassengerRow(button) {
            const row = button.closest('.passenger-row');
            if (row) {
                row.remove();
                updateRemoveButtons();
                updateTotalFare();
            }
        }

        function updateRemoveButtons() {
            const rows = document.getElementsByClassName('passenger-row');
            for (let i = 0; i < rows.length; i++) {
                const btn = rows[i].querySelector('.remove-btn');
                if (btn) {
                    if (rows.length > 1) {
                        btn.classList.remove('hidden');
                    } else {
                        btn.classList.add('hidden');
                    }
                }
            }
        }

        // 3. Update Total Fare dynamically
        function updateTotalFare() {
            const count = document.getElementsByClassName('passenger-row').length;
            const farePerTicket = selectedClassObj ? selectedClassObj.baseFare : 500;
            const total = count * farePerTicket;
            document.getElementById('displayTotalFare').textContent = `₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
        }

        // 4. Handle Booking Submission & DB Storage
        async function handleBookingSubmission(e) {
            e.preventDefault();

            const currentUser = DB_API.getCurrentUser();
            const count = document.getElementsByClassName('passenger-row').length;
            const totalFare = count * selectedClassObj.baseFare;
            const paymentMode = document.querySelector('input[name="paymentMode"]:checked').value;

            const liveBalance = (currentUser.walletBalance !== undefined && !isNaN(currentUser.walletBalance)) 
                ? Number(currentUser.walletBalance) 
                : 5000.00;

            if (paymentMode === 'ewallet' && liveBalance < totalFare) {
                alert(`Insufficient E-Wallet Balance!\n\nRequired: ₹${totalFare.toLocaleString('en-IN')}\nYour Balance: ₹${liveBalance.toLocaleString('en-IN')}\nPlease top up your wallet.`);
                window.location.href = 'e-wallet.html';
                return;
            }

            const coachPrefixMap = {
                'SL': 'S',
                '3A': 'B',
                '2A': 'A',
                '1A': 'H'
            };
            const prefix = coachPrefixMap[selectedClassObj.classType] || 'S';
            const coachNum = Math.floor(Math.random() * 4) + 1;
            const coachCode = `${prefix}${coachNum}`;

            const passengers = [];
            const rows = document.getElementsByClassName('passenger-row');
            for (let row of rows) {
                passengers.push({
                    name: row.querySelector('input[name="p_name"]').value.trim(),
                    age: parseInt(row.querySelector('input[name="p_age"]').value),
                    gender: row.querySelector('select[name="p_gender"]').value,
                    berthPreference: row.querySelector('select[name="p_berth"]').value,
                    status: "CNF",
                    coach: coachCode,
                    berth: Math.floor(Math.random() * 60) + 1
                });
            }

            const bookingData = {
                trainNumber: selectedTrain.trainNumber,
                travelDate: searchContext.date,
                passengers: passengers,
                fareDetails: { totalFare: totalFare },
                classType: selectedClassObj.classType,
                bookingStatus: "Confirmed"
            };

            const userId = currentUser._id || currentUser.id;

            try {
                // Sends data safely to Express Backend
                const result = await DB_API.saveBooking(bookingData, userId, paymentMode);
                
                if (result.success) {
                    alert(`TICKET BOOKED SUCCESSFULLY!\n\nPNR: ${result.booking?.pnr || 'Generated'}\nClass: ${selectedClassObj.classType}\nPassengers: ${passengers.length}\nTotal Amount Paid: ₹${totalFare.toLocaleString('en-IN')}`);
                    window.location.href = `ticket.html?pnr=${result.booking?.pnr}`;
                } else {
                    alert(result.message || "Failed to book ticket.");
                }
            } catch (error) {
                alert("Server connection failed.");
                console.error(error);
            }
        }
    


        // Modal Handlers
        function openPnrModal() {
            document.getElementById('pnrModal').classList.remove('hidden');
            document.getElementById('pnrModal').classList.add('flex');
        }
        async function openScheduleModal() {
            document.getElementById('scheduleModal').classList.remove('hidden');
            document.getElementById('scheduleModal').classList.add('flex');
            await loadScheduleTrains();
        }
        function closeModals() {
            document.getElementById('pnrModal').classList.add('hidden');
            document.getElementById('pnrModal').classList.remove('flex');
            document.getElementById('scheduleModal').classList.add('hidden');
            document.getElementById('scheduleModal').classList.remove('flex');
            document.getElementById('pnrResult').innerHTML = '';
            document.getElementById('scheduleResult').innerHTML = '';
        }

        // Dynamically load all trains into the schedule dropdown
        async function loadScheduleTrains() {
            const select = document.getElementById('scheduleTrainSelect');
            try {
                const response = await fetch('http://localhost:5000/api/admin/trains');
                const data = await response.json();
                if (data.success && data.trains && data.trains.length > 0) {
                    select.innerHTML = '<option value="">Select Train...</option>';
                    data.trains.forEach(t => {
                        const opt = document.createElement('option');
                        opt.value = t.trainNumber;
                        opt.textContent = `${t.trainNumber} - ${t.trainName}`;
                        select.appendChild(opt);
                    });
                } else {
                    select.innerHTML = '<option value="">No trains found in database</option>';
                }
            } catch (err) {
                console.error('Failed to load trains for schedule:', err);
                select.innerHTML = '<option value="">Error loading trains</option>';
            }
        }

        // PNR Check Logic using DB_API (async)
        async function checkPnrStatus() {
            const pnr = document.getElementById('pnrInput').value.trim();
            const resultBox = document.getElementById('pnrResult');
            
            if (!pnr) {
                alert("Please enter a PNR number.");
                return;
            }

            resultBox.innerHTML = `<div class="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded animate-pulse">Searching for PNR ${pnr}...</div>`;

            const booking = await DB_API.getBookingByPNR(pnr);
            if (!booking) {
                resultBox.innerHTML = `<div class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">❌ No booking found for PNR: <strong>${pnr}</strong>. Please check the number and try again.</div>`;
                return;
            }

            const train = await DB_API.getTrainDetails(booking.trainNumber);
            const passengers = booking.passengers || [];
            const pass = passengers[0] || {};

            const trainName = train ? `${train.trainNumber} - ${train.trainName}` : booking.trainNumber;
            const origin = train ? `${train.originName} (${train.originCode})` : '—';
            const dest = train ? `${train.destinationName} (${train.destinationCode})` : '—';
            
            const passengerRows = passengers.map((p, i) => `
                <tr class="border-t border-green-200">
                    <td class="py-1 pr-3">${i + 1}. ${p.name || '—'}</td>
                    <td class="py-1 pr-3">${p.age || '—'}Y / ${p.gender ? p.gender[0].toUpperCase() : '—'}</td>
                    <td class="py-1 pr-3">${p.coach || '—'} / ${p.berth || '—'}</td>
                    <td class="py-1 font-semibold ${p.status === 'CAN' ? 'text-red-600' : 'text-green-700'}">${p.status || booking.bookingStatus || 'CNF'}</td>
                </tr>
            `).join('');

            resultBox.innerHTML = `
                <div class="p-4 bg-green-50 border border-green-200 rounded-lg text-xs space-y-2">
                    <div class="flex justify-between items-center">
                        <p class="font-bold text-green-900 text-sm">PNR: ${booking.pnr}</p>
                        <span class="px-2 py-0.5 rounded-full text-white text-xs font-bold ${booking.bookingStatus === 'Cancelled' ? 'bg-red-500' : 'bg-green-600'}">${booking.bookingStatus || 'Confirmed'}</span>
                    </div>
                    <p><strong>Train:</strong> ${trainName}</p>
                    <p><strong>Route:</strong> ${origin} → ${dest}</p>
                    <p><strong>Travel Date:</strong> ${booking.travelDate || '—'}</p>
                    <p><strong>Class:</strong> ${booking.classType || 'SL'} &nbsp;|&nbsp; <strong>Fare:</strong> ₹${booking.fareDetails?.totalFare || '—'}</p>
                    <div class="mt-2 pt-2 border-t border-green-200">
                        <p class="font-bold mb-1">Passengers:</p>
                        <table class="w-full text-left">
                            <thead><tr class="text-green-800"><th class="pr-3">Name</th><th class="pr-3">Age/Gen</th><th class="pr-3">Coach/Berth</th><th>Status</th></tr></thead>
                            <tbody>${passengerRows}</tbody>
                        </table>
                    </div>
                    <button onclick="window.location.href='ticket.html?pnr=${booking.pnr}'" class="mt-2 w-full bg-irctc-blue text-white py-1.5 rounded font-bold">📄 Open Full Ticket</button>
                </div>
            `;
        }

        // Train Schedule Logic using DB_API (async)
        async function viewTrainSchedule() {
            const trainNum = document.getElementById('scheduleTrainSelect').value;
            const resultBox = document.getElementById('scheduleResult');

            if (!trainNum) {
                alert("Please select a train.");
                return;
            }

            resultBox.innerHTML = `<div class="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded animate-pulse">Loading schedule for train ${trainNum}...</div>`;

            const train = await DB_API.getTrainDetails(trainNum);
            if (!train) {
                resultBox.innerHTML = `<div class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">❌ Train details not found for number: <strong>${trainNum}</strong>.</div>`;
                return;
            }

            const classRows = (train.availableClasses || []).map(c => `
                <tr class="border-t border-blue-200">
                    <td class="py-1 pr-4 font-semibold">${c.classType}</td>
                    <td class="py-1 pr-4">₹${c.baseFare}</td>
                    <td class="py-1 ${c.availableSeats > 0 ? 'text-green-700' : 'text-red-600'}">${c.availableSeats > 0 ? c.availableSeats + ' avail.' : 'Waitlist'}</td>
                </tr>
            `).join('');

            resultBox.innerHTML = `
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2">
                    <p class="font-bold text-irctc-blue text-sm">🚂 ${train.trainNumber} - ${train.trainName}</p>
                    <div class="grid grid-cols-2 gap-2 mt-1">
                        <div class="bg-white rounded p-2 border border-blue-100">
                            <p class="text-gray-400 uppercase text-xs font-semibold">Departs</p>
                            <p class="font-bold text-gray-800">${train.originName}</p>
                            <p class="text-gray-500">(${train.originCode}) at <strong>${train.departureTime}</strong></p>
                        </div>
                        <div class="bg-white rounded p-2 border border-blue-100">
                            <p class="text-gray-400 uppercase text-xs font-semibold">Arrives</p>
                            <p class="font-bold text-gray-800">${train.destinationName}</p>
                            <p class="text-gray-500">(${train.destinationCode}) at <strong>${train.arrivalTime}</strong></p>
                        </div>
                    </div>
                    <div class="mt-2 pt-2 border-t border-blue-200">
                        <p class="font-bold mb-1">Available Classes & Fares:</p>
                        <table class="w-full text-left">
                            <thead><tr class="text-blue-800"><th class="pr-4">Class</th><th class="pr-4">Base Fare</th><th>Seats</th></tr></thead>
                            <tbody>${classRows}</tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // --- DYNAMIC STATION FETCH LOGIC ---
        async function loadDynamicStations() {
            const sourceSelect = document.getElementById('sourceStation');
            const destSelect = document.getElementById('destStation');

            try {
                const response = await fetch('http://localhost:5000/api/trains/stations'); 
                const result = await response.json();

                if (result && result.success && result.stations && result.stations.length > 0) {
                    const sortedStations = result.stations.sort((a, b) => a.name.localeCompare(b.name));
                    let optionsHtml = '<option value="">Select Station...</option>';
                    sortedStations.forEach(station => {
                        optionsHtml += `<option value="${station.code}">${station.name} (${station.code})</option>`;
                    });
                    sourceSelect.innerHTML = optionsHtml;
                    destSelect.innerHTML = optionsHtml;
                } else {
                    throw new Error("No stations found in database payload");
                }
            } catch (error) {
                console.error('Failed to fetch stations from DB:', error);
                const errorOption = '<option value="">Error loading stations</option>';
                sourceSelect.innerHTML = errorOption;
                destSelect.innerHTML = errorOption;
            }
        }

        document.addEventListener('DOMContentLoaded', async () => {
            // 1. Fetch Dynamic Stations on page load
            await loadDynamicStations();

            // 2. Search Submission Logic (Migrated to MongoDB Backend Fetch)
            document.getElementById('searchTrainsBtn').addEventListener('click', async function() {
                const sourceCode = document.getElementById('sourceStation').value;
                const destCode = document.getElementById('destStation').value;
                const date = document.getElementById('travelDate').value;
                const travelClass = document.getElementById('travelClass') ? document.getElementById('travelClass').value : '';

                if (!sourceCode || !destCode || !date) {
                    alert('Please select Source, Destination, and Travel Date.');
                    return; 
                }

                if (sourceCode === destCode) {
                    alert('Source and Destination cannot be the same.');
                    return; 
                }

                try {
                    const response = await fetch('http://localhost:5000/api/admin/trains');
                    const data = await response.json();

                    if (!data.success || !data.trains) {
                        alert('Unable to connect to database for train verification.');
                        return;
                    }

                    const allTrains = data.trains;
                    const trainExists = allTrains.some(t => t.originCode === sourceCode && t.destinationCode === destCode);

                    if (!trainExists) {
                        alert(`No direct trains found between selected stations on this date. Please try another route.`);
                        return; 
                    }

                    const sourceName = document.getElementById('sourceStation').options[document.getElementById('sourceStation').selectedIndex].text;
                    const destName = document.getElementById('destStation').options[document.getElementById('destStation').selectedIndex].text;

                    localStorage.setItem('last_search', JSON.stringify({ 
                        sourceCode, sourceName, destCode, destName, date, travelClass 
                    }));
                    if (travelClass) {
                        localStorage.setItem('selected_class_type', travelClass);
                    } else {
                        localStorage.removeItem('selected_class_type');
                    }
                    
                    window.location.href = 'search-results.html';

                } catch (err) {
                    console.error("Connection error during train search:", err);
                    alert("Server error. Ensure backend is running.");
                }
            });
        });
    

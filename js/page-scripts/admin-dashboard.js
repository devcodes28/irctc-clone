
        if (localStorage.getItem('irctc_admin_auth') !== 'true') window.location.href = 'admin.html';
        function logout() { localStorage.removeItem('irctc_admin_auth'); window.location.href = 'admin.html'; }

        let bookingChartInstance = null;
        let classChartInstance = null;

        // Fetch Live Database Stats & Analytics
        async function fetchStats() {
            try {
                // Fetch basic counts
                const resStats = await fetch('http://localhost:5000/api/admin/stats');
                const dataStats = await resStats.json();
                if (dataStats.success) {
                    document.getElementById('stat-users').innerText = dataStats.stats.users;
                    document.getElementById('stat-bookings').innerText = dataStats.stats.bookings;
                    document.getElementById('stat-trains').innerText = dataStats.stats.trains;
                }

                // Fetch real analytics data for charts and ledger
                const resAnalytics = await fetch('http://localhost:5000/api/admin/analytics');
                const dataAnalytics = await resAnalytics.json();
                
                if (dataAnalytics.success) {
                    const { classDistribution, recentBookings } = dataAnalytics.analytics;
                    
                    // Update Class Demand Chart
                    updateClassChart(classDistribution);

                    // Update Recent Bookings Ledger Table
                    const tbody = document.getElementById('liveBookingsTable');
                    if (recentBookings.length > 0) {
                        tbody.innerHTML = recentBookings.map(b => `
                            <tr class="hover:bg-gray-50">
                                <td class="p-4 font-mono font-bold text-gray-800">${b.pnr || b._id.slice(-8).toUpperCase()}</td>
                                <td class="p-4 font-semibold">${b.passengerName || b.userName || 'Passenger'}</td>
                                <td class="p-4 text-xs">${b.trainNumber || 'Express Train'}</td>
                                <td class="p-4 text-right"><span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded">${b.status || 'Confirmed'}</span></td>
                            </tr>
                        `).join('');
                    } else {
                        tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-500">No bookings recorded in database yet.</td></tr>`;
                    }
                }
            } catch (err) {
                console.error("Error loading dashboard data:", err);
            }
        }

        function initCharts() {
            // Line Chart: Activity Trend
            const ctxBooking = document.getElementById('bookingChart').getContext('2d');
            bookingChartInstance = new Chart(ctxBooking, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Database Activity',
                        data: [5, 12, 8, 15, 22, 30, 25],
                        borderColor: '#0052cc',
                        backgroundColor: 'rgba(0, 82, 204, 0.05)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, grid: { borderDash: [5, 5] } }, x: { grid: { display: false } } }
                }
            });

            // Doughnut Chart: Class Demand
            const ctxClass = document.getElementById('classChart').getContext('2d');
            classChartInstance = new Chart(ctxClass, {
                type: 'doughnut',
                data: {
                    labels: ['Sleeper (SL)', '3 AC (3A)', '2 AC (2A)', '1 AC (1A)'],
                    datasets: [{
                        data: [1, 1, 1, 1], // Initial placeholder
                        backgroundColor: ['#f78d1e', '#0052cc', '#10b981', '#8b5cf6'],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 } } } }
                }
            });
        }

        function updateClassChart(newData) {
            if (classChartInstance) {
                classChartInstance.data.datasets[0].data = newData;
                classChartInstance.update();
            }
        }

        // Tab Management
        function switchTab(tab) {
            ['overview', 'trains', 'users', 'alerts'].forEach(t => {
                document.getElementById(`tab-${t}`).classList.add('hidden');
                document.getElementById(`nav-${t}`).className = "w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-irctc-orange font-semibold rounded transition";
            });
            document.getElementById(`tab-${tab}`).classList.remove('hidden');
            document.getElementById(`nav-${tab}`).className = "w-full text-left px-4 py-3 bg-blue-50 text-irctc-blue font-bold rounded border-l-4 border-irctc-blue transition";

            if (tab === 'overview') fetchStats();
            if (tab === 'trains') loadTrains();
            if (tab === 'users') loadUsers();
            if (tab === 'alerts') loadAlerts();
        }

        // ==========================
        // TRAIN, USER & ALERT LOGIC
        // ==========================
        async function loadTrains() {
            const tbody = document.getElementById('trainsTableBody');
            const res = await fetch('http://localhost:5000/api/admin/trains');
            const data = await res.json();
            if (data.success && data.trains.length > 0) {
                tbody.innerHTML = data.trains.map(t => `
                    <tr class="border-b"><td class="p-3 font-bold text-irctc-blue">${t.trainNumber}</td><td class="p-3 font-semibold">${t.trainName}</td><td class="p-3"><span class="font-bold">${t.originCode}</span> → <span class="font-bold">${t.destinationCode}</span></td><td class="p-3 text-xs text-gray-500">${t.departureTime} - ${t.arrivalTime}</td><td class="p-3 text-right"><button onclick="deleteTrain('${t._id}')" class="text-red-600 font-bold text-xs">Delete</button></td></tr>
                `).join('');
            } else tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center">No trains found.</td></tr>`;
        }

        async function deleteTrain(id) {
            if (!confirm("Delete train?")) return;
            await fetch(`http://localhost:5000/api/admin/trains/${id}`, { method: 'DELETE' });
            loadTrains();
        }

        function openTrainModal() { document.getElementById('addTrainModal').classList.remove('hidden'); }
        function closeTrainModal() { document.getElementById('addTrainModal').classList.add('hidden'); }

        document.getElementById('addTrainForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const payload = {
                trainNumber: document.getElementById('mTrainNum').value, trainName: document.getElementById('mTrainName').value, originCode: document.getElementById('mOrigCode').value.toUpperCase(), originName: document.getElementById('mOrigName').value, destinationCode: document.getElementById('mDestCode').value.toUpperCase(), destinationName: document.getElementById('mDestName').value, departureTime: document.getElementById('mDepTime').value, arrivalTime: document.getElementById('mArrTime').value
            };
            await fetch('http://localhost:5000/api/admin/trains', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            closeTrainModal(); this.reset(); loadTrains();
        });

        async function loadUsers() {
            const tbody = document.getElementById('usersTableBody');
            const res = await fetch('http://localhost:5000/api/admin/users');
            const data = await res.json();
            if (data.success && data.users.length > 0) {
                tbody.innerHTML = data.users.map(u => `
                    <tr class="border-b user-row"><td class="p-3 font-bold">${u.fullName}</td><td class="p-3">${u.email}</td><td class="p-3"><span class="px-2 py-0.5 text-xs font-bold rounded bg-blue-100 text-blue-700">${u.role || 'Passenger'}</span></td><td class="p-3 text-right"><button onclick="deleteUser('${u._id}')" class="text-red-600 font-bold text-xs">Delete</button></td></tr>
                `).join('');
            } else tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center">No users found.</td></tr>`;
        }
        
        async function deleteUser(id) {
            if (!confirm("Remove user account?")) return;
            await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: 'DELETE' });
            loadUsers();
        }
        function filterUsers() {
            const query = document.getElementById('userSearch').value.toLowerCase();
            document.querySelectorAll('.user-row').forEach(row => { row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none'; });
        }

        async function loadAlerts() {
            const tbody = document.getElementById('alertsTableBody');
            const res = await fetch('http://localhost:5000/api/admin/alerts');
            const data = await res.json();
            if (data.success && data.alerts.length > 0) {
                tbody.innerHTML = data.alerts.map(a => {
                    let colorClass = a.type === 'critical' ? 'bg-red-100 text-red-700' : (a.type === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700');
                    return `<tr class="border-b hover:bg-gray-50"><td class="p-4"><span class="px-2 py-1 text-[10px] uppercase font-bold rounded ${colorClass}">${a.type}</span></td><td class="p-4 font-medium">${a.message}</td><td class="p-4 text-right"><button onclick="deleteAlert('${a._id}')" class="text-red-600 font-bold text-xs">Delete</button></td></tr>`;
                }).join('');
            } else tbody.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-gray-500">No active broadcasts.</td></tr>`;
        }

        document.getElementById('addAlertForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const payload = { message: document.getElementById('alertMsg').value, type: document.getElementById('alertType').value };
            await fetch('http://localhost:5000/api/admin/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            this.reset(); loadAlerts();
        });

        async function deleteAlert(id) {
            if (!confirm("Delete broadcast?")) return;
            await fetch(`http://localhost:5000/api/admin/alerts/${id}`, { method: 'DELETE' });
            loadAlerts();
        }

        // Initialize on load
        document.addEventListener('DOMContentLoaded', () => {
            initCharts();
            fetchStats();
        });
    

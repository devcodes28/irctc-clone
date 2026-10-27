
        document.addEventListener('DOMContentLoaded', async () => {
            const currentUser = DB_API.getCurrentUser();
            if (!currentUser) {
                alert('Please login to view tickets.');
                window.location.href = 'login.html';
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const pnr = urlParams.get('pnr');

            if (!pnr) {
                alert('Invalid Ticket URL.');
                window.location.href = 'dashboard.html';
                return;
            }

            // Using await for both network lookups
            const booking = await DB_API.getBookingByPNR(pnr);
            if (!booking) {
                alert('Ticket not found.');
                window.location.href = 'dashboard.html';
                return;
            }

            const train = await DB_API.getTrainDetails(booking.trainNumber);

            // Render logic below (Unchanged)
            document.getElementById('t_pnr').textContent = booking.pnr;
            document.getElementById('t_trainInfo').textContent = `${train.trainNumber} / ${train.trainName}`;
            document.getElementById('t_doj').textContent = booking.travelDate;
            
            const pClass = booking.classType || (booking.passengers && booking.passengers.length > 0 ? booking.passengers[0].coach.replace(/[0-9]/g, '') : 'SL');
            document.getElementById('t_class').textContent = pClass;


            document.getElementById('t_sourceCode').textContent = train.originCode;
            document.getElementById('t_sourceName').textContent = train.originName;
            document.getElementById('t_depTime').textContent = train.departureTime;
            
            document.getElementById('t_destCode').textContent = train.destinationCode;
            document.getElementById('t_destName').textContent = train.destinationName;
            document.getElementById('t_arrTime').textContent = train.arrivalTime;

            const badge = document.getElementById('t_statusBadge');
            if (booking.bookingStatus === 'Cancelled') {
                badge.textContent = 'CANCELLED';
                badge.className = 'mt-3 inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-black uppercase tracking-wide rounded-sm border border-red-300';
            }

            const tbody = document.getElementById('t_passengers');
            tbody.innerHTML = ''; 

            booking.passengers.forEach((pass, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="px-4 py-3">${index + 1}</td>
                    <td class="px-4 py-3 font-bold text-gray-900">${pass.name}</td>
                    <td class="px-4 py-3 text-gray-600">${pass.age}</td>
                    <td class="px-4 py-3 text-gray-600">${pass.gender}</td>
                    <td class="px-4 py-3 font-semibold text-gray-900">${pass.status}</td>
                    <td class="px-4 py-3 text-right">
                        <span class="font-bold text-irctc-blue border border-blue-200 bg-blue-50 px-2 py-1 rounded">
                            ${pass.coach}, ${pass.berth} (${pass.berthPreference})
                        </span>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            const totalFare = booking.fareDetails.totalFare || 0;
            const baseFare = booking.fareDetails.baseFare || (totalFare > 35.75 ? totalFare - 35.75 : totalFare);
            
            document.getElementById('t_baseFare').textContent = `₹${baseFare.toFixed(2)}`;
            document.getElementById('t_totalFare').textContent = `₹${totalFare.toFixed(2)}`;

            const primaryPassenger = booking.passengers[0] ? booking.passengers[0].name : 'Unknown';
            const qrDataString = `PNR:${booking.pnr} | Train:${train.trainNumber} | Date:${booking.travelDate} | Name:${primaryPassenger} | Status:${booking.bookingStatus}`;
            const encodedQrData = encodeURIComponent(qrDataString);
            document.getElementById('t_qrCode').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedQrData}`;
        });
    

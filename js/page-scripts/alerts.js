
        document.addEventListener('DOMContentLoaded', async () => {
            const currentUser = DB_API.getCurrentUser();
            const container = document.getElementById('alertsContainer');
            const badge = document.getElementById('alertBadge');

            if (!currentUser) {
                container.innerHTML = `
                    <div class="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center text-yellow-800 text-sm">
                        Please <a href="login.html" class="font-bold underline text-irctc-orange">login</a> to view your account alerts.
                    </div>
                `;
                if (badge) badge.textContent = '0';
                return;
            }

            // Fetch alerts from the database via DB_API helper
            const alerts = await DB_API.getUserAlerts(currentUser._id || currentUser.id);

            if (!alerts || alerts.length === 0) {
                container.innerHTML = `
                    <div class="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                        No new alerts found at this time.
                    </div>
                `;
                if (badge) badge.textContent = '0';
                return;
            }

            // Update badge count
            if (badge) badge.textContent = alerts.length;

            // Render alerts dynamically
            container.innerHTML = alerts.map(alert => {
                let borderColor = 'border-blue-200 bg-blue-50 text-blue-900';
                let iconColor = 'text-irctc-blue';
                
                if (alert.type === 'success') {
                    borderColor = 'border-green-200 bg-green-50 text-green-900';
                    iconColor = 'text-green-600';
                } else if (alert.type === 'warning') {
                    borderColor = 'border-orange-200 bg-orange-50 text-orange-900';
                    iconColor = 'text-irctc-orange';
                } else if (alert.type === 'critical') {
                    borderColor = 'border-red-200 bg-red-50 text-red-900';
                    iconColor = 'text-red-600';
                }

                const dateStr = alert.createdAt ? new Date(alert.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }) : 'Just now';

                const alertTitle = alert.title || (alert.type ? `${alert.type.toUpperCase()} Advisory` : 'IRCTC Notification');


                return `
                    <div class="p-4 border ${borderColor} rounded-xl shadow-sm flex items-start space-x-4 transition">
                        <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm ${iconColor}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </div>
                        <div class="grow">
                            <div class="flex justify-between items-center mb-1">
                                <h4 class="font-bold text-base">${alertTitle}</h4>
                                <span class="text-[11px] opacity-75">${dateStr}</span>
                            </div>
                            <p class="text-xs leading-relaxed opacity-90">${alert.message}</p>
                        </div>
                    </div>
                `;
            }).join('');
        });
    

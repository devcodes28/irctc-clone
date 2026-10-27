
        const trainSelectedClasses = {};

        const CLASS_NAMES = {
            'SL': 'Sleeper (SL)',
            '3A': 'AC 3 Tier (3A)',
            '2A': 'AC 2 Tier (2A)',
            '1A': 'AC First Class (1A)'
        };

        window.selectTrainClass = function(trainNumber, classType) {
            trainSelectedClasses[trainNumber] = classType;
            localStorage.setItem('selected_class_type', classType);

            // Update UI for this train card
            const card = document.getElementById(`train-card-${trainNumber}`);
            if (card) {
                card.querySelectorAll('.class-card').forEach(el => {
                    const cType = el.getAttribute('data-class');
                    if (cType === classType) {
                        el.className = 'class-card border-2 border-irctc-orange bg-orange-50/60 rounded-xl p-3 text-center cursor-pointer shadow-sm transition ring-1 ring-irctc-orange';
                    } else {
                        el.className = 'class-card border border-gray-300 bg-gray-50 hover:bg-white rounded-xl p-3 text-center cursor-pointer hover:border-irctc-orange transition';
                    }
                });

                const bookBtn = document.getElementById(`book-btn-${trainNumber}`);
                if (bookBtn) {
                    bookBtn.textContent = `Book ${classType}`;
                }
            }
        };

        window.proceedToBooking = function(trainNumber, explicitClass) {
            const classType = explicitClass || trainSelectedClasses[trainNumber] || localStorage.getItem('selected_class_type') || 'SL';
            localStorage.setItem('selected_train', trainNumber);
            localStorage.setItem('selected_train_num', trainNumber);
            localStorage.setItem('selected_class_type', classType);

            const isLoggedIn = localStorage.getItem('current_user_id') !== null;
            if (!isLoggedIn) {
                localStorage.setItem('redirect_to_booking', 'true');
                alert("Login to proceed with booking.");
                window.location.href = 'login.html';
            } else {
                window.location.href = 'booking.html';
            }
        };

        document.addEventListener('DOMContentLoaded', async () => {
            const searchData = JSON.parse(localStorage.getItem('last_search'));
            
            if (searchData) {
                document.getElementById('displaySource').innerHTML = `${searchData.sourceName}`;
                document.getElementById('displayDest').innerHTML = `${searchData.destName}`;
                document.getElementById('displayDate').textContent = searchData.date;
            } else {
                window.location.href = 'TrainSearch.html';
                return;
            }

            const preferredClass = localStorage.getItem('selected_class_type') || (searchData && searchData.travelClass) || '';
            const container = document.getElementById('trainResultsList');
            const noResults = document.getElementById('noResults');
            
            // Live API fetch
            const matchedTrains = await DB_API.searchTrains(searchData.sourceCode, searchData.destCode);
            
            if (!matchedTrains || matchedTrains.length === 0) {
                noResults.classList.remove('hidden');
                return;
            }

            document.getElementById('resultsCount').textContent = `${matchedTrains.length} Results`;

            matchedTrains.forEach(train => {
                // Determine default selected class for this train
                const hasPreferred = train.availableClasses.find(c => c.classType === preferredClass);
                const initialClass = hasPreferred ? preferredClass : (train.availableClasses[0]?.classType || 'SL');
                trainSelectedClasses[train.trainNumber] = initialClass;

                let classHTML = '';
                train.availableClasses.forEach(cls => {
                    const isSelected = cls.classType === initialClass;
                    const cardStyle = isSelected
                        ? 'class-card border-2 border-irctc-orange bg-orange-50/60 rounded-xl p-3 text-center cursor-pointer shadow-sm transition ring-1 ring-irctc-orange'
                        : 'class-card border border-gray-300 bg-gray-50 hover:bg-white rounded-xl p-3 text-center cursor-pointer hover:border-irctc-orange transition';

                    const classLabel = CLASS_NAMES[cls.classType] || cls.classType;

                    classHTML += `
                        <div data-class="${cls.classType}" onclick="selectTrainClass('${train.trainNumber}', '${cls.classType}')" class="${cardStyle}">
                            <div class="flex items-center justify-between">
                                <p class="font-bold text-irctc-blue text-sm">${cls.classType}</p>
                                <span class="text-[10px] text-green-600 font-bold uppercase tracking-wide bg-green-50 px-1.5 py-0.5 rounded border border-green-200">AVL ${cls.availableSeats}</span>
                            </div>
                            <p class="text-[11px] text-gray-500 font-medium truncate mt-0.5">${classLabel}</p>
                            <p class="text-base font-black text-gray-900 mt-2">₹${cls.baseFare.toLocaleString('en-IN')}</p>
                        </div>
                    `;
                });

                const trainCard = document.createElement('div');
                trainCard.id = `train-card-${train.trainNumber}`;
                trainCard.className = 'bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-2';
                trainCard.innerHTML = `
                    <div class="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-4 mb-4 gap-4">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">${train.trainName} <span class="text-gray-500 font-medium text-sm ml-1">(${train.trainNumber})</span></h3>
                            <p class="text-sm text-gray-500 mt-1 uppercase tracking-wide font-semibold text-[11px]">${train.originName} <span class="text-irctc-orange mx-1">➔</span> ${train.destinationName}</p>
                        </div>
                        <div class="text-left md:text-right flex flex-col items-start md:items-end w-full md:w-auto">
                            <p class="text-lg font-black text-irctc-blue">${train.departureTime} <span class="text-gray-400 text-sm font-medium mx-1">—</span> ${train.arrivalTime}</p>
                            <button id="book-btn-${train.trainNumber}" onclick="proceedToBooking('${train.trainNumber}')" class="mt-2 bg-irctc-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg text-xs tracking-wide transition shadow-sm w-full md:w-auto">
                                Book ${initialClass}
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        ${classHTML}
                    </div>
                `;
                
                container.appendChild(trainCard);
            });
        });
    

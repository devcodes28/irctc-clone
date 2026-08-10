const seats = document.querySelectorAll(".seat");
const selectedSeatText = document.getElementById("selectedSeat");
const continueButton = document.getElementById("continueButton");

let selectedSeat = null;

// Seat selection
seats.forEach(function (seat) {

    seat.addEventListener("click", function () {

        // Remove selection from all seats
        seats.forEach(function (item) {
            item.classList.remove(
                "bg-irctc-orange",
                "text-white",
                "border-irctc-orange"
            );
        });

        // Select clicked seat
        this.classList.add(
            "bg-irctc-orange",
            "text-white",
            "border-irctc-orange"
        );

        selectedSeat = this.dataset.seat;

        selectedSeatText.textContent = selectedSeat;
    });

});

// Continue button
continueButton.addEventListener("click", function () {

    const selectedClass = document.querySelector(
        'input[name="travelClass"]:checked'
    );

    if (!selectedClass) {
        alert("Please select a travel class");
        return;
    }

    if (!selectedSeat) {
        alert("Please select a seat");
        return;
    }

    const bookingDetails = {
        travelClass: selectedClass.value,
        seat: selectedSeat
    };

    localStorage.setItem(
        "bookingDetails",
        JSON.stringify(bookingDetails)
    );

    window.location.href = "fare-summary.html";
});
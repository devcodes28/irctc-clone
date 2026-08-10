const passengerDetails = JSON.parse(
    localStorage.getItem("passengerDetails")
);

const bookingDetails = JSON.parse(
    localStorage.getItem("bookingDetails")
);


// Check booking information

if (!passengerDetails || !bookingDetails) {

    alert("Booking information not found.");

    window.location.href = "passenger-details.html";

} else {

    document.getElementById("passengerName").textContent =
        passengerDetails.name;

    document.getElementById("passengerAge").textContent =
        passengerDetails.age;

    document.getElementById("passengerGender").textContent =
        passengerDetails.gender;

    document.getElementById("passengerMobile").textContent =
        passengerDetails.mobile;

    document.getElementById("passengerEmail").textContent =
        passengerDetails.email;

    document.getElementById("travelClass").textContent =
        bookingDetails.travelClass;

    document.getElementById("seatNumber").textContent =
        bookingDetails.seat;
}


// Confirm booking

document.getElementById("confirmButton").addEventListener(
    "click",
    function () {

        const confirmation =
            document.getElementById("confirmDetails");

        if (!confirmation.checked) {

            alert(
                "Please confirm that your booking details are correct."
            );

            return;
        }

        alert("Booking confirmed successfully!");

    }
);
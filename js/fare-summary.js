const passengerDetails = JSON.parse(
    localStorage.getItem("passengerDetails")
);

const bookingDetails = JSON.parse(
    localStorage.getItem("bookingDetails")
);


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

    document.getElementById("travelClass").textContent =
        bookingDetails.travelClass;

    document.getElementById("seatNumber").textContent =
        bookingDetails.seat;
}


// REVIEW BUTTON

document.getElementById("reviewButton").addEventListener(
    "click",
    function () {

        window.location.href = "review-booking.html";

    }
);
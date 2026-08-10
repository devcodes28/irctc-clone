document.getElementById("passengerForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const mobile = document.getElementById("mobile").value.trim();

    if (name === "") {
        alert("Please enter passenger name");
        return;
    }

    if (age === "" || age < 1 || age > 120) {
        alert("Please enter a valid age");
        return;
    }

    if (gender === "") {
        alert("Please select gender");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number");
        return;
    }

    window.location.href = "seat-selection.html";
});document.getElementById("passengerForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const idProof = document.getElementById("idProof").value;
    const idNumber = document.getElementById("idNumber").value.trim();

    if (name === "") {
        alert("Please enter passenger name");
        return;
    }

    if (age === "" || age < 1 || age > 120) {
        alert("Please enter a valid age");
        return;
    }

    if (gender === "") {
        alert("Please select gender");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number");
        return;
    }

    if (email === "") {
        alert("Please enter email");
        return;
    }

    if (idProof === "") {
        alert("Please select ID proof");
        return;
    }

    if (idNumber === "") {
        alert("Please enter ID number");
        return;
    }

    const passenger = {
        name: name,
        age: age,
        gender: gender,
        mobile: mobile,
        email: email,
        idProof: idProof,
        idNumber: idNumber
    };

    localStorage.setItem("passengerDetails", JSON.stringify(passenger));

    window.location.href = "seat-selection.html";
});
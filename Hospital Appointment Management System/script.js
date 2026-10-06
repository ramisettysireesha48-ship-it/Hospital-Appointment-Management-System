// Get the form
const appointmentForm = document.getElementById("appointmentForm");

// Get appointment table
const appointmentTable = document.getElementById("appointmentTable");

// Get message area
const message = document.getElementById("message");

// Store appointments
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Display appointments when page loads
displayAppointments();


// Form Submit
appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values
    const patientName = document.getElementById("patientName").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const reason = document.getElementById("reason").value;

    // Create appointment object
    const appointment = {
        id: Date.now(),
        patientName: patientName,
        age: age,
        phone: phone,
        doctor: doctor,
        date: date,
        time: time,
        reason: reason
    };

    // Add appointment
    appointments.push(appointment);

    // Save in browser
    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    // Show success message
    message.innerHTML = "✓ Appointment booked successfully!";
    message.style.color = "green";

    // Clear form
    appointmentForm.reset();

    // Display updated appointments
    displayAppointments();

    // Scroll to appointment records
    document.getElementById("appointments").scrollIntoView({
        behavior: "smooth"
    });
});


// Display appointments
function displayAppointments() {

    appointmentTable.innerHTML = "";

    if (appointments.length === 0) {

        appointmentTable.innerHTML = `
            <tr>
                <td colspan="6">
                    No appointments booked yet.
                </td>
            </tr>
        `;

        return;
    }

    appointments.forEach(function(appointment) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${appointment.patientName}</strong>
                <br>
                <small>Age: ${appointment.age}</small>
            </td>

            <td>${appointment.doctor}</td>

            <td>${appointment.date}</td>

            <td>${appointment.time}</td>

            <td>${appointment.reason}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteAppointment(${appointment.id})">
                    Delete
                </button>
            </td>
        `;

        appointmentTable.appendChild(row);
    });
}


// Delete appointment
function deleteAppointment(id) {

    const confirmDelete = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (confirmDelete) {

        appointments = appointments.filter(function(appointment) {
            return appointment.id !== id;
        });

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        displayAppointments();

        message.innerHTML = "Appointment cancelled successfully.";
        message.style.color = "red";
    }
}


// Set minimum appointment date as today
const dateInput = document.getElementById("date");

const today = new Date().toISOString().split("T")[0];

dateInput.setAttribute("min", today);
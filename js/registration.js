// Registration form validation and Local Storage handling.

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    if (!registrationForm) return;

    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const eventSelect = document.getElementById("eventSelect");
    const successMessage = document.getElementById("successMessage");

    const availableEvents = window.EventoraEvents || [];

    // Fill the dropdown from the same event array used by the other pages.
    availableEvents.forEach(event => {
        const option = document.createElement("option");
        option.value = String(event.id);
        option.textContent = `${event.name} — ${event.date}`;
        eventSelect.appendChild(option);
    });

    // Preselect an event when the form is opened from an event details page.
    const params = new URLSearchParams(window.location.search);
    const requestedEventId = params.get("eventId");
    if (requestedEventId && availableEvents.some(event => String(event.id) === requestedEventId)) {
        eventSelect.value = requestedEventId;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) errorElement.textContent = message;
    }

    function clearErrors() {
        ["nameError", "emailError", "phoneError", "eventError"].forEach(id => showError(id, ""));
        successMessage.hidden = true;
        successMessage.textContent = "";
    }

    registrationForm.addEventListener("submit", event => {
        event.preventDefault();
        clearErrors();

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.replace(/[\s-]/g, "").trim();
        const selectedEvent = availableEvents.find(item => String(item.id) === eventSelect.value);

        let isValid = true;

        if (fullName.length < 2) {
            showError("nameError", "Please enter your full name.");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        const phoneDigits = phone.startsWith("+91") ? phone.slice(3) : phone;
        if (!/^\d{10}$/.test(phoneDigits)) {
            showError("phoneError", "Please enter a valid 10-digit phone number.");
            isValid = false;
        }

        if (!selectedEvent) {
            showError("eventError", "Please select an event.");
            isValid = false;
        }

        if (!isValid) return;

        const registration = {
            id: Date.now(),
            fullName,
            email,
            phone,
            eventId: selectedEvent.id,
            eventName: selectedEvent.name,
            registeredAt: new Date().toISOString()
        };

        try {
            const savedRegistrations = JSON.parse(localStorage.getItem("eventoraRegistrations") || "[]");
            savedRegistrations.push(registration);
            localStorage.setItem("eventoraRegistrations", JSON.stringify(savedRegistrations));

            successMessage.innerHTML = `
                <strong>Registration successful, ${fullName}!</strong>
                <span>You are registered for <b>${selectedEvent.name}</b>. Your registration has been saved in this browser.</span>
            `;
            successMessage.hidden = false;
            registrationForm.reset();
        } catch (error) {
            console.error("Could not save registration:", error);
            successMessage.textContent = "Your details passed validation, but this browser could not save the registration. Check your browser's storage settings and try again.";
            successMessage.hidden = false;
        }
    });
});

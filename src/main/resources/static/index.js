// Creating an empty list for tickets
let ticketList = [];

// Function for buying a ticket
function BuyTicket() {
    const movie = document.getElementById("film").value;
    const quantity = document.getElementById("quantity").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phonenumber").value;
    const email = document.getElementById("email").value;

    const phoneRegex = /^\d{8}$/;
    const nameRegex = /^[a-zA-ZæøåÆØÅ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error messages
    resetErrorMessages();

    // Create a list for error messages
    let errorMessages = [];

    // Validate input values
    if (movie === "") { // Check if movie is not selected
        errorMessages.push("You must select a movie to buy a ticket.");
    }
    if (!quantity || isNaN(quantity) || parseInt(quantity) < 1) {
        errorMessages.push("You must enter a valid number for ticket quantity.");
    }
    if (!firstname || !isNaN(firstname)) {
        errorMessages.push("You must fill in first name to buy a ticket.");
    }
    if (!lastname || !isNaN(lastname)) {
        errorMessages.push("You must fill in last name to buy a ticket.");
    }
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
        errorMessages.push("You must enter a valid phone number.");
    }
    if (!email || !emailRegex.test(email)) {
        errorMessages.push("You must fill in a valid email address.");
    }
    if (!phoneRegex.test(phoneNumber)) {
        errorMessages.push("You must enter a valid phone number with 8 digits.");
    }

    if (!nameRegex.test(firstname)) {
        errorMessages.push("First name must contain only letters.");
    }

    if (!nameRegex.test(lastname)) {
        errorMessages.push("Last name must contain only letters.");
    }

    // Handle error messages
    if (errorMessages.length > 0) {
        displayErrorMessages(errorMessages);
        return;
    }

    // Create ticket object and add to the list
    const ticket = {
        movie,
        quantity,
        firstname,
        lastname,
        phoneNumber,
        email
    };

    ticketList.push(ticket);

    // Update ticket display
    displayTickets();

    // Reset the form
    resetInput();
}

// Function to map error messages to the corresponding input field
function getInputElementId(errorMessage) {
    switch (errorMessage) {
        case "You must select a movie to buy a ticket.":
            return "film";
        case "You must enter a valid number for ticket quantity.":
            return "quantity";
        case "You must fill in first name to buy a ticket.":
            return "firstname";
        case "You must fill in last name to buy a ticket.":
            return "lastname";
        case "You must enter a valid phone number.":
            return "phonenumber";
        case "You must fill in a valid email address.":
            return "email";
        case "You must enter a valid phone number with 8 digits.":
            return "phonenumber";
        case "First name must contain only letters.":
            return "firstname";
        case "Last name must contain only letters.":
            return "lastname";
        default:
            return "";
    }
}

// Function to display tickets in HTML
function displayTickets() {
    const ticketListElement = document.getElementById("ticketList");
    ticketListElement.innerHTML = "";

    // Create HTML table
    let output = "<table><tr>" +
        "<th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Email</th>" +
        "</tr>";

    // Add tickets to the table
    for (let ticket of ticketList) {
        output += "<tr>";
        output += "<td>" + ticket.firstname + "</td><td>" + ticket.lastname + "</td><td>" + ticket.phoneNumber + "</td><td>" + ticket.email + "</td>";
        output += "</tr>";
    }

    output += "</table>";

    // Update HTML content
    ticketListElement.innerHTML = output;
}

// Function to delete all tickets
function deleteTickets() {
    ticketList = [];
    document.getElementById("ticketList").innerHTML = "";
}

// Function to reset the form and error messages
function resetInput() {
    document.getElementById("film").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("email").value = "";

    // Reset error messages
    resetErrorMessages();
}

// Function to reset error messages
function resetErrorMessages() {
    document.getElementById("filmError").innerHTML = "";
    document.getElementById("quantityError").innerHTML = "";
    document.getElementById("firstnameError").innerHTML = "";
    document.getElementById("lastnameError").innerHTML = "";
    document.getElementById("phonenumberError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
}

// Function to display error messages next to the corresponding input field
function displayErrorMessages(errors) {
    errors.forEach((error, index) => {
        const errorElement = document.getElementById(`${getInputElementId(errors[index])}Error`);
        if (errorElement) {
            errorElement.innerHTML = error;
        }
    });
}

// Connect to Java
// Function to fetch all tickets from the backend
function fetchTickets() {
    fetch('/fetchAll')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch tickets');
            }
            return response.json();
        })
        .then(data => {
            // Process received ticket data
            console.log('Received tickets:', data);
            // Update ticket list display if necessary
        })
        .catch(error => {
            console.error('Error fetching tickets:', error);
            // Handle error if necessary
        });
}

// Function to delete all tickets from the backend
function deleteAllTickets() {
    fetch('/deleteAll', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not delete tickets');
            }
            // Update ticket list display or perform necessary action
        })
        .catch(error => {
            console.error('Error deleting tickets:', error);
            // Handle error if necessary
        });
}

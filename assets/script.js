// Array to store customer data
let customers = [];
let customerIdCounter = 1; // Keeping this in case needed later

// Load customers from localStorage on page load
$(document).ready(function () {
    loadCustomersFromStorage();
});

// Register Customer
$("#customerForm").on("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting the default way

    let id = $("#customerId").val(); // Retrieve customer ID from input field
    let name = $("#customerName").val();
    let email = $("#customerEmail").val();
    let address = $("#customerAddress").val();

    // Check if ID is provided
    if (!id) {
        alert("Customer ID is required.");
        return;
    }

    // Check if the customer ID already exists
    let existingCustomer = customers.find(customer => customer.id === id);
    if (existingCustomer) {
        alert("Customer ID already exists. Please enter a unique ID.");
        return;
    }

    // Create customer object
    let customer = {
        id: id,
        name: name,
        email: email,
        address: address
    };

    // Push the customer into the customers array
    customers.push(customer);

    // Save the updated customer list to localStorage
    saveCustomersToStorage();

    // Clear the form after submission
    this.reset();

    // Reload the customer table
    loadCustomerTable();

    alert(`Customer registered successfully! ID: ${id}`);
});

// Function to load all customers into the table
function loadCustomerTable() {
    $("#customerTableBody").empty(); // Clear the table body before appending new data

    customers.forEach((customer, index) => {
        let row = `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
        </tr>`;
        $("#customerTableBody").append(row);
    });
}

// Save customers to localStorage
function saveCustomersToStorage() {
    localStorage.setItem("customers", JSON.stringify(customers));
}

// Load customers from localStorage
function loadCustomersFromStorage() {
    let storedCustomers = localStorage.getItem("customers");

    if (storedCustomers) {
        customers = JSON.parse(storedCustomers); // Parse stored data
        loadCustomerTable(); // Load table with stored data
    }
}

// Get All Customers
function getAllCustomers() {
    if (customers.length === 0) {
        alert("No customers available.");
    } else {
        loadCustomerTable();
    }
}

// Find Customer by ID
function findCustomer() {
    let id = prompt("Enter Customer ID to find:");

    let foundCustomer = customers.find(customer => customer.id === id);

    if (foundCustomer) {
        alert(`Customer Found: \nID: ${foundCustomer.id}\nName: ${foundCustomer.name}\nEmail: ${foundCustomer.email}\nAddress: ${foundCustomer.address}`);
    } else {
        alert("Customer not found!");
    }
}

// Update Customer
function updateCustomer() {
    let id = prompt("Enter Customer ID to update:");

    let foundCustomer = customers.find(customer => customer.id === id);

    if (foundCustomer) {
        let newName = prompt("Enter new name:", foundCustomer.name);
        let newEmail = prompt("Enter new email:", foundCustomer.email);
        let newAddress = prompt("Enter new address:", foundCustomer.address);

        // Update customer details
        foundCustomer.name = newName;
        foundCustomer.email = newEmail;
        foundCustomer.address = newAddress;

        saveCustomersToStorage(); // Save updated data to localStorage
        loadCustomerTable(); // Reload the updated customer table

        alert("Customer updated successfully!");
    } else {
        alert("Customer not found!");
    }
}

// Unregister Customer
function unregisterCustomer() {
    let id = prompt("Enter Customer ID to unregister:");

    let customerIndex = customers.findIndex(customer => customer.id === id);

    if (customerIndex !== -1) {
        customers.splice(customerIndex, 1); // Remove customer from the array
        saveCustomersToStorage(); // Save updated data to localStorage
        loadCustomerTable(); // Reload the customer table
        alert("Customer unregistered successfully!");
    } else {
        alert("Customer not found!");
    }
}


    $(document).ready(function () {
        let itemTableBody = $("#itemTableBody");

        // Load items from local storage and display them
        function loadItems() {
            itemTableBody.empty();
            let items = JSON.parse(localStorage.getItem("items")) || [];
            items.forEach(item => {
                let row = `<tr data-id="${item.id}">
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-item">Edit</button>
                        <button class="btn btn-danger btn-sm delete-item">Delete</button>
                    </td>
                </tr>`;
                itemTableBody.append(row);
            });
        }

        // Auto-generate item ID
        function generateItemId() {
            let items = JSON.parse(localStorage.getItem("items")) || [];
            return items.length ? `ITM-${items.length + 1}` : "ITM-1";
        }

        // Add new item
        $("#itemForm").on("submit", function (e) {
            e.preventDefault();

            let itemId = generateItemId();
            let itemName = $("#itemName").val();
            let itemPrice = parseFloat($("#itemPrice").val());
            let itemQuantity = parseInt($("#itemQuantity").val());

            let newItem = { id: itemId, name: itemName, price: itemPrice, quantity: itemQuantity };
            let items = JSON.parse(localStorage.getItem("items")) || [];
            items.push(newItem);
            localStorage.setItem("items", JSON.stringify(items));

            loadItems();
            this.reset();
        });

        // Find item by ID
        function findItem() {
            let itemId = $("#itemId").val();
            let items = JSON.parse(localStorage.getItem("items")) || [];
            let item = items.find(item => item.id === itemId);

            if (item) {
                $("#itemName").val(item.name);
                $("#itemPrice").val(item.price);
                $("#itemQuantity").val(item.quantity);
            } else {
                alert("Item not found");
            }
        }

        // Update item
        function updateItem() {
            let itemId = $("#itemId").val();
            let items = JSON.parse(localStorage.getItem("items")) || [];
            let itemIndex = items.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
                items[itemIndex].name = $("#itemName").val();
                items[itemIndex].price = parseFloat($("#itemPrice").val());
                items[itemIndex].quantity = parseInt($("#itemQuantity").val());
                localStorage.setItem("items", JSON.stringify(items));
                loadItems();
                alert("Item updated successfully");
            } else {
                alert("Item not found");
            }
        }

        // Delete item
        function deleteItem(itemId) {
            let items = JSON.parse(localStorage.getItem("items")) || [];
            items = items.filter(item => item.id !== itemId);
            localStorage.setItem("items", JSON.stringify(items));
            loadItems();
        }

        // Event delegation for edit and delete buttons
        itemTableBody.on("click", ".edit-item", function () {
            let itemId = $(this).closest("tr").data("id");
            let items = JSON.parse(localStorage.getItem("items")) || [];
            let item = items.find(item => item.id === itemId);

            if (item) {
                $("#itemId").val(item.id);
                $("#itemName").val(item.name);
                $("#itemPrice").val(item.price);
                $("#itemQuantity").val(item.quantity);
            }
        });

        itemTableBody.on("click", ".delete-item", function () {
            let itemId = $(this).closest("tr").data("id");
            deleteItem(itemId);
        });

        // Initial load
        loadItems();

        // Attach functions to buttons
        window.findItem = findItem;
        window.updateItem = updateItem;
    });


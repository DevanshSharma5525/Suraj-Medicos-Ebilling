// Array to store items
let items = [];

// Function to add item to the table and array
document.getElementById("addItemBtn").addEventListener("click", function() {
    const itemName = document.querySelector(".itemName").value;
    const itemQuantity = parseInt(document.querySelector(".itemQuantity").value);
    const itemPrice = parseFloat(document.querySelector(".itemPrice").value);

    if (itemName && itemQuantity && itemPrice) {
        const itemAmount = itemQuantity * itemPrice;
        
        // Store item data in array
        items.push({ itemName, itemQuantity, itemPrice, itemAmount });

        // Add item to the table
        const table = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];
        const row = table.insertRow();
        row.innerHTML = `
            <td>${itemName}</td>
            <td>${itemQuantity}</td>
            <td>${itemPrice}</td>
            <td>${itemAmount}</td>
        `;

        // Update total price
        updateTotalPrice();
    } else {
        alert("Please fill in all fields.");
    }
});

// Function to update total price
function updateTotalPrice() {
    let total = 0;
    items.forEach(item => {
        total += item.itemAmount;
    });
    document.getElementById("totalPrice").textContent = total;
}

// Function to generate and download the PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const customerName = document.getElementById("customerName").value;
    const customerAddress = document.getElementById("customerAddress").value;
    const customerPhone = document.getElementById("customerPhone").value;
    const billDate = new Date().toLocaleDateString();

    // Add title
    doc.text("Suraj Medicos - Invoice", 10, 10);
    doc.text(`Customer Name: ${customerName}`, 10, 20);
    doc.text(`Address: ${customerAddress}`, 10, 30);
    doc.text(`Phone: ${customerPhone}`, 10, 40);
    doc.text(`Date: ${billDate}`, 10, 50);

    // Add table
    const startY = 60;
    doc.autoTable({
        head: [['Item', 'Quantity', 'Price (₹)', 'Amount (₹)']],
        body: items.map(item => [item.itemName, item.itemQuantity, item.itemPrice, item.itemAmount]),
        startY: startY,
    });

    // Add total price
    const totalY = startY + items.length * 10 + 20;
    doc.text(`Total: ₹${document.getElementById("totalPrice").textContent}`, 10, totalY);

    // Download the PDF
    doc.save(`Bill_${customerName}_${billDate}.pdf`);

    // Show the thank you message
    document.getElementById("thankYouMessage").style.display = 'block';
}
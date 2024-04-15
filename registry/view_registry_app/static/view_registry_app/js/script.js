document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submission if the URL is on the dashboard
    if (window.location.pathname === '/dashboard') {
        document.getElementById('dashboardForm').addEventListener('submit', function(event) {
            // Get the wishlist_id
            let wishlistId = document.getElementById('wishlist_id').value;
            // Add wishlist_id to the form data
            let formData = new FormData(this);
            formData.append('wishlist_id', wishlistId);
            // Set the updated form data
            event.formData = formData;
        });

        // Trigger form submission when the window loads
        document.getElementById('dashboardForm').submit();
    }

    // Add event listener to the form submission if the URL is on the dashboard
    if (window.location.pathname === '/dashboard') {
        document.getElementById('dashboardForm').addEventListener('submit', function(event) {
            // Get the wishlist_id
            let wishlistId = document.getElementById('wishlist_id').value;
            // Add wishlist_id to the form data
            let formData = new FormData(this);
            formData.append('wishlist_id', wishlistId);
            // Set the updated form data
            event.formData = formData;
            // Close the modal after form submission
            $('#createItemModal').modal('hide');
            // Trigger form submission when the window loads
            document.getElementById('dashboardForm').submit();
        });
    }

    // Add event listener to the wishlist button
    document.getElementById("wishlistButton").addEventListener("click", function() {
        let wishlistURL = this.getAttribute("data-wishlist-url");
        console.log("Wishlist URL:", wishlistURL); // Check if the URL is printed correctly
        if (wishlistURL) {
            window.location.href = wishlistURL;
        }
    });

    // Add event listeners to Price and Quantity fields for input validation
    let priceField = document.getElementById('price');
    let quantityField = document.getElementById('quantity');

    priceField.addEventListener('input', function(event) {
        // Remove any non-digit characters and extra decimal points
        let value = this.value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
        // Limit to 20 digits and 2 decimals
        let decimalIndex = value.indexOf('.');
        if (decimalIndex !== -1) {
            let integerPart = value.substring(0, decimalIndex);
            let decimalPart = value.substring(decimalIndex + 1);
            if (integerPart.length > 17) {
                integerPart = integerPart.substring(0, 17);
            }
            if (decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
            }
            value = integerPart + '.' + decimalPart;
        } else if (value.length > 20) {
            value = value.substring(0, 20);
        }
        this.value = value;
    });

    quantityField.addEventListener('input', function(event) {
        // Remove any non-digit characters
        let value = this.value.replace(/[^\d]/g, '');
        // Limit to 20 digits
        if (value.length > 20) {
            value = value.substring(0, 20);
        }
        this.value = value;
    });
});
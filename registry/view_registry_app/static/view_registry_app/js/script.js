document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submission if the URL is on the dashboard
    if (window.location.pathname === '/dashboard') {
        document.getElementById('dashboardForm').addEventListener('submit', function(event) {
            // Get the wishlist_id
            var wishlistId = document.getElementById('wishlist_id').value;
            // Add wishlist_id to the form data
            var formData = new FormData(this);
            formData.append('wishlist_id', wishlistId);
            // Set the updated form data
            event.formData = formData;
        });

        // Trigger form submission when the window loads
        document.getElementById('dashboardForm').submit();
    }

    // Add event listener to the wishlist button
    document.getElementById("wishlistButton").addEventListener("click", function() {
        var wishlistURL = this.getAttribute("data-wishlist-url");
        console.log("Wishlist URL:", wishlistURL); // Check if the URL is printed correctly
        if (wishlistURL) {
            window.location.href = wishlistURL;
        }
    });
});
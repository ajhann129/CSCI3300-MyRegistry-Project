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
});
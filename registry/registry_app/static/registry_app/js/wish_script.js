document.addEventListener("DOMContentLoaded", function() {
    // Function to create a new wishlist box
    function createWishlistBox(name, id) {
        var wishlistBox = document.createElement('div');
        wishlistBox.className = 'wishlistBox';
        wishlistBox.dataset.wishlistId = id; // Store wishlist ID as a data attribute
        wishlistBox.innerHTML = `
            <div class="boxOutline">
                <h3>${name}</h3>
                <div class="buttonContainer">
                    <button class="viewButton">View</button>
                    <button class="deleteButton" data-wishlist-id="${id}">Delete</button>
                </div>
            </div>
        `;
        document.getElementById('wishlistContainer').appendChild(wishlistBox);
    }

    // Access the base URL from the data attribute
    const wishlistUrl = document.getElementById('wishlist-data').getAttribute('data-url');

    // Function to load wishlists from the database and display them on page load
    function loadWishlists() {
        // AJAX request to fetch wishlists for the signed-in user
        fetch(wishlistUrl)
            .then(response => response.json())
            .then(data => {
                data.wishlists.forEach(wishlist => {
                    createWishlistBox(wishlist.name, wishlist.id); // Call function to create wishlist box
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Call loadWishlists function to display existing wishlists on page load
    loadWishlists();

    // Event listener for clicking the delete button
    document.addEventListener("click", function(event) {
        const clickedElement = event.target;
        // Check if the clicked element is a delete button
        if (clickedElement.classList.contains("deleteButton")) {
            const deleteButton = clickedElement;
            // Check if it's already in confirm delete mode
            if (deleteButton.dataset.confirmDelete === "true") {
                // Extract the wishlist ID from the dataset
                const wishlistId = deleteButton.dataset.wishlistId;
                // Call the deleteWishlist function with the wishlist ID
                deleteWishlist(wishlistId);
                // Remove the wishlist box from the page
                const wishlistBox = deleteButton.closest('.wishlistBox');
                wishlistBox.remove();
            } else {
                // Change the button text and background color
                deleteButton.textContent = "Confirm Deletion";
                deleteButton.style.backgroundColor = "red";
                // Set dataset attribute to true
                deleteButton.dataset.confirmDelete = "true";
            }
        }
    });

    // Function to send a POST request to delete a wishlist
    function deleteWishlist(wishlistId) {
        // Send a POST request to the delete wishlist endpoint with the wishlist ID
        fetch(`/home/delete_wishlist/${wishlistId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken() // Include CSRF token in headers
            }
        })
        .then(response => {
            // Check if the response is okay
            if (!response.ok) {
                // Handle error if deletion fails
                console.error("Failed to delete wishlist.");
            }
        })
        .catch(error => {
            // Handle network errors
            console.error("Error:", error);
        });
    }

    // Function to retrieve the CSRF token from cookies
    function getCSRFToken() {
        // Use regex to extract the CSRF token value from the cookie
        const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
        // Return the CSRF token value or an empty string if not found
        return cookieValue ? cookieValue[1] : "";
    }    

});

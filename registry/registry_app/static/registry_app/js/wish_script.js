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
                    <button class="deleteButton">Delete</button>
                </div>
            </div>
        `;
        document.getElementById('wishlistContainer').appendChild(wishlistBox);
    }

    // Event listener for submitting the create wishlist form
    document.getElementById('createWishlistForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var wishlistNameInput = document.getElementById('wishlistName');
        var wishlistName = wishlistNameInput.value;
        // AJAX request to create a new wishlist
        fetch('/create_wishlist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}'
            },
            body: JSON.stringify({'wishlistName': wishlistName})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                createWishlistBox(wishlistName, data.wishlist_id); // Call function to create wishlist box
                wishlistNameInput.value = ''; // Clear the input field
                document.getElementById('createWishlistModal').style.display = 'none'; // Hide the modal
            } else {
                alert('Failed to create wishlist.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Function to delete a wishlist box
    function deleteWishlistBox(wishlistBox) {
        var wishlistId = wishlistBox.dataset.wishlistId; // Get wishlist ID from data attribute
        // AJAX request to delete the wishlist
        fetch('/delete_wishlist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}'
            },
            body: JSON.stringify({'wishlistId': wishlistId})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                wishlistBox.remove(); // Remove the wishlist box from the page
            } else {
                alert('Failed to delete wishlist.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Event delegation for dynamically created view and delete buttons
    document.getElementById('wishlistContainer').addEventListener('click', function(event) {
        var target = event.target;
        if (target.classList.contains('deleteButton')) {
            var wishlistBox = target.closest('.wishlistBox');
            deleteWishlistBox(wishlistBox); // Call function to delete wishlist box
        }
        // Add similar logic for view button if needed
    });

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

});

document.addEventListener("DOMContentLoaded", function() {
    // Function to create a new wishlist box
    function createWishlistBox(name, id) {
        let wishlistBox = document.createElement('div');
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
        checkAndToggleMaxWishlistMessage();
    }

    // Function to create a new wishlist box for the other users
    function createOtherWishlistBox(name, id, user) {
        let wishlistBox = document.createElement('div');
        wishlistBox.className = 'wishlistBox';
        wishlistBox.dataset.wishlistId = id; // Store wishlist ID as a data attribute
        wishlistBox.innerHTML = `
            <div class="boxOutline">
                <h3>${user}'s ${name}</h3>
                <div class="buttonContainer">
                    <button class="viewButton" data-wishlist-id="${id}">View</button>
                </div>
            </div>
        `;
        document.getElementById('otherWishlistContainer').appendChild(wishlistBox);
        checkAndToggleMaxWishlistMessage();
    }

    // Access the load URLs from the data attribute
    const loadUserWishlist = document.getElementById('wishlist-data').getAttribute('data-url');
    const loadOtherUserWishlist = document.getElementById('other-wishlist-data').getAttribute('data-url');

    // Function to load the current users wishlists from the database and display them on page load
    function loadWishlists() {
        // AJAX request to fetch wishlists for the signed-in user
        fetch(loadUserWishlist)
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

    // Function to load everyother user's wishlists from the database and display them on page load
    function loadOtherWishlists() {
        // AJAX request to fetch wishlists for the signed-in user
        fetch(loadOtherUserWishlist)
            .then(response => response.json())
            .then(data => {
                data.wishlists.forEach(wishlist => {
                    createOtherWishlistBox(wishlist.name, wishlist.id, wishlist.user); // Call function to create wishlist box
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    loadOtherWishlists();

    // Event listener for clicking the delete button
    document.addEventListener("click", function(event) {
        // Check if the clicked element is a delete button
        if (event.target.classList.contains("deleteButton")) {
            // Get the delete button element
            const deleteButton = event.target;
            // Check if the delete button is in confirm mode
            if (deleteButton.dataset.confirm === "true") {
                // Perform delete action
                const wishlistId = deleteButton.dataset.wishlistId;
                deleteWishlist(wishlistId);
                // Remove the wishlist box from the page
                const wishlistBox = deleteButton.closest('.wishlistBox');
                wishlistBox.remove();
                checkAndToggleMaxWishlistMessage(); // Check and toggle max wishlist message
            } else {
                // Change the button text and background color
                deleteButton.textContent = "Confirm Delete";
                deleteButton.style.backgroundColor = "red";
                // Set confirm mode
                deleteButton.dataset.confirm = "true";
            }
        } else {
            // Revert all confirmation buttons back to delete buttons
            const confirmationButtons = document.querySelectorAll(".deleteButton[data-confirm='true']");
            confirmationButtons.forEach(button => {
                button.textContent = "Delete";
                button.style.backgroundColor = "";
                button.dataset.confirm = "false";
            });
        }
    });

    // Function to send a POST request to delete a wishlist
    function deleteWishlist(wishlistId) {
        // Send a POST request to the delete wishlist endpoint with the wishlist ID
        fetch(`/registries/delete_wishlist/${wishlistId}/`, {
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

    // Event listener for clicking the view button
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("viewButton")) {
            // Retrieve the wishlist ID from the data attribute
            let wishlistId = event.target.closest('.wishlistBox').dataset.wishlistId;
            // Create a form element
            const form = document.createElement('form');
            // Set the method and action attributes
            form.method = 'post';
            form.action = '/dashboard';
            // Create an input element for the CSRF token
            const csrfToken = getCSRFToken();
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = 'csrfmiddlewaretoken';
            csrfInput.value = csrfToken;
            // Create an input element for the wishlist ID
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'wishlist_id';
            input.value = wishlistId;
            // Append the input elements to the form
            form.appendChild(csrfInput);
            form.appendChild(input);
            // Append the form to the document body
            document.body.appendChild(form);
            // Submit the form
            form.submit();
        }
    });

    // Function to retrieve the CSRF token from cookies
    function getCSRFToken() {
        // Use regex to extract the CSRF token value from the cookie
        const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
        // Return the CSRF token value or an empty string if not found
        return cookieValue ? cookieValue[1] : "";
    }    

    // Event listener for clicking the create button
    function handleCreateButtonClick(event) {
        const wishlistName = document.getElementById('wishlist_name').value;
        // Check if wishlist name is empty or exceeds 45 characters
        if (wishlistName.trim() === '' || wishlistName.length > 45) {
            alert('Wishlist name must not be empty and should be maximum 45 characters long');
            event.preventDefault(); // Prevent form submission
            return;
        }

        // Check if maximum number of wishlists is reached
        if (document.querySelectorAll('.wishlistBox').length >= 20) {
            document.getElementById('maxWishlistMessage').style.display = 'block';
            event.preventDefault(); // Prevent form submission
            return;
        }
    }

    // Add event listener for create button
    const createButton = document.getElementById('createButton');
    if (createButton) {
        createButton.addEventListener('click', handleCreateButtonClick);
    }

    // Function to check and toggle max wishlist message
    function checkAndToggleMaxWishlistMessage() {
        if (document.querySelectorAll('.wishlistBox').length < 20) {
            document.getElementById('maxWishlistMessage').style.display = 'none';
        }
    }
});
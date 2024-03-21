var wishlistNames = [];

function createWishlistBox(name) {
    if (name.trim() !== '' && !wishlistNames.includes(name)) {
        var wishlistBox = document.createElement('div');
        wishlistBox.className = 'wishlistBox';
        wishlistBox.innerHTML = `
            <div class="boxOutline">
                <h3>${name}</h3>
                <div class="buttonContainer">
                    <button class="viewButton">View</button>
                    <button class="deleteButton">Delete</button>
                    <button class="confirmDeleteButton">Confirm Delete</button>
                </div>
            </div>
        `;
        document.getElementById('wishlistContainer').appendChild(wishlistBox);

        wishlistNames.push(name);

        wishlistBox.querySelector('.viewButton').addEventListener('click', function() {
            // Add code to redirect the user to the wishlist page using the wishlist name
        });

        wishlistBox.querySelector('.deleteButton').addEventListener('click', function() {
            var deleteButton = wishlistBox.querySelector('.deleteButton');
            var confirmDeleteButton = wishlistBox.querySelector('.confirmDeleteButton');

            if (deleteButton.textContent == 'Delete') {
                deleteButton.style.display = 'none';
                confirmDeleteButton.style.display = 'block';
                confirmDeleteButton.addEventListener('click', function() {
                    wishlistBox.remove();
                    deleteWishlist(name);
                });
				setTimeout(function() {
				confirmDeleteButton.style.display = 'none';
				deleteButton.style.display = 'block';
				}, 3000);
				
            } else {
                wishlistBox.querySelector('.deleteButton').style.display = 'none';
                confirmDeleteButton.style.display = 'none';
                deleteWishlist(name);
            }
        });
    } else {
        if (name.trim() === '') {
            alert('Wishlist name cannot be blank');
        } else {
            alert('Wishlist name already exists');
        }
    }
}

    function deleteWishlist(name) {
        wishlistNames = wishlistNames.filter(function(item) {
            return item !== name;
        });
    }

    document.getElementById('createWishlistButton').addEventListener('click', function() {
        document.getElementById('createWishlistModal').style.display = 'block';
    });

    document.getElementById('cancelCreate').addEventListener('click', function() {
        document.getElementById('createWishlistModal').style.display = 'none';
    });

    document.getElementById('createWishlistForm').addEventListener('submit', function(event) {
		event.preventDefault();
		var wishlistNameInput = document.getElementById('wishlistName');
		var wishlistName = wishlistNameInput.value;
		createWishlistBox(wishlistName);
		wishlistNameInput.value = ''; // Clear the text box
		document.getElementById('createWishlistModal').style.display = 'none';
	});
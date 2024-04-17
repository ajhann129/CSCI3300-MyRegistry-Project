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

document.addEventListener('DOMContentLoaded', function() {
	const container = document.querySelector('.col-md-12.col-lg-8');
	const buttonsContainer = document.querySelector('.container.mt-5');

	// Function to sort items by name
	function sortByName() {
		let items = Array.from(document.querySelectorAll('.item'));
		items.sort((a, b) => {
			let nameA = a.querySelector('.item-name').textContent.toLowerCase();
			let nameB = b.querySelector('.item-name').textContent.toLowerCase();
			return nameA.localeCompare(nameB);
		});
		items.forEach(item => {
			container.appendChild(item);
		});
	}

	// Function to sort items by price
	function sortByPrice() {
		let items = Array.from(document.querySelectorAll('.item'));
		items.sort((a, b) => {
			let priceA = parseFloat(a.dataset.total);
			let priceB = parseFloat(b.dataset.total);
			return priceA - priceB;
		});
		items.forEach(item => {
			container.appendChild(item);
		});
	}

	// Event listeners for sorting dropdown options
	document.getElementById('sortByName').addEventListener('click', function(event) {
		sortByName();
	});

	document.getElementById('sortByPrice').addEventListener('click', function(event) {
		sortByPrice();
	});

	// Ensure buttons container stays at the top of the page
	window.addEventListener('scroll', function() {
		if (window.pageYOffset > buttonsContainer.offsetTop) {
			buttonsContainer.classList.add('sticky');
		} else {
			buttonsContainer.classList.remove('sticky');
		}
	});
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.col-md-12.col-lg-8');
    const buttonsContainer = document.querySelector('.container.mt-5');
    let sortByNameAscending = true;
    let sortByPriceAscending = true;

    // Function to sort items by name
    function sortByName() {
        let items = Array.from(document.querySelectorAll('.item'));
        items.sort((a, b) => {
            let nameA = a.querySelector('.item-name').textContent.toLowerCase();
            let nameB = b.querySelector('.item-name').textContent.toLowerCase();
            if (sortByNameAscending) {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
        items.forEach(item => {
            container.appendChild(item);
        });
        sortByNameAscending = !sortByNameAscending;
        updateAllSortIndicators();
        // Show name sort indicators and hide price sort indicators
        showNameSortIndicators();
        hidePriceSortIndicators();
    }

    // Function to sort items by price
    function sortByPrice() {
        let items = Array.from(document.querySelectorAll('.item'));
        items.sort((a, b) => {
            let priceA = parseFloat(a.dataset.total);
            let priceB = parseFloat(b.dataset.total);
            if (sortByPriceAscending) {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });
        items.forEach(item => {
            container.appendChild(item);
        });
        sortByPriceAscending = !sortByPriceAscending;
        updateAllSortIndicators();
        // Show price sort indicators and hide name sort indicators
        showPriceSortIndicators();
        hideNameSortIndicators();
    }

    // Function to update all sort indicators
    function updateAllSortIndicators() {
        let nameIndicators = document.querySelectorAll('.name-sort-indicator');
        let priceIndicators = document.querySelectorAll('.price-sort-indicator');

        // Update name indicators
        nameIndicators.forEach(indicator => {
            indicator.innerHTML = sortByNameAscending ? '&#9650;' : '&#9660;'; // Up or down arrow
        });

        // Update price indicators
        priceIndicators.forEach(indicator => {
            indicator.innerHTML = sortByPriceAscending ? '&#9650;' : '&#9660;'; // Up or down arrow
        });
    }

    // Function to show name sort indicators and hide price sort indicators
    function showNameSortIndicators() {
        let nameIndicators = document.querySelectorAll('.name-sort-indicator');
        let priceIndicators = document.querySelectorAll('.price-sort-indicator');

        // Show name indicators
        nameIndicators.forEach(indicator => {
            indicator.style.display = 'inline';
        });

        // Hide price indicators
        priceIndicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    }

    // Function to show price sort indicators and hide name sort indicators
    function showPriceSortIndicators() {
        let nameIndicators = document.querySelectorAll('.name-sort-indicator');
        let priceIndicators = document.querySelectorAll('.price-sort-indicator');

        // Show price indicators
        priceIndicators.forEach(indicator => {
            indicator.style.display = 'inline';
        });

        // Hide name indicators
        nameIndicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    }

    // Function to hide price sort indicators
    function hidePriceSortIndicators() {
        let priceIndicators = document.querySelectorAll('.price-sort-indicator');
        priceIndicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    }

    // Function to hide name sort indicators
    function hideNameSortIndicators() {
        let nameIndicators = document.querySelectorAll('.name-sort-indicator');
        nameIndicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    }

    // Event listener for sorting by name
    document.querySelectorAll('.item-name').forEach(item => {
        item.addEventListener('click', function(event) {
            sortByName();
        });
    });

    // Event listener for sorting by price
    document.querySelectorAll('.item-total').forEach(item => {
        item.addEventListener('click', function(event) {
            sortByPrice();
        });
    });

    // Ensure buttons container stays at the top of the page
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > buttonsContainer.offsetTop) {
            buttonsContainer.classList.add('sticky');
        } else {
            buttonsContainer.classList.remove('sticky');
        }
    });

    // Initialize sort indicators
    updateAllSortIndicators();
});
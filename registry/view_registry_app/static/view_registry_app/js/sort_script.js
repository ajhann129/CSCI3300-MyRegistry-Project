    // Function to handle sorting button clicks
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.addEventListener('click', function() {
            const sortOption = this.getAttribute('data-sort');
            const currentUrl = window.location.href;
            const url = new URL(currentUrl);
            url.searchParams.set('sort_by', sortOption);
            window.location.href = url.toString();
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

    // Function to save sorting preference to local storage
    function saveSortingPreference() {
        localStorage.setItem('sortingPreference', JSON.stringify({
            sortByNameAscending: sortByNameAscending,
            sortByPriceAscending: sortByPriceAscending
        }));
    }

    // Function to load sorting preference from local storage
    function loadSortingPreference() {
        let sortingPreference = JSON.parse(localStorage.getItem('sortingPreference'));
        if (sortingPreference) {
            sortByNameAscending = sortingPreference.sortByNameAscending;
            sortByPriceAscending = sortingPreference.sortByPriceAscending;
        }
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

    // Load sorting preference from local storage
    loadSortingPreference();

    // Apply sorting based on the loaded preference
    if (sortByNameAscending) {
        sortByName();
    } else {
        sortByPrice();
    }

    // Function to handle sorting based on query parameters
    function handleSortingFromQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const sortBy = urlParams.get('sort_by');
        if (sortBy) {
            if (sortBy === 'name_asc') {
                sortByNameAscending = true;
                sortByPriceAscending = true;
                sortByName();
            } else if (sortBy === 'name_desc') {
                sortByNameAscending = false;
                sortByPriceAscending = true;
                sortByName();
            } else if (sortBy === 'price_asc') {
                sortByNameAscending = true;
                sortByPriceAscending = true;
                sortByPrice();
            } else if (sortBy === 'price_desc') {
                sortByNameAscending = true;
                sortByPriceAscending = false;
                sortByPrice();
            }
        }
    }

    // Call the function to handle sorting based on query parameters
    handleSortingFromQueryParams();
});

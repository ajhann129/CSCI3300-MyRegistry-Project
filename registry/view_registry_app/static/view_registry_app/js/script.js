document.getElementById("wishlistButton").addEventListener("click", function() {
    var wishlistURL = this.getAttribute("data-wishlist-url");
    console.log("Wishlist URL:", wishlistURL); // Check if the URL is printed correctly
    if (wishlistURL) {
        window.location.href = wishlistURL;
    }
});
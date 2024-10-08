document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const enlargedImage = document.getElementById('enlargedImage');
    const images = document.querySelectorAll('.preview-size'); // Collect all preview images
    let currentIndex = 0; // Track the currently displayed image index

    // Function to update the enlarged image
    function updateImage(index) {
        if (index >= 0 && index < images.length) {
            enlargedImage.src = images[index].src;
            currentIndex = index; // Update the current index
        }
    }

    // Handle image click to open in overlay
    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            updateImage(index); // Display the clicked image
            overlay.style.display = 'flex'; // Show overlay
        });
    });

    // Close overlay on clicking outside
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    // Add keyboard navigation (left and right arrow keys)
    document.addEventListener('keydown', function(event) {
        if (overlay.style.display === 'flex') {
            if (event.key === 'ArrowRight') {
                // Go to next image
                if (currentIndex < images.length - 1) {
                    updateImage(currentIndex + 1);
                }
            } else if (event.key === 'ArrowLeft') {
                // Go to previous image
                if (currentIndex > 0) {
                    updateImage(currentIndex - 1);
                }
            }
        }
    });

    // Add swipe functionality for touchscreens
    let startX = 0;
    let endX = 0;

    enlargedImage.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX; // Get the starting position
    });

    enlargedImage.addEventListener('touchmove', function(event) {
        endX = event.touches[0].clientX; // Get the movement position
    });

    enlargedImage.addEventListener('touchend', function() {
        if (startX > endX + 50) {
            // Swipe left (go to next image)
            if (currentIndex < images.length - 1) {
                updateImage(currentIndex + 1);
            }
        } else if (startX < endX - 50) {
            // Swipe right (go to previous image)
            if (currentIndex > 0) {
                updateImage(currentIndex - 1);
            }
        }
    });
});

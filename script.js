// 1. Navbar Shadow (Unrelated to Carousels)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-sm');
    } else {
        nav.classList.remove('shadow-sm');
    }
});

// 2. Bootstrap Footer Carousel Initialization
// This code assumes you have a Bootstrap-formatted carousel with the ID "footerCarousel" 
// and that the Bootstrap JS library is included in your HTML.
document.addEventListener('DOMContentLoaded', function () {
    const myCarousel = document.querySelector('#footerCarousel');
    
    if (myCarousel) {
        // Initializes the Bootstrap Carousel component for the footer
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000, 
            wrap: true 
        });
    }
});


// 3. Custom Yoga Class Carousel (The Sliding Logic)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Elements
    const carouselContainer = document.querySelector('.image-carousel-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const items = document.querySelectorAll('.carousel-item');
    const wrapper = document.querySelector('.carousel-wrapper');
    const GAP_WIDTH = 30; 

    // Use the custom carousel elements only
    if (!carouselContainer || items.length === 0 || !wrapper) return;

    let currentIndex = 0;
    const totalItems = items.length;
    let itemFullWidth;
    let visibleItems;

    const calculateMetrics = () => {
        // Fallback or actual calculation for item width
        itemFullWidth = items[0].offsetWidth > 0 ? items[0].offsetWidth + GAP_WIDTH : 140 + GAP_WIDTH;
        visibleItems = Math.floor(wrapper.offsetWidth / itemFullWidth); 
    };

    const updateCarousel = () => {
        calculateMetrics(); 
        const offset = -currentIndex * itemFullWidth;
        carouselContainer.style.transform = `translateX(${offset}px)`;

        const maxIndex = totalItems - visibleItems;

        prevButton.style.opacity = (currentIndex === 0) ? 0.3 : 0.8;
        nextButton.style.opacity = (currentIndex >= maxIndex) ? 0.3 : 0.8;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            updateCarousel();
        }
    };

    const handleNext = () => {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    };

    // Attach Event Listeners
    nextButton.addEventListener('click', handleNext);
    prevButton.addEventListener('click', handlePrev);
    window.addEventListener('resize', updateCarousel); 

    // Initial setup: Use the window.onload event listener for reliable image width calculation.
    window.onload = () => {
        updateCarousel();
    };
    
    // Fallback if the script runs late
    if (document.readyState === 'complete') {
        updateCarousel();
    }
});


// 4. Testimonial Carousel Logic
    // 1. Get all slides once
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // 2. Function to manage visibility
    function showSlide(index) {
        // Handle wrapping around when reaching the end/start
        if (index >= totalSlides) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = totalSlides - 1;
        } else {
            currentSlideIndex = index;
        }

        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active-slide');
        });

        // Add active class to the current slide, making it visible
        slides[currentSlideIndex].classList.add('active-slide');
    }

    // The buttons pass -1 for Previous and +1 for Next
    function moveSlide(direction) {
        showSlide(currentSlideIndex + direction);
    }

    showSlide(currentSlideIndex);

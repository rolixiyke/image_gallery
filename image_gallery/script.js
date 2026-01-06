// Sample image data - you can replace these URLs with your own images
const images = [
    {
        id: 1,
        title: "Mountain Landscape",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=1"
    },
    {
        id: 2,
        title: "Ocean Waves",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=2"
    },
    {
        id: 3,
        title: "Forest Path",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=3"
    },
    {
        id: 4,
        title: "Sunset Sky",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=4"
    },
    {
        id: 5,
        title: "Urban Architecture",
        category: "City",
        url: "https://picsum.photos/500/500?random=5"
    },
    {
        id: 6,
        title: "Night City",
        category: "City",
        url: "https://picsum.photos/500/500?random=6"
    },
    {
        id: 7,
        title: "Desert Dunes",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=7"
    },
    {
        id: 8,
        title: "Autumn Colors",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=8"
    },
    {
        id: 9,
        title: "Snow Mountains",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=9"
    },
    {
        id: 10,
        title: "Tropical Beach",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=10"
    },
    {
        id: 11,
        title: "City Lights",
        category: "City",
        url: "https://picsum.photos/500/500?random=11"
    },
    {
        id: 12,
        title: "Starry Night",
        category: "Nature",
        url: "https://picsum.photos/500/500?random=12"
    }
];

let filteredImages = [...images];
let currentImageIndex = 0;

// DOM Elements
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const imageTitle = document.getElementById('imageTitle');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize gallery
function init() {
    renderGallery();
    attachEventListeners();
}

// Render gallery items
function renderGallery() {
    gallery.innerHTML = '';

    if (filteredImages.length === 0) {
        gallery.innerHTML = '<div class="no-results">No images found</div>';
        return;
    }

    filteredImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${image.title}</div>
                <div class="gallery-item-category">${image.category}</div>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    lightbox.classList.add('active');
    updateLightboxImage();
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Update lightbox image
function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    lightboxImage.src = image.url;
    imageTitle.textContent = `${image.title} - ${image.category}`;
}

// Navigate to previous image
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Filter images based on search
function filterImages(searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredImages = images.filter(image =>
        image.title.toLowerCase().includes(term) ||
        image.category.toLowerCase().includes(term)
    );
    renderGallery();
}

// Attach event listeners
function attachEventListeners() {
    searchInput.addEventListener('input', (e) => {
        filterImages(e.target.value);
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', previousImage);
    nextBtn.addEventListener('click', nextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);

// ========== Image Data ==========
const images = [
    {
        id: 1,
        title: '医療技術の未来',
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop'
    },
    {
        id: 2,
        title: '薬剤研究',
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop'
    },
    {
        id: 3,
        title: 'ラボラトリー分析',
        src: 'https://images.unsplash.com/photo-1530026405186-a32203b69519?w=500&h=400&fit=crop'
    },
    {
        id: 4,
        title: '医学知識',
        src: 'https://images.unsplash.com/photo-1579154204601-01d430e8e56b?w=500&h=400&fit=crop'
    },
    {
        id: 5,
        title: 'ヘルスケア',
        src: 'https://images.unsplash.com/photo-1532996122724-8f3c58e9c869?w=500&h=400&fit=crop'
    },
    {
        id: 6,
        title: '医療専門家',
        src: 'https://images.unsplash.com/photo-1579154204601-01d430e8e56b?w=500&h=400&fit=crop'
    },
    {
        id: 7,
        title: '科学実験',
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop'
    },
    {
        id: 8,
        title: '薬局管理',
        src: 'https://images.unsplash.com/photo-1530026405186-a32203b69519?w=500&h=400&fit=crop'
    },
    {
        id: 9,
        title: 'デジタルヘルス',
        src: 'https://images.unsplash.com/photo-1579154204601-01d430e8e56b?w=500&h=400&fit=crop'
    },
    {
        id: 10,
        title: '医療イノベーション',
        src: 'https://images.unsplash.com/photo-1532996122724-8f3c58e9c869?w=500&h=400&fit=crop'
    }
];

// ========== DOM Elements ==========
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const noResults = document.getElementById('noResults');
const parallaxItems = document.querySelectorAll('.parallax-item');

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    renderGallery(images);
    initializeSearch();
    initializeSearchBtn();
    initializeParallax();
    loadLikes();
});

// ========== Render Gallery ==========
function renderGallery(imagesToRender) {
    // Save PDF item before clearing
    const pdfItem = galleryGrid.querySelector('.pdf-gallery-item');
    const pdfItemClone = pdfItem ? pdfItem.cloneNode(true) : null;

    // Check if PDF should be shown (based on search)
    // Show PDF by default, unless explicitly hidden
    const showPdf = !imagesToRender._hidePdf;

    galleryGrid.innerHTML = '';

    // If no images AND no PDF to show
    if (imagesToRender.length === 0 && !showPdf) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    // Restore PDF item first if it should be shown
    if (pdfItemClone && showPdf) {
        galleryGrid.appendChild(pdfItemClone);
        // Restore like button functionality for PDF item
        const pdfLikeBtn = pdfItemClone.querySelector('.btn-like');
        if (pdfLikeBtn) {
            const likeCount = pdfLikeBtn.querySelector('.like-count');
            likeCount.textContent = getLikeCount(0);
            if (isLiked(0)) {
                pdfLikeBtn.classList.add('liked');
                pdfLikeBtn.querySelector('.like-icon').textContent = '♥️';
            }
            pdfLikeBtn.onclick = function() {
                toggleLike(this, 0);
            };
        }
    }

    imagesToRender.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;

        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="gallery-image" loading="lazy">
            <div class="gallery-content">
                <h3 class="gallery-title">${image.title}</h3>
                <div class="gallery-actions">
                    <button class="btn btn-download" onclick="downloadImage(${image.id}, '${image.title}')">
                        <span>⬇️</span>
                        <span>ダウンロード</span>
                    </button>
                    <button class="btn btn-like" onclick="toggleLike(this, ${image.id})">
                        <span class="like-icon">♡</span>
                        <span class="like-count">${getLikeCount(image.id)}</span>
                    </button>
                </div>
            </div>
        `;

        // Set liked state on load
        const likeBtn = item.querySelector('.btn-like');
        if (isLiked(image.id)) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('.like-icon').textContent = '♥️';
        }

        galleryGrid.appendChild(item);
    });
}

// PDF title constant
const PDF_TITLE = 'オレキシン受容体拮抗薬';

// ========== Search Functionality ==========
function initializeSearch() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            renderGallery(images);
        } else {
            // Check if PDF title matches query
            const pdfMatches = PDF_TITLE.toLowerCase().includes(query);

            // Filter images
            const filtered = images.filter(image =>
                image.title.toLowerCase().includes(query)
            );

            // Store PDF match status
            if (pdfMatches) {
                filtered._showPdf = true;
            } else {
                filtered._hidePdf = true;
            }

            renderGallery(filtered);
        }
    });
}

// ========== Search Button ==========
function initializeSearchBtn() {
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Trigger search manually
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
            searchInput.focus();
        });
    }
}

// ========== Download Functionality ==========
function downloadImage(id, title) {
    const image = images.find(img => img.id === id);
    if (!image) return;

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show notification
    showNotification(`"${title}" をダウンロード中...`);
}

// ========== Like Functionality ==========
function toggleLike(button, id) {
    button.classList.toggle('liked');

    const likeIcon = button.querySelector('.like-icon');
    const likeCount = button.querySelector('.like-count');

    if (button.classList.contains('liked')) {
        likeIcon.textContent = '♥️';
        addLike(id);
    } else {
        likeIcon.textContent = '♡';
        removeLike(id);
    }

    likeCount.textContent = getLikeCount(id);
    saveLikes();
}

function isLiked(id) {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    return likes[id] || false;
}

function addLike(id) {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    likes[id] = true;
    localStorage.setItem('likes', JSON.stringify(likes));
}

function removeLike(id) {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    delete likes[id];
    localStorage.setItem('likes', JSON.stringify(likes));
}

function getLikeCount(id) {
    const likes = JSON.parse(localStorage.getItem('likeCounts')) || {};
    return likes[id] || 0;
}

function saveLikes() {
    const likeCounts = {};
    images.forEach(image => {
        if (isLiked(image.id)) {
            likeCounts[image.id] = (likeCounts[image.id] || 0) + 1;
        }
    });
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
}

function loadLikes() {
    // Initialize like counts from localStorage
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};

    images.forEach(image => {
        if (!likeCounts[image.id]) {
            likeCounts[image.id] = Math.floor(Math.random() * 100);
        }
    });

    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
}

// ========== Parallax Scrolling Effect ==========
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxItems.forEach((item, index) => {
            const speed = 0.5 + (index * 0.05);
            const yPos = scrollY * speed;
            const xPos = (scrollY * speed) * Math.cos(index);

            item.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrollY * 0.1}deg)`;
        });
    });
}

// ========== Notification ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 16px 24px;
        font-size: 0.95rem;
        color: var(--text-dark);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ========== Add CSS Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

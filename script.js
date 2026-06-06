// ========== Image Data ==========
const images = [
    {
        id: 0,
        title: 'オレキシン受容体拮抗薬',
        pdfFile: 'オレキシン受容体拮抗薬まとめ.pdf',
        isPdf: true
    },
    {
        id: 1,
        title: '鼻噴霧用ステロイド薬まとめ',
        pdfFile: '鼻噴霧用ステロイド薬まとめ.pdf',
        isPdf: true
    },
    {
        id: 2,
        title: 'ベンゾジアゼピン系睡眠薬まとめ①',
        pdfFile: 'ベンゾジアゼピン系睡眠薬まとめ①.pdf',
        isPdf: true
    },
    {
        id: 3,
        title: 'ベンゾジアゼピン系睡眠薬まとめ②',
        pdfFile: 'ベンゾジアゼピン系睡眠薬まとめ②.pdf',
        isPdf: true
    },
    {
        id: 4,
        title: 'アラミストとフルナーゼ比較表',
        pdfFile: 'アラミストとフルナーゼ比較表.pdf',
        isPdf: true
    },
    {
        id: 5,
        title: 'インフルエンザウイルス治療薬まとめ',
        pdfFile: 'インフルエンザウイルス治療薬まとめ.pdf',
        isPdf: true
    },
    {
        id: 6,
        title: 'コロナウイルス治療薬まとめ',
        pdfFile: 'コロナウイルス治療薬まとめ.pdf',
        isPdf: true
    },
    {
        id: 7,
        title: '医療技術の未来',
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop'
    },
    {
        id: 8,
        title: '医学研究',
        src: 'https://images.unsplash.com/photo-1530026405186-a32203b69519?w=500&h=400&fit=crop'
    },
    {
        id: 9,
        title: '科学技術',
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
    galleryGrid.innerHTML = '';

    if (imagesToRender.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    imagesToRender.forEach((image, index) => {
        if (image.isPdf) {
            // Render PDF item
            const item = document.createElement('div');
            item.className = 'gallery-item pdf-gallery-item';
            item.style.animationDelay = `${index * 0.1}s`;

            // URL encode the PDF filename
            const encodedPdfFile = encodeURI(image.pdfFile);

            item.innerHTML = `
                <div class="pdf-viewer">
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, rgba(0, 217, 217, 0.1) 0%, rgba(0, 217, 217, 0.05) 100%); font-size: 3rem;">
                        📄
                    </div>
                </div>
                <div class="gallery-content">
                    <h3 class="gallery-title">${image.title}</h3>
                    <div class="gallery-actions">
                        <a href="./${encodedPdfFile}" download class="btn btn-download">
                            <span>⬇️</span>
                            <span>ダウンロード</span>
                        </a>
                        <button class="btn btn-like" onclick="toggleLike(this, ${image.id})">
                            <span class="like-icon">♡</span>
                            <span class="like-count">${getLikeCount(image.id)}</span>
                        </button>
                    </div>
                </div>
            `;

            const likeBtn = item.querySelector('.btn-like');
            if (isLiked(image.id)) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('.like-icon').textContent = '♥️';
            }

            galleryGrid.appendChild(item);
        } else {
            // Render image item
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

            const likeBtn = item.querySelector('.btn-like');
            if (isLiked(image.id)) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('.like-icon').textContent = '♥️';
            }

            galleryGrid.appendChild(item);
        }
    });
}

// ========== Search Functionality ==========
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (query === '') {
        renderGallery(images);
    } else {
        // Filter all items (including PDF)
        const filtered = images.filter(image =>
            image.title.toLowerCase().includes(query)
        );

        renderGallery(filtered);
    }
}

function initializeSearch() {
    if (!searchInput) {
        console.error('Search input element not found');
        return;
    }

    // Handle input event (real-time search)
    searchInput.addEventListener('input', performSearch);

    // Handle change event (for programmatic input)
    searchInput.addEventListener('change', performSearch);

    // Handle keypress event for Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
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

// ========== Login System ==========
const PASS_HASH = '5a0e42e1f3c8b9d7'; // hashed
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
}

function showMainSite() {
    const loginScreen = document.getElementById('loginScreen');
    const mainSite = document.getElementById('mainSite');
    if (loginScreen) loginScreen.style.display = 'none';
    if (mainSite) {
        mainSite.classList.remove('hidden');
        mainSite.classList.add('fade-in');
        // Initialize main site components after showing
        setTimeout(() => {
            renderGallery(images);
            initializeSearch();
            initializeSearchBtn();
            initializeParallax();
            loadLikes();
            initHeaderAnimation();
        }, 100);
    }
}

function initLogin() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        showMainSite();
        return;
    }

    const loginScreen = document.getElementById('loginScreen');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');

    if (!loginBtn) return;

    function attemptLogin() {
        const password = passwordInput.value;
        if (password === 'yaku-office') {
            loginError.classList.add('hidden');
            sessionStorage.setItem('loggedIn', 'true');
            loginScreen.classList.add('fade-out');
            setTimeout(() => {
                showMainSite();
            }, 500);
        } else {
            loginError.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptLogin();
    });
}

// ========== Image Data ==========
const images = [
    {
        id: 0,
        title: 'オレキシン受容体拮抗薬',
        pdfFile: 'オレキシン受容体拮抗薬まとめ.pdf',
        preview: './previews/オレキシン受容体拮抗薬まとめ.pdf.png',
        isPdf: true
    },
    {
        id: 1,
        title: '鼻噴霧用ステロイド薬まとめ',
        pdfFile: '鼻噴霧用ステロイド薬まとめ.pdf',
        preview: './previews/鼻噴霧用ステロイド薬まとめ.pdf.png',
        isPdf: true
    },
    {
        id: 2,
        title: 'ベンゾジアゼピン系睡眠薬まとめ①',
        pdfFile: 'ベンゾジアゼピン系睡眠薬まとめ①.pdf',
        preview: './previews/ベンゾジアゼピン系睡眠薬まとめ①.pdf.png',
        isPdf: true
    },
    {
        id: 3,
        title: 'ベンゾジアゼピン系睡眠薬まとめ②',
        pdfFile: 'ベンゾジアゼピン系睡眠薬まとめ②.pdf',
        preview: './previews/ベンゾジアゼピン系睡眠薬まとめ②.pdf.png',
        isPdf: true
    },
    {
        id: 4,
        title: 'アラミストとフルナーゼ比較表',
        pdfFile: 'アラミストとフルナーゼ比較表.pdf',
        preview: './previews/アラミストとフルナーゼ比較表.pdf.png',
        isPdf: true
    },
    {
        id: 5,
        title: 'インフルエンザウイルス治療薬まとめ',
        pdfFile: 'インフルエンザウイルス治療薬まとめ.pdf',
        preview: './previews/インフルエンザウイルス治療薬まとめ.pdf.png',
        isPdf: true
    },
    {
        id: 6,
        title: 'コロナウイルス治療薬まとめ',
        pdfFile: 'コロナウイルス治療薬まとめ.pdf',
        preview: './previews/コロナウイルス治療薬まとめ.pdf.png',
        isPdf: true
    },
    {
        id: 7,
        title: '夜間・休日等加算＆時間外加算　まとめ表',
        pdfFile: '時間外等加算まとめ_A4.pdf',
        preview: './previews/時間外等加算まとめ_A4.pdf.png',
        isPdf: true
    },
    {
        id: 8,
        title: '調剤管理料2026　新旧比較表',
        pdfFile: '調剤管理料_新旧比較表_1.pdf',
        preview: './previews/調剤管理料_新旧比較表_1.pdf.png',
        isPdf: true
    },
];

// ========== DOM Elements ==========
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const noResults = document.getElementById('noResults');
const parallaxItems = document.querySelectorAll('.parallax-item');

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    if (sessionStorage.getItem('loggedIn') === 'true') {
        renderGallery(images);
        initializeSearch();
        initializeSearchBtn();
        initializeParallax();
        loadLikes();
        initHeaderAnimation();
    }
});

// ========== Header Canvas Animation ==========
function initHeaderAnimation() {
    const canvas = document.getElementById('headerCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        const header = canvas.parentElement;
        canvas.width = header.offsetWidth * window.devicePixelRatio;
        canvas.height = header.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width / window.devicePixelRatio;
    const H = () => canvas.height / window.devicePixelRatio;

    // Medicine icons floating
    const icons = ['💊', '⚕️', '🧪', '💉', '🩺', '🔬', '📖', '🧬', '🏥', '💊', '⚕️', '🧪'];
    const floaters = icons.map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 300,
        size: 14 + Math.random() * 18,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: 0.15 + Math.random() * 0.25,
        icon: icons[Math.floor(Math.random() * icons.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
    }));

    // Particles (small glowing dots)
    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * 1200,
            y: Math.random() * 300,
            radius: 1 + Math.random() * 2.5,
            speedX: (Math.random() - 0.5) * 0.6,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: 0.2 + Math.random() * 0.4,
            pulse: Math.random() * Math.PI * 2
        });
    }

    // DNA helix points
    const dnaPoints = 20;

    // Connection lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    const connColor = (i + j) % 2 === 0 ? `rgba(0, 217, 217, ${0.08 * (1 - dist / 100)})` : `rgba(168, 181, 197, ${0.1 * (1 - dist / 100)})`;
                    ctx.strokeStyle = connColor;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Draw DNA double helix
    function drawDNA(time) {
        const w = W();
        const h = H();
        const centerX = w * 0.85;
        const amplitude = 25;

        ctx.lineWidth = 1.5;
        for (let i = 0; i < dnaPoints; i++) {
            const t = (i / dnaPoints) * h;
            const offset = Math.sin(t * 0.03 + time * 0.002) * amplitude;
            const x1 = centerX + offset;
            const x2 = centerX - offset;
            const y = t;
            const alpha = 0.15 + Math.sin(time * 0.003 + i) * 0.08;

            // Strand 1
            if (i > 0) {
                const prevOffset = Math.sin(((i - 1) / dnaPoints * h) * 0.03 + time * 0.002) * amplitude;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 217, 217, ${alpha})`;
                ctx.moveTo(centerX + prevOffset, (i - 1) / dnaPoints * h);
                ctx.lineTo(x1, y);
                ctx.stroke();

                // Strand 2
                ctx.beginPath();
                ctx.strokeStyle = `rgba(168, 181, 197, ${alpha + 0.05})`;
                ctx.moveTo(centerX - prevOffset, (i - 1) / dnaPoints * h);
                ctx.lineTo(x2, y);
                ctx.stroke();
            }

            // Cross bars
            if (i % 3 === 0) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 200, 200, ${alpha * 0.6})`;
                ctx.lineWidth = 1;
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.stroke();
                ctx.lineWidth = 1.5;
            }

            // Dots at ends
            ctx.beginPath();
            ctx.fillStyle = `rgba(0, 217, 217, ${alpha + 0.1})`;
            ctx.arc(x1, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = `rgba(168, 181, 197, ${alpha + 0.15})`;
            ctx.arc(x2, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Glowing orb effect
    function drawOrbs(time) {
        const w = W();
        const h = H();

        // Orb 1
        const orb1X = w * 0.2 + Math.sin(time * 0.001) * 50;
        const orb1Y = h * 0.4 + Math.cos(time * 0.0015) * 30;
        const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 80);
        grad1.addColorStop(0, 'rgba(0, 217, 217, 0.12)');
        grad1.addColorStop(1, 'rgba(0, 217, 217, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(orb1X - 80, orb1Y - 80, 160, 160);

        // Orb 2
        const orb2X = w * 0.7 + Math.cos(time * 0.0012) * 40;
        const orb2Y = h * 0.6 + Math.sin(time * 0.001) * 25;
        const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 60);
        grad2.addColorStop(0, 'rgba(168, 181, 197, 0.15)');
        grad2.addColorStop(1, 'rgba(168, 181, 197, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(orb2X - 60, orb2Y - 60, 120, 120);
    }

    let time = 0;

    function animate() {
        const w = W();
        const h = H();
        ctx.clearRect(0, 0, w, h);
        time++;

        // Glowing orbs
        drawOrbs(time);

        // DNA helix
        drawDNA(time);

        // Connection lines
        drawConnections();

        // Particles
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.03;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            const currentOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
            ctx.beginPath();
            const pColor = particles.indexOf(p) % 2 === 0
                ? `rgba(0, 217, 217, ${currentOpacity})`
                : `rgba(168, 181, 197, ${currentOpacity + 0.1})`;
            ctx.fillStyle = pColor;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Floating medicine icons
        floaters.forEach(f => {
            f.x += f.speedX;
            f.y += f.speedY;
            f.rotation += f.rotationSpeed;

            if (f.x < -30) f.x = w + 30;
            if (f.x > w + 30) f.x = -30;
            if (f.y < -30) f.y = h + 30;
            if (f.y > h + 30) f.y = -30;

            ctx.save();
            ctx.translate(f.x, f.y);
            ctx.rotate(f.rotation);
            ctx.globalAlpha = f.opacity;
            ctx.font = `${f.size}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(f.icon, 0, 0);
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

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

            item.innerHTML = `
                <img src="${image.preview}" alt="${image.title}" class="gallery-image" loading="lazy">
                <div class="gallery-content">
                    <h3 class="gallery-title">${image.title}</h3>
                    <div class="gallery-actions">
                        <a href="./${image.pdfFile}" download class="btn btn-download">
                            <span>⬇️</span>
                            <span>ダウンロード</span>
                        </a>
                        <button class="btn btn-like" onclick="toggleLike(this, ${image.id})">
                            <span class="like-icon">👍</span>
                            <span class="like-count">${getLikeCount(image.id)}</span>
                        </button>
                    </div>
                </div>
            `;

            const likeBtn = item.querySelector('.btn-like');
            if (isLiked(image.id)) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('.like-icon').textContent = '👍';
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
                            <span class="like-icon">👍</span>
                            <span class="like-count">${getLikeCount(image.id)}</span>
                        </button>
                    </div>
                </div>
            `;

            const likeBtn = item.querySelector('.btn-like');
            if (isLiked(image.id)) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('.like-icon').textContent = '👍';
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

// ========== Good (👍) Functionality ==========
function toggleLike(button, id) {
    const likeIcon = button.querySelector('.like-icon');
    const likeCount = button.querySelector('.like-count');
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};
    const liked = JSON.parse(localStorage.getItem('likes')) || {};

    if (liked[id]) {
        // Already liked → remove
        liked[id] = false;
        likeCounts[id] = Math.max((likeCounts[id] || 1) - 1, 0);
        button.classList.remove('liked');
        likeIcon.textContent = '👍';
    } else {
        // Not liked → add +1
        liked[id] = true;
        likeCounts[id] = (likeCounts[id] || 0) + 1;
        button.classList.add('liked');
        likeIcon.textContent = '👍';
    }

    likeCount.textContent = likeCounts[id];
    localStorage.setItem('likes', JSON.stringify(liked));
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
}

function isLiked(id) {
    const likes = JSON.parse(localStorage.getItem('likes')) || {};
    return likes[id] || false;
}

function getLikeCount(id) {
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};
    return likeCounts[id] || 0;
}

function loadLikes() {
    const likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};
    images.forEach(image => {
        if (likeCounts[image.id] === undefined) {
            likeCounts[image.id] = 0;
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

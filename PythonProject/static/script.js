/*ДАННЫЕ*/
const PRODUCTS = [
    { id: 1, name: 'Шерстяное пальто', category: 'Верхняя одежда', price: 12990, oldPrice: 18990, badge: 'SALE', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Оверсайз рубашка', category: 'Рубашки', price: 4490, oldPrice: null, badge: 'NEW', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Джинсы Mom Fit', category: 'Джинсы', price: 5990, oldPrice: 8490, badge: 'SALE', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80' },
    { id: 4, name: 'Худи Oversize', category: 'Спорт', price: 3790, oldPrice: null, badge: 'NEW', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop&q=80' },
    { id: 5, name: 'Вечернее платье', category: 'Платья', price: 9490, oldPrice: null, badge: null, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=80' },
    { id: 6, name: 'Кожаная куртка', category: 'Верхняя одежда', price: 14990, oldPrice: 21990, badge: 'SALE', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80' },
    { id: 7, name: 'Вязаный свитер', category: 'Трикотаж', price: 6290, oldPrice: null, badge: 'NEW', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400&auto=format&fit=crop&q=80' },
    { id: 8, name: 'Кроссовки Urban', category: 'Обувь', price: 8990, oldPrice: null, badge: null, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&auto=format&fit=crop&q=80' },
];

/*ХРАНИЛИЩЕ*/
const Store = {
    get(key, fallback = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch { return fallback; }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

/* Пользователи */
function getUsers() { return Store.get('moda_users', []); }
function saveUsers(users) { Store.set('moda_users', users); }
function getCurrentUser() { return Store.get('moda_current_user', null); }
function setCurrentUser(user) { Store.set('moda_current_user', user); }
function logout() { Store.remove('moda_current_user'); }

/* Корзина */
function getCart() { return Store.get('moda_cart', []); }
function saveCart(cart) {
    Store.set('moda_cart', cart);
    updateCounters();
}

/* Избранное */
function getFavorites() { return Store.get('moda_favorites', []); }
function saveFavorites(favs) {
    Store.set('moda_favorites', favs);
    updateCounters();
}

/* Заказы */
function getOrders() { return Store.get('moda_orders', []); }
function saveOrders(orders) { Store.set('moda_orders', orders); }

/*УТИЛИТЫ*/
function formatPrice(num) {
    return num.toLocaleString('ru-RU') + ' ₽';
}

function getProduct(id) {
    return PRODUCTS.find(p => p.id === id);
}

function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.className = 'toast ' + type;
    toast.innerHTML = (type === 'success' ? '✅ ' : '⚠️ ') + message;
    setTimeout(() => toast.classList.add('show'), 10);
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/*ШАПКА*/
function updateCounters() {
    const cartCount = document.querySelectorAll('.cart-counter');
    const favCount = document.querySelectorAll('.fav-counter');
    const cartTotal = getCart().reduce((s, i) => s + i.quantity, 0);
    const favTotal = getFavorites().length;

    cartCount.forEach(el => {
        el.textContent = cartTotal;
        el.style.display = cartTotal > 0 ? 'flex' : 'none';
    });
    favCount.forEach(el => {
        el.textContent = favTotal;
        el.style.display = favTotal > 0 ? 'flex' : 'none';
    });
}

function renderUserGreeting() {
    const user = getCurrentUser();
    const greetingEls = document.querySelectorAll('.user-greeting');
    const loginLinks = document.querySelectorAll('.login-link');
    const logoutLinks = document.querySelectorAll('.logout-link');

    greetingEls.forEach(el => {
        if (user) {
            el.innerHTML = `Привет, <span>${user.name}</span>`;
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });

    loginLinks.forEach(el => el.style.display = user ? 'none' : 'inline-block');
    logoutLinks.forEach(el => el.style.display = user ? 'inline-block' : 'none');
}

function handleLogout(e) {
    if (e) e.preventDefault();
    logout();
    showToast('Вы вышли из аккаунта');
    setTimeout(() => window.location.href = 'index.html', 600);
}

/*КОРЗИНА*/
function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
    showToast('Товар добавлен в корзину');
    renderProducts();
}

function isInCart(productId) {
    return getCart().some(i => i.id === productId);
}

/*ИЗБРАННОЕ*/
function toggleFavorite(productId) {
    const favs = getFavorites();
    const idx = favs.indexOf(productId);
    if (idx > -1) {
        favs.splice(idx, 1);
        showToast('Удалено из избранного');
    } else {
        favs.push(productId);
        showToast('Добавлено в избранное');
    }
    saveFavorites(favs);
    renderProducts();
}

function isFavorite(productId) {
    return getFavorites().includes(productId);
}

/*РЕНДЕР ТОВАРОВ*/
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map(p => `
        <div class="product-card">
            <div class="product-image">
                ${p.badge ? `<span class="badge ${p.badge === 'NEW' ? 'new' : ''}">${p.badge}</span>` : ''}
                <button class="fav-btn ${isFavorite(p.id) ? 'active' : ''}" onclick="toggleFavorite(${p.id})" title="В избранное">
                    ${isFavorite(p.id) ? '♥' : '♡'}
                </button>
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="category-label">${p.category}</div>
                <div class="product-price">
                    <span class="current">${formatPrice(p.price)}</span>
                    ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart ${isInCart(p.id) ? 'in-cart' : ''}" onclick="addToCart(${p.id})">
                    ${isInCart(p.id) ? '✓ В корзине' : 'В корзину'}
                </button>
            </div>
        </div>
    `).join('');
}

/*ИНИЦИАЛИЗАЦИЯ*/
document.addEventListener('DOMContentLoaded', () => {
    updateCounters();
    renderUserGreeting();
    renderProducts();
});
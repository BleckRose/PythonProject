/* ==================== ДАННЫЕ ==================== */
const PRODUCTS = [
    {
        id: 1,
        name: 'Шерстяное пальто',
        category: 'Верхняя одежда',
        price: 12990,
        oldPrice: 18990,
        badge: 'SALE',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
        description: 'Классическое шерстяное пальто прямого кроя. Идеально подходит для прохладной осени и мягкой зимы. Сочетается с джинсами, брюками и платьями.',
        composition: '70% шерсть, 25% полиэстер, 5% кашемир',
        country: 'Италия',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Оверсайз рубашка',
        category: 'Рубашки',
        price: 4490,
        oldPrice: null,
        badge: 'NEW',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
        description: 'Свободная рубашка в стиле оверсайз. Выполнена из плотного хлопка, отлично держит форму и не мнётся. Универсальная вещь на каждый день.',
        composition: '100% хлопок',
        country: 'Турция',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Джинсы Mom Fit',
        category: 'Джинсы',
        price: 5990,
        oldPrice: 8490,
        badge: 'SALE',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
        description: 'Джинсы с высокой посадкой и свободным кроем. Винтажный стиль 90-х в современном исполнении. Комфортны весь день.',
        composition: '98% хлопок, 2% эластан',
        country: 'Китай',
        sizes: ['25', '26', '27', '28', '29', '30']
    },
    {
        id: 4,
        name: 'Худи Oversize',
        category: 'Спорт',
        price: 3790,
        oldPrice: null,
        badge: 'NEW',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
        description: 'Тёплое худи свободного кроя. Внутри — мягкий начёс. Отлично подходит для спорта и повседневной носки.',
        composition: '80% хлопок, 20% полиэстер',
        country: 'Бангладеш',
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 5,
        name: 'Вечернее платье',
        category: 'Платья',
        price: 9490,
        oldPrice: null,
        badge: null,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
        description: 'Элегантное вечернее платье миди. Открытая спина, струящаяся ткань. Создано для особых вечеров и торжественных мероприятий.',
        composition: '95% вискоза, 5% эластан',
        country: 'Италия',
        sizes: ['XS', 'S', 'M', 'L']
    },
    {
        id: 6,
        name: 'Кожаная куртка',
        category: 'Верхняя одежда',
        price: 14990,
        oldPrice: 21990,
        badge: 'SALE',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
        description: 'Куртка из натуральной кожи. Классический байкерский крой, металлические молнии, подкладка из полиэстера. Служит годами.',
        composition: '100% натуральная кожа, подкладка 100% полиэстер',
        country: 'Пакистан',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 7,
        name: 'Вязаный свитер',
        category: 'Трикотаж',
        price: 6290,
        oldPrice: null,
        badge: 'NEW',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&auto=format&fit=crop&q=80',
        description: 'Тёплый вязаный свитер крупной вязки. Объёмный воротник, свободный крой. Идеален для уютных зимних вечеров.',
        composition: '60% шерсть, 40% акрил',
        country: 'Норвегия',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 8,
        name: 'Кроссовки Urban',
        category: 'Обувь',
        price: 8990,
        oldPrice: null,
        badge: null,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80',
        description: 'Городские кроссовки на массивной подошве. Амортизирующая стелька, дышащие материалы. Стиль и комфорт каждый день.',
        composition: 'Верх: текстиль + эко-кожа, подошва: резина',
        country: 'Вьетнам',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44']
    },
];

/* ==================== ХРАНИЛИЩЕ ==================== */
const Store = {
    get(key, fallback = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch { return fallback; }
    },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
    remove(key) { localStorage.removeItem(key); }
};

function getUsers() { return Store.get('moda_users', []); }
function saveUsers(users) { Store.set('moda_users', users); }
function getCurrentUser() { return Store.get('moda_current_user', null); }
function setCurrentUser(user) { Store.set('moda_current_user', user); }
function logout() { Store.remove('moda_current_user'); }

function getCart() { return Store.get('moda_cart', []); }
function saveCart(cart) { Store.set('moda_cart', cart); updateCounters(); }

function getFavorites() { return Store.get('moda_favorites', []); }
function saveFavorites(favs) { Store.set('moda_favorites', favs); updateCounters(); }

function getOrders() { return Store.get('moda_orders', []); }
function saveOrders(orders) { Store.set('moda_orders', orders); }

/* ==================== УТИЛИТЫ ==================== */
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

/* ==================== ШАПКА ==================== */
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
    setTimeout(() => window.location.href = '/', 600);
}

/* ==================== КОРЗИНА ==================== */
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
    renderCategoryProducts('categoryGrid');
    if (typeof updateProductPageButtons === 'function') updateProductPageButtons();
    if (typeof renderCart === 'function' && document.getElementById('cartContent')) renderCart();
    if (typeof renderFavorites === 'function' && document.getElementById('favContent')) renderFavorites();
}

function removeFromCart(productId) {
    const cart = getCart().filter(i => i.id !== productId);
    saveCart(cart);
    showToast('Товар удалён из корзины');

    renderProducts();
    renderCategoryProducts('categoryGrid');
    if (typeof updateProductPageButtons === 'function') updateProductPageButtons();
    if (typeof renderCart === 'function' && document.getElementById('cartContent')) renderCart();
    if (typeof renderFavorites === 'function' && document.getElementById('favContent')) renderFavorites();
}

function isInCart(productId) {
    return getCart().some(i => i.id === productId);
}

/* ==================== ИЗБРАННОЕ ==================== */
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
    renderCategoryProducts('categoryGrid');
    if (typeof renderFavorites === 'function' && document.getElementById('favContent')) renderFavorites();
    if (typeof updateProductPageButtons === 'function') updateProductPageButtons();
}

function isFavorite(productId) {
    return getFavorites().includes(productId);
}

/* ==================== ОБЩИЙ ШАБЛОН КАРТОЧКИ ==================== */
function productCardHTML(p) {
    const inCart = isInCart(p.id);
    const fav = isFavorite(p.id);

    return `
        <div class="product-card">
            <a href="/product/${p.id}" class="product-card-link">
                <div class="product-image">
                    ${p.badge ? `<span class="badge ${p.badge === 'NEW' ? 'new' : ''}">${p.badge}</span>` : ''}
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </div>
            </a>
            <button class="fav-btn ${fav ? 'active' : ''}"
                    onclick="event.preventDefault(); toggleFavorite(${p.id});"
                    title="В избранное">
                ${fav ? '♥' : '♡'}
            </button>
            <div class="product-info">
                <a href="/product/${p.id}" class="product-card-link">
                    <h3>${p.name}</h3>
                    <div class="category-label">${p.category}</div>
                </a>
                <div class="product-price">
                    <span class="current">${formatPrice(p.price)}</span>
                    ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ''}
                </div>
                <div class="product-actions">
                    ${inCart
                        ? `<button class="add-to-cart in-cart" onclick="removeFromCart(${p.id})">✕ Убрать из корзины</button>`
                        : `<button class="add-to-cart" onclick="addToCart(${p.id})">В корзину</button>`
                    }
                </div>
            </div>
        </div>
    `;
}

/* ==================== РЕНДЕР ТОВАРОВ (главная) ==================== */
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(productCardHTML).join('');
}

/* ==================== РЕНДЕР КАТЕГОРИИ ==================== */
function renderCategoryProducts(containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    const ids = grid.dataset.ids.split(',').map(n => parseInt(n.trim(), 10));
    const items = ids.map(id => getProduct(id)).filter(Boolean);

    grid.innerHTML = items.map(productCardHTML).join('');
}

/* ==================== ОБНОВЛЕНИЕ КНОПОК НА СТРАНИЦЕ ТОВАРА ==================== */
function updateProductPageButtons() {
    const btn = document.getElementById('productAddBtn');
    if (!btn) return;

    const productId = parseInt(btn.dataset.productId, 10);
    const inCart = isInCart(productId);

    if (inCart) {
        btn.textContent = '✕ Убрать из корзины';
        btn.classList.add('in-cart');
        btn.onclick = () => removeFromCart(productId);
    } else {
        btn.textContent = 'Добавить в корзину';
        btn.classList.remove('in-cart');
        btn.onclick = () => addToCart(productId);
    }
}

/* ==================== ИНИЦИАЛИЗАЦИЯ ==================== */
document.addEventListener('DOMContentLoaded', () => {
    updateCounters();
    renderUserGreeting();
    renderProducts();

    const categoryGrid = document.getElementById('categoryGrid');
    if (categoryGrid) {
        renderCategoryProducts('categoryGrid');
    }
});
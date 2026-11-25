const cartCount = document.querySelector('.cart-count');
const cartButton = document.querySelector('.cart-button');
const toast = document.querySelector('.toast');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
let itemsInCart = 0;
let toastTimer;

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    itemsInCart += 1;
    cartCount.textContent = itemsInCart;
    cartButton.setAttribute('aria-label', `Keranjang, ${itemsInCart} produk`);
    button.classList.add('added');
    button.textContent = 'Ditambahkan ✓';
    toast.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
    setTimeout(() => {
      button.classList.remove('added');
      button.textContent = 'Tambah ke keranjang';
    }, 1600);
  });
});

document.querySelectorAll('.filter').forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    document.querySelector('.filter.is-active')?.classList.remove('is-active');
    filterButton.classList.add('is-active');
    const selected = filterButton.dataset.filter;

    document.querySelectorAll('.product-card').forEach((card) => {
      card.classList.toggle('is-hidden', selected !== 'all' && card.dataset.category !== selected);
    });
  });
});

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  toast.textContent = `Terima kasih! Kabar Nusa akan dikirim ke ${input.value}`;
  toast.classList.add('is-visible');
  input.value = '';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.textContent = 'Produk ditambahkan ke keranjang';
  }, 3000);
});

(function(){
  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

  function getParam(name){
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  const id = getParam('id');
  const product = window.PRODUCTS && window.PRODUCTS[id];
  const wrap = qs('#product-wrap');
  if (!product) {
    wrap.innerHTML = '<p class="text-center">Product not found. <a href="index.html" class="text-indigo-600">Back to shop</a></p>';
    return;
  }

  // Populate
  qs('#product-image').src = product.img;
  qs('#product-image').alt = product.title;
  qs('#product-title').textContent = product.title;
  qs('#product-price').textContent = product.price;
  qs('#product-desc').textContent = product.desc;
  qs('#product-type').textContent = product.type || '';

  const sizeList = qs('#size-list');
  let selectedSize = product.sizes && product.sizes[0] || null;
  if (product.sizes && product.sizes.length) {
    product.sizes.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'size-btn';
      btn.textContent = s;
      if (s === selectedSize) btn.classList.add('active');
      btn.addEventListener('click', ()=>{
        qsa('.size-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = s;
      });
      sizeList.appendChild(btn);
    });
  }

  function addToCart() {
    const key = 'bf_cart_v1';
    const raw = localStorage.getItem(key);
    const cart = raw ? JSON.parse(raw) : [];
    const existing = cart.find(i => i.id === product.id && i.size === selectedSize);
    if (existing) existing.qty += 1; else cart.push({ id: product.id, size: selectedSize, qty: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    alert('Added to cart.');
  }

  qs('#add-to-cart').addEventListener('click', ()=>{
    addToCart();
  });

  qs('#buy-now').addEventListener('click', ()=>{
    addToCart();
    const goCheckout = confirm('Proceed to checkout now?');
    if (goCheckout) {
      // Simple checkout placeholder - creating a checkout page is optional
      window.location.href = 'checkout.html';
    }
  });
})();

let saved      = JSON.parse(localStorage.getItem('dd_saved') || '[]');
let cart       = JSON.parse(localStorage.getItem('dd_cart')  || '[]');
let currentCar = null;

/* ── HELPERS ─────────────────────────────────────────── */
const fmt     = p  => 'Rs ' + p.toLocaleString('en-US');
const isSaved = id => saved.some(c => c.id === id);
const inCart  = id => cart.some(c => c.id === id);

function saveTLS() { localStorage.setItem('dd_saved', JSON.stringify(saved)); }
function cartTLS() { localStorage.setItem('dd_cart',  JSON.stringify(cart));  }

function showToast(msg) {
  $('#toastMsg').html(msg);
  bootstrap.Toast.getOrCreateInstance($('#liveToast')[0], { delay:2500 }).show();
}

function updateCount() { $('#savedCount').text(saved.length); }

/* ── CARD HTML ───────────────────────────────────────── */
function cardHTML(c) {
  const bCls = c.badge === 'new' ? 'b-new' : c.badge === 'popular' ? 'b-popular' : c.cats.includes('electric') ? 'b-ev' : '';
  const bTxt = c.badge || (c.cats.includes('electric') ? 'EV' : '');
  return `
  <div class="col-lg-3 col-md-6 col-sm-6 fade-up">
    <div class="car-card" data-id="${c.id}">
      <div class="car-img-wrap">
        <img src="${c.img}" alt="${c.name}" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='none'; this.parentElement.querySelector('.img-placeholder').style.display='flex'"/>
        <div class="img-overlay"></div>
        <div class="img-placeholder" style="display:none">
          <i class="bi bi-car-front-fill"></i>
          <span>${c.brand} ${c.name}</span>
        </div>
        ${bTxt ? `<div class="c-badge ${bCls}">${bTxt}</div>` : ''}
        <button class="heart-btn${isSaved(c.id) ? ' saved' : ''}" data-id="${c.id}">
          <i class="bi bi-heart${isSaved(c.id) ? '-fill' : ''}"></i>
        </button>
      </div>
      <div class="car-body">
        <div class="c-brand">${c.brand}</div>
        <div class="c-name">${c.name}</div>
        <div class="c-specs">
          <span class="spec-it"><i class="bi bi-lightning-fill"></i>${c.hp}</span>
          <span class="spec-it"><i class="bi bi-speedometer2"></i>${c.topSpeed}</span>
          <span class="spec-it"><i class="bi bi-calendar3"></i>${c.year}</span>
        </div>
        <div class="c-footer">
          <div class="c-price">${fmt(c.price)}<small> PKR</small></div>
          <button class="btn-view" data-id="${c.id}">Details <i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── RENDER FUNCTIONS ────────────────────────────────── */
function renderGrid(selector, cars) {
  $(selector).html(cars.map(cardHTML).join(''));
  setTimeout(() => $(selector + ' .fade-up').addClass('visible'), 80);
}

function filterAll() {
  const q = $('#srch').val().toLowerCase();
  const b = $('#bFilter').val();
  const p = $('#pFilter').val();
  const list = CARS.filter(c => {
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q);
    const matchBrand  = !b || c.brand === b;
    let   matchPrice  = true;
    if (p) {
      const [min, max] = p.split('-').map(Number);
      matchPrice = c.price >= min && c.price <= max;
    }
    return matchSearch && matchBrand && matchPrice;
  });
  $('#rCount').text(list.length + ' car' + (list.length !== 1 ? 's' : '') + ' found');
  renderGrid('#g-all', list);
}

function renderCat(selector, cat) {
  renderGrid(selector, CARS.filter(c => c.cats.includes(cat)));
}

function refreshAll() {
  filterAll();
  renderCat('#g-sports',  'sports');
  renderCat('#g-suv',     'suv');
  renderCat('#g-luxury',  'luxury');
  renderCat('#g-electric','electric');
}

/* ── DROPDOWNS ───────────────────────────────────────── */
function populateDropdowns() {
  const brands = [...new Set(CARS.map(c => c.brand))].sort();
  brands.forEach(b => $('#bFilter').append(`<option value="${b}">${b}</option>`));
  CARS.forEach(c => $('#cCar').append(`<option value="${c.id}">${c.brand} ${c.name}</option>`));
}

/* ── DETAIL MODAL ────────────────────────────────────── */
function openDetail(id) {
  currentCar = CARS.find(c => c.id === id);
  const c = currentCar;
  $('#mBrand').text(c.brand);
  $('#mName').text(c.name);
  $('#mImg').attr({ src: c.img, alt: c.name });
  $('#mPrice').text(fmt(c.price));
  $('#mDesc').text(c.desc);
  $('#mSpecs').html(`
    <div class="spec-box"><div class="sv">${c.hp}</div><div class="sk">Horsepower</div></div>
    <div class="spec-box"><div class="sv">${c.topSpeed}</div><div class="sk">Top Speed</div></div>
    <div class="spec-box"><div class="sv">${c.year}</div><div class="sk">Year</div></div>
    <div class="spec-box"><div class="sv">${c.engine.split(' ')[0]}</div><div class="sk">Engine</div></div>
    <div class="spec-box"><div class="sv">${c.cats[0].toUpperCase()}</div><div class="sk">Type</div></div>
    <div class="spec-box"><div class="sv">${c.range}</div><div class="sk">Range</div></div>
  `);
  syncModalSave();
  new bootstrap.Modal('#carModal').show();
}

function syncModalSave() {
  if (!currentCar) return;
  const s = isSaved(currentCar.id);
  $('#mSave').toggleClass('saved', s)
    .html(s ? '<i class="bi bi-heart-fill me-1"></i>Saved' : '<i class="bi bi-heart me-1"></i>Save');
}

/* ── SAVE / WISHLIST ─────────────────────────────────── */
function toggleSave(id) {
  const car = CARS.find(c => c.id === id);
  if (isSaved(id)) {
    saved = saved.filter(c => c.id !== id);
    showToast(`<i class="bi bi-heart me-1"></i> ${car.name} removed`);
  } else {
    saved.push(car);
    showToast(`<i class="bi bi-heart-fill me-1" style="color:var(--red)"></i> ${car.name} saved!`);
  }
  saveTLS(); updateCount(); syncModalSave(); refreshAll();
  $(`.heart-btn[data-id="${id}"]`).toggleClass('saved', isSaved(id));
  $(`.heart-btn[data-id="${id}"] i`).attr('class', 'bi bi-heart' + (isSaved(id) ? '-fill' : ''));
  renderSaved();
}

function renderSaved() {
  if (!saved.length) {
    $('#savedBody').html('<div class="empty-sv"><i class="bi bi-heart"></i><p>No saved cars yet.<br/>Click ♡ on any card.</p></div>');
    return;
  }
  $('#savedBody').html(saved.map(c => `
    <div class="s-item">
      <img src="${c.img}" alt="${c.name}"/>
      <div><div class="s-name">${c.brand} ${c.name}</div><div class="s-price">${fmt(c.price)}</div></div>
      <button class="btn-rm" data-id="${c.id}"><i class="bi bi-x-lg"></i></button>
    </div>`).join(''));
}

/* ── CART ────────────────────────────────────────────── */
function addToCart(id) {
  const car = CARS.find(c => c.id === id);
  if (inCart(id)) { showToast(`<i class="bi bi-info-circle me-1"></i> ${car.name} already in cart.`); return; }
  cart.push(car); cartTLS(); renderCart();
  showToast(`<i class="bi bi-cart-check-fill me-1" style="color:#2ecc71"></i> ${car.name} added to cart!`);
}

function removeFromCart(id) { cart = cart.filter(c => c.id !== id); cartTLS(); renderCart(); }

function renderCart() {
  if (!cart.length) {
    $('#cartBody').html('<div class="empty-sv"><i class="bi bi-cart"></i><p>Your cart is empty.</p></div>');
    $('#cartTotal').text('Total: Rs 0'); return;
  }
  let total = 0;
  $('#cartBody').html(cart.map(c => { total += c.price; return `
    <div class="s-item">
      <img src="${c.img}" alt="${c.name}"/>
      <div><div class="s-name">${c.brand} ${c.name}</div><div class="s-price">${fmt(c.price)}</div></div>
      <button class="btn-rm btn-rm-cart" data-id="${c.id}"><i class="bi bi-trash"></i></button>
    </div>`; }).join(''));
  $('#cartTotal').text('Total: ' + fmt(total));
}

/* ── COUNTER ANIMATION ───────────────────────────────── */
function animateCount(el) {
  const target = parseInt($(el).data('count'));
  $({ n: 0 }).animate({ n: target },
    { duration: 1400, step(v) { $(el).text(Math.floor(v)); }, complete() { $(el).text(target); } }
  );
}

/* ── INTERSECTION OBSERVER ───────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $(entry.target).addClass('visible');
    if ($(entry.target).hasClass('stat-num')) animateCount(entry.target);
  });
}, { threshold: 0.1 });

function observeAll() {
  $('.fade-up, .stat-num').each(function() { observer.observe(this); });
}

/* ── PARTICLE CANVAS ─────────────────────────────────── */
(function() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let pts = [];
  function resize() { canvas.width = innerWidth; canvas.height = document.getElementById('hero').offsetHeight; }
  function init() {
    pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,  y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,    dx: (Math.random() - 0.5) * 0.38,
      dy: (Math.random() - 0.5) * 0.38, a: Math.random()
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,184,75,${p.a * 0.45})`; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (dist < 95) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(200,57,43,${0.1 * (1 - dist / 95)})`; ctx.lineWidth = 0.4; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── JQUERY DOM READY ────────────────────────────────── */
$(function() {
  populateDropdowns(); refreshAll(); updateCount(); renderCart(); observeAll();

  // Navbar buttons
  $('#navHomeBtn').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 500, function() { $('[data-bs-target="#t-all"]').tab('show'); });
  });
  $('#navAboutBtn').on('click', function() {
    $('html, body').animate({ scrollTop: $('#main-section').offset().top - 72 }, 500, function() {
      $('#triggerAbout').trigger('click'); setTimeout(observeAll, 150);
    });
  });
  $('#navContactBtn').on('click', function() {
    $('html, body').animate({ scrollTop: $('#main-section').offset().top - 72 }, 500, function() {
      $('#triggerContact').trigger('click');
    });
  });
  $('#navCartBtn').on('click', function() {
    $('html, body').animate({ scrollTop: $('#main-section').offset().top - 72 }, 500, function() {
      $('#triggerCart').trigger('click');
    });
  });

  // Navbar scroll effect
  $(window).on('scroll', function() {
    const scrolled = $(this).scrollTop() > 50;
    $('#topNav').css('background', scrolled ? 'rgba(5,5,5,.98)' : 'rgba(10,10,10,.96)');
  });

  // Filter inputs
  $('#srch, #bFilter, #pFilter').on('input change', filterAll);

  // Tab switch re-observe
  $('#mainTabs button').on('shown.bs.tab', () => setTimeout(observeAll, 80));

  // Car card & button clicks
  $(document).on('click', '.car-card', function() { openDetail(parseInt($(this).data('id'))); });
  $(document).on('click', '.btn-view', function(e) { e.stopPropagation(); openDetail(parseInt($(this).data('id'))); });
  $(document).on('click', '.heart-btn', function(e) { e.stopPropagation(); toggleSave(parseInt($(this).data('id'))); });

  // Modal buttons
  $('#mSave').on('click', () => { if (currentCar) toggleSave(currentCar.id); });
  $('#mAddToCart').on('click', () => { if (currentCar) addToCart(currentCar.id); });
  $('#mEnquire').on('click', function() {
    bootstrap.Modal.getInstance('#carModal').hide();
    setTimeout(() => {
      $('html, body').animate({ scrollTop: $('#main-section').offset().top - 72 }, 400, function() {
        $('[data-bs-target="#t-contact"]').tab('show');
        if (currentCar) $('#cCar').val(currentCar.id);
      });
    }, 400);
    showToast('<i class="bi bi-check-circle-fill me-1" style="color:#2ecc71"></i>Opening contact form...');
  });

  // Saved offcanvas
  $('#openSaved').on('click', function() { renderSaved(); new bootstrap.Offcanvas('#savedCanvas').show(); });
  $(document).on('click', '.btn-rm:not(.btn-rm-cart)', function() { toggleSave(parseInt($(this).data('id'))); renderSaved(); });
  $(document).on('click', '.btn-rm-cart', function() { removeFromCart(parseInt($(this).data('id'))); });

  // Checkout – multi-step modal
  let checkoutStep = 1;

  function buildOrderSummary() {
    let total = 0;
    const items = cart.map(c => { total += c.price; return `<div class="co-item"><span class="co-item-name">${c.brand} ${c.name}</span><span class="co-item-price">${fmt(c.price)}</span></div>`; }).join('');
    const html = items + `<div class="co-total"><span class="co-total-label">Total</span><span class="co-total-price">${fmt(total)}</span></div>`;
    return html;
  }

  function goToCheckoutStep(step) {
    checkoutStep = step;
    $('#checkoutStep1, #checkoutStep2, #checkoutStep3').hide();
    if (step === 1) {
      $('#checkoutStep1').show();
      $('#checkoutStepLabel').text('Step 1 of 2');
      $('#checkoutTitle').html('<i class="bi bi-person-fill me-2"></i>Your Details');
      $('#coBtnBack').hide();
      $('#coBtnNext').html('<span>Continue to Payment</span><i class="bi bi-arrow-right ms-2"></i>').show().prop('disabled', false);
      $('#checkoutFooter').show();
    } else if (step === 2) {
      $('#checkoutStep2').show();
      $('#checkoutSummary2').html(buildOrderSummary());
      $('#checkoutStepLabel').text('Step 2 of 2');
      $('#checkoutTitle').html('<i class="bi bi-credit-card-fill me-2"></i>Payment Method');
      $('#coBtnBack').show();
      $('#coBtnNext').html('<span>Place Order</span><i class="bi bi-check-lg ms-2"></i>').show().prop('disabled', false);
      $('#checkoutFooter').show();
    } else if (step === 3) {
      $('#checkoutStep3').show();
      const orderId = 'DD-' + Date.now().toString(36).toUpperCase();
      $('#successOrderId').text('Order #' + orderId);
      $('#checkoutStepLabel').text('Complete');
      $('#checkoutTitle').html('<i class="bi bi-check-circle-fill me-2" style="color:#2ecc71"></i>Thank You!');
      $('#checkoutFooter').hide();
      cart = []; cartTLS(); renderCart();
    }
  }

  function resetCheckoutModal() {
    goToCheckoutStep(1);
    $('#coName, #coEmail, #coPhone, #coAddress, #coCardNum, #coCardExp, #coCardCVV').val('');
    $('#coCity').val('');
    $('input[name="payMethod"]').prop('checked', false);
    $('#cardDetails').hide();
  }

  $('#checkoutBtn').on('click', function() {
    if (!cart.length) { showToast('<i class="bi bi-exclamation-circle me-1"></i>Your cart is empty!'); return; }
    resetCheckoutModal();
    $('#checkoutSummary').html(buildOrderSummary());
    new bootstrap.Modal('#checkoutModal').show();
  });

  // Show/hide card fields
  $('input[name="payMethod"]').on('change', function() {
    $('#cardDetails').toggle($(this).val() === 'card');
  });

  // Next / Place Order
  $('#coBtnNext').on('click', function() {
    if (checkoutStep === 1) {
      const name = $('#coName').val().trim();
      const email = $('#coEmail').val().trim();
      const phone = $('#coPhone').val().trim();
      const city = $('#coCity').val();
      const address = $('#coAddress').val().trim();
      if (!name || !email || !phone || !city || !address) {
        showToast('<i class="bi bi-exclamation-circle me-1"></i>Please fill all required fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('<i class="bi bi-exclamation-circle me-1"></i>Please enter a valid email.');
        return;
      }
      goToCheckoutStep(2);
    } else if (checkoutStep === 2) {
      const method = $('input[name="payMethod"]:checked').val();
      if (!method) {
        showToast('<i class="bi bi-exclamation-circle me-1"></i>Please select a payment method.');
        return;
      }
      if (method === 'card') {
        const num = $('#coCardNum').val().trim();
        const exp = $('#coCardExp').val().trim();
        const cvv = $('#coCardCVV').val().trim();
        if (!num || !exp || !cvv) {
          showToast('<i class="bi bi-exclamation-circle me-1"></i>Please fill in card details.');
          return;
        }
      }
      // Simulate processing
      $(this).html('<i class="bi bi-arrow-repeat spin me-2"></i>Processing...').prop('disabled', true);
      setTimeout(() => {
        goToCheckoutStep(3);
        showToast('<i class="bi bi-check-circle-fill me-1" style="color:#2ecc71"></i>Order placed successfully!');
      }, 1500);
    }
  });

  // Back button
  $('#coBtnBack').on('click', function() {
    if (checkoutStep === 2) goToCheckoutStep(1);
  });

  // Reset on modal close
  $('#checkoutModal').on('hidden.bs.modal', function() {
    resetCheckoutModal();
  });

  // Contact form
  $('#cSubmit').on('click', function() {
    const name  = $('#cName').val().trim();
    const email = $('#cEmail').val().trim();
    const msg   = $('#cMsg').val().trim();
    if (!name || !email || !msg) { showToast('<i class="bi bi-exclamation-circle me-1"></i>Please fill all fields.'); return; }
    $(this).html('<i class="bi bi-check-circle-fill me-2"></i>Message Sent!').prop('disabled', true);
    showToast('<i class="bi bi-check-circle-fill me-1" style="color:#2ecc71"></i>Enquiry sent successfully!');
    setTimeout(() => {
      $(this).html('<i class="bi bi-send-fill me-2"></i>Send Enquiry').prop('disabled', false);
      $('#cName, #cEmail, #cMsg').val(''); $('#cCar').val('');
    }, 3000);
  });

  // Smooth scroll anchor links
  const navOff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this).attr('href');
    if ($(target).length) { e.preventDefault(); $('html, body').animate({ scrollTop: $(target).offset().top - navOff }, 600); }
  });

}); // end jQuery ready

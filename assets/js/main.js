
// console.log(navbar)

// evento directamente en el html
// <button onclick="alert('hola')" id="navbarBtn" class="navbar__btn-link">

// navbarBtn.onclick = function () {
//   alert('desde una propiedad del elemento en el html')
// }

// handler
// const fn = function (e) {
//   console.log(navbarNav)
//   navbarNav.classList.toggle('active')
// }

// start navbar btn menu
const navbarBtn = document.getElementById('navbarBtn')
const navbarNav = document.querySelector('.navbar__nav')

navbarBtn.addEventListener('click', function (e) {
  console.log(navbarNav)
  navbarNav.classList.toggle('active')
})
// end navbar btn menu

// navbarBtn.removeEventListener('click', fn)

// Arreglo de Productos
const products = [
  {
    id: 1,
    name: 'Xiaomi Redmi Note 10',
    price: 168.37,
    image: 'https://www.mercatecno.com/wp-content/uploads/2022/04/redmi-note-10-1-250x250.png',
    description: 'Celular Xiaomi Redmi 10 en color Pebble White, con memoria de 128 GB y cámara cuádruple de hasta 50 MP. Tiene una pantalla LCD de 6,49" pulgadas y procesador MediaTek Helio G88.',
    amount: 1
  },
  {
    id: 2,
    name: 'Samsung Galaxy Z Fold2',
    price: 1407.27,
    image: 'https://m.media-amazon.com/images/I/31JgpIG7tPL._AC_SS250_.jpg',
    description: 'Samsung Galaxy Z Fold 2 en color Black, con memoria de 256 GB y cámara triple de 12 MP. Tiene una pantalla extendida Dynamic AMOLED de 7,6" pulgadas y procesador Qualcom SM8250.',
    amount: 1
  },
  {
    id: 3,
    name: 'Realme GT 5G',
    price: 628.25,
    image: 'https://gizmobo.com/wp-content/uploads/2021/12/realme-gt-neo-extra-250x250.webp',
    description: 'Fotografía profesional en tu bolsillo Descubre infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Pon a prueba tu creatividad y juega con la iluminación, diferentes planos y efectos para obtener grandes resultados. Además, el dispositivo cuenta con cámara frontal de 16 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas.',
    amount: 1
  },
  {
    id: 4,
    name: 'Apple iPhone 13 Pro Max',
    price: 1759.09,
    image: 'https://compras.cellshop.com.py/1252953-home_default/apple-iphone-13-256gb-pantalla-6-1--blue-a2482-mln13ll.jpg',
    description: 'Un sistema de cámaras revolucionario. Una nueva pantalla OLED con ProMotion. El chip más rápido que jamás ha tenido un smartphone. Y un gran salto en autonomía.',
    amount: 1
  }
]

const wrapperProducts = document.getElementById('wrapper-products')

let productsHTML = ''

// Iteradores for of
for (let product of products) {
  productsHTML += `
  <div class="wrapper__product">
    <div class="wrapper__product-img">
      <img src="${product.image}" alt="${product.name}" class="wrapper__product-img-item">
    </div>
    <div class="wrapper__product-content">
      <h3 class="wrapper__product-title">${product.name}</h3>
      <p class="wrapper__product-text">
      ${product.description}
      </p>
      <div class="wrapper__product-btn">
      <span class="wrapper__product-btn-price">$ ${product.price}</span>
        <br>
        <button class="wrapper__product-btn-item" data-id="${product.id}">
          <i class='bx bx-shopping-bag'></i>
          <span class="wrapper__product-btn-text">Agregar al carrito</span>
        </button>
      </div>
    </div>
    </div>
  `
}

wrapperProducts.insertAdjacentHTML('beforeend', productsHTML)

let cart = []

function find(id) {
  for (let product of products) {
    if (product.id === id) {
      return product
    }
  }
}

function addToCart(id) {
  const product = find(id)
  if(cart.hasOwnProperty(product.id)) {
    product.amount = cart[product.id].amount + 1
  } else {
    cart.push(product)
  }
  renderCart() 
}

console.log(cart.length)

wrapperProducts.addEventListener('click', function (e) {
  if (e.target.closest('.wrapper__product-btn-item')) {
    const id = e.target.closest('.wrapper__product-btn-item').dataset.id
    addToCart(+id)
  }
  console.log(product)
})

const wrapperCart = document.getElementById('wrapper-cart')

function renderCart() {
  let cartHTML = ''

  for (let product of cart) {
    cartHTML += `
    <div class="cart__item">
    <div class="cart__item-img">
    <img src="${product?.image}" alt="${product.name}" class="cart__item-img-item">
    </div>
    <div class="cart__item-content">
    <h3 class="cart__item-title">${product.name}</h3>
    <div class="cart__item-btn">
    <span class="cart__item-btn-text">$ ${product.price}</span>
    <button class="cart__item-btn-item" data-id="${product.id}">
    <i class='bx bx-x'></i>
    </div>
    <div class="amoun_father" style="display: flex;">
    <div class="amount__container">
    <p>Cantidad</p>
    </div>
    <div class="amount" style="margin-left: 15px;">
    <p>${product.amount}</p>
    </div>
    </div>
    </div>
    </div>
    `
  }
  const cartTotal = document.getElementById('cart-total')

  wrapperCart.innerHTML = cartHTML.length > 0 ? cartHTML : '<p>No hay productos</p>'
  cartTotal.innerHTML = `$ ${sumTotal().toFixed(2)}`
}


renderCart()

function sumTotal() {
  let sum = 0
  for (let product of cart) {
    sum += product.price
  }
  return sum
}

function removeFromCart (id) {
  let newArr = []
  for (let product of cart) {
    if(product.id !== id) {
      newArr.push(product)
    }
  }
  cart = newArr
}

wrapperCart.addEventListener('click', function (e) {
  if (e.target.closest('.cart__item-btn-item')) {
    const id = e.target.closest('.cart__item-btn-item').dataset.id
    removeFromCart(+id)
    renderCart()
  }
})

const checkout = document.getElementById('checkout')

checkout.addEventListener('click', function (e) {
  if(e.target.closest('.wrapper__sidebar-cart-btn-link')) {
    alert('Gracias por tu compra')
    cart = []
    renderCart()
  }
})


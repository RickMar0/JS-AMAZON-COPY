import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines" 
        title="${product.name}">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class = "js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button
        button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});


document.querySelector(".js-products-grid").innerHTML = productsHTML;

const timeouts = {};

 export function updateCartQuantity() {
   let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
};

function updateOpacity(productId) {
  let addedOpacity = document.querySelector(`.js-added-${productId}`);

  if (timeouts[productId]) {
    clearTimeout(timeouts[productId]);
  }

  addedOpacity.classList.add("active");
  addedOpacity.style.opacity = 1;

  timeouts[productId] = setTimeout(() => {
    addedOpacity.style.opacity = 0;
    addedOpacity.classList.remove("active");
    delete timeouts[productId];
  }, 2000);
};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {

    const { productId } = button.dataset;
    const selector = document.querySelector(`.js-quantity-selector-${productId}`);

    addToCart(selector, productId);
    updateCartQuantity();
    updateOpacity(productId);
  })}
)

updateCartQuantity();
import {cart, removeFromCart, calculateCartQuantity, saveToStorage} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
/*global document alert*/

console.log(dayjs());

let cartSummaryHTML = "";

cart.forEach((item) => {
  const productId = item.productId;

  let matchingProduct;

  products.forEach((product)=> {
    if (product.id === productId) {
      matchingProduct = product;
    }
  })
  cartSummaryHTML += `
<div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        ${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-label" data-product-id="${matchingProduct.id}">${item.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
          Update
        </span>
        <input class="quantity-input js-quantity-input-${matchingProduct.id} hidden" data-product-id="${matchingProduct.id} value="${item.quantity}">
        <span class="save-quantity-link link-primary js-save-link hidden" data-product-id="${matchingProduct.id}">
          Save
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `
})

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// delete item from cart
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {

    const productId = link.dataset.productId;

    removeFromCart(productId);
    checkoutLinkItemCountDisplay();

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`);

    if (container) {
      container.remove();
    } else {
      alert(`product not found`);
    }
  })
})

// update and display cart quantity in checkout link
function checkoutLinkItemCountDisplay() {

  let cartQuantity = calculateCartQuantity();

  const itemCount = cartQuantity;

  const checkoutLink = document.querySelector(".js-return-to-home-link");

  checkoutLink.innerHTML = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
};

// define and return the quantity input, save link
function quantityInputAndSaveLink(productId) {

  const quantityInput = document.querySelector(
  `.js-quantity-input-${productId}`);

  const saveLink = document.querySelector(
  `.js-save-link[data-product-id="${productId}"]`);

  return {quantityInput, saveLink};
};

// update button
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const { quantityInput, saveLink} = quantityInputAndSaveLink(productId);

    if (quantityInput.classList.contains("hidden") && saveLink.classList.contains("hidden"))
      
      {

       quantityInput.classList.remove("hidden");
       quantityInput.classList.add("displayed");

       saveLink.classList.remove("hidden");
       saveLink.classList.add("displayed");

      }
  });
});

// save the items on save-link click 
document.querySelectorAll(`.js-save-link`).forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const { quantityInput, saveLink} = quantityInputAndSaveLink(productId);

    const inputValue = quantityInput.value;

    const item = cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = parseInt(inputValue, 10);
    }

    document.querySelector(`.js-quantity-label[data-product-id="${productId}"]`).innerHTML = String(inputValue);

    saveToStorage();
    checkoutLinkItemCountDisplay();

    // hide the input and save link again
    quantityInput.classList.add("hidden");
    saveLink.classList.add("hidden");
  });
});
  

document.querySelectorAll('.js-quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      console.log(input.value);
    }
  });
});

checkoutLinkItemCountDisplay();
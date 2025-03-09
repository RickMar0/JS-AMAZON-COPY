import {cart, removeFromCart,saveToStorage,updateDeliveryOption} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../../data/delivery-options.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import {checkoutLinkItemCountDisplay} from "./checkoutHeader.js";


// ⬇⬇ making Eslint ignore the document object, otherwise it will throw an error
/*global document*/

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const {dateString} = calculateDeliveryDate(deliveryOption);
    
    cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity
          js-product-quantity-${matchingProduct.id}">
          <span>
            Quantity: <span class="quantity-label js-quantity-label" data-product-id="${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link js-update-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id} hidden" type="number" data-product-id="${matchingProduct.id}" value="${cartItem.quantity}">
          <span class="save-quantity-link link-primary js-save-link hidden" data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link
            js-delete-link-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
    `;
  });


  // delivery options
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const {dateString} = calculateDeliveryDate(deliveryOption);
      
      const priceString = deliveryOption.priceCents === 0 
      ? "FREE" 
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked 
          ? "checked" 
          : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
    });
    
    return html;
  }


  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // delete item from cart
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`);
        container.remove();
        checkoutLinkItemCountDisplay();
        renderPaymentSummary();
      }
    );
  });

  // update link click
  document.querySelectorAll(".js-update-link").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      toggleVisibility(productId, true);

    });
  });

  // save link click
  document.querySelectorAll(".js-save-link").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const inputField = document.querySelector(`.js-quantity-input-${productId}`);
      const newValue = inputField.value;
      const cartItem = cart.find(item => item.productId === productId);
      cartItem.quantity = parseInt(newValue, 10);
      document.querySelector(`.js-quantity-label[data-product-id="${productId}"]`).textContent = newValue;
      saveToStorage(cart);
      checkoutLinkItemCountDisplay();
      renderPaymentSummary();
      toggleVisibility(productId, false);
    });
  });

  // delivery option click
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();

    });
  });

}


function toggleVisibility(productId, showInputAndSave) {
  const inputField = document.querySelector(`.js-quantity-input-${productId}`);
  const saveLink = document.querySelector(`.js-save-link[data-product-id="${productId}"]`);
  const updateLink = document.querySelector(`.js-update-link-${productId}`);
  const deleteLink = document.querySelector(`.js-delete-link-${productId}`);

  if (showInputAndSave) {
    inputField.classList.remove("hidden");
    saveLink.classList.remove("hidden");
    updateLink.classList.add("hidden");
    deleteLink.classList.add("hidden");

  } else {
    inputField.classList.add("hidden");
    saveLink.classList.add("hidden");
    updateLink.classList.remove("hidden");
    deleteLink.classList.remove("hidden");
  }
}
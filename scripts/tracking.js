/* eslint-disable no-undef */
import { updateCartQuantity } from "./orders.js";

updateCartQuantity();

const key = localStorage.getItem('tracking-key')
const item = JSON.parse(localStorage.getItem(`tracking-item-${key}`));

document.querySelector(".generated-item").innerHTML = `
<div class="delivery-date">
          Arriving on ${item.deliveryDate2}
        </div>

        <div class="product-info">
          ${item.itemName}
        </div>

        <div class="product-info">
          Quantity: ${item.itemQuantity}
        </div>

        <img class="product-image" src="${item.itemImage}">
        `
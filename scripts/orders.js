/* eslint-disable no-unused-vars */
/* global document localStorage*/
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.2/dist/index.mjs";
import { orders} from "../data/orders.js";
import {cart,calculateCartQuantity} from "../data/cart.js";
import { loadProductsFetch , products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// console.log(orders);
// console.log(cart);

//display the number of items in the cart upon page load
export function updateCartQuantity() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
} updateCartQuantity();

// render the grid
renderOrdersGridHTML();

async function renderOrdersGridHTML(){

  // getting the products from fetch
  // empty arrow fun is necessary, otherwise the function will catch it's -
  // - absence and throw an error
  await loadProductsFetch(()=>{});

  //testing products
  //console.log(products);

  //test code
  // orders.forEach((order) => {
  //   console.log(order.id);
  // })

  

  // counter for the order container class
  let classCounter = 0;

  // looping through the orders and creating the HTML for each order
  orders.forEach((order) => {

    //increasing the counter and string it to the class name
    String(classCounter++);


    //creating new div for each order
    const ordersGrid = document.querySelector('.orders-grid');

    //defining the variables for the order
    const orderId = order.id;
    const orderDate = dayjs(order.orderTime).format("MMMM D"); // formats the date as "August 12"
    const orderTotal = formatCurrency(order.totalCostCents);   // formats the total cost as "$35.06"
    const orderItems = order.products;

    ordersGrid.innerHTML += `
    <div class="order-container">
      
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${orderTotal}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
      
      <div class="order-details-grid${classCounter}">`

      //creating the id for buttons
      let buttonId = 0;
    
      //looping through the order items and creating the HTML for each
      orderItems.forEach((item)=>{

        //increasing the button id
        String(buttonId++);

        //setting an identifier for the item
        const identifier = String(classCounter) + String(buttonId);

        // selecting the order details element
        const orderDetails = document.querySelector(`.order-details-grid${classCounter}`);

        // function to id the item from the products array
        function getProductDetails(productId) {
          const currentItem = products.find((item) => item.id === productId);
          return currentItem;
        }

        // getting the product details and storing them in an object
        const itemDetails = {
          itemName : getProductDetails(item.productId).name,
          itemImage : getProductDetails(item.productId).image,
          itemQuantity : item.quantity,
          deliveryDate : dayjs(item.estimatedDeliveryTime).format("MMMM D"),
          deliveryDate2 : dayjs(item.estimatedDeliveryTime).format("dddd, MMMM D")
        }

        // storing the item details in local storage
        localStorage.setItem(`tracking-item-${identifier}`, JSON.stringify(itemDetails));




        orderDetails.innerHTML += `
          <div class="product-image-container">
            <img src="${itemDetails.itemImage}" class="product-image">
          </div>

          <div class="product-details">

            <div class="product-name">
              ${itemDetails.itemName}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${itemDetails.deliveryDate}
            </div>
            <div class="product-quantity">
              ${itemDetails.itemQuantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="./tracking.html">
              <button class="track-package-button button-secondary"
                onclick="localStorage.setItem('tracking-key',${identifier});
                console.log(localStorage.getItem('tracking-key'));">
                Track package
              </button>
            </a>
          </div>
        `
      }
    )
  })
}
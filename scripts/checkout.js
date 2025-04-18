/* eslint-disable no-unused-vars */
//import "../data/backend-practice.js";
//import "../data/cart-class.js";
import { renderOrderSummary } from "../scripts/checkout/orderSummary.js"; 
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { checkoutLinkItemCountDisplay } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import {loadCart, loadCartFetch} from "../data/cart.js";
import "../data/car.js";

async function loadPage(){

  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
  }
  
  catch(error){
    console.error("unexpected error, please try again later", error);
  }

  checkoutLinkItemCountDisplay(); 
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

// below are different ways to load the products

// promise all// <------------------------------
/* 
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) =>{
    loadCart(()=>{
      resolve();
    });
  })

]).then(()=>{
  checkoutLinkItemCountDisplay(); 
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// promise chaining <-----------------------------
/*
new Promise((resolve)=>{
  loadProductsFetch(()=>{
    resolve("value1");
  });

}).then((value)=>{
  console.log(value);
  
  return new Promise((resolve) =>{
    loadCart(()=>{
      resolve();
    });
  })

}).then(()=>{
  checkoutLinkItemCountDisplay(); 
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// xmlhttp request <------------------------------
/*
loadProducts(()=>{
  loadCart(() =>{
    checkoutLinkItemCountDisplay(); 
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
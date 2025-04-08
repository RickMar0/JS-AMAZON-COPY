import { renderOrderSummary } from "../scripts/checkout/orderSummary.js"; 
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { checkoutLinkItemCountDisplay } from "./checkout/checkoutHeader.js";
import "../data/car.js";
import { loadProducts } from "../data/products.js";
import {loadCart} from "../data/cart.js";

//import "../data/backend-practice.js";
//import "../data/cart-class.js";


new Promise((resolve)=>{
  loadProducts(()=>{
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


/*
loadProducts(()=>{
  loadCart(() =>{
    checkoutLinkItemCountDisplay(); 
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
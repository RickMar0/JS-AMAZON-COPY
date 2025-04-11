import { renderOrderSummary } from "../scripts/checkout/orderSummary.js"; 
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { checkoutLinkItemCountDisplay } from "./checkout/checkoutHeader.js";
import "../data/car.js";
import {loadProducts, loadProductsFetch } from "../data/products.js";
import {loadCart} from "../data/cart.js";

//import "../data/backend-practice.js";
//import "../data/cart-class.js";

async function loadPage(){

  try {

    //throw "error1";

    await loadProductsFetch()
    
    await new Promise((resolve, reject) =>{
      //throw "error2";
      loadCart(()=>{
        //reject("error3");
        resolve();
      });
    });

  }
  
  catch(error){
    console.log("unexpected error,please try again later");
    console.log(error);
  };

  

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
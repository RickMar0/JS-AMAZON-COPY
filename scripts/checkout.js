import { renderOrderSummary } from "../scripts/checkout/orderSummary.js"; 
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { checkoutLinkItemCountDisplay } from "./checkout/checkoutHeader.js";
import "../data/car.js";
import { loadProducts } from "../data/products.js";
//import "../data/backend-practice.js";
//import "../data/cart-class.js";

loadProducts(()=>{
  checkoutLinkItemCountDisplay(); 
  renderOrderSummary();
  renderPaymentSummary();
});

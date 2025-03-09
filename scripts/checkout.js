import { renderOrderSummary } from "../scripts/checkout/orderSummary.js"; 
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { checkoutLinkItemCountDisplay } from "./checkout/checkoutHeader.js";
import "../data/cart-class.js";

checkoutLinkItemCountDisplay();
renderOrderSummary();
renderPaymentSummary();
/* eslint-disable no-undef */
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "id14";
  const productId2 = "idGoose";
  
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class"js-payment-summary"></div>`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {productId: productId1,
          quantity: 1,
          deliveryOptionId: '3',
        },
      
        {productId: productId2,
          quantity: 1,
          deliveryOptionId: '3',
        }
      ]);
    });

    loadFromStorage();
    renderOrderSummary();
  });

  it("displays the cart", () => {
    expect(
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 1");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = ``;
  });
    
  it("removes a product", () => {
    
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector(".js-test-container").innerHTML = ``;
  });
});
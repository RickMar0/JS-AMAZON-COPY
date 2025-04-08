/* eslint-disable no-undef */
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  
  beforeAll((done) => {
    loadProducts(()=>{
      done();
    });
  });
  
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productId3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  const productId4 = "54e0eccd-8f36-462b-b68a-8182611d9add";

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
        },
        {productId: productId3,
          quantity: 1,
          deliveryOptionId: '2',
        },
        {productId: productId4,
          quantity: 1,
          deliveryOptionId: '1',
        },
      ]);
    });

    loadFromStorage();
    renderOrderSummary();
  });

  it("displays the cart", () => {
    expect(
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(4);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 1");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = ``;
  });
    
  it("removes a product", () => {

    const elem1 = document.createElement('a');
    elem1.classList.add('js-return-to-home-link');
    document.body.appendChild(elem1);

    const elem2 = document.createElement('div');
    elem2.classList.add('js-payment-summary');
    document.body.appendChild(elem2);


    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(3);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(3);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector(".js-test-container").innerHTML = ``;
  });
});
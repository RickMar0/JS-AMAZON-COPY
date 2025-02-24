/* eslint-disable no-undef */
import {addToCart, cart, loadFromStorage} from "../../data/cart.js";

// test suite
describe("test suite: addToCart", () => {

 //test case 1
  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([{
        productId: "id14",
        quantity: 1,
        deliveryOptionId: "1"
      }]);
    });

    loadFromStorage();
    addToCart("id14");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("id14");
    expect(cart[0].quantity).toEqual(1);
  });

 //test case 2
  it("checks cart length before adding", (cart) => {
    expect(cart.length).toEqual(1);
  });

 // test cases, fails because it takes too long to run (over 5000ms), no clue why

});
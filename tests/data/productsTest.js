//i disabled these rules because they are annoying and serve no real purpose in this context

/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-undef */

import {Product, products, Clothing, Appliances, loadProducts} from "../../data/products.js";

describe("test suite for products", () => {
  
  beforeAll((done) => {
    loadProducts(()=>{
      done();
    });
  });

  console.log(Product);
console.log(Clothing);
console.log(Appliances);
console.log(products);
console.log(products[0].getPrice());

  it("class should have properties", () => {
    const product1 = new Appliances({
      id: "Microwave",
      priceCents: 1000,
      brand: "Samsung",
      color: "White",
      instructionsLink: "images/appliance-instructions.png"
    });

    const product2 = new Clothing({
      id: "Shirt",
      priceCents: 2000,
      brand: "Nike",
      color: "Black",
      sizeChartLink: "images/clothing-size-chart.png",
    });

    expect(product1.getPrice()).toBe("$10.00");
    expect(product1.extraInfoHTML()).toContain("Instructions" && "Warranty");
    expect(product2.extraInfoHTML()).toContain("size-chart");
  });

});
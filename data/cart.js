let cart;

loadFromStorage();

function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },
    
      {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      }
    ];
  };
};

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
};

function addToCart (selector, productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += parseInt(selector.value, 10);
  } else {
    cart.push({
      productId,
      quantity: parseInt(selector.value, 10),
      deliveryOptionId: "1"
    });
  }
  saveToStorage();
};

function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }

  });

  cart = newCart;
  saveToStorage();
};

function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
};

function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    console.log("load products");
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

async function loadCartFetch(fun) {
  try{
    const response = await fetch("https://supersimplebackend.dev/cart");

    const data = await response.text();

    console.log(data);

    fun();

  } catch(error) {
    console.error("load cart fetch error", error)
  }

}

export { cart, addToCart, removeFromCart, saveToStorage, updateDeliveryOption, calculateCartQuantity, loadFromStorage, loadCart, loadCartFetch };
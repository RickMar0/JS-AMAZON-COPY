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
      },
    
      {productId: 'id14',
        quantity: 1,
        deliveryOptionId: '3',
      },
    
      {productId: 'idGoose',
        quantity: 1,
        deliveryOptionId: '3',
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

export { cart, addToCart, removeFromCart, saveToStorage, updateDeliveryOption, calculateCartQuantity, loadFromStorage };
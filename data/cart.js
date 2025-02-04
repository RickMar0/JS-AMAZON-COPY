let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
    },
  
    {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
    },
  
    {productId: 'id14',
      quantity: 1,
    },
  
    {productId: 'idGoose',
      quantity: 1,
    }
  ];
};


function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart (selector, productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += parseInt(selector.value, 10);
  } else {
    cart.push({
      productId,
      quantity: parseInt(selector.value, 10)
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

function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

//⬇⬇ these functions causes a (SyntaxError: Unexpected token 'export') and i don't know why but it works in the browser
export { cart, addToCart, removeFromCart, calculateCartQuantity, saveToStorage };
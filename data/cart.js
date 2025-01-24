export const cart = [];

export function addToCart (selector, productId) {
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
};

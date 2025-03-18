function CartFunction() {
  let cart = {
    cartItems: [],
  
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem("cart-oop"));
    
      if (!this.cartItems) {
        this.cartItems = [
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
      }
    },
  
    saveToStorage() {
      localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
    },
  
    addToCart (productId, selector) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += parseInt(selector.value, 10);
      } else {
        this.cartItems.push({
          productId,
          quantity: parseInt(selector.value, 10),
          deliveryOptionId: "1"
        });
      }
      this.saveToStorage();
    },
  
    removeFromCart(productId) {
      let newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
    
      });
    
      cart = newCart;
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    },
  
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    }
  };
  return cart;
};

const cart = new CartFunction();
const businessCart = new CartFunction();

cart.localStorageKey = "cart-oop";
businessCart.localStorageKey = "cart-business-oop";

cart.loadFromStorage();
console.log(localStorage);
console.log(cart.cartItems); 

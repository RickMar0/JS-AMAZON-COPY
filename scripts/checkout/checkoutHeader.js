import { calculateCartQuantity} from "../../data/cart.js";

function checkoutLinkItemCountDisplay() {

  let cartQuantity = calculateCartQuantity();

  const itemCount = cartQuantity;

  // eslint-disable-next-line no-undef
  const checkoutLink = document.querySelector(".js-return-to-home-link");

  checkoutLink.innerHTML = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
};

export {checkoutLinkItemCountDisplay};
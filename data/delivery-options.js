import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.2/dist/index.mjs";


// defining the delivery options and its properties
export const deliveryOptions = [
  //
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  //
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  //
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];


//retrieve and return the delivery option
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
    
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}


//calculate the delivery date
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = {
    date : today.add(deliveryOption.deliveryDays, "days"),
    dayOfWeek : "dddd"
  };

  if (deliveryDate.date.format(deliveryDate.dayOfWeek) === "Saturday"
  || deliveryDate.date.format(deliveryDate.dayOfWeek) === "Sunday" ) {
    deliveryDate.date.add(2, "days").format("dddd, MMMM D")
  };

  const dateString = deliveryDate.date.format("dddd, MMMM D");
  return {today, deliveryDate, dateString};
}
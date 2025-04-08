class Car{
  #brand;
  #model;
  speed;
  power;
  topSpeed;
  istrunkOpen;
  hasTrunk = true;

  constructor(details){
    this.#brand = details.brand;
    this.#model = details.model;
    this.speed = details.speed;
    this.power = details.power;
    this.topSpeed = details.topSpeed;
    this.istrunkOpen = details.istrunkOpen;
  }

  getBrand(){
    return this.#brand;
  };

  getModel(){
    return this.#model;
  };

  display(){
    console.log(`Car: ${this.getBrand()} ${this.getModel()} \nCurrent speed: ${this.speed} mph \nAcceleration: ${this.power} mph \nTop-speed: ${this.topSpeed} mph \nOpen trunk: ${this.istrunkOpen}`);
  }

  openTrunk(){
    if (this.speed > 5 || !this.hasTrunk){
      console.log("the car is moving or does not have a trunk, cannot open trunk");
    } else {
      this.istrunkOpen = true;
      console.log(`opening the trunk... \nthe trunk is open`)
    }
  }

  closeTrunk(){
    if (this.speed > 0) {
      console.log("please slow down")
    } else {
      this.istrunkOpen = false;
      console.log(`closing the trunk... \nthe trunk is closed`)
    }
  }

  go(){
    if (this.speed >= 0 && this.speed < this.topSpeed && this.istrunkOpen === false) {
    this.speed += this.power;
    console.log("  the speed increases...", this.speed,"mph")} 
    else if(this.istrunkOpen === true) {console.log("the trunk is open! please halt and close it")}
    else {console.log("you've reached top speed")}
  }

  brake(){
    if (this.speed != 0) {
      this.speed -= this.power;
      console.log("  the speed decreases...", this.speed,"mph")
    } else {console.log("you're standing still")}
  }
}

class RaceCar extends Car{
  hasTrunk;
  
  constructor(details){
    super(details);
    this.hasTrunk = false;
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
  speed: 0,
  power: 10,
  topSpeed: 150,
  istrunkOpen: false,
});
console.log(" ");
car1.display();
car1.go();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.openTrunk();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.openTrunk();
car1.go();
car1.closeTrunk();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
console.log(" ");

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
  speed: 0,
  power: 20,
  topSpeed: 200,
  istrunkOpen: false,
});
car2.display();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.brake();
car2.brake();
car2.openTrunk();
console.log(" ");


const car3 = new RaceCar({
  brand: "Redbull",
  model: "RB21",
  speed: 0,
  power: 50,
  topSpeed: 350,
  istrunkOpen: false,
  hasTrunk: false,
});
car3.display();
car3.go();
car3.go();
car3.go();
car3.go();
car3.go();
car3.go();
car3.go();
car3.go();
car3.openTrunk();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.openTrunk();
console.log(" ");

console.log(car1, car2, car3);
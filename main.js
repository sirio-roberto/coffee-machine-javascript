// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

function Coffee(reqWater, reqMilk, reqBeans, price) {
  this.reqWater = reqWater;
  this.reqMilk = reqMilk;
  this.reqBeans = reqBeans;
  this.price = price;
}

const CoffeeTypeEnum = {
  ESPRESSO: new Coffee(250, 0, 16, 4),
  LATTE: new Coffee(350, 75, 20, 7),
  CAPPUCCINO: new Coffee(200, 100, 12, 6),
};

function Machine(money, water, milk, beans, cups) {
  this.money = money;
  this.water = water;
  this.milk = milk;
  this.beans = beans;
  this.cups = cups;

  const evaluateResources = (coffeeObj) => {
    if (coffeeObj.reqWater > this.water) {
      return "water";
    }
    if (coffeeObj.reqMilk > this.milk) {
      return "milk";
    }
    if (coffeeObj.reqBeans > this.beans) {
      return "coffee beans";
    }
    if (this.cups < 1) {
      return "cups";
    }
  }

  this.buy = function (coffeeObj) {
    const missingResource = evaluateResources(coffeeObj);

    if (missingResource) {
      console.log(`Sorry, not enough ${missingResource}!`);
    } else {
      console.log("I have enough resources, making you a coffee!");
      this.money += coffeeObj.price;
      this.water -= coffeeObj.reqWater;
      this.milk -= coffeeObj.reqMilk;
      this.beans -= coffeeObj.reqBeans;
      this.cups--;
    }
  }

  this.fillResources = function (water, milk, beans, cups) {
    this.water += water;
    this.milk += milk;
    this.beans += beans;
    this.cups += cups;
  }

  this.takeMoney = function () {
    let withdrawnMoney = this.money;
    this.money = 0;
    return withdrawnMoney;
  }

  this.getInfo = function () {
    return `The coffee machine has:
${this.water} ml of water
${this.milk} ml of milk
${this.beans} g of coffee beans
${this.cups} disposable cups
$${this.money} of money`;
  };
}

function showMenu() {
  return "Write action (buy, fill, take, remaining, exit):";
}

function executeBuyCommand(machine) {
  const coffeeTypeStr = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n");
  const coffeeType = getCoffeeTypeFromStr(coffeeTypeStr);

  if (coffeeType) {
    machine.buy(coffeeType);
  }

  function getCoffeeTypeFromStr(coffeeTypeStr) {
    if (coffeeTypeStr === "1") {
      return CoffeeTypeEnum.ESPRESSO;
    } else if (coffeeTypeStr === "2") {
      return CoffeeTypeEnum.LATTE;
    } else if (coffeeTypeStr === "3") {
      return CoffeeTypeEnum.CAPPUCCINO;
    }
  }
}

function executeFillCommand(machine) {
  const water = Number(input("Write how many ml of water you want to add\n"));
  const milk = Number(input("Write how many ml of milk you want to add:\n"));
  const beans = Number(input("Write how many grams of coffee beans you want to add:\n"));
  const cups = Number(input("Write how many disposable cups you want to add:\n"));

  machine.fillResources(water, milk, beans, cups);
}

function executeTakeCommand(machine) {
  console.log(`I gave you $${machine.takeMoney()}`)
}

function main() {
  const machine = new Machine(550, 400, 540, 120, 9);

  while (true) {
    let userChoice = input(showMenu() + "\n");
    console.log();

    if (userChoice === "buy") {
      executeBuyCommand(machine);
    } else if (userChoice === "fill") {
      executeFillCommand(machine);
    } else if (userChoice === "take") {
      executeTakeCommand(machine);
    } else if (userChoice === "remaining") {
      console.log(machine.getInfo());
    } else if (userChoice === "exit") {
      return;
    } else {
      console.log("Invalid option");
    }

    console.log();
  }
}

main();
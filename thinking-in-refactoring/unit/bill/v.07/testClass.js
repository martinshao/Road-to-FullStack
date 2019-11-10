class Car{
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }

    sayName() {
        console.info(` This is ${this.name}, it's very cool.`);
    }

    get price() {
        let result = 0;
        result += this.size * 1000;
        return result;
    }
}

let car = new Car('Benz', 13)

console.info(car.price)
car.sayName()
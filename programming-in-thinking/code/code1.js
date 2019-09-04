class Bil {
    constructor(unit, number) {
        this.unit = unit;
        this.number = number;
    }

    getPrive() {
        if(this.todayIsLoversDay) {
            return this.unit * this.number * 0.77
        }
        return this.unit * this.number;
    }

    get unit() {
        return this.unit;
    }

    get number() {
        return this.number;
    }

    todayIsLoversDay() {
        return true;
    }
}


class Bill{

    getPrice() {
        let unit = getUnit()
        let number = getNumber()
        let price = unit * number
        return discount(price)
    }
    
    // 处理打折优惠
    discount(price) {
        return price
    }
    
    getUnit() {

    }
    
    getNumber() {

    }
}
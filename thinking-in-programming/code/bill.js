class Bill {
    constructor(unit, number) {
        this.unit = unit;
        this.number = number;
    }

    get price() {
        return this.unit * this.number;
    }

    get discount() {
        throw new Error('subclass responsibility');
    }
}

class LoversDayBill extends Bill {
    constructor(unit, number) {
        super(unit, number)
        this.gifts = ["flower", "chocolate", "9.9 discount"]
    }

    get discount() {
        if (this.isCouple) {
            if (price > 99) {
                let lucky = Random().nextInt(gifts.size)
                println("Congratulations on getting ${gifts[lucky]}!")
            }
            return this.price * 0.77
        } else {
            return this.price
        }
    }

    get isCouple() {
        return true;
    }
}

class MiddleAutumePrice extends Bill {
    constructor(unit, number) {
        super(unit, number)
    }

    get discount() {
        if (this.price > 399) {
            return this.price - 200
        }
        return this.price
    }
}

class NationalDayBill extends Bill {
    constructor(unit, number) {
        super(unit, number)
    }

    get discount() {
        if (this.price < 100) {
            // 生成 0 ~ 9 随机数字，如果为 0 则免单。即：十分之一概率免单
            let free = Random().nextInt(10)
            if (free == 0) {
                return 0.0
            }
        }
        return this.price
    }
}

const bill = new Bill(0.25, 100);
const loversDay = new LoversDayBill(0.25, 100);
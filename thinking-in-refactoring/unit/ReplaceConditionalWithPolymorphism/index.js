
/** original */
const birds = function(bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return 'average';
        case 'AfricanSwallow':
            return (bird.numberOfCoconuts > 2) ? 'tired' : 'average';
        case 'NorwegianBlueParrot':
            return (bird.voltage > 100) ? 'scorched' : 'beautiful';
        default:
            return 'unknow';
    }
}

/** refactoring */
class EuropeanSwallow {
    get plumage() {
        return 'average';
    }
}

class AfricanSwallow {
    get plumage() {
        return (this.numberOfCoconuts > 2) ? 'tired' : 'average';
    }
}

class NorwegianBlueParrot {
    get plumage() {
        return (bird.voltage > 100) ? 'scorched' : 'beautiful';
    }
}
const Province = require('./Province');
const expect = require('chai').expect;


function sampleProvinceData() {
    return {
        name: 'Asia',
        producers: [
            {name: 'Byzantium', cost: 10, production: 9},
            {name: 'Attalia', cost: 12, production: 10},
            {name: 'Sinope', cost: 10, production: 6}
        ],
        demand: 30,
        price: 20
    }
}

describe('province', function() {
    let asia;
    beforeEach(function() {
        asia = new Province(sampleProvinceData());
    })
    it('shortfall', function() {
        expect(asia.shortfall).equal(5);
    });
    it('profit', function() {
        expect(asia.profit).equal(230);
    });
    it('change production', function() {
        asia.producers[0].production = 20;
        expect(asia.shortfall).equal(-6);
        expect(asia.profit).equal(292);
    });
    it('zero demand', function() {
        asia.demand = 0;
        expect(asia.shortfall).equal(-25);
        expect(asia.profit).equal(0);
    });
    it('negative demand', function() {
        asia.demand = -1;
        expect(asia.shortfall).equal(-26);
        expect(asia.profit).equal(-10);
    });
    it('empty string demand', function() {
        asia.demand = '';
        expect(asia.shortfall).NaN;
        expect(asia.profit).NaN;
    });
});

describe('no producers', function() {
    let noProducers;
    beforeEach(function() {
        const data = {
            name: 'No producers',
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Province(data);
    })
    it('shortfall', function() {
        expect(noProducers.shortfall).equal(30);
    });
    it('profit', function() {
        expect(noProducers.profit).equal(0);
    });
})

describe('string for producers', function() {
    it('', function() {
        const data = {
            name: 'String producers',
            producers: '',
            demand: 30,
            price: 20
        };
        const prov = new Province(data);
        expect(prov.shortfall).equal(0);
    })
})
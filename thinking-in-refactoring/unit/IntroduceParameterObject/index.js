const station = {
    name: 'ZB1',
    readings: [
        {temp: 47, time: '2016-11-10 09:10'},
        {temp: 53, time: '2016-11-10 09:20'},
        {temp: 58, time: '2016-11-10 09:30'},
        {temp: 53, time: '2016-11-10 09:40'},
        {temp: 51, time: '2016-11-10 09:50'},
    ]
}

class NumberRange{
    constructor(min, max) {
        this._data = {min: min, max: max};
    }

    get min() { return this._data.min; }
    get max() { return this._data.max; }
}

/** stage-1 */
function readingsOutSideRange(station, min, max) {
    return station.readings
        .filter(r => r.temp < min || r.temp > max);
}

const range = 
    readingsOutSideRange(
        station,
        operatingPlan.temperatureFloor,
        operatingPlan.tamperatureCeiling
    );

/** stage-2 */
function readingsOutSideRange(station, min, max, range) {
    return station.readings
        .filter(r => r.temp < min || r.temp > max);
}

const range = 
    readingsOutSideRange(
        station,
        operatingPlan.temperatureFloor,
        operatingPlan.temperatureCeiling,
        null
    );

/** stage-3 */
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
function readingsOutSideRange(station, min, max, range) {
    return station.readings
        .filter(r => r.temp < min || r.temp > max);
}

const range = 
    readingsOutSideRange(
        station,
        operatingPlan.temperatureFloor,
        operatingPlan.temperatureCeiling,
        range
    );

/** stage-4 */
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
function readingsOutSideRange(station, range) {
    return station.readings
        .filter(r => r.temp < range.min || r.temp > range.max);
}

const range = 
    readingsOutSideRange(
        station,
        range
    );


/** stage-5 */
class NumberRange{
    constructor(min, max) {
        this._data = {min: min, max: max};
    }

    get min() { return this._data.min; }
    get max() { return this._data.max; }
    contains(arg) { return (arg >= this.min && arg <= this.max); }
}

const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

function readingsOutSideRange(station, range) {
    return station.readings
        .filter(r => !range.contains(r.temp));
}

const range = 
    readingsOutSideRange(
        station,
        range
    );


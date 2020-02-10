Function.prototype.before = function (beforefn) {
    let _self = this
    return function () {
        console.log('before...', this)
        console.log('before...', arguments)
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterfn) {
    let _self = this
    return function () {
        console.log('after...', this)
        console.log('after...', arguments)
        let set = _self.apply(this, arguments);
        afterfn.apply(this.arguments);
        return set;
    }
}

let func = (params) => console.info('func', params)
func = func.before(() => {
    console.info('===before===');
}).after(() => {
    console.info('===after===');
})

func(123)

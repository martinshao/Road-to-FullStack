for (var i = 0; i < 6; i++) {
    setTimeout(function (i) {
        console.log(i);
    }.bind(i), 0);
    console.log(i);
}

for (var i = 0; i < 3; i++) {
    setTimeout((function (i) {
        return function () {
            console.log(i);
        };
    })(i), 0);
    console.log(i);
}

for (var i = 1; i <= 3; i++) {
    (function (count) {
        setTimeout(function timer() {
            console.log(count);
        }, count * 1000);
    })(i)
}

for (var i = 1; i <= 5; i++) {
    setTimeout((i) => console.log(i), 1000, i);
}


for (var i = 0; i < 5; i++) {
    function a(i) {
        setTimeout(() => {
            console.log(i)
        }, 1000);
    }
    a(i)
}

for (var i = 1; i <= 5; i++) {
    ~ function (i) {
        setTimeout(() => {
            console.log(i)
        }, 1000);
    }(i)
}


for (var i = 1; i <= 5; i++) {
    setTimeout(
        (i =>
            () => console.log(i)
        )(i), 1000);
}
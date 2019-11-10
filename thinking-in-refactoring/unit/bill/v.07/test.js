let a = {name: 'xiaoming'}

function print(person) {
    let b = Object.assign({}, person)
    b.name = 'xiaowang'
    console.info(b.name);
}

print(a)
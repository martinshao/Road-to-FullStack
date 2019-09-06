var fetch = require('node-fetch');

function* gen() {
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

// -------------------------------------------------------------
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);

// -------------------------------------------------------------
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);

// -------------------------------------------------------------
function getSomething() {
  return "something";
}

async function testAsync() {
  return Promise.resolve("hello async");
}

async function test() {
  const v1 = await getSomething();
  console.info(v1)
  const v2 = await testAsync();
  console.log(v1, v2);
}

test();

// -------------------------------------------------------------
async function timout() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, 100);
  });
}
function getSomething(param) {
  console.info('getSomething', param);
  return "something";
}

async function test() {
  console.info('---test---start---')
  const v1 = await timout();
  console.info('---await---1---')
  const v2 = getSomething(v1);
  console.info('---await---2---')
  console.log(v1, v2);
}

test();

console.info('---------js end-----------');

// -------------------------------------------------------------
async function retriveProfile(email) {
  const user = await getUser(email);
  const roles = await getRoles(user);
  const level = await getLevel(user);
  return [user, roles, level];
}

async function retriveProfile(email) {
  const user = await getUser(email);
  const p1 = getRoles(user);
  const p2 = getLevel(user);
  const roles = await p1;
  const level = await p2;
  return [user, roles, level];
}

// -------------------------------------------------------------
async function retriveSize(imgs) {
  const result = [];
  for (const img of imgs) {
    result.push(await getSize(img));
  }
}

async function retriveSize(imgs) {
  return Promise.all(imgs.map(img => getSize(img)));
}

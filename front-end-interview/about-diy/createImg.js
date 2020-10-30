/**
 * 利用promise 定时器做图片延迟加载
 */
// method1
function createImg(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    setTimeout(() => {
      resolve(img);
    }, 1000);
  });
}

createImg('1.jpg')
  .then(function (value) {
    document.body.appendChild(value);
    return createImg('2.jpg');
  })
  .then(function (value) {
    document.body.appendChild(value);
    return createImg('3.jpg');
  })
  .then(function (value) {
    document.body.appendChild(value);
  });

// method2
function createImg(url, delay) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url
    setTimeout(() => {
      document.body.appendChild(img)
      resolve()
    }, delay);
  })
}

createImg("1.jpg", 1000)
  .then(function () {
    return createImg("2.jpg", 2000)
  })
  .then(function () {
    return createImg("3.jpg", 3000)
  })
  .then(function () {})
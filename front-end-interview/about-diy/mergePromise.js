const timeout = ms => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
  console.log('1');
  return 1;
});

const ajax2 = () => timeout(1000).then(() => {
  console.log('2');
  return 2;
});

const ajax3 = () => timeout(2000).then(() => {
  console.log('3');
  return 3;
});

const mergePromise = ajaxArray => {
  var data = [];
  var sequence = Promise.resolve();

  ajaxArray.forEach(item => {
    sequence = sequence.then(item).then(res => {
      data.push(res);
      return data;
    });
  });
  return sequence;
};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data);
});
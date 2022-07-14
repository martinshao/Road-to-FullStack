const historyDataCol = { avg_score: 'avg_score', list: 'list' };
const result = [
  { avg_score: 2.93, list: 444 },
  { avg_score: 3.93, list: 544 },
  { avg_score: 4.93, list: 644 },
];
const SelectValue = [
  { name: 'avg_score', data: [2.93, 3.93, 4.93] },
  { name: 'list', data: [444, 544, 644] },
];

const transform = (param) => {
  if (!Array.isArray(param)) return;
  const value = param.reduce((acc, curr) => {
    Object.keys(curr).forEach((el) => {
      if (!Array.isArray(acc[el])) acc[el] = [];
      acc[el].push(curr[el]);
    });
    return acc;
  }, {});

  return Object.keys(value).map((key) => ({
    name: key,
    data: value[key],
  }));
};

console.info(transform(result))

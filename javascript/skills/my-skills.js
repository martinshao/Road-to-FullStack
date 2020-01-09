let links = [
  {
    "link": "shanghai-link",
    "region": "shanghai"
  },
  {
    "link": "beijing-link",
    "region": "beijing"
  },
  {
    "link": "hangzhou-link",
    "region": "hangzhou"
  },
  {
    "link": "guangzhou-link",
    "region": "guangzhou"
  },
]

const fromPairs = pairs => pairs.reduce(
  (res, pair) => (
    (res[pair['region']] = pair['link']), res), {}
)

fromPairs(links)

const objLikeArr = [["name", "Jim"], ["age", 18], ["single", true]];

const fromPairs = pairs =>
  pairs.reduce(
    (res, pair) => (
      (res[pair[0]] = pair[1]
      ), res), {}
  );

fromPairs(objLikeArr);
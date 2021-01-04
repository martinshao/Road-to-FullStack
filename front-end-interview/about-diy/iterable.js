// JavaScript Demo: Expressions - Destructuring assignment
function getDes({ header, data, filename, autoWidth = true } = {}) {
  header = header || '';
  data = [...data];
  filename = filename || 'list';
  return {
    header,
    data,
    filename,
    autoWidth,
  };
}

const input = {
  header: 'content',
  data: { name: 'shaogucheng' },
  filename: 'lists',
  autoWidth: false,
};

console.info(getDes(input));

var courseLists = [
  {
    name: 'My Courses',
    courses: [
      {
        id: 511019,
        title: 'React for Beginners',
        covers: [
          {
            width: 150,
            height: 200,
            url: 'http://placeimg.com/150/200/tech',
          },
          {
            width: 200,
            height: 200,
            url: 'http://placeimg.com/200/200/tech',
          },
          {
            width: 300,
            height: 200,
            url: 'http://placeimg.com/300/200/tech',
          },
        ],
        tags: [
          {
            id: 1,
            name: 'JavaScript',
          },
        ],
        rating: 5,
      },
      {
        id: 511020,
        title: 'Front-End automat workflow',
        covers: [
          {
            width: 150,
            height: 200,
            url: 'http://placeimg.com/150/200/arch',
          },
          {
            width: 200,
            height: 200,
            url: 'http://placeimg.com/200/200/arch',
          },
          {
            width: 300,
            height: 200,
            url: 'http://placeimg.com/300/200/arch',
          },
        ],
        tags: [
          {
            id: 2,
            name: 'gulp',
          },
          {
            id: 3,
            name: 'webpack',
          },
        ],
        rating: 5,
      },
    ],
  },
  {
    name: 'New Release',
    courses: [
      {
        id: 511022,
        title: 'Vue2 for Beginners',
        covers: [
          {
            width: 150,
            height: 200,
            url: 'http://placeimg.com/150/200/nature',
          },
          {
            width: 200,
            height: 200,
            url: 'http://placeimg.com/200/200/nature',
          },
          {
            width: 300,
            height: 200,
            url: 'http://placeimg.com/300/200/nature',
          },
        ],
        tags: [
          {
            id: 1,
            name: 'JavaScript',
          },
        ],
        rating: 5,
      },
      {
        id: 511023,
        title: 'Angular2 for Beginners',
        covers: [
          {
            width: 150,
            height: 200,
            url: 'http://placeimg.com/150/200/people',
          },
          {
            width: 200,
            height: 200,
            url: 'http://placeimg.com/200/200/people',
          },
          {
            width: 300,
            height: 200,
            url: 'http://placeimg.com/300/200/people',
          },
        ],
        tags: [
          {
            id: 1,
            name: 'JavaScript',
          },
        ],
        rating: 5,
      },
    ],
  },
];

/* 
var result = courseList
不得直接使用索引 covers[0]，請用 concatAll, map, filter, forEach 完成
result 結果為 [
    {
      id: 511019,
      title: "React for Beginners",
      cover: "http://placeimg.com/150/200/tech"
    }, {
      id: 511020,
      title: "Front-End automat workflow",
      cover: "http://placeimg.com/150/200/arch"
    }, {
      id: 511022,
      title: "Vue2 for Beginners",
      cover: "http://placeimg.com/150/200/nature"
    }, {
      id: 511023,
      title: "Angular2 for Beginners",
      cover: "http://placeimg.com/150/200/people"
    },
 ]
*/

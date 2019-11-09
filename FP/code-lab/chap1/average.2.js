console.info(_);
let enrollment = [
  {enrolled: 2, grade: 100},
  {enrolled: 2, grade: 80},
  {enrolled: 1, grade: 89}
];

const average = _
    .chain(enrollment)
    .filter(student => student.enrolled > 1)
    .map('grade')
    .mean()
    .value();

console.info(average);

interface Person {
  age: number;
  occupation: string;
}

interface Author extends Person {
  firstName: string;
  lastName: string;
}

const Arony: Author = {
  age: 22,
  occupation: 'developer',
  firstName: 'PJ',
  lastName: 'Chen',
}


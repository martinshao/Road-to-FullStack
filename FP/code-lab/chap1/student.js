'use strict';

class Address {
  constructor(country, state, city, zip, street) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }

  get street() {
     return this._street;
  }

  get city() {
     return this._city;
  }

  get state() {
     return this._state;
  }

  get zip() {
     return this._zip;
  }

  get country() {
     return this._country;
  }

  country() {
    return this._country;
  }
}

const china = new Address('Chinese');
console.info(china.country());

class Person {
  constructor(firstname, lastname, ssn) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._ssn = ssn;
    this._address = null;
    this._birthYear = null;
  }

  get firstname() {
    return this._firstname;
  }

  set firstname(fname) {
    return this._firstname = fname;
  }

  get lastname() {
    return this._lastname;
  }

  get ssn() {
    return this._ssn;
  }

  get address() {
    return this._address;
  }

  get birthYear() {
    return this._birthYear;
  }

  set address(addr) {
    this._address = addr;
  }

  set birthYear(year) {
    this._birthYear = year;
  }

  toString() {
    return `Person(${this._firstname}, ${this._lastname})`;
  }

  // Person class
  peopleInSameCountry(friends) {
    var result = [];
    for(let idx in friends) {
      var friend = friends[idx];
      if(this.address.country === friend.address.country) {
        result.push(friend);
      }
    }
    return result;
  }
}

var person = new Person('gucheng', 'shao', '18356031986');
console.info(person._firstname);
person.firstname = 'wei';
console.info(person);

const cc = 'ccc';
cc ='bbb';

class Student extends Person {
  constructor(firstname, lastname, ssn, school) {
    super(firstname, lastname, ssn);
    this._school = school;
  }

  get school() {
    return this._school;
  }

  school() {
    return this._school;
  }

  // Student class
  studentsInSameCountryAndSchool(friends) {
    var closeFriends = super.peopleInSameCountry(friends);
    var result = [];
    for (let idx in closeFriends) {
      var friend = closeFriends[idx];
      if(this.school === friend.school) {
        result.push(friend);
      }
    }
    return result;
  }
}

var curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State');
curry.address = new Address('US');

var turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton');
turing.address = new Address('England');

var church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton');
church.address = new Address('US');

var kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton');
kleene.address = new Address('US');

const a = church.studentsInSameCountryAndSchool([curry, turing, kleene]);

console.info(a);

function selector(country, school) {
  return function(student) {
    return student.address.country() === country && student.school() === school;
  };
}

var findStudentBy = function(friends, selector) {
  return friends.filter(selector);
};

const bb = findStudentBy([curry, turing, church, kleene], selector('US', 'Princeton'));

console.info(bb);
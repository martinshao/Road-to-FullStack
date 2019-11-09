function zipCode(code, location) {
  let _code = code;
  let _location = location || '';

  return {
    code: function() {return _code},
    location: function() {return _location},
    fromString: function(str) {
      let parts = str.split('-');
      return zipCode(parts[0], parts[1]);
    },
    toString: function() {return _code + '-' + _location;}
  }
}

console.info(zipCode);

const princetonZip = zipCode('08544', '3345');
console.info(princetonZip);
console.info(princetonZip.code());
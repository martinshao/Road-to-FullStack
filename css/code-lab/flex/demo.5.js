var scope = "global scope";
  function checkscope() {
    var scope2 = 'local scope';
    function innerscope() {
      var scope3 = 'inner scope'
      return scope3
    }
    var a = innerscope()
    return scope2;
  }
  checkscope();
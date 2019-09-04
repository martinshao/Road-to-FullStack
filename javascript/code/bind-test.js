test('Function.prototype.bind', function(){
  function orig(){
    return this.x;
  };
  var bound = orig.bind({x: 'bind'});
  equal(bound(), 'bind', 'invoke directly');
  equal(bound.call({x: 'call'}), 'bind', 'invoke by call');
  equal(bound.apply({x: 'apply'}), 'bind', 'invoke by apply');
});
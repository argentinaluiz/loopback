const collect = require('collect.js');

console.log(
  collect([{id: 1}, {id: 2}])
    .pluck('id')
    .all(),
);

console.log('a'.split('.'));

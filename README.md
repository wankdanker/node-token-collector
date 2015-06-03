token-collector
---------------

Parse strings and collect tokens that match filter functions

install
-------

```bash
npm install token-collector
```

example
-------

```js
var tc = require('token-collector')();

tc.addFilter(function (str) {
	return str && str.length && str.length > 3
});

tc.parse('which of these words are greater than three characters');

console.log(tc.get());
/*
[ { token: 'which', count: 1 },
  { token: 'these', count: 1 },
  { token: 'words', count: 1 },
  { token: 'greater', count: 1 },
  { token: 'than', count: 1 },
  { token: 'three', count: 1 },
  { token: 'characters', count: 1 } ]
*/
```

license
-------
MIT

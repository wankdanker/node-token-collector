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

api
---


### constructor

```js
var tc = require('token-collector')();
```

### .addFilter(fn)

Add a filter function to which each token is passed. If the function returns `true` then the
token is added to the collection. If the function returns `false` then the token is discarded.

```js
//only accept tokens starting with the letter a
tc.addFilter(function (tok) {
	return (tok.substr(0,1) === "a")
});
```

### .parse(string)

Parse `string` for tokens and add them to the collection if they pass all filters

### .add(string)

Add `string` to the collection if it passes all filters

### .get()

Return an array of token objects that take the form:

```json
{
	"token" : "string"
	, "count" : 1
}
```

### .toArray()

Return an array of token strings from the collection

### .toString()

Return a camma separated list of tokens from the collection

license
-------
MIT

var test = require('tape')
	, TC = require('./')

test('basic usage', function (t) {
	var tc = TC();

	tc.addFilter(function (str) {
		return str && str.length && str.length > 3
	});

	tc.parse('which of these words are greater than three characters');
	
	var result = tc.get();

	t.deepEqual([ { token: 'which', count: 1 },
	  { token: 'these', count: 1 },
	    { token: 'words', count: 1 },
	      { token: 'greater', count: 1 },
	        { token: 'than', count: 1 },
		  { token: 'three', count: 1 },
		    { token: 'characters', count: 1 } ], result);

	t.end();
});

module.exports = function (opts) {
	return new TokenCollector(opts);
};

module.exports.TokenCollector = TokenCollector;

function TokenCollector() {
	var self = this;
	self.settings = {
		separator : " "
	};
	
	self.tokens = {};
	self.tokenArray = [];
	
	self.filters = [];
	
	self.TokenObject = function (token) {
		this.token = token;
		this.count = 0;
	};
	
	self.TokenObject.prototype.toString = function () {
		return this.token;
	};
}

TokenCollector.prototype.addFilter = function (fn) {
	var self = this;
	
	self.filters.push(fn);
	
	return self;
};

TokenCollector.prototype.parse = function (str, weight) {
	var self = this, x, fn;
	
	(str || "").split(self.settings.separator).forEach(function (token) {
		self.add(token, weight);
	});
	
	return self;
};

TokenCollector.prototype.add = function (token, weight) {
	var self = this, x, fn;
	
	//check to see if we have filters specified
	if (self.filters.length) {
		//loop through each filter
		for (x = 0; x < self.filters.length; x++) {
			//get a reference to the filter function
			fn = self.filters[x];
			
			//if filter fails then exit and don't add this token
			if (!fn(token)) {
				return false;
			}
		};
	}
	
	if (!self.tokens[token]) {
		self.tokens[token] = new self.TokenObject(token);
		self.tokenArray.push(self.tokens[token]);
	}
	
	self.tokens[token].count += weight || 1;
	
	return self;
};

TokenCollector.prototype.get = function (token) {
	var self = this;
	
	if (token) {
		return self.tokens[token] || 0;
	}
	
	return self.tokenArray;
};

TokenCollector.prototype.toArray = function () {
	var self = this;
	
	return Object.keys(self.tokens);
};

TokenCollector.prototype.toString = function () {
	var self = this;
	
	return Object.keys(self.tokens).join(', ');
};

TokenCollector.prototype.toJSON = function () {
	var self = this;
	
	return self.tokens;
};

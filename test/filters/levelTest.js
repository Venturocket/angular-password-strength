/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 12:55 PM
 */

describe("Password Strength Level Filter", function() {
	
	var filter;
	
	beforeEach(module("vr.filters.passwordStrength.level"));
	
	beforeEach(module(function($provide) {
		$provide.factory("passwordStrengthComputations", function() {
			return {
				getStrength: function(word) {
					if(word == "testing") {
						return 0;
					} else if(word == "banshee") {
						return 33.253548;
					}
					return 100;
				}
			}
		})
	}));
	
	beforeEach(inject(function($filter) {
		filter = $filter('passwordLevel');
	}));
	
	it("should say 'testing' is level 1 of 5", function() {
		expect(filter('testing')).toBe("level1");
	});
	
	it("should say 'banshee' is level 2 of 5", function() {
		expect(filter('banshee')).toBe("level2");
	});
	
	it("should say 'banshee' is level 4 of 10", function() {
		expect(filter('banshee',10)).toBe("level4");
	});
	
	it("should say 'Puppies1!' is level 5 of 5", function() {
		expect(filter('Puppies1!')).toBe("level5");
	});
	
});

/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 12:30 PM
 */

describe("Password Strength Percent Filter", function() {
	
	var filter;
	
	beforeEach(module("vr.filters.passwordStrength.percent"));
	
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
		filter = $filter('passwordPercent');
	}));
	
	it("should say the percent is 0%", function() {
		expect(filter('testing')).toBe("0%");
	});
	
	it("should say the percent is 34%", function() {
		expect(filter('banshee')).toBe("33%");
	});
	
	it("should say the percent is 100%", function() {
		expect(filter('Puppies1!')).toBe("100%");
	});
	
});

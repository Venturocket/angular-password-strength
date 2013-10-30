/**
 * Author: Derek Gould
 * Date: 10/29/13
 * Time: 11:47 PM
 */

angular.module("vr.filters.passwordStrength.level", ["vr.services.passwordStrength"])
	.filter("passwordLevel", ["passwordStrengthComputations", function($password) {
		return function(input, levels) {
			if(angular.isUndefined(levels)) {
				levels = 5;
			}
			var level = Math.ceil($password.getStrength(input) / (100 / levels));
			return "level"+(level==0?1:level);
		};
	}]);

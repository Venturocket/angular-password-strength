/**
 * Author: Derek Gould
 * Date: 10/29/13
 * Time: 7:35 PM
 */

angular.module("vr.filters.passwordStrength.percent", ["vr.services.passwordStrength"])
	.filter("passwordPercent", ['passwordStrengthComputations', function($password) {
		return function(input) {
			return Math.round($password.getStrength(input))+"%";
		};
	}]);

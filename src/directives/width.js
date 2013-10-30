/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 11:02 AM
 */

angular.module("vr.directives.passwordStrength.width", ["vr.filters.passwordStrength.percent"])
	.directive("pwWidth", ['$filter', function($filter) {
		return {
			restrict: "A",
			scope: {
				password: '@pwWidth'
			},
			link: function(scope, elem) {
				scope.$watch('password', function(newPassword) {
					elem.css('width', $filter('passwordPercent')(newPassword));
				});
			}
		}
	}]);

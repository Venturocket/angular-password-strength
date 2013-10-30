/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 9:59 AM
 */

angular.module("vr.directives.passwordStrength.class", ["vr.filters.passwordStrength.level"])
	.directive("pwClass", ['$filter', function($filter) {
		return {
			restrict: "A",
			scope: {
				password: '@pwClass',
				levels: '@pwLevels'
			},
			link: function(scope, elem) {
				var prevClass = '';
				
				scope.levels = parseInt(scope.levels);
				
				if(scope.levels < 1 || scope.levels == Infinity) {
					scope.levels = 5;
				}
				
				function setClass(password, levels) {
					if(prevClass != '') {
						elem.removeClass(prevClass);
					}
					if(password != '') {
						prevClass = "pw-"+$filter('passwordLevel')(password, levels);
						elem.addClass(prevClass);
					} else {
						prevClass = '';
					}
				}
				
				scope.$watch('password', function(newPassword) {
					setClass(newPassword, scope.levels);
				});
				
				scope.$watch('levels', function(newLevels) {
					setClass(scope.password, newLevels);
				})
			}
		}
	}]);

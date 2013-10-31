/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 9:59 AM
 */

angular.module("vr.directives.passwordStrength.class", ["vr.filters.passwordStrength.level"])
	.directive("pwClass", ['$filter', function($filter) {
		return {
			restrict: "A",
			link: function(scope, elem, attr) {
				var prevClass = '';
				
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
				
				scope.$watch(function() { return attr.pwClass; }, function(newPassword) {
					scope.password = newPassword;
					setClass(newPassword, scope.levels);
				});
				
				scope.$watch(function() { return attr.pwLevels; }, function(newLevels) {
					if(newLevels) {
						scope.levels = parseInt(newLevels);
					} else {
						scope.levels = undefined;
					}
					setClass(scope.password, newLevels);
				})
			}
		}
	}]);

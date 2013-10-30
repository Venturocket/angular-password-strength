/**
 * Author: Derek Gould
 * Date: 10/29/13
 * Time: 10:47 AM
 */

angular.module("vr.passwordStrength", ["vr.filters.passwordStrength", "vr.directives.passwordStrength"]);
angular.module("vr.filters.passwordStrength", ["vr.filters.passwordStrength.percent", "vr.filters.passwordStrength.level"]);
angular.module("vr.directives.passwordStrength", ["vr.directives.passwordStrength.class", "vr.directives.passwordStrength.width"]);

/**
 * Author: Derek Gould
 * Date: 10/29/13
 * Time: 11:00 AM
 */

angular.module('vr.services.passwordStrength', [])
	.factory("passwordStrengthComputations", function() {
		var aspects = {
			minimumLength: {
				min: 8,
				weight: 30,
				/**
				 * Make sure the password meets a minimum length, extra credit if longer, 1/2 partial credit if shorter
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var length = password.length;
					if(length < aspects.minimumLength.min) {
						length /= 2;	
					}
					return length / aspects.minimumLength.min * aspects.minimumLength.weight;
				}
			},
			uppercaseLetters: {
				min: 1,
				weight: 10,
				/**
				 * Make sure there are the minimum number of uppercase letters present, partial credit for less than the minimum
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var matches = password.match(/[A-Z]/g);
					if(!matches) {
						return 0;
					}
					return matches.length >= aspects.uppercaseLetters.min?
						   		aspects.uppercaseLetters.weight:
								(matches.length / aspects.uppercaseLetters.min * aspects.uppercaseLetters.weight);
				}
			},
			lowercaseLetters: {
				min: 1,
				weight: 10,
				/**
				 * Make sure there are the minimum number of lowercase letters present, partial credit for less than the minimum
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var matches = password.match(/[a-z]/g);
					if(!matches) {
						return 0;
					}
					return matches.length >= aspects.lowercaseLetters.min?
						   		aspects.lowercaseLetters.weight:
								(matches.length / aspects.lowercaseLetters.min * aspects.lowercaseLetters.weight);
				}
			},
			symbols: {
				min: 1,
				weight: 10,
				/**
				 * Make sure there are the minimum number of symbols present, partial credit for less than the minimum
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var matches = password.match(/[$-/:-?{-~!\"^_`\[\]]/g);
					if(!matches) {
						return 0;
					}
					return matches.length >= aspects.symbols.min?
						   		aspects.symbols.weight:
								(matches.length / aspects.symbols.min * aspects.symbols.weight);
				}
			},
			numbers: {
				min: 1,
				weight: 10,
				/**
				 * Make sure there are the minimum number of numbers present, partial credit for less than the minimum
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var matches = password.match(/[0-9]/g);
					if(!matches) {
						return 0;
					}
					return matches.length >= aspects.numbers.min?
						   		aspects.numbers.weight:
								(matches.length / aspects.numbers.min * aspects.numbers.weight);
				}
			}, 
			duplicates: {
				max: 3,
				weight: -30,
				/**
				 * Penalize for repeated characters (e.g. "aaaaaa"), each character over max counts for full weight
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var strength = 0;
					var matches = password.match(new RegExp("(.)\\1{"+aspects.duplicates.max+",}","g"));
					angular.forEach(matches, function(match) {
						strength += (match.length - aspects.duplicates.max) * aspects.duplicates.weight;
					});
					return strength;
				}
			},
			consecutive: {
				max: 3,
				weight: -10,
				/**
				 * Penalize for sequential characters (e.g. "abcde" or "54321"), each character over max counts for full weight
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var strength = 0;
					var lastChar = 0;
					var inc = true;
					var count = 0;
					for(var i=0;i<=password.length;i++) {
						var charCode = -99;
						if(i < password.length) {
							charCode = password.charCodeAt(i);
						}
						if(charCode == lastChar+1) {
							if(inc) {
								count++;
							} else {
								count = 2;
							}
							inc = true;
						} else if(charCode == lastChar-1) {
							if(!inc) {
								count++;
							} else {
								count = 2;
							}
							inc = false;
						} else {
							strength += count > aspects.consecutive.max?
											(count - aspects.consecutive.max) * aspects.consecutive.weight:
											0;
							count = 1;
						}
						lastChar = charCode;
					}
					return strength;
				}
			},
			dictionary: {
				words: [ "asdf", "password", "qwerty", "monkey", "letmein", "dragon", "baseball", "iloveyou", "trustno1", "sunshine", "master", 
						 "welcome", "shadow", "ashley", "football", "jesus", "michael", "ninja", "mustang", "test" ],
				weight: -40,
				/**
				 * Penalize for inclusion of dictionary words
				 * @param {string} password
				 * @returns {number}
				 */
				strength: function(password) {
					var strength = 0;
					angular.forEach(aspects.dictionary.words, function(word) {
						strength += password.indexOf(word) >= 0?
										aspects.dictionary.weight:
										0;
					});
					return strength;
				}
			}
		};

		/**
		 * Compute the password's strength
		 * @param {string} password
		 * @returns {number} the strength percent
		 */
		function computeStrength(password) {
			var total = 0;
			var strength = 0;
			
			angular.forEach(aspects, function(aspect) {
				if(aspect.weight != 0) {
					total += aspect.weight>0?aspect.weight:0;
					strength += aspect.strength(password);
				}
			});
			
			return total>0?(strength/total*100):0;
		}
		
		return {
			aspects: aspects,
			getRawStrength: computeStrength,
			getStrength: function(password) {
				var percent = computeStrength(password); 
				return percent>100?100:(percent<0?0:percent);
			},
			isStrongEnough: function(password,minStrength) {
				return computeStrength(password) >= minStrength;
			}
		};
	});

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

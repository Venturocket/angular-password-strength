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
					if(password) {
						var length = password.length;
						if(length < aspects.minimumLength.min) {
							length /= 2;	
						}
						return length / aspects.minimumLength.min * aspects.minimumLength.weight;
					}
					return 0;
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
					if(password) {
						var matches = password.match(/[A-Z]/g);
						if(!matches) {
							return 0;
						}
						return matches.length >= aspects.uppercaseLetters.min?
									aspects.uppercaseLetters.weight:
									(matches.length / aspects.uppercaseLetters.min * aspects.uppercaseLetters.weight);
					}
					return 0;
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
					if(password) {
						var matches = password.match(/[a-z]/g);
						if(!matches) {
							return 0;
						}
						return matches.length >= aspects.lowercaseLetters.min?
									aspects.lowercaseLetters.weight:
									(matches.length / aspects.lowercaseLetters.min * aspects.lowercaseLetters.weight);
					}
					return 0;
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
					if(password) {
						var matches = password.match(/[$-/:-?{-~!\"^_`\[\]]/g);
						if(!matches) {
							return 0;
						}
						return matches.length >= aspects.symbols.min?
									aspects.symbols.weight:
									(matches.length / aspects.symbols.min * aspects.symbols.weight);
					}
					return 0;
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
					if(password) {
						var matches = password.match(/[0-9]/g);
						if(!matches) {
							return 0;
						}
						return matches.length >= aspects.numbers.min?
									aspects.numbers.weight:
									(matches.length / aspects.numbers.min * aspects.numbers.weight);
					}
					return 0;
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
					if(password) {
						var strength = 0;
						var matches = password.match(new RegExp("(.)\\1{"+aspects.duplicates.max+",}","g"));
						angular.forEach(matches, function(match) {
							strength += (match.length - aspects.duplicates.max) * aspects.duplicates.weight;
						});
						return strength;
					}
					return 0;
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
					if(password) {
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
					return 0;
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
					if(password) {
						var strength = 0;
						angular.forEach(aspects.dictionary.words, function(word) {
							strength += password.indexOf(word) >= 0?
											aspects.dictionary.weight:
											0;
						});
						return strength;
					}
					return 0;
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

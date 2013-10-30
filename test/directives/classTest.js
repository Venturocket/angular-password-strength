/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 1:14 PM
 */

describe("Password Strength Class Directive", function() {
	
	var elem;
	var $compile;
	var $rootScope;
	var $scope;
	
	beforeEach(module("vr.directives.passwordStrength.class"));
	
	beforeEach(module(function($filterProvider) {
		$filterProvider.register("passwordLevel", function() {
			return function(input, levels) {
				if(!levels) {
					levels = 5;
				}
				if(input == "testing") {
					return "level1";
				} else if(input == "banshee") {
					return "level"+Math.ceil(33/(100/levels));
				}
				return "level5";
			}
		});
	}));
	
	beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	beforeEach(function() {
		elem = angular.element("<div pw-class='{{ word }}' pw-levels='{{ levels }}'></div>");
		$scope = $rootScope.$new();
	});
	
	it("should give the element the 'pw-level1' class", function() {
		$scope.word = 'testing';
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveClass('pw-level1');
	});
	
	it("should give the element the 'pw-level2' class", function() {
		$scope.word = 'banshee';
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveClass('pw-level2');
	});
	
	it("should give the element the 'pw-level4' class", function() {
		$scope.word = 'banshee';
		$scope.levels = 10;
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveClass('pw-level4');
	});
	
	it("should give the element the 'pw-level5' class", function() {
		$scope.word = 'Puppies1!';
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveClass('pw-level5');
	});
	
});

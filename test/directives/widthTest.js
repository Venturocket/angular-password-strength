/**
 * Author: Derek Gould
 * Date: 10/30/13
 * Time: 2:12 PM
 */

describe("Password Strength Class Directive", function() {
	
	var elem;
	var $compile;
	var $rootScope;
	var $scope;
	
	beforeEach(module("vr.directives.passwordStrength.width"));
	
	beforeEach(module(function($filterProvider) {
		$filterProvider.register("passwordPercent", function() {
			return function(input) {
				if(input == "testing") {
					return "0%";
				} else if(input == "banshee") {
					return "33%";
				}
				return "100%";
			}
		});
	}));
	
	beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	beforeEach(function() {
		elem = angular.element("<div pw-width='{{ word }}'></div>");
		$scope = $rootScope.$new();
	});
	
	it("should make the width 0%", function() {
		$scope.word = 'testing';
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveWidth("0%");
	});
	
	it("should make the width 33%", function() {
		$scope.word = 'banshee';
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveWidth("33%");
	});
	
	it("should make the width 100%", function() {
		$scope.word = 'Puppies1!';
		var el = $compile(elem)($scope);
		$scope.$digest();
		expect(el).toHaveWidth("100%");
	});
	
});

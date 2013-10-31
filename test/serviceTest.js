/**
 * Author: Derek Gould
 * Date: 10/29/13
 * Time: 12:18 PM
 */

describe("Password Strength Service", function() {
	
	var $password;
	
	beforeEach(module('vr.services.passwordStrength'));
	
	beforeEach(inject(function($injector) {
		$password = $injector.get('passwordStrengthComputations');
	}));
	
	it("should satisfy the length condition", function() {
		expect($password.aspects.minimumLength.strength,undefined).not.toThrow();
		expect($password.aspects.minimumLength.strength,null).not.toThrow();
		expect($password.aspects.minimumLength.strength('12345678')).toBe(30);
		expect($password.aspects.minimumLength.strength('1234567')).toBeAround(13);
		expect($password.aspects.minimumLength.strength('123456789')).toBeAround(33);
	});
	
	it("should satisfy the uppercase condition", function() {
		expect($password.aspects.uppercaseLetters.strength,undefined).not.toThrow();
		expect($password.aspects.uppercaseLetters.strength,null).not.toThrow();
		expect($password.aspects.uppercaseLetters.strength('A')).toBe(10);
		expect($password.aspects.uppercaseLetters.strength('a')).toBe(0);
		expect($password.aspects.uppercaseLetters.strength('AA')).toBe(10);
	});
	
	it("should satisfy the lowercase condition", function() {
		expect($password.aspects.lowercaseLetters.strength,undefined).not.toThrow();
		expect($password.aspects.lowercaseLetters.strength,null).not.toThrow();
		expect($password.aspects.lowercaseLetters.strength('a')).toBe(10);
		expect($password.aspects.lowercaseLetters.strength('A')).toBe(0);
		expect($password.aspects.lowercaseLetters.strength('aa')).toBe(10);
	});
	
	it("should satisfy the symbol condition", function() {
		expect($password.aspects.symbols.strength,undefined).not.toThrow();
		expect($password.aspects.symbols.strength,null).not.toThrow();
		expect($password.aspects.symbols.strength('!')).toBe(10);
		expect($password.aspects.symbols.strength('a')).toBe(0);
		expect($password.aspects.symbols.strength('!?')).toBe(10);
	});
	
	it("should satisfy the number condition", function() {
		expect($password.aspects.numbers.strength,undefined).not.toThrow();
		expect($password.aspects.numbers.strength,null).not.toThrow();
		expect($password.aspects.numbers.strength('1')).toBe(10);
		expect($password.aspects.numbers.strength('a')).toBe(0);
		expect($password.aspects.numbers.strength('12')).toBe(10);
	});
	
	it("should satisfy the duplicates condition", function() {
		expect($password.aspects.duplicates.strength,undefined).not.toThrow();
		expect($password.aspects.duplicates.strength,null).not.toThrow();
		expect($password.aspects.duplicates.strength('1111')).toBe(-30);
		expect($password.aspects.duplicates.strength('111')).toBe(0);
		expect($password.aspects.duplicates.strength('11111')).toBe(-60);
	});
	
	it("should satisfy the consecutive condition", function() {
		expect($password.aspects.consecutive.strength,undefined).not.toThrow();
		expect($password.aspects.consecutive.strength,null).not.toThrow();
		expect($password.aspects.consecutive.strength('1234')).toBe(-10);
		expect($password.aspects.consecutive.strength('123')).toBe(0);
		expect($password.aspects.consecutive.strength('12345')).toBe(-20);
	});
	
	it("should satisfy the dictionary condition", function() {
		expect($password.aspects.dictionary.strength,undefined).not.toThrow();
		expect($password.aspects.dictionary.strength,null).not.toThrow();
		expect($password.aspects.dictionary.strength('password')).toBe(-40);
		expect($password.aspects.dictionary.strength('ababab')).toBe(0);
		expect($password.aspects.dictionary.strength('passwordragon')).toBe(-80);
	});
	
	it("should say 'testing' is super weak", function() {
		expect($password.getRawStrength('testing')).toBeAround(-24);
	});
	
	it("should say 'testing' is weak", function() {
		expect($password.getStrength('testing')).toBe(0);
	});
	
	it("should say 'banshee' is fairly weak", function() {
		expect($password.getStrength('banshee')).toBeAround(33);
	});
	
	it("should say 'asdf18!H' is weak", function() {
		expect($password.getStrength('asdf18!H')).toBeAround(43);
	});
	
	it("should say 'Puppies1!' is string", function() {
		expect($password.getStrength('Puppies1!')).toBe(100);
	});
	
	it("should say 'testing' is not strong enough (10%)", function() {
		expect($password.isStrongEnough('testing',10)).toBeFalsy();
	});
	
	it("should say 'banshee' is strong enough (30%)", function() {
		expect($password.isStrongEnough('banshee',30)).toBeTruthy();
	});
	
	it("should say 'Puppies1!' is strong enough (100%)", function() {
		expect($password.isStrongEnough('Puppies1!',100)).toBeTruthy();
	});
});

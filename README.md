# angular-password-strength [![Build Status](https://travis-ci.org/Venturocket/angular-password-strength.png?branch=master)](https://travis-ci.org/Venturocket/angular-password-strength)
Password strength filters and directives

## Filters
### Password Strength Percent
#### Usage
```
{{ password | passwordPercent }}
```
It returns the percent as a string, so `{{ 'banshee' | passwordPercent }}` will result in `33%`.

### Password Strength Level
#### Usage
```
{{ password | passwordLevel:levels }}
```
It returns the level as a string, so `{{ 'banshee' | passwordLevel:10 }}` will result in `level4`.
`levels` defaults to `5`


## Directives
### Password Strength Class
This will add a class to the element based on the strength of the password given.
For example, if the strength of the password is 33% and there are 5 strength levels the class `pw-level2` will be added to the element.
#### Markup
```
<div pw-class="{string}"
	 pw-levels="{integer}">
</div>
```
#### Parameters
|Param	|Type	|Required	|Default	|Details	|
|-------|-------|-----------|-----------|-----------|
|pw-class|string|yes		|none		|the string to check the strength of |
|pw-levels|int	|no			|5			|how many strength levels there are |

### Password Strength Width
This will set the width of the element to the strength percent of the password given.
For example, if the strength of the password is 33% the element will be given `width: 33%;`.
#### Markup
```
<div pw-width="{string}">
</div>
```
#### Parameters
|Param	|Type	|Required	|Default	|Details	|
|-------|-------|-----------|-----------|-----------|
|pw-class|string|yes		|none		|the string to check the strength of |

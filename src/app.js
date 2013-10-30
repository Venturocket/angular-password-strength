/**
 * Author: Derek Gould
 * Date: 10/29/13
 * Time: 10:47 AM
 */

angular.module("vr.passwordStrength", ["vr.filters.passwordStrength", "vr.directives.passwordStrength"]);
angular.module("vr.filters.passwordStrength", ["vr.filters.passwordStrength.percent", "vr.filters.passwordStrength.level"]);
angular.module("vr.directives.passwordStrength", ["vr.directives.passwordStrength.class", "vr.directives.passwordStrength.width"]);

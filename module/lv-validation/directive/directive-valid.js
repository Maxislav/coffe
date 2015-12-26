/**
 * Created by mars on 12/21/15.
 */
angular.module( 'lv.valid' )
	.directive( 'valid', ['factoryValid', '$compile', '$timeout', 'factoryValidationFormat', function ( factoryValid, $compile, $timeout, factoryValidationFormat ) {
		var valid = factoryValid;
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				valid: '@',
				validMessage: '@'
			},
			link: function ( scope, el, attr, ctrl ) {
				//var functionName = attr.$normalize( scope.valid );
				//scope
			/*	scope.$watch(function(){
					return attr.valid
				}, function(val){
					console.log(val)
				});
*/
				if(scope.valid){
					var g = factoryValidationFormat( scope, el, attr, ctrl );
					/**срабатывает при старте*/
					ctrl.$formatters.unshift( g.checkForEven );
					/**срабатывает при редактировании*/
					ctrl.$parsers.unshift( g.checkForEven );
				}



			}
		}
	}] );
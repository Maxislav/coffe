/**
 * Created by mars on 12/21/15.
 */
angular.module( 'lv.valid')
.factory('factoryValidationFormat', [ '$timeout','$compile', 'factoryValid', function($timeout, $compile, factoryValid){
	function createElementAlert( parent, scope ) {
		parent.addClass( 'relative' );
		var template = "<div class='err-mess animate-err-mess' ng-if='focus && alertMessage'>{{'ERROR.'+alertMessage | translate}}</div>";
		var linkFn = $compile( template );
		var content = linkFn( scope );
		parent.append( content );
		return content;
	}

	function validDD( _scope, _el, _attr, _ctrl ){

		var scope = _scope, el =_el, attr = _attr, ctrl=_ctrl, valid = factoryValid;
		var functionName = attr.$normalize( scope.valid );
		var validMessage = eval( scope.validMessage );
		if ( validMessage ) {
			createElementAlert( el.parent(), scope, ctrl )
		}

		ctrl.setAlertMessage = function ( val ) {
			scope.alertMessage = val
		};

		ctrl.err = {};
		var position;
		var valueLength; //boolean
		var maxLength;

		this.checkForEven = function ( value ) {
			var neWval;
			var _valid;

			if ( value == valid[functionName]( value ).val ) {
				neWval = value
			} else {
				if ( value ) {
					try {
						position = doGetCaretPosition( el[0] );
						_valid = valid[functionName]( value );
						neWval = _valid.val;
						maxLength = _valid.maxLength;
						if ( value.length == neWval.length || maxLength < value.length ) {
							valueLength = true
						} else {
							valueLength = false
						}


						ctrl.$setViewValue( neWval );
						ctrl.$render();
						if ( valueLength ) {
							setCaretPosition( el[0], position );
						} else {
							setCaretPosition( el[0], position - 1 );
						}

					} catch ( err ) {
						console.log( err )
					}
				}


			}
			if ( valid[functionName]( neWval ).st ) {
				ctrl.$setValidity( scope.valid, true );
				ctrl.err[scope.valid] = null;
				el.parent().removeClass( "has-error" );
				scope.alertMessage = null
			} else {
				ctrl.$setValidity( scope.valid, false );
				ctrl.err[functionName] = valid[functionName]( neWval ).mess;
				scope.alertMessage = ctrl.err[functionName];
				el.parent().addClass( "has-error" )
			}
			return neWval
		};

		el
			.bind( 'focus', function () {
				ctrl.focus = true;
				scope.focus = true;
				$timeout( function () {
					scope.$apply()
				} )
			} )
			.on( 'blur', function () {
				ctrl.focus = false;
				scope.focus = false;
				$timeout( function () {
					scope.$apply()
				} );
			} );


		function doGetCaretPosition( element ) {
			var CaretPos = 0;	// IE Support
			if ( document.selection ) {
				element.focus();
				var Sel = document.selection.createRange();
				Sel.moveStart( 'character', -element.value.length );
				CaretPos = Sel.text.length;
			}
			// Firefox support
			else if ( element.selectionStart || element.selectionStart == '0' )
				CaretPos = element.selectionStart;
			return (CaretPos);
		}

		function setCaretPosition( element, pos ) {
			if ( element.setSelectionRange ) {
				element.focus();
				element.setSelectionRange( pos, pos );
			}
			else if ( element.createTextRange ) {
				var range = element.createTextRange();
				range.collapse( true );
				range.moveEnd( 'character', pos );
				range.moveStart( 'character', pos );
				range.select();
			}
		}
	}

	return function( scope, el, attr, ctrl ){
		return new validDD( scope, el, attr, ctrl)
	}
}]);
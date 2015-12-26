angular.module( 'lv.dialog', [])

/**
 * @ngdoc service
 *
 * @description
 * Отображает диалоговое окно с сообщением
 *
 * @example
 * ...
 * serviceDialog.add({
					templateUrl: '../app/dashboard-page/templates/dialog/dialog-exit.html',
					title: "Выход ",
					content: "Вы действительно хотите выйти из системы?",
					buttons: [
						{
							class: 'primary',
							text: 'OK',
							action: function () {
								window.location.href = "/";
								console.log( "Нажили выход");
							}
						},
						{
							text: 'Cancel'
						}
					]
				});
 ...
 */

	.service( 'serviceDialog', function () {
		var s = this;
		var count = 0;
		this.isShown = false;
		this.dialogs = [];
		function dialogRemove( index ) {
			for ( var i = 0; i < s.dialogs.length; i++ ) {
				if ( s.dialogs[i]._index == index ) {
					s.dialogs.splice( i, 1 );
					count--;
					break;
				}
			}
			if(count<=0){
				s.isShown = false;
				s.actionShow &&	s.actionShow();

			}

		}

		function addCloseAction( button, action, obj ) {
			var index = obj._index;
			button.action = function () {
				action && action.call(obj, obj);
				dialogRemove( index );
			}
		}

		this.add = function ( obj ) {
			obj._index = count++;
			s.isShown = true;
			s.actionShow &&	s.actionShow();
			for ( var i = 0; i < obj.buttons.length; i++ ) {
				addCloseAction( obj.buttons[i], obj.buttons[i].action, obj )
			}
			obj.close = function () {
				s.close( obj )
			};

			s.dialogs.push( obj );
			return obj;
		};
		this.close = function ( obj ) {
			dialogRemove( obj );
		}
	} )
	.directive( 'dialogsContainer', ['serviceDialog', function ( serviceDialog ) {
		return {
			restrict: 'C',
			controller: function ( $scope ) {
				this.getScope = function () {
					return $scope
				}
			},
			template: '<div><div ng-repeat="dialog in serviceDialog.dialogs | orderBy:\'_index\'" ><div ng-include="dialog.templateUrl" dialog-scope="dialog"></div></div></div>',
			link: function ( scope, el, attr ) {
				scope.serviceDialog = serviceDialog;
				serviceDialog.actionShow = function(){
					if( this.isShown){
						el.css('display', 'table');
						el.children().css('opacity', '0');
						setTimeout(function(){
							el.children().css('opacity', '1');
						},1)
					}else{
						el.children().css('opacity', '0');
						setTimeout(function(){
							el.css('display', 'none');
						},222);
					}
				};
				serviceDialog.actionShow();
			}
		}
	}] )
	.directive( 'dialogScope', function () {
		return {
			restrict: 'A',
			link: function ( scope ) {
				for ( var opt in scope.$parent.dialog ) {
					scope[opt] = scope.$parent.dialog[opt]
				}
			}
		}
	} )
;

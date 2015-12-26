/**
 * Created by mars on 12/21/15.
 */

angular
	.module( 'lv.valid')
	.factory('factoryValidClass', function(){
		return function () {
			var s = this;
			this.min;
			this.max;

			/**
			 * сообщение при длинне меньше минимальной
			 * @type {string}
			 */
			this.minMessage = '';

			/**
			 * сообщение при длинне больше минимальной
			 * @type {string}
			 */
			this.maxMessage = '';

			this.replace = function ( val ) {
				return val;
			};

			this.cut = function ( val ) {
				val = val + '';
				if ( s.max < val.length ) {
					val = val.substr( 0, s.max );
				}
				return val;
			};

			this.int = function ( val ) {
				if ( val ) {
					val = ("" + val).replace( /[^0-9]/, '' );
				}
				return val;
			};


			this.isValidLen = function ( val ) {
				var st = true;
				var mess = '';
				var str = '';

				if ( typeof val == 'boolean' ) {
					if ( val ) {
						st = true
					} else {
						st = false
					}
				} else {
					if ( typeof val != 'undefined' && val !== null ) {
						str = new String( val );
					}
					if ( s.min && str.length < s.min ) {
						st = false;
						mess = s.minMessage
					}
					if ( s.max && s.max < str.length ) {
						st = false;
						mess = s.maxMessage
					}
				}
				return {
					st: st,
					mess: mess
				}
			};

			this.reforms = [
				this.replace
			];
			this.valids = [
				s.isValidLen
			];
			this.valids.objRes = {
				st: true,
				mess: null,
				val: null
			};

			this.valid = function ( val ) {
				var i, st, mess, res;

				for ( i = 0; i < s.reforms.length; i++ ) {
					val = s.reforms[i].call( s, val )
				}
				for ( i = 0; i < s.valids.length; i++ ) {
					res = s.valids[i]( val );
					st = res.st;
					if ( !res.st ) {
						mess = res.mess;
						break;
					}
				}
				return {
					st: st,
					mess: mess,
					val: val
				}
			}
		}

	});

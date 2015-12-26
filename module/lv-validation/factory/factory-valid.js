/**
 * Created by mars on 12/21/15.
 */
angular.module( 'lv.valid' )
	.factory( 'factoryValid', ['factoryValidClass', function (factoryValidClass) {

		/**
		 * @ngdoc object
		 * @name companyTypes
		 * @propertyOf app.factory:factoryValid
		 * @kind {String}
		 *
		 * @returns {Object} functions. Имя функции соответсвует значению атрибута valid Каждому полю соответсвует возвращаемый объект содержащий: val - новое  измененное значение (при необходимости), mess - сообщение, какая именно валидация не прошла, st - состояниу true или false (валидное или нет значение)
		 * @description
		 *
		 * @example
		 *
		 *
		 */
		var valid = {};
		var _validClass = factoryValidClass;


		var Login = new _validClass();
		Login.min = 6;
		Login.max = 15;

		//@Override
		Login.replace = function ( val ) {
			return val.replace( /[^\w\-\.\@]/g, '' );
		};
		valid.login = Login.valid;


		/**
		 * @type {_validClass}
		 */
		var Pass = new _validClass();
		Pass.min = 6;
		Pass.max = 15;
		Pass.minMessage = 'low_six';
		valid.pass = Pass.valid;


		valid.passRepeat = Pass.valid;
		var Defined = new _validClass();
		Defined.min = 1;
		Defined.minMessage = 'empty_field';
		valid.defined = Defined.valid;
		valid.businessName = Defined.valid;


		/**
		 CreditRateBonus
		 */
		var CreditRateBonus = new _validClass();
		CreditRateBonus.min = 1;
		CreditRateBonus.max = 3;
		CreditRateBonus.minMessage = 'empty_field';
		CreditRateBonus.reforms.push( function ( val ) {
			val = this.cut(val);
			return val.replace( /[^0-9]/g, '' );
		} );
		CreditRateBonus.valids.push(function(val){
			this.objRes.val = val;
			if ( val && 100<parseInt( val )  ) {
				this.objRes.st = false;
				this.objRes.mess = 'max_100_percent';
			} else {
				this.objRes.st = true;
				this.objRes.mess = null;
			}
			return this.objRes
		});

		valid.creditRateBonus = CreditRateBonus.valid;

		/**
		 * Емаил
		 * @type {_validClass}
		 */
		var Email = new _validClass();
		Email.min = 1;
		Email.max = 50;
		Email.valids.push( function ( val ) {
			var st = false, mess = '';
			var rex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/g;
			if ( !rex.test( val ) ) {
				mess = 'pattern_mail_err'
			} else if ( 50 < val.length ) {
				mess = 'symbol_limit_50'
			} else {
				st = true;
			}
			return {
				st: st,
				val: val,
				mess: mess
			}
		} );
		valid.email = Email.valid;


		/**
		 * Только целое число
		 * @type {_validClass}
		 */
		var Number = new _validClass();
		Number.reforms.push( function ( val ) {
			val = parseInt( val );
			if ( isNaN( val ) ) {
				return val = ""
			}
			if ( typeof val == 'number' && !isNaN( val ) ) {
				return parseInt( val );
			} else {
				return val
			}

		} );
		valid.number = Number.valid;

		/**
		 * число с точкой
		 * @type {_validClass}
		 */
		var Price = new _validClass();
		Price.min = 1;
		Price.minMessage = 'empty_field';
		Price.reforms.push( function ( val ) {
			if ( val ) {
				val = val.replace(/^0{2}/,'0');

				val = ("" + val).replace( /[^0-9\.]/, '' );

				if ( val.match( /\./ ) ) {
					var arr = val.split( '.' )
					if ( 2 < arr[1].length ) {
						val = val.replace( '.', '' );
						var pos = val.length - 2;
						var _arr = val.split( '' );
						_arr.splice( pos, 0, '.' );
						val = _arr.join( '' );
					}
				}

				if ( val.match( /\./ ) && 1 < val.match( /\./g ).length ) {
					val = val.replace( /\./, '' )
				}

			}
			return val;
		} );
		Price.valids.push( function ( val ) {
			this.objRes.val = val;
			if ( parseFloat( val ) <= 0 ) {
				this.objRes.st = false;
				this.objRes.mess = 'zero_ban';
			} else {
				this.objRes.st = true;
				this.objRes.mess = null;
			}
			return this.objRes
		} );
		Price.valids.push( function ( val ) {
			this.objRes.val = val;
			if ( 1000000 - 0.01 < parseFloat( val ) ) {
				this.objRes.st = false;
				this.objRes.mess = 'max_price';
			} else {
				this.objRes.st = true;
				this.objRes.mess = null;
			}
			return this.objRes
		} );
		valid.price = Price.valid;


		var InitialCreditsBonus = new _validClass();
		InitialCreditsBonus.reforms.push(Price.reforms[1]);
		InitialCreditsBonus.valids.push(function(val){
			this.objRes.val = val;
			if ( 1000000 - 0.01 < parseFloat( val ) ) {
				this.objRes.st = false;
				this.objRes.mess = 'max_point_price';
			} else {
				this.objRes.st = true;
				this.objRes.mess = null;
			}
			return this.objRes
		});
		valid.initialCreditsBonus = InitialCreditsBonus.valid;





		/**
		 * Штрихкод только цифры до 128
		 * @type {_validClass}
		 */
		var Barcode = new _validClass();
		Barcode.max = 128;
		Barcode.maxMessage = 'max_128';
		Barcode.reforms.push( function ( val ) {
			if ( val ) {
				val = ("" + val).replace( /[^0-9]/, '' );
			}
			return val;
		} );
		valid.barcode = Barcode.valid;


		/**
		 * Артикул только цифры до 40
		 * @type {_validClass}
		 */
		var Article = new _validClass();
		Article.max = 40;
		Article.maxMessage = 'max_40';
		Article.reforms.push( function ( val ) {
			if ( val ) {
				val = ("" + val).replace( /[^0-9]/, '' );
			}
			return val;
		} );
		valid.article = Article.valid;


		/**
		 * Название товара
		 * @type {_validClass}
		 */
		var NameWare = new _validClass();
		NameWare.max = 40;
		NameWare.min = 1;
		NameWare.minMessage = 'empty_field';
		NameWare.maxMessage = 'max_40';
		valid.nameWare = NameWare.valid;

		/**
		 * Социальные сети
		 */
		var SocialMedia = new _validClass();
		SocialMedia.max = 255;
		SocialMedia.maxMessage = 'max_255';
		valid.socialMedia = SocialMedia.valid;

		/**
		 * Настройка профиля - описание
		 */
		valid.profileDescription = SocialMedia.valid;

		/**
		 * Заведение - описание
		 */
		valid.shopDescription = SocialMedia.valid;

		/**
		 * Сайт
		 */
		valid.profileSite = SocialMedia.valid;

		/**
		 * Название заведения
		 * @type {_validClass}
		 */
		var ShopName = new _validClass();
		ShopName.max = 70;
		ShopName.min = 1;
		ShopName.minMessage = 'empty_field';
		ShopName.maxMessage = 'max_70';
		valid.shopName = ShopName.valid;

		/**
		 * @type {_validClass}
		 */
		var CategoryName = new _validClass();
		CategoryName.min = 1;
		CategoryName.max = 64;
		CategoryName.minMessage = 'empty_field';
		CategoryName.maxMessage = 'max_64';
		valid.categoryName = CategoryName.valid;

		/**
		 * Остатки  число макс 9999
		 * @type {_validClass}
		 */
		var WareQuantity = new _validClass();
		WareQuantity.max = 4;
		WareQuantity.reforms.push( function ( val ) {
			val = this.int( val );
			val = this.cut( val );
			return val
		} );
		valid.wareQuantity = WareQuantity.valid;


		/**
		 * Название предприятия
		 * @type {_validClass}
		 */
		var BusinessName = new _validClass();
		BusinessName.max = 70;
		BusinessName.reforms.push( function ( val ) {
			val = this.cut( val );
			return val;
		} );
		valid.businessName = BusinessName.valid;

		/**
		 *    телефон. Только цифры
		 * @type {_validClass}
		 */
		var Phone = new _validClass();
		Phone.max = 15;
		Phone.reforms.push( function ( val ) {
			val = this.int( val );
			val = this.cut( val );
			return val;
		} );
		valid.phone = Phone.valid;

		return valid;
	}] );
angular.module('app')
    .directive('cDay', function(serviceDialog) {

    return {
        restrict: 'A',
        scope: {
            cDay: '='
        },
        link: function(scope, el, attr) {
          //  console.log(el);


            function dialogShow(){
                serviceDialog.add({
                    templateUrl: 'build/templates/dialog/dialog-base.html',
                    title: "Выход",

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

              console.log(serviceDialog)
            }

            el.on('click',dialogShow);

            scope.on('$destroy', function(){
                el.off('click',dialogShow);
            })

        }
    };
});

/**��ͬ��ӡУ��ʵ�ʽ����㳵����������3%**/
app.directive('verifySjje',function(){
    return {
        restrict:'A',
        require:'ngModel',
        link: function ($scope, ele, attrs, ngModelController) {
            $scope.$watch(attrs.ngModel,function(newVal,oldVal){
                if(newVal==oldVal)
                    return;
                var lcj=$scope.itemapp.lcj;
                if(newVal>lcj*1.03||newVal<lcj*0.97){
                    ngModelController.$setValidity('sfhf', false);
                }else{
                    ngModelController.$setValidity('sfhf', true);
                }
            });
        }
    }
});

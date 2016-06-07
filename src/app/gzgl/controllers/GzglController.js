app.controller('GzglController', ['$scope', 'toaster', '$state','$stateParams','CarCreditRestangular','$rootScope','modal','FileUploader',
    function($scope, toaster,$state,$stateParams,CarCreditRestangular,$rootScope,modal,FileUploader) {

        $scope.initList=function(){
          $scope.items=CarCreditRestangular.all("gzgl").getList().$object;
          $scope.getBranchList();
        };
        $scope.query=function(){
            $scope.items=CarCreditRestangular.all("gzgl").getList().$object;
        };
        $scope.pageChanged=function(){
            $scope.initList();
        }
        var uploader=$scope.uploader=new FileUploader({
            url:'http://127.0.0.1:8080/rsgl/api/gzgl/upload',
            formData:{
                month:'5'
            },
            headers: {
                'Authorization':window.localStorage.Authorization
            }
        });
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem=fileItem;
        };
        $scope.upload=function(){
            $scope.uploadStatus="（正在导入明细。。。）";
            uploader.addToQueue($scope.fileItem);
            uploader.uploadAll();
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            if(response.successResponse==false){
                modal.error(response.message);
            }else{
                $scope.uploadStatus="（导入完成）";
                toaster.pop('success', '操作提醒',  '导入明细成功');
                uploader.clearQueue();
            };

        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        $scope.getBranchList=function(){
            CarCreditRestangular.all("branchs").all("listScope").getList().then(function(response){
                $scope.branchs=response;
            });
        };
        $scope.onBranchChanged=function(){
            CarCreditRestangular.all("accounts").getList({accountid:'',pageSize:10000}).then(function(response){
                $scope.accounts=response;
            })
        }
    }]);
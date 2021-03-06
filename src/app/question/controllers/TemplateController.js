'use strict';

/* Controllers */
angular.module("question.controllers")
    .controller("TemplateController",function($scope,CarCreditRestangular,$mdDialog,$mdToast,$state){


        $scope.sels=[{id:'10',msg:'很好'},{id:'5',msg:'好'},{id:'3',msg:'一般'},{id:'0',msg:'差'}]
        $scope.initList=function(){
            $scope.items=CarCreditRestangular.all("/question/template").getList().$object;
        };
        $scope.add=function(){
            $scope.tpl={};
            $scope.tpl.tplDtls=[{showseq:1,content:'',val:[]}];
            $state.go("app.question.template.add");
        };
        $scope.save=function(){
            CarCreditRestangular.all('/question/template').post($scope.tpl).then(function(response){
                $state.go('app.question.template.list');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('增加模板成功')
                        .position('right')
                        .parent('section')
                        .hideDelay(3000)
                );
            })
        };
        $scope.edit=function(item){
            CarCreditRestangular.one('/question/template',item.id).get().then(function(response){
                $scope.tpl=response;
                $state.go('app.question.template.edit');
            })
        };
        $scope.update=function(){
            $mdDialog.show(
                $mdDialog.confirm({
                    title:'操作确认',
                    content:'确认修改模板？',
                    ok: '确认',
                    cancel:'取消'
                })
            ).then(function(){
                    $scope.tpl.save().then(function(response){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('修改模板成功')
                                .position('right')
                                .parent('section')
                                .hideDelay(3000)
                        );
                        $state.go("app.question.template.list");
                    })
                })
        }
        $scope.delete=function(item){
            $mdDialog.show(
                $mdDialog.confirm({
                    title:'操作提醒',
                    content:'确认删除模板',
                    ok:'确定',
                    cancel:'取消'
                })
            ).then(function(){
                    item.remove().then(function(){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('删除模板成功')
                                .position('right')
                                .parent('section')
                                .hideDelay(3000)
                        );
                        $state.reload();
                    });

                })
        };
        $scope.addOne=function(index){
            $scope.tpl.tplDtls.push({showseq:1,content:'',val:[]});
        }
        $scope.delOne=function(index){
            if($scope.tpl.tplDtls.length==1){
                $scope.tpl.tplDtls=[{showseq:1,content:'',val:[]}];
            }else{
                $scope.tpl.tplDtls= $scope.tpl.tplDtls.splice(index,1);
            }
        }
        $scope.addModifyOne=function(index){
            $scope.tpl.dtls.push({showseq:1,content:'',val:[]});
        }
        $scope.delModifyOne=function(index){
            if($scope.tpl.dtls.length==1){
                $scope.tpl.dtls=[{showseq:1,content:'',val:[]}];
            }else{
                $scope.tpl.dtls= $scope.tpl.dtls.splice(index,1);
            }
        }
    })
;
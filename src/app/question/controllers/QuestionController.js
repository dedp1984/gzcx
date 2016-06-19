'use strict';

/* Controllers */
angular.module("question.controllers")
    .controller("QuestionController",function($scope,QuestionRestangular,$mdDialog,$mdToast,$state,$window){
        $scope.getActivitys=function(){
            $scope.activitys=QuestionRestangular.all("/answerquestion/activity").getList().$object;
        }
        $scope.selectActDept=function(item){
            QuestionRestangular.one("/answerquestion/activity",item.id).get().then(function(response){
                $scope.actdepts=response.actdepts;
                $state.go("question.selectdept");
            });
        };
        $scope.selectQuestionTpl=function(item){
            QuestionRestangular.one('/common').one('/systemDate').get().then(function(response){
               $scope.sysDate=response;
            });
            QuestionRestangular.one('/answerquestion/actdept',item.id).get().then(function(response){
                $scope.actdept=response;
                console.log(response);
                $state.go('question.enterdata');
            });
        };
        $scope.submit=function(){
            $scope.questionRslt=[];
            for(var i=0;i<$scope.actdept.tpl.length;i++){
                var obj={};
                var tpl=$scope.actdept.tpl[i];
                obj.tpldtlid=tpl.id;
                obj.actdeptid=$scope.actdept.id;
                obj.result=tpl.result;
                $scope.questionRslt.push(obj);
            }
            $scope.answer={};
            $scope.answer.result=$scope.questionRslt;
            $mdDialog.show(
                $mdDialog.confirm({
                        title: '操作确认',
                        content: '确认提交？',
                        ok: '确定',
                        cancel: '取消'
                    }
                )
                    .hasBackdrop(false)
                    .parent(angular.element(document.body))
            ).then(function(){
                    QuestionRestangular.all('/answerquestion/submit').post($scope.answer).then(function(){
                        $mdDialog.show(
                            $mdDialog.alert({
                                title:'操作提醒',
                                content:'提交成功',
                                ok:'确定'
                            })
                                .hasBackdrop(false)
                        ).then(function(){
                                $window.close();
                            })
                    })
                })
        }
    })
;
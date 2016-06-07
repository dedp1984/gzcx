'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          $stateProvider
              //申请单录入管理
              .state('app.gzgl',{
                  abstract:true,
                  url:'/gzgl',
                  template:'<div ui-view=""></div>'
              })
              .state("app.gzgl.upload",{
                  url:'/gzgl/upload',
                  templateUrl:'app/gzgl/tpl/gzgl-upload.html',
                  controller:'GzglController'
              })
              .state("app.gzgl.query",{
                  url:'/gzgl/query',
                  templateUrl:'app/gzgl/tpl/gzgl-query.html',
                  controller:'GzglController'
              })

      }
    ]
  );
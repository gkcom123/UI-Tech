'use strict';
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
Array.prototype.include = function( str ) {
    return this.indexOf( str ) != -1;
};

/*
*  serializeObject used serialize form element value into object
*/
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.QueryString = function( url ) {
    url = url || '';
    url = url.split('?');
    url = url[1];
    url = url.split('#');
    url = url[0];
    var a = url.split('&');
    if (a == '') return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
};

var toilVersion = 11,
    //viewPath =  "/toilPortal/views/",// For Prod
    viewPath =  "/views/",//for Dev/local
    Helper = {
     version: toilVersion
    ,viewPath: viewPath
    ,remoteUrl: ''
      ,requireRule: function( obj, arr ) {
        var len = arr.length
          ,name;

        while( len-- ){
          name = arr[len];

            if(name=='emailid') {
                if (obj[name]) {
                    obj[name].required = true;
                    obj[name].email = true;
                } else {
                    obj[name] = {
                        required: true, email: true
                    }
                }
            }
            else{
                if( obj[name] ){
                    obj[name].required = true;
                }else {
                    obj[name] = {
                        required: true
                    }
                }
            }
        }

        return obj;
      }
        , showMask: function (parentDom) {
            $((parentDom || "") + " .spin").show();
        }
        , hideMask: function (parentDom) {
            $((parentDom || "") + " .spin").hide();
        },
        url_base64_decode: function (str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js

        }

      ,routes:  {
          'home': {
            url: "/",
            title: 'Toil Portal',
            loginRequired: false,
            templateUrl: viewPath + 'main/toilLogin.html?v=' + toilVersion
          },
        'user': {
          url: '/user',
          title: 'Toil Portal',
          loginRequired: true,
          name:'user',
          templateUrl: viewPath + 'main/user.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'User',
            parent: 'analytics'
          }

        },
            'user.newUser':{
                url:'/newUser',
                templateUrl: viewPath + 'main/addNewUser.html?v=' + toilVersion,
            },
        'addJob': {
          url: '/addJob',
          title: 'Toil Portal',
          name:'addJob',
          loginRequired: true,
          templateUrl: viewPath + 'main/addJob.html?v=' + toilVersion,
          params:
          {
              typeOfChange: 'add'
          },
          ncyBreadcrumb: {
            label: 'Add Job',
            parent: 'analytics'
          }
        },
        'manageJob': {
          url: '/manageJob',
          title: 'Toil Portal',
          loginRequired: true,
          templateUrl: viewPath + 'main/manageJob.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'Manage Job',
            parent: 'analytics'
          }

        },
        'editJob': {
            url: '/editJob',
            title: 'Toil Portal',
            loginRequired: true,
            templateUrl: viewPath + 'main/addJob.html?v=' + toilVersion,
            ncyBreadcrumb: {
                label: 'Edit Job',
                parent: 'manageJob'
            },
            params:
            {
                typeOfChange: 'edit'
            }
        },
        'analytics': {
            url: '/jobPortal',
            title: 'Toil Portal',
            loginRequired: true,
            templateUrl: viewPath + 'main/toilLandingPage.html?v=' + toilVersion,
            ncyBreadcrumb: {
                label: 'Home'
            }
        },
        'budget': {
          url: '/budget',
          title: 'Toil Portal | Budget',
          name:'budget',
          loginRequired: true,
          templateUrl: viewPath + 'main/budget.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'Budget',
            parent: 'analytics'
          }

        },
        'password': {
          url: '/password',
          title: 'Toil Portal | Password',
          name:'password',
          loginRequired: true,
          templateUrl: viewPath + 'main/budget.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'Password',
            parent: 'analytics'
          }

        },
        'expJob': {
          url: '/expJob',
          title: 'Toil Portal | Expired Jobs',
          name:'expJob',
          loginRequired: true,
          templateUrl: viewPath + 'main/budget.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'Expired Jobs',
            parent: 'analytics'
          }

        },
        'analytSection': {
          url: '/analyticsSection',
          title: 'Toil Portal | Analytics',
          name:'analytSection',
          loginRequired: true,
          templateUrl: viewPath + 'main/budget.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'Analytics',
            parent: 'analytics'
          }

        },
        'tnc': {
          url: '/tnc',
          title: 'Toil | Terms & Condition',
          loginRequired: false,
          templateUrl: viewPath + 'main/tnc.html?v=' + toilVersion,
          ncyBreadcrumb: {
            label: 'Terms & Conditions',
            parent: 'analytics'
          }

        }

        }
};

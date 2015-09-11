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

var toilVersion = 10,
    viewPath =  "/views/",
    Helper = {
     version: toilVersion
    ,viewPath: viewPath
    ,remoteUrl: ''
    ,routes:  {
          'home': {
            url: "/",
            title: 'Toil Portal',
            loginRequired: false,
            templateUrl: viewPath + 'main/toilLogin.html?v=' + toilVersion
          },
          'analytics': {
            url: '/analytics',
            title: 'Toil Portal',
            loginRequired: true,
            templateUrl: viewPath + 'main/toilPortal.html?v=' + toilVersion
          },
          'budget': {
            url: '/budget',
            title: 'Toil Portal | Budget',
            loginRequired: true,
            templateUrl: viewPath + 'main/budget.html?v=' + toilVersion
          }

        }
};

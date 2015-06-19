'use strict';
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
Array.prototype.include = function( str ) {
    return this.indexOf( str ) != -1;
};

/* validation custom methods */
jQuery.validator.addMethod("panNumber", function(value, element) {
  return RegExp("^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$").test(value);
}, "Please enter valid pan card number");

// add getbounds method in polygon
if (!google.maps.Polygon.prototype.getBounds) {
     /*google.maps.Polygon.prototype.getBounds = function() {
        var bounds = new google.maps.LatLngBounds(),
            paths = this.getPaths(),
            i, j, path;
        for (i = 0; i < paths.getLength(); i++) {
            path = paths.getAt(i);
            for (j = 0; j < path.getLength(); j++) {
                bounds.extend(path.getAt(j));
            }
        }
        return bounds;
    }*/
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      for (var i=0; i < this.getPath().getLength(); i++) {
        bounds.extend(this.getPath().getAt(i));
      }
      return bounds;
    }
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

var corpVersion = 10,
    viewPath =  "/views/",
    Helper = {
     version: corpVersion
    ,viewPath: viewPath
    ,remoteUrl: '/TFS-API-0.0.1-SNAPSHOT/v1/entities/geo/'
    ,paymentTypes: { // this is registration (java) payment types
        "CASH": 1,
        "PREPAID": 2,
        "CASHPREPAID": 3,
        "CREDIT": 4,
        "CASHCREDIT": 5
    }
    ,paymentModes: { // RTFS Paymet modes
        "PREPAID": 3,
        "CASH": 4,
        "CREDIT": 5
    }
    ,homeHeaderScroll: function(){
        var position = $(window).scrollTop(),
            offset = $("#changeWayBlk").offset() || {},
            ht = $("#homeBannerBlk").outerHeight(),
            colorArr = ["#fff", "#ddd", "#bbb", "#999", "#777", "#555", "#333", "#222", "#111", "#000"],
            top = $('.fixedHeader').outerHeight() + 10,
            step = Math.floor(Math.abs(ht - top)/9),
            opacityFactor = Math.ceil(Math.abs(position - top)/step),
            opacity = (opacityFactor >= 9 ) ?  1 : opacityFactor/10,
            colorIndex = (opacityFactor >= 9 ) ? (10 - 1) : (opacityFactor-1);

            if(position < top){
                opacity = 0.1;
                colorIndex = 0;
                $('.fixedHeader').removeClass("newheader");
            }else {
                $('.fixedHeader').addClass("newheader");
            }

            $(".scrollDwnPanel")[ position < (top+30) ? "show" : "hide"]();

            var imgUrl =  "http://cdn1.taxiforsure.com/v2/img/corp/" + ((opacity < 0.4) ? "corporate_logo_white.png" : "corporate_logo.png");

            $("#homePageLogo").attr("src", imgUrl)

            $(".fixedHeader .homeNavMenu ul li a").css({
                 color: colorArr[colorIndex]
            });

            $('.fixedHeader').css({
                "background-color": "rgba(255, 255, 255, "+opacity+")"
            });
    }
    ,requireRule: function( obj, arr ) {
        var len = arr.length
            ,name;

        while( len-- ){
            name = arr[len];
            if( obj[name] ){
                obj[name].required = true;
            }else {
                obj[name] = {
                    required: true
                }
            }
        }

        return obj;
    }
    ,showMask: function( parentDom ){
        $((parentDom || "") + " .spin").show();
    }
    ,hideMask: function( parentDom ){
        $((parentDom || "") + " .spin").hide();
    }
    ,trackGAPage: function( path ){
        if( window.ga ){
            ga('send', 'pageview', path);
        }
    }
    ,routes:  { // if u are adding new url here add new url in urls.py also
        'home': {
            url: "/",
            title: 'Corporate | Taxiforsure',
            loginRequired: false,
            templateUrl: viewPath + 'main/home.html?v='+ corpVersion
        },
        'login': {
            url: '/login',
            title: 'Corporate | Login',
            loginRequired: false,
            templateUrl: viewPath + 'main/login.html?v=' + corpVersion
        },
        'signUp': {
            url: '/sign-up',
            title: 'Corporate | Sign Up',
            loginRequired: false,
            templateUrl: viewPath + 'main/sign-up.html?v=' + corpVersion
        },
        'booking': {
            url: '/booking',
            title: 'Corporate | Booking',
            loginRequired: true,
            templateUrl: viewPath + 'main/booking.html?v=' + corpVersion
        },
        'prepaid': {
            url: '/prepaid-payment',
            title: 'Corporate | Prepaid',
            loginRequired: true,
            templateUrl: viewPath + 'main/prepaid.html?v=' + corpVersion
        },
        'invoice': {
            url: '/invoice',
            title: 'Corporate | Invoice',
            loginRequired: true,
            templateUrl: viewPath + 'main/invoiceAndReceipt.html?v=' + corpVersion
        },
        'report': {
            url: '/transaction-report',
            title: 'Corporate | Transaction Report',
            loginRequired: true,
            templateUrl: viewPath + 'main/transactionHistory.html?v=' + corpVersion
        },
        'faq': {
            url: '/faq',
            title: 'Corporate | FAQ',
            loginRequired: "both",
            templateUrl: viewPath + 'main/faq.html?v=' + corpVersion
        },
        'tnc': {
          url: '/tnc',
          title: 'Corporate | Terms & Condition',
          loginRequired: "both",
          templateUrl: viewPath + 'main/tnc.html?v=' + corpVersion
        },
        'aboutUs': {
          url: '/aboutUs',
          title: 'Corporate | Terms & Condition',
          loginRequired: "both",
          templateUrl: viewPath + 'main/aboutUs.html?v=' + corpVersion
        }
    }
};

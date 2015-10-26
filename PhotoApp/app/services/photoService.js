/**
 * Created by gunjan.kumar on 10/26/15.
 */
angular.module('photoApp').factory('photoSearchService', function() {

    'use strict';

    var service = {};

    /**
     @param keyword - The keyword to search for.
     @param callback - A function to call when the search is complete. The function
     will be passed a single argument which is an array of photo items matching the
     keyword.
     */
    service.findPhotos = function(keyword, callback) {

        // For simplicity we're hard coding the results for the
        // two supported search terms, "water" and "mountains".
        var matches = [];

        if (keyword.toLowerCase() === 'water') {
            matches = [
                {
                    title: 'A Perfect Morning',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/water1.jpg'
                },
                {
                    title: 'Footprints',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/water2.jpg'
                },
                {
                    title: 'Rush (II)',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/water3.jpg'
                },
                {
                    title: 'El Matador State Beach',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/water4.jpg'
                },
                {
                    title: 'El Matador State Beach',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/water5.jpg'
                },
                {
                    title: 'Big Sur',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/water6.jpg'
                }];
        } else if (keyword.toLowerCase() === 'mountains') {
            matches = [
                {
                    title: 'Difficult Roads',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/mountains1.jpg'
                },
                {
                    title: 'Klondike Highway - Mountain',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/mountains2.jpg'
                },
                {
                    title: 'Mount Ossa and Cathedral Mountain',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/mountains3.jpg'
                },
                {
                    title: 'Heading Down the Mountain',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/mountains4.jpg'
                },
                {
                    title: 'Stone Bridge',
                    thumbUrl: 'http://googledrive.com/host/0Bz6MIjSA3u5MSDNwcmNDYWVOdms/images/mountains5.jpg'
                }
            ];
        }

        callback(matches);
    };

    return service;

});
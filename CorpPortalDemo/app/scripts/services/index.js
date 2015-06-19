'use strict';
angular.module('corporateApp')
	.service('TrackTaxiService', function(){
		this.customersOnBoard;
		this.selectedBooking;
		this.taxiType;
		
		this.setCusotmersOnBoard = function(customers){
			this.customersOnBoard = customers;
		};
		this.getCustomersOnBoard = function(){
			return this.customersOnBoard;
		};
		this.setSelectedBooking = function(booking){
			this.selectedBooking =  booking;
		};
		this.getSelectedBooking = function(){
			return this.selectedBooking;
		};		
		this.setTaxiType = function(taxi){
			this.taxiType = taxi;
		};

		this.getTaxiType = function(){
			return this.taxiType;
		};
	});
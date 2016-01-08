/**
 * Created by gunjan.kumar on 06/01/16.
 */
'use strict';
angular.module('toilApp')
    .service('JobService', function(){
        this.title;
        this.selectedJob;
        this.typeOfChange;

        this.setSelectedJob = function(job){
            this.selectedJob =  job;
        };
        this.getSelectedJob = function(){
            return this.selectedJob;
        };
        this.setTypeOfChange = function(typeOfChange){
            this.typeOfChange =  typeOfChange;
        };
        this.getTypeOfChange = function(){
            return this.typeOfChange;
        };
        this.setTitle = function(title){
            this.title = title;
        };
        this.resetJob = function()
        {

            var newJob = { id: "",
                jobTitle: "",
                job_type: "",
                job_desc: "",
                industry_id: "",
                ind_wtg: "",
                salary: "",
                sal_wtg: "",
                currency_id: "",
                duration_id: "",
                country_id: "",
                country_wtg: "",
                city: "",
                isTravel: "",
                trvl_wtg: "",
                lang_id: "",
                lang_wtg: "",
                strdt_wtg: "",
                datePosted:"",
                postedBy: ""
            };
            this.selectedJob =  newJob;
        }

        this.getTitle = function(){
            return this.title;
        };
    });

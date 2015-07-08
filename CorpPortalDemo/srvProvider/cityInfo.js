/**
 * Created by administrator on 04/07/15.
 */

exports.getCityList = function(req,res)
{
  var result ={"status": "success", "error_desc": "", "error_code": "",
    "response_data": [{"isOperational": true, "countryID": 99, "name": "Bangalore", "stateID": 12,"stdCode": "080",
      "longitude": "77.5945600000", "ivrNumber": "60601010", "latitude": "12.9716000000","shortName": "BLR", "id": 1},
      {"isOperational": true, "countryID": 99, "name": "Chennai", "stateID": 24, "stdCode": "044",
        "longitude": "80.2508200000", "ivrNumber": "60601010", "latitude": "13.0524100000", "shortName": "MAS", "id": 3},
      {"isOperational": true, "countryID": 99, "name": "Delhi", "stateID": 32, "stdCode": "011",
        "longitude": "77.2295610000", "ivrNumber": "60601010", "latitude": "28.6676960000", "shortName": "DEL", "id": 4},
      {"isOperational": true, "countryID": 99, "name": "Hyderabad", "stateID": 1, "stdCode": "040",
        "longitude": "78.4719087000", "ivrNumber": "60601010", "latitude": "17.3995987000", "shortName": "HYB", "id": 2},
      {"isOperational": true, "countryID": 99, "name": "Kolkata", "stateID": 27, "stdCode": "",
        "longitude": "88.3555785000", "ivrNumber": "", "latitude": "22.5466244000", "shortName": "HWH", "id": 44},
      {"isOperational": true, "countryID": 99, "name": "Mumbai", "stateID": 15, "stdCode": "022",
        "longitude": "72.8812041000", "ivrNumber": "60601010", "latitude": "19.0822507000", "shortName": "MUM", "id": 43}]};
  res.send(result);
};
exports.getProdList = function(req,res)
{
  var cityId = req.query["cityid"];
  var result ={"status": "success", "error_desc": "", "error_code": "", "response_data":{}};
  var extendObject = [{"fareTypeId": 4, "bookingType": "4h40km", "dispatchParameters": null, "description": "4hrs 40Kms", "channelEntity": null},
    {"fareTypeId": 8, "bookingType": "8h80km", "dispatchParameters": null, "description": "8hrs 80Kms", "channelEntity": null},
    {"fareTypeId": 2, "bookingType": "at", "dispatchParameters": null, "description": "Airport Transfer (Flat)", "channelEntity": null},
    {"fareTypeId": 3, "bookingType": "at-km", "dispatchParameters": null, "description": "Airport Transfer", "channelEntity": null},
    {"fareTypeId": 5, "bookingType": "os", "dispatchParameters": null, "description": "Outstation", "channelEntity": null},
    {"fareTypeId": 1, "bookingType": "p2p", "dispatchParameters": null, "description": "Point2Point", "channelEntity": null},
    {"fareTypeId": 1, "bookingType": "rt", "dispatchParameters": null, "description": "Railway Transfer", "channelEntity": null}];
  result.response_data[cityId]= extendObject;
  res.send(result);
};
exports.getAirportInfoByCityName = function(req,res)
{
  var cityId = req.query["cityid"];
  var airportInfo ;
  if(cityId==1) {
    airportInfo = [{
      "name": "Bangalore Airport", "longitude": 77.707708, "zoneID": 22, "cityID": 1, "airport": true,
      "latitude": 13.20456, "id": 5
    }];
  }
  else if(cityId==2) {
    airportInfo = [{
      "name": "Shamshabad Airport", "longitude": 78.429433, "zoneID": 106, "cityID": 2, "airport": true,
      "latitude": 17.24044, "id": 4570
    }];
  }
  else if(cityId==3) {
    airportInfo = [{
      "name": "Chennai International Airport", "longitude": 80.162536, "zoneID": 335, "cityID": 3,
      "airport": true, "latitude": 12.984348, "id": 2823
    }];
  }
  else if(cityId==4) {
    airportInfo = [{
      "name": "Airport Terminal 1", "longitude": 77.119, "zoneID": 27, "cityID": 4, "airport": true,
      "latitude": 28.56168, "id": 733
    }, {
      "name": "Airport Terminal 3", "longitude": 77.08814, "zoneID": 27, "cityID": 4,
      "airport": true, "latitude": 28.55754, "id": 734
    }];
  }

  else if(cityId==43) {
    airportInfo = [{
      "name": "Domestic Airport, Terminal 1B", "longitude": 72.856588933, "zoneID": 2064, "cityID": 43,
      "airport": true, "latitude": 19.0932102307, "id": 16436
    }, {
      "name": "International Airport, Sahara",
      "longitude": 72.8745522216, "zoneID": 2064, "cityID": 43, "airport": true, "latitude": 19.1004720264, "id": 17297
    },
      {
        "name": "Domestic Airport, Terminal 1A", "longitude": 72.8523904617, "zoneID": 2064, "cityID": 43,
        "airport": true, "latitude": 19.091768211, "id": 29674
      }];
  }
  else {
    airportInfo = [{
      "name": "Kolkata Airport", "longitude": 88.44294, "zoneID": 1783, "cityID": 44,
      "airport": true, "latitude": 22.654162, "id": 33668
    }];
  }
  var result = {"status": "success", "error_desc": "", "error_code": "","response_data":""};
  result.response_data = airportInfo;
  res.send(result);
};
exports.getCarList = function (req,res) {
  var city = req.query["city"];
  var result = {
    "status": "success", "error_desc": "", "error_code": "", "response_data": {
      "status": "success", "error_desc": "", "error_code": "", "response_data": {
        "city": "Bangalore",
        "fare_obj": [{
          "car_type": "Tata Indica AC",
          "direction": 1,
          "traffic_time_pulse_rate": 0.0,
          "extra_charges": 0.0,
          "base_km": 30.0,
          "base_hr": 0.0,
          "car_model": "",
          "trip_time_pulse_rate": 1.25,
          "base_fare": 700.0,
          "acp_convenience_charges": 0.0,
          "extra_hour_fare": 0.0,
          "fare_id": 1392,
          "extra_km_fare": 14.0,
          "night_charges": 0.0,
          "city_limits": 1,
          "surcharge": 0.0
        },
          {
            "car_type": "Sedan",
            "direction": 1,
            "traffic_time_pulse_rate": 0.0,
            "extra_charges": 0.0,
            "base_km": 30.0,
            "base_hr": 0.0,
            "car_model": "",
            "trip_time_pulse_rate": 1.25,
            "base_fare": 700.0,
            "acp_convenience_charges": 0.0,
            "extra_hour_fare": 0.0,
            "fare_id": 1391,
            "extra_km_fare": 16.0,
            "night_charges": 0.0,
            "city_limits": 1,
            "surcharge": 0.0
          },
          {
            "car_type": "Xylo/Toyota Innova 6+1", "direction": 1, "traffic_time_pulse_rate": 0.0, "extra_charges": 0.0,
            "base_km": 30.0, "base_hr": 0.0, "car_model": "", "trip_time_pulse_rate": 1.25, "base_fare": 1200.0,
            "acp_convenience_charges": 0.0, "extra_hour_fare": 0.0, "fare_id": 1458, "extra_km_fare": 18.0,
            "night_charges": 0.0, "city_limits": 1, "surcharge": 0.0
          },
          {
            "car_type": "Toyota Innova 7+1",
            "direction": 1,
            "traffic_time_pulse_rate": 0.0,
            "extra_charges": 0.0,
            "base_km": 30.0,
            "base_hr": 0.0,
            "car_model": "",
            "trip_time_pulse_rate": 1.25,
            "base_fare": 1200.0,
            "acp_convenience_charges": 0.0,
            "extra_hour_fare": 0.0,
            "fare_id": 1459,
            "extra_km_fare": 18.0,
            "night_charges": 0.0,
            "city_limits": 1,
            "surcharge": 0.0
          }],
        "extra_charges": 0.0,
        "fare_obj_round_trip": [],
        "car_model": null,
        "booking_type": "at",
        "fare_obj_from": [{
          "car_type": "Tata Indica AC",
          "direction": 2,
          "traffic_time_pulse_rate": 0.0,
          "extra_charges": 0.0,
          "base_km": 30.0,
          "base_hr": 0.0,
          "car_model": "",
          "trip_time_pulse_rate": 1.25,
          "base_fare": 700.0,
          "acp_convenience_charges": 0.0,
          "extra_hour_fare": 0.0,
          "fare_id": 1394,
          "extra_km_fare": 14.0,
          "night_charges": 0.0,
          "city_limits": 1,
          "surcharge": 0.0
        }, {
          "car_type": "Sedan",
          "direction": 2,
          "traffic_time_pulse_rate": 0.0,
          "extra_charges": 0.0,
          "base_km": 30.0,
          "base_hr": 0.0,
          "car_model": "",
          "trip_time_pulse_rate": 1.25,
          "base_fare": 700.0,
          "acp_convenience_charges": 0.0,
          "extra_hour_fare": 0.0,
          "fare_id": 1393,
          "extra_km_fare": 16.0,
          "night_charges": 0.0,
          "city_limits": 1,
          "surcharge": 0.0
        }, {
          "car_type": "Xylo/Toyota Innova 6+1",
          "direction": 2,
          "traffic_time_pulse_rate": 0.0,
          "extra_charges": 0.0,
          "base_km": 30.0,
          "base_hr": 0.0,
          "car_model": "",
          "trip_time_pulse_rate": 1.25,
          "base_fare": 1200.0,
          "acp_convenience_charges": 0.0,
          "extra_hour_fare": 0.0,
          "fare_id": 1460,
          "extra_km_fare": 18.0,
          "night_charges": 0.0,
          "city_limits": 1,
          "surcharge": 0.0
        }, {
          "car_type": "Toyota Innova 7+1",
          "direction": 2,
          "traffic_time_pulse_rate": 0.0,
          "extra_charges": 0.0,
          "base_km": 30.0,
          "base_hr": 0.0,
          "car_model": "",
          "trip_time_pulse_rate": 1.25,
          "base_fare": 1200.0,
          "acp_convenience_charges": 0.0,
          "extra_hour_fare": 0.0,
          "fare_id": 1461,
          "extra_km_fare": 18.0,
          "night_charges": 0.0,
          "city_limits": 1,
          "surcharge": 0.0
        }],
        "fare_type": "km",
        "city_limit_string": "In City"
      }
    }
  };
  res.send(result);

};
exports.getPolygonByCityId = function(req,res)
{
  var cityId = req.query["cityid"];
  var result ;
  //if(cityId==1) {
    result = {
      "status": "success",
      "error_desc": "",
      "error_code": "",
      "response_data": [{"latitude": 13.074127563815, "longitude": 77.779769897461}, {
        "latitude": 13.079143861039,
        "longitude": 77.796249389648
      },
        {"latitude": 13.068107872518, "longitude": 77.790069580078}, {
          "latitude": 13.048710091109,
          "longitude": 77.760543823242
        },
        {"latitude": 13.000543505634, "longitude": 77.766380310059}, {
          "latitude": 12.981140431999,
          "longitude": 77.768440246582
        },
        {"latitude": 12.959728385939, "longitude": 77.754020690918}, {
          "latitude": 12.93630685197,
          "longitude": 77.749557495117
        },
        {"latitude": 12.919910469325, "longitude": 77.74097442627}, {
          "latitude": 12.8874491507,
          "longitude": 77.756423950195
        },
        {"latitude": 12.867033175708, "longitude": 77.778053283691}, {
          "latitude": 12.86268201531,
          "longitude": 77.793159484863
        },
        {"latitude": 12.855653058363, "longitude": 77.792816162109}, {
          "latitude": 12.856657207121,
          "longitude": 77.772560119629
        },
        {"latitude": 12.863686135946, "longitude": 77.764320373535}, {
          "latitude": 12.88376770437,
          "longitude": 77.743721008301
        },
        {"latitude": 12.853644748799, "longitude": 77.737197875977}, {
          "latitude": 12.851636423172,
          "longitude": 77.730331420898
        },
        {"latitude": 12.879751519392, "longitude": 77.729301452637}, {
          "latitude": 12.886110449205,
          "longitude": 77.713508605957
        },
        {"latitude": 12.904851618651, "longitude": 77.686386108398}, {
          "latitude": 12.87071486786,
          "longitude": 77.670593261719
        },
        {"latitude": 12.82485721441, "longitude": 77.698745727539}, {
          "latitude": 12.813140414176,
          "longitude": 77.712478637695
        },
        {"latitude": 12.781669740418, "longitude": 77.776336669922}, {
          "latitude": 12.771959910733,
          "longitude": 77.773246765137
        },
        {"latitude": 12.704315590988, "longitude": 77.695999145508}, {
          "latitude": 12.712353484337,
          "longitude": 77.68913269043
        },
        {"latitude": 12.743497917129, "longitude": 77.729301452637}, {
          "latitude": 12.777651925117,
          "longitude": 77.76294708252
        },
        {"latitude": 12.78836595721, "longitude": 77.706985473633}, {
          "latitude": 12.801088279674,
          "longitude": 77.690505981445
        },
        {"latitude": 12.818161966749, "longitude": 77.68123626709}, {
          "latitude": 12.820505323684,
          "longitude": 77.662010192871
        },
        {"latitude": 12.829209029888, "longitude": 77.652053833008}, {
          "latitude": 12.842933493233,
          "longitude": 77.659606933594
        },
        {"latitude": 12.844607157018, "longitude": 77.649993896484}, {
          "latitude": 12.855653058363,
          "longitude": 77.642784118652
        },
        {"latitude": 12.842264024597, "longitude": 77.634887695312}, {
          "latitude": 12.838916654675,
          "longitude": 77.625961303711
        },
        {"latitude": 12.848623904619, "longitude": 77.612228393555}, {
          "latitude": 12.847284995888,
          "longitude": 77.596778869629
        },
        {"latitude": 12.828539524714, "longitude": 77.591285705566}, {
          "latitude": 12.812470866269,
          "longitude": 77.590255737305
        },
        {"latitude": 12.791044394195, "longitude": 77.630081176758}, {
          "latitude": 12.784013436495,
          "longitude": 77.640037536621
        },
        {"latitude": 12.788031150588, "longitude": 77.652397155762}, {
          "latitude": 12.777986745499,
          "longitude": 77.648963928223
        },
        {"latitude": 12.784348248445, "longitude": 77.621154785156}, {
          "latitude": 12.806110072419,
          "longitude": 77.583045959473
        },
        {"latitude": 12.778321565438, "longitude": 77.562789916992}, {
          "latitude": 12.780330475752,
          "longitude": 77.554893493652
        },
        {"latitude": 12.811801316583, "longitude": 77.578926086426}, {
          "latitude": 12.846615538846,
          "longitude": 77.578926086426
        },
        {"latitude": 12.840925081978, "longitude": 77.558670043945}, {
          "latitude": 12.851301700673,
          "longitude": 77.527084350586
        },
        {"latitude": 12.822513897983, "longitude": 77.517127990723}, {
          "latitude": 12.825191972119,
          "longitude": 77.506484985352
        },
        {"latitude": 12.855653058363, "longitude": 77.518501281738}, {
          "latitude": 12.876069959946,
          "longitude": 77.489318847656
        },
        {"latitude": 12.895146545398, "longitude": 77.468719482422}, {
          "latitude": 12.873392428202,
          "longitude": 77.450180053711
        },
        {"latitude": 12.875400579692, "longitude": 77.426834106445}, {
          "latitude": 12.90451696722,
          "longitude": 77.465629577637
        },
        {"latitude": 12.991511228908, "longitude": 77.468719482422}, {
          "latitude": 13.053058002128,
          "longitude": 77.472496032715
        },
        {"latitude": 13.085163283024, "longitude": 77.402801513672}, {
          "latitude": 13.092185756229,
          "longitude": 77.407264709473
        },
        {"latitude": 13.079478277226, "longitude": 77.437133789062}, {
          "latitude": 13.094192140384,
          "longitude": 77.43953704834
        }]
    };
  //}
  res.send(result);
};


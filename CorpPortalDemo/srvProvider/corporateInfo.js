/**
 * Created by administrator on 03/07/15.
 */

exports.getCorporateDetails = function(req,res)
{
  var name = req.query["corporate_id"];

  var result = {status: "success", error_desc: "", error_code: "",
    response_data: { emailId: "Gunjan.kumar@gmail.com", orgWebsite: "www.gkcom.com",
      tanNumber: "", pincode: "560078", addressLine2: "JP nagar 7th Phase",
      addressLine3: "Bangalore - 560078", addressLine1: "Sai Enclave, JP Nagar",
      overDraftLimit: 2500.0, isSignatureRequired: 1, serviceTaxRegNumber: "",
      createdAt: "2014-12-22 12:13:15.0", countryId: 99, id: 3, commission: "0.00",
      mailSend: 1, panCardImageName: "47d8dab2-4f5d-4f1e-8dfa-b0766ffeeeaf/google-physical-web-uribeacon-with-the-bluefruit-le-friend.pdf",
      currentOverDraftLimit: 0.0, paymentType: 3, createdBy: 2696, clientStatus: 1,
      userName: "Gunjan Kumar", mobileNumber: "9886206200", tanCardImageName: "",
      name: "Gunjan Kumar", designation: "NA", stateId: 11, flatCommission: "0.00",
      panNumber: "sw42342342", cityName: "Bangalore", corporateName: "GK COM PVT Ltd"}};

  res.send(result);
};
exports.getCorpBookingCount = function(req,res)
{
  var name = req.query["corporate_id"];
  var result = {"status": "success", "error_desc": "", "error_code": "", "response_data": {"cancelled": 2, "issue_booking": 1, "serviced": 3}};
  setTimeout(function(){
    res.send(result);
  }, 1000);
};
exports.enquiry = function(req,res)
{
  var reqObj = JSON.parse(Object.keys(req.body)[0]);
 // console.log(reqObj);

  var result = {status: 'success', error_desc: '', error_code: '200', response_data: {username: "Gunjan.kumar",
      session_id: "c08ba7f4868c15aaba5c1a67012344a0"}, message:'Verified'};
  setTimeout(function(){
    res.send(result);
  }, 1000);
};
function getDate()
{
  var m_names = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");

  var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  return curr_date + "-" + m_names[curr_month]
  + "-" + curr_year;
}
exports.getPrepaidBalance = function (req,res)
{
  var name = req.query["corporate_id"];
  var result = {"status": "success", "error_desc": "", "error_code": "", "response_data": 6000.50};
  res.send(result);
}
exports.getEstimatedFare = function(req,res)
{

  var name = req.query["corporate_id"];
  var result = {"status": "success", "error_desc": "", "error_code": "", "response_data": {"estimated_fare": 500}};
  res.send(result);
}
exports.getCorpReceipts = function(req,res)
{

  var name = req.query["corporate_id"];
  var result = {"status": "success", "error_desc": "", "error_code": "", "response_data": [
    {"status": "Paid", "outstandingAmount": 0.0, "userId": 0, "corporateId": 3,
      "fileName": "a6fbb51b-a7a6-4562-9100-ec4e65126f6f/566312.pdf",
      "paymentDate": "2015-06-03", "receiptNumber": "GKCOM-1488567612", "invoiceNumber": "",
      "paidAmount": 1500.0, "id": 133, "purposePiad": "Prepaid Payment"}]};
  setTimeout(function(){
    res.send(result);
  }, 500);
};
exports.getCorpInvoice = function(req,res)
{

  var name = req.query["corporate_id"];
  var result = {"status": "success", "error_desc": "", "error_code": "", "response_data": [
    {"status": "Paid", "outstandingAmount": 100.0, "userId": 0, "corporateId": 3,
      "fileName": "a6fbb51b-a7a6-4562-9100-ec4e65126f6f/566312.pdf",
      "invoiceDate": "2015-06-03", "receiptNumber": "", "invoiceNumber": "GKCOM-124563",
      "amount": 1300.0, "id": 133, "purposePiad": "Prepaid Payment"}]};
  setTimeout(function(){
    res.send(result);
  }, 500);
};
exports.getCorporateTransaction = function(req,res)
{

  var name = req.query["corporate_id"];
  var result = {"status": "success", "error_desc": "", "error_code": "", "response_data": [
    {"status": "Paid", "postTransactionBalance": 100.0, "userId": 0, "corporateId": 3,
      "fileName": "a6fbb51b-a7a6-4562-9100-ec4e65126f6f/566312.pdf",
      "transactionDateTime": "2015-06-07", "receiptNumber": "", "transactionId": "GKCOM-1263",
      "transactionValue": 600.0, "id": 133, "transactionType": "DEBIT"}]};
  setTimeout(function(){
    res.send(result);
  }, 500);
};
exports.get_upcoming_bookings = function(req,res)
{
  var tomo =  getDate();
  var result = {
    "status": "success",
    "error_desc": "",
    "error_code": "",
    "response_data": {
      "pagination": {
        "has_next": false,
        "next_page": 2,
        "previous_page": 0,
        "current_page": 1,
        "total_pages": 1,
        "has_previous": false
      },
      "results": [{
        "traffic_time_pulse_rate": 0,
        "is_editable": true,
        "extra_km_fare": 14.0,
        "pickup_datetime": tomo,
        "service_status": "pending",
        "pickup_area": "Sunday Soul Sante",
        "booking_status": "Confirmed",
        "customer_name": "Gunjan Kumar",
        "city": "Bangalore",
        "vehicle_number": null,
        "drop_area": "MG Street",
        "car_with_ac": true,
        "is_airport_km": false,
        "drop_address": "Indira Nagar II Stage, Stage 2, Hoysala Nagar, Indiranagar, Bengaluru, India",
        "trip_time_fare": 0,
        "pickup_date": tomo,
        "fare": 100,
        "direction": null,
        "customer_email": "demo@gkcom.com",
        "view_bill_md5": "11728a572745f4fb045673f8ebe26130",
        "base_fare": 49.0,
        "track_taxi_url": "http://tfs.my/2GBHVZ",
        "pickup_time": "09:15PM",
        "latitude": 12.9333631,
        "pickup_address": "Koramangala 4 Block, Koramangala, Bengaluru, Karnataka, India",
        "payment_mode": 3,
        "instructions": null,
        "car_type": "Tata Indica AC",
        "car": "Tata Indica",
        "trip_time_pulse_rate": 1.25,
        "driver_number": 9876543212,
        "longitude": 77.6287129,
        "customer_number": "9886207654",
        "booking_type": "p2p",
        "booking_id": "TFS-PP-C24801581",
        "driver_name": "A.D",
        "return_date": null
      }]
    }
  }
  res.send(result);

}
exports.getPastBookings = function(req,res)
{
  var result = {
    "status": "success",
    "error_desc": "",
    "error_code": "",
    "response_data": {
      "pagination": {
        "has_next": true,
        "next_page": 2,
        "previous_page": 0,
        "current_page": 1,
        "total_pages": 3,
        "has_previous": false
      },
      "results": [{
        "traffic_time_pulse_rate": 0,
        "extra_km_fare": 14.0,
        "pickup_datetime": "2015-06-19T13:45:08",
        "service_status": "Cancelled",
        "pickup_area": "Jaynagar 4Th T Block",
        "booking_status": "Confirmed",
        "customer_name": "asdf",
        "city": "Bangalore",
        "vehicle_number": null,
        "drop_area": "Kamakshi Palya",
        "car_with_ac": true,
        "is_airport_km": false,
        "drop_address": "Magadi Rd, Govindaraja Nagar Ward, Asthagrama Layout, Bengaluru, Karnataka 560079, India",
        "trip_time_fare": 0,
        "pickup_date": "19 June 2015",
        "fare": 0,
        "direction": null,
        "customer_email": "asdf2asdf@asdf.com",
        "view_bill_md5": "bd8b072de2bfe6a15b54ee0f82819bf8",
        "base_fare": 49.0,
        "pickup_time": "01:45PM",
        "latitude": 12.9250074,
        "pickup_address": "Jayanagar, Bengaluru, Karnataka, India",
        "payment_mode": 4,
        "instructions": null,
        "car_type": "Tata Indica AC",
        "car": "Tata Indica",
        "trip_time_pulse_rate": 1.25,
        "driver_number": null,
        "longitude": 77.5938028,
        "customer_number": "2222222222",
        "booking_type": "p2p",
        "booking_id": "TFS-PP-C22491575",
        "driver_name": null,
        "return_date": null
      },  {
        "traffic_time_pulse_rate": 0,
        "extra_km_fare": 14.0,
        "pickup_datetime": "2015-06-18T16:30:46",
        "service_status": "Cancelled",
        "pickup_area": "Karol Bagh",
        "booking_status": "Confirmed",
        "customer_name": "Vj test",
        "city": "Delhi",
        "vehicle_number": null,
        "drop_area": "Tilak Nagar",
        "car_with_ac": true,
        "is_airport_km": false,
        "drop_address": "Tilak Nagar, New Delhi, Delhi, India",
        "trip_time_fare": 0,
        "pickup_date": "18 June 2015",
        "fare": 0,
        "direction": null,
        "customer_email": "vj@gm.com",
        "view_bill_md5": "2e9ca8dfac6326b9bfa4913d2d8c7380",
        "base_fare": 49.0,
        "pickup_time": "04:30PM",
        "latitude": 28.6527809,
        "pickup_address": "Karol Bagh, New Delhi, Delhi, India",
        "payment_mode": 3,
        "instructions": null,
        "car_type": "Hatchback AC",
        "car": "Hatchback",
        "trip_time_pulse_rate": 1.25,
        "driver_number": null,
        "longitude": 77.1921441,
        "customer_number": "2345678008",
        "booking_type": "p2p",
        "booking_id": "TFS-PP-C22091031",
        "driver_name": null,
        "return_date": null
      },{
        "traffic_time_pulse_rate": 0,
        "extra_km_fare": 16.0,
        "pickup_datetime": "2015-06-15T13:00:06",
        "service_status": "Cancelled",
        "pickup_area": "Bangalore Airport",
        "booking_status": "Confirmed",
        "customer_name": "uzzal",
        "city": "Bangalore",
        "vehicle_number": "MH-46-AD-0281",
        "drop_area": "Jayanagar 3rd block",
        "car_with_ac": true,
        "is_airport_km": true,
        "drop_address": "Jayanagar 3rd Block, Jaya Nagar East, Jayanagar, Bengaluru, Karnataka, India",
        "trip_time_fare": 0,
        "pickup_date": "15 June 2015",
        "fare": 0,
        "direction": 2,
        "customer_email": "demo@gkcom.com",
        "view_bill_md5": "592b4e9f8719ecf60ff4165a315faa5f",
        "base_fare": 700.0,
        "pickup_time": "01:00PM",
        "latitude": 13.20456,
        "pickup_address": "Bangalore Airport",
        "payment_mode": 3,
        "instructions": null,
        "car_type": "Sedan AC",
        "car": "Sedan",
        "trip_time_pulse_rate": 1.25,
        "driver_number": null,
        "longitude": 77.707708,
        "customer_number": "9535489276",
        "booking_type": "at",
        "booking_id": "TFS-AT-C21951994",
        "driver_name": null,
        "return_date": null
      }, {
        "traffic_time_pulse_rate": 0,
        "extra_km_fare": 14.0,
        "pickup_datetime": "2015-06-15T12:45:46",
        "service_status": "Cancelled",
        "pickup_area": "Koramangala 3rd block",
        "booking_status": "Confirmed",
        "customer_name": "Uzzal 1",
        "city": "Bangalore",
        "vehicle_number": "MH-46-AD-0281",
        "drop_area": "Brigade Gardenia",
        "car_with_ac": true,
        "is_airport_km": false,
        "drop_address": "J P Nagar 7th Phase, Bengaluru, Karnataka, India",
        "trip_time_fare": 0,
        "pickup_date": "15 June 2015",
        "fare": 0,
        "direction": null,
        "customer_email": "demo@gkcom.com",
        "view_bill_md5": "d09a03c2431a1525a6cc8170a6db4c48",
        "base_fare": 49.0,
        "pickup_time": "12:45PM",
        "latitude": 12.9279232,
        "pickup_address": "Koramangala, Bengaluru, Karnataka, India",
        "payment_mode": 3,
        "instructions": null,
        "car_type": "Tata Indica AC",
        "car": "Tata Indica",
        "trip_time_pulse_rate": 1.25,
        "driver_number": null,
        "longitude": 77.6271078,
        "customer_number": "9535489276",
        "booking_type": "p2p",
        "booking_id": "TFS-PP-C21951094",
        "driver_name": null,
        "return_date": null
      }, {
        "traffic_time_pulse_rate": 0,
        "extra_km_fare": 14.0,
        "pickup_datetime": "2015-06-15T12:45:24",
        "service_status": "Cancelled",
        "pickup_area": "JP Nagar",
        "booking_status": "Confirmed",
        "customer_name": "uzzal",
        "city": "Bangalore",
        "vehicle_number": "MH-46-AD-0281",
        "drop_area": "Jayanagar 3rd block",
        "car_with_ac": true,
        "is_airport_km": false,
        "drop_address": "Jayanagar 3rd Block, Jaya Nagar East, Jayanagar, Bengaluru, Karnataka, India",
        "trip_time_fare": 0,
        "pickup_date": "15 June 2015",
        "fare": 0,
        "direction": null,
        "customer_email": "uzzal.konwar@taxiforsure.com",
        "view_bill_md5": "adfb6a1ab7a4fc435f41af114abd0b9f",
        "base_fare": 49.0,
        "pickup_time": "12:45PM",
        "latitude": 12.910491,
        "pickup_address": "J. P. Nagar, Bengaluru, Karnataka, India",
        "payment_mode": 3,
        "instructions": null,
        "car_type": "Tata Indica AC",
        "car": "Tata Indica",
        "trip_time_pulse_rate": 1.25,
        "driver_number": null,
        "longitude": 77.5857168,
        "customer_number": "9535489276",
        "booking_type": "p2p",
        "booking_id": "TFS-PP-C21951796",
        "driver_name": null,
        "return_date": null
      }, {
        "traffic_time_pulse_rate": 0,
        "extra_km_fare": 14.0,
        "pickup_datetime": "2015-06-08T06:45:50",
        "service_status": "Completed",
        "pickup_area": "Bannerghatta Road, Shoppers Stop",
        "booking_status": "Trip Completed",
        "customer_name": "Mr. Abhijeet",
        "city": "Bangalore",
        "vehicle_number": "KA-02-AE-3136",
        "drop_area": "Bangalore Airport",
        "car_with_ac": true,
        "is_airport_km": true,
        "drop_address": "Bangalore Airport",
        "trip_time_fare": 81.25,
        "pickup_date": "08 June 2015",
        "fare": 938.0,
        "direction": 1,
        "customer_email": "konwar.ujjal@gmail.com",
        "view_bill_md5": "9e0a09a5a8e52f8ae939c7f6397b859b",
        "base_fare": 700.0,
        "pickup_time": "06:45AM",
        "latitude": 12.889535,
        "pickup_address": "Arekere MICO Layout 2nd stage, Lakshmi Layout, Arakere, Bengaluru, Karnataka 560076, India",
        "payment_mode": 4,
        "instructions": null,
        "car_type": "Tata Indica AC",
        "car": "Tata Indica",
        "trip_time_pulse_rate": 1.25,
        "driver_number": "7204402894",
        "longitude": 77.593954,
        "customer_number": "8088787790",
        "booking_type": "at",
        "booking_id": "TFS-AT-C20851922",
        "driver_name": "Shivaprasad.G",
        "return_date": null
      }]
    }
  }
  setTimeout(function(){
    res.send(result);
  }, 2000);


}

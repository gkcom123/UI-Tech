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

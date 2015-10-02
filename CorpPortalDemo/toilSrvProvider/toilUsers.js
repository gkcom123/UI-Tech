/**
 * Created by gunjan.kumar on 10/2/15.
 */
exports.getUserList = function(req,res)
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
                "firstName": "Patricia",
                "surName": "Johnson",
                "userName": "tspjo.15",
                "emailId":"p.johnson@company.com",
                "status":0,
                "isEditable": true,
                "isRemovable":true
            },{
                "firstName": "Robert",
                "surName": "C",
                "userName": "tspjo.15",
                "emailId":"p.robert@company.com",
                "status":0,
                "isEditable": true,
                "isRemovable":true
            },{
                "firstName": "G",
                "surName": "Henry",
                "userName": "tspjo.55",
                "emailId":"p.henry@company.com",
                "status":0,
                "isEditable": true,
                "isRemovable":true
            },{
                "firstName": "Chris",
                "surName": "J",
                "userName": "tspjo.45",
                "emailId":"p.johnson@company.com",
                "status":1,
                "isEditable": true,
                "isRemovable":true
            },{
                "firstName": "Adrin",
                "surName": "Bond",
                "userName": "tspjo.5",
                "emailId":"a.bondn@company.com",
                "status":0,
                "isEditable": false,
                "isRemovable":true
            },{
                "firstName": "Hannah",
                "surName": "Walsh",
                "userName": "tspjo.76",
                "emailId":"h.Walsh@company.com",
                "status":0,
                "isEditable": true,
                "isRemovable":true
            }
            ]
        }
    }
    res.send(result);

}
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
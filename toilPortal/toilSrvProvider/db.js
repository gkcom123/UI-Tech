/**
 * Created by gunjan.kumar on 28/11/15.
 */
var mysql      = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'gunjan',
    database    : 'toil'
});
exports.pool = pool;
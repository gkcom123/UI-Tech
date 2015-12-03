/**
 * Created by gunjan.kumar on 28/11/15.
 */
var mysql      = require('mysql');
/*var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'toiltalent.c3hfg7tttfy1.eu-west-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'toilTalent',
    database    : 'toil'
});*/
var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'gunjan',
    database    : 'toil'
});
exports.pool = pool;

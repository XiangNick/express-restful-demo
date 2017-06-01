let config = require('../config/poolConfig.json');
let mysql = require('mysql');
let pool = mysql.createPool(config);

exports.query = function(){
    let args = arguments;
    let sql = args[0];
    let params = [];
    let callback;

    //2个参数 : sql、回调
    if(args.length === 2 && typeof args[1] === 'function'){
        callback = args[1];
    }
    //3个参数 : sql、参数、回调
   else if(args.length === 3 && Array.isArray(args[1]) && typeof args[2] === 'function'){
        params = args[1];
        callback = args[2];
    }
    else{
        throw new Error('参数个数不匹配');
    }

    pool.getConnection((err,conn)=>{
        console.log('===== catch connection =====');
        if(err)
          callback(err);
        else{
            conn.query(sql,params,(err,rows)=>{
                if(err)
                    callback(err);
                else{
                    conn.release();
                    console.log('===== return connection =====');
                    callback(null,rows);
                }
            });
        }
    });
};
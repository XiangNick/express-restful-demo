let pool = require('../models/db.js');
let user = require('../models/user.js');

//相应方法

/**
 * 增加用户
 */
let addUser = (user,callback)=>{
    pool.query('insert into user values (?,?,?)',[user.uid,user.username,user.password],(err,rows)=>{
        if(err)
         callback(err);
        else
            callback(null,rows);
    });
};

/**
 * 删除用户
 */
let deleteUserById = (uid,callback)=>{
    pool.query('delete from user where uid = ?',[uid],(err,rows)=>{
         if(err)
         callback(err);
        else
            callback(null,rows);
    });
};

/**
 * 修改用户
 */
let updateUser = (id,user,callback)=>{
    pool.query('update user set uid = ?,username = ?,password = ? where uid = ?',[user.uid,user.username,user.password,id],(err,rows)=>{
         if(err)
         callback(err);
        else
            callback(null,rows);
    });
};
/**
 * 查询用户
 */
let findUserById = (uid,callback)=>{
    pool.query('select * from user where uid = ?',[uid],(err,rows)=>{
         if(err)
         callback(err);
        else{
            callback(null,rows);
        }
});
};
/**
 * 查询全部用户
 */
 let findUserList = (callback)=>{
    pool.query('select * from user',(err,rows)=>{
        if(err)
         callback(err);
        else
         callback(null,rows);
    });
 };

module.exports = {
    addUser:addUser,
    deleteUserById:deleteUserById,
    updateUser:updateUser,
    findUserById:findUserById,
    findUserList:findUserList
}

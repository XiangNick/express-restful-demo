let express = require('express');
let router = express.Router();

let userDao = require('../Dao/userDao.js');
let User = require('../models/user.js');

//增加用户  POST /user
router.post('/',(req,res)=>{
    let user = new User(req.body);
    userDao.addUser(user,(err,rows)=>{
        if(err)
         res.send('新增用户失败!');
        else
            res.send('新增用户成功!');
    });
});

//删除用户 DELETE /user
router.delete('/',(req,res)=>{
    let uid = req.body.uid;
    userDao.deleteUserById(uid,(err,rows)=>{
          if(err)
             res.send('删除用户失败!');
        else{
            res.send('删除用户成功!');
        }
    });
});

//修改用户 PUT /user
router.put('/',(req,res)=>{
    let id = req.body.id;
    let reqUser = req.body;

    userDao.findUserById(id,(err,rows)=>{
        if(err)
         res.send('修改失败！无此用户!');
        else{
           let updateUser = new User({
                uid:rows[0].uid,
                username:rows[0].username,
                password:rows[0].password
            });
            //如果请求参数里有值，就修改他
            if(reqUser.uid)
             updateUser.uid = reqUser.uid;
            if(reqUser.username)
             updateUser.username = reqUser.username;
            if(reqUser.password)
             updateUser.password = reqUser.password;
            
            userDao.updateUser(id,updateUser,(err,rows)=>{
                if(err)
                 res.send(`修改编号为${id}的用户失败.`);
                else{
                    res.send(`修改编号为${id}的用户成功.`);
                }
            });
        }
    });
});

//查找用户 GET /user/:uid
 router.get('/:uid',(req,res)=>{
     let uid = req.params.uid;
     
     userDao.findUserById(uid,(err,rows)=>{
        if(err)
          res.send('查询失败!无此用户!');
        else{
            res.send(rows);
        }
         
     });
 })

//查找全部用户 GET /user/
 router.get('/',(req,res)=>{
    userDao.findUserList((err,rows)=>{
        if(err)
            res.send('查询用户列表失败!');
        else
           res.send(rows);
    })
 });

module.exports = router;
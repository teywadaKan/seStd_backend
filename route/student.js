const mariadb = require('mariadb');
const express = require('express');

const route = express.Router();

const pool = mariadb.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"1234",
    database:"infostudent"
})

// pool.getConnection()
//     .then(conn => {
    
//       conn.query("SELECT 1 as val")
//         .then((rows) => {
//           console.log(rows); //[ {val: 1}, meta: ... ]
//           //Table must have been created before 
//           // " CREATE TABLE myTable (id int, val varchar(255)) "
//           return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         })
//         .then((res) => {
//           console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//           conn.end();
//         })
//         .catch(err => {
//           //handle error
//           console.log(err); 
//           conn.end();
//         })
        
//     }).catch(err => {
//       //not connected
//     });

route.get("/getAllStudent",async(req, res)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT student.std_id, student.nickname,prefixname.prefix_name,student.name,TIMESTAMPDIFF(YEAR, student.birthday, CURDATE()) AS age FROM student,prefixname WHERE student.sprefix = prefixname.pid;");
        const formatRows = rows.map(row =>{
            return{
                "student_id": Number(row.std_id),
                "prefix_name":row.prefix_name,
                "name": row.name,
                "nickname": row.nickname,
                "age": Number(row.age)

            }
        });
        res.status(200).json(formatRows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ e: 'Internal Server Error' });
    }
})

route.get("/testStd",(req, res)=>{
    res.send("this api is in student.js");
})


route.post("/saveStudent",async(req, res)=>{
    const {std_id,sprefix,name,nickname,birthday} = req.body;
    let conn;
    try {
        
    } catch (error) {
        
    }
})

module.exports = route;
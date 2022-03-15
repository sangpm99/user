const express = require("express");
const router = express.Router();
const model = require("../objection/model")
const user_controller = require("../controllers/users.controller");


router.get('/developers', user_controller.user_list_get);



// GET specific Developers by id
router.get('/developers/:uid', (req, res) => {
    db_conn.getConnection( (err, conn) => {
        if(err) throw err
        console.log(`connected as uid ${conn.threadId}`)

        conn.query('SELECT * FROM developers WHERE id = ?' , [req.params.id] , (err, rows) => {
            conn.release() // return the connection to pool

            if(!err){
                res.send(rows);
            } else{
                console.log(err);
            }
        });
    });
});

// Delete specific Developers by id
router.delete('/developers/:uid', (req, res) => {
    db_conn.getConnection( (err, conn) => {
        if(err) throw err
        console.log(`connected as uid ${conn.threadId}`)

        conn.query('DELETE  FROM developers WHERE id = ?' , [req.params.id] , (err, rows) => {
            conn.release() // return the connection to pool

            if(!err){
                res.send(`Developers with records ID ${[req.params.id] } has been removed.`);
            } else{
                console.log(err);
            }
        });
    });
});

// Add Records /  Developers
// router.post('/', (req, res) => {
//     db_conn.getConnection( (err, conn) => {
//         if(err) throw err
//         console.log(`connected as uid ${conn.threadId}`)
//
//         const params =  req.body
//
//         conn.query('INSERT INTO  developers SET ?' , params , (err, rows) => {
//             conn.release() // return the connection to pool
//
//             if(!err){
//                 res.send(`Developers with name  ${params.id } has been Added.`);
//             } else{
//                 console.log(err);
//             }
//         });
//
//         console.log(req.body);
//     });
// });

router.post('/developers', user_controller.user_list_post);

// Update Records /  Developers
router.put('/', (req, res) => {
    db_conn.getConnection( (err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        const params =  req.body
        const { id, name, tagline, description, image } = req.body

        conn.query('UPDATE  developers SET name = ? , tagline = ?, description = ?, image = ? WHERE id = ?',
            [name , tagline , description , image, id] , (err , rows) => {
                conn.release() // return the connection to pool

                if(!err){
                    res.send(`Developers with name  ${params.id } has been Added.`);
                } else{
                    console.log(err);
                }
            });

        console.log(req.body);
    });
});


module.exports = router
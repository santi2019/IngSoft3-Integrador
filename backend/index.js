import express from "express"
import { createPool } from "mysql2/promise"
import mysql from "mysql"
import cors from "cors"


/* Configuracion de conexion */

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8800, () => {
    console.log("Connected to backend!")
});

const db = await createPool({
    host: "database",
    user: "root",
    password: "root",
    database: "ingsoft3int",
    port:  3306
});




/* Manejo de Consultas y rutas */

app.get("/", (req, res) => {
    res.json("Hello this is the backend!");
});


/* Mostrar libros*/
app.get("/libros", async (req, res) => {
   const result = await db.query('SELECT * FROM libros');
   res.json(result[0]);
});


/* Registrar libro*/
app.post("/libros", (req, res) =>{
    const q = "INSERT INTO libros (`titulo`,`descripcion`,`precio`,`portada`) VALUES (?)";
    const values = [ 
        req.body.titulo,
        req.body.descripcion,
        req.body.precio,
        req.body.portada
    ];

    db.query(q, [values], (err, data) =>{
        if(err) return res.json(err);
        return res.json("El libro ha sido creado !");
    });
});


/* Borrar libro*/
app.delete("/libros/:id", (req, res) => {
    const libroId = req.params.id;
    const q = "DELETE FROM libros WHERE id = ?";

    db.query(q, [libroId], (err, data) =>{
        if(err) return res.json(err);
        return res.json("El libro ha sido borrado !");
    });
})


/* Actualizar libro*/
app.put("/libros/:id", (req, res) => {
    const libroId = req.params.id;
    const q = "UPDATE libros SET `titulo` = ?, `descripcion` = ?, `precio` = ?, `portada` = ? WHERE id = ?";

    const values = [ 
        req.body.titulo,
        req.body.descripcion,
        req.body.precio,
        req.body.portada
    ];

    db.query(q, [...values, libroId], (err, data) =>{
        if(err) return res.json(err);
        return res.json("El libro ha sido actualizado !");
    });
});



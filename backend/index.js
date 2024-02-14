import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ingsoft3int"
});

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.json("Hello this is the backend!");
});


app.get("/libros", (req, res) => {
    const q = "SELECT * FROM libros";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});


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


app.delete("/libros/:id", (req, res) => {
    const libroId = req.params.id;
    const q = "DELETE FROM libros WHERE id = ?";

    db.query(q, [libroId], (err, data) =>{
        if(err) return res.json(err);
        return res.json("El libro ha sido borrado !");
    });
})


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


app.listen(8800, () => {
    console.log("Connected to backend!")
});
import express from "express"
import { createPool } from "mysql2/promise"
import mysql from "mysql"
import cors from "cors"
import { config } from "dotenv"


/* Configuracion de conexion */

const app = express();
app.use(express.json());
app.use(cors());
config();


const PORT = 8800; 


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/*
const db = await createPool({
    host: "database",
    user: "root",
    password: "root",
    database: "ingsoft3int",
    port:  3306
}); 



const db = await createPool({
    host: "162.222.177.44",
    user: "root",
    password: "root",
    database: "ingsoft3int-database",
    //port:  3306
});
*/


const db = await createPool({
    user: `root`,
    password: `root`,
    database: `ingsoft3int-database`,
    socketPath: `/cloudsql/ingsoft3-integrador:us-central1:root`,
});



/* Controllers */

app.get("/", (req, res) => {
    res.json("Hello this is the backend!");
});


/* Mostrar libros*/
app.get("/libros", async (req, res) => {
   const data = await db.query("SELECT * FROM libros");
   return res.json(data[0]);
});


/* Registrar libro*/
app.post("/libros", async (req, res) =>{

    try{
        const values = [ 
            req.body.titulo,
            req.body.descripcion,
            req.body.precio,
            req.body.portada
        ];
        await db.query("INSERT INTO libros (`titulo`,`descripcion`,`precio`,`portada`) VALUES (?)", [values]);
        res.status(200).json({ message: "Libro añadido con exito !" });
    }catch(err){
        return res.json(err);
    }

});


/* Borrar libro */
app.delete("/libros/:id", async (req, res) => {

    try{
        const libroId = req.params.id;
    
        await db.query("DELETE FROM libros WHERE id = ?", libroId);
        res.status(200).json({ message: "Libro eliminado con exito !" });
    }catch(err){
        return res.json(err);
    }
});


/* Actualizar libro */
app.put("/libros/:id", async (req, res) => {
    
    try{
        const libroId = req.params.id;
        const values = [ 
            req.body.titulo,
            req.body.descripcion,
            req.body.precio,
            req.body.portada
        ];
        await db.query("UPDATE libros SET `titulo` = ?, `descripcion` = ?, `precio` = ?, `portada` = ? WHERE id = ?", [...values, libroId]);
        res.status(200).json({ message: "Libro actualizado con exito !" });
    }catch(err){
        return res.json(err);
    }
});


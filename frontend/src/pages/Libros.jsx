import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Libros = () => {

    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchAllLibros = async () => {
            try{
                const res = await axios.get("https://backend-vgt7ckbuoq-rj.a.run.app/libros");
                setLibros(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllLibros();
    }, []);


    const handleDelete = async (id) => {
        try{
            await axios.delete("https://backend-vgt7ckbuoq-rj.a.run.app/libros/"+id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="div">
            <h1>Libreria Rayuela2</h1>
            <div className="libros1">
                {libros.map(libro => (
                    <div className="libro" key={libro.id}>
                        {libro.portada && <img src={libro.portada} alt=""/>}
                        <h2>{libro.titulo}</h2>
                        <p>{libro.descripcion}</p>
                        <span>${libro.precio}</span>
                        <button className="borrar" onClick={()=>handleDelete(libro.id)}>Eliminar</button>
                        <button className="actualizar"><Link to={`/actualizar/${libro.id}`} style={{ color: "inherit", textDecoration: "none" }}>Actualizar</Link></button>
                    </div>
                ))}
            </div>
            <button className="añadirButton"><Link to="/registrar" style={{ color: "inherit", textDecoration: "none" }}>Añadir nuevo</Link></button>
        </div>
    );
}

export default Libros
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router';

const ActualizarLibro = () => {

    const [libro, setLibro] = useState({
        titulo:"",
        descripcion:"",
        precio:null,
        portada:""
    });

    const navigate = useNavigate();
    const location = useLocation();

    const libroId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setLibro((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault();

        try{
            await axios.put(`https://backend-vgt7ckbuoq-rj.a.run.app/libros/${libroId}`, libro);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="form">
            <h1>Actualizar libro</h1>
            <input type="text" placeholder="Titulo" onChange={handleChange} name="titulo"/>
            <input type="text" placeholder="Descripcion" onChange={handleChange} name="descripcion"/>
            <input type="number" placeholder="Precio" onChange={handleChange} name="precio"/>
            <input type="text" placeholder="Portada" onChange={handleChange} name="portada"/>
            <button className="formButton" onClick={handleClick}>Confirmar</button>
        </div>
    );
}

export default ActualizarLibro
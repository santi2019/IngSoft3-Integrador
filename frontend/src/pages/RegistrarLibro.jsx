import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const RegistrarLibro = () => {

    const [libro, setLibro] = useState({
        titulo:"",
        descripcion:"",
        precio: null,
        portada:""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLibro((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault();

        try{
            await axios.post("http://localhost:8080/libros", libro);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Registrar libro</h1>
            <input type="text" placeholder="Titulo" onChange={handleChange} name="titulo"/>
            <input type="text" placeholder="Descripcion" onChange={handleChange} name="descripcion"/>
            <input type="number" placeholder="Precio" onChange={handleChange} name="precio"/>
            <input type="text" placeholder="Portada" onChange={handleChange} name="portada"/>
            <button className="formButton" onClick={handleClick}>Confirmar</button>
        </div>
    );
}

export default RegistrarLibro
import { assert} from 'chai'
import chaiHttp from 'chai-http';
import fetch from 'node-fetch';


describe('Backend API Tests', () =>{

    describe('GET /', () => {
        it('Retorno de saludo de backend:', async () => {
          const res = await fetch('http://localhost:8080/');  
          const data = await res.json();
          assert.equal(res.status, 200);

          console.log('Respuesta completa:', data);
          assert.equal(data, 'Hello this is the backend!');
        });
    });
    
    
    describe('GET /libros', () => {
        it('Retorno de todos los libros:', async () => {
          const res = await fetch('http://localhost:8080/libros');  
          const data = await res.json();
          assert.equal(res.status, 200);

          console.log('Libros:', data);
        });
    });


    describe('POST /libros', () => {
        it('Registrar un nuevo libro:', async () => {
            const nuevoLibro = {
              titulo: 'Libro desde Test',
              descripcion: 'Descripción desde el test',
              precio: 20,
              portada: 'url desde el test.png'
            };

            const res = await await fetch('http://localhost:8080/libros', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoLibro)
            });

            const data = await res.json();
            console.log('Mensaje:', data);

            assert.equal(res.status, 200);
            assert.equal(data && data.message, 'Libro añadido con exito !');
    });
    });
      




});
import chaiHttp from 'chai-http';
import fetch from 'node-fetch';
import sinon from 'sinon';
import { assert, expect} from 'chai'


function getAllLibros() {
  return [
    { id: 1, titulo: 'El futbol a sol y sombra', descripcion: 'Cuentos de futbol por Eduardo Galeano', portada: 'https://i.ibb.co/2cMVqVJ/9789876294751.jpg', precio: 50},
    { id: 2, titulo: 'Patrones de diseño', descripcion: 'Patrones de software - GoF', portada: 'https://i.ibb.co/yByGVXP/web-cover-es.png', precio: 150}
  ]
};



function postLibro(librosActuales, nuevoLibro) {
  
  const nuevaLista = [...librosActuales];
  nuevoLibro.id = nuevaLista.length + 1;

  nuevaLista.push(nuevoLibro);
  return nuevaLista;
}



function updateLibro(librosActuales, libroId, nuevosDatos) {
  
  const libroExistente = librosActuales.find(libro => libro.id === libroId);
  if (!libroExistente) {
    return librosActuales;
  }

  const libroActualizado = { ...libroExistente, ...nuevosDatos };

  const nuevaLista = librosActuales.map(libro =>libro.id === libroId ? libroActualizado : libro);
  return nuevaLista;
}



function deleteLibro(librosActuales, libroId) {
  const libroExistente = librosActuales.find(libro => libro.id === libroId);
  if (!libroExistente) {
    return librosActuales;
  }
  
  const nuevaLista = librosActuales.filter(libro => libro.id !== libroId);
  return nuevaLista;
}



describe('Backend Unit Test', () => {

    describe('GET /libros', () => {
      it('Deberia retornar la lista de libros esperada', () => {
        const librosEsperados = [
          { id: 1, titulo: 'El futbol a sol y sombra', descripcion: 'Cuentos de futbol por Eduardo Galeano', portada: 'https://i.ibb.co/2cMVqVJ/9789876294751.jpg', precio: 50 },
          { id: 2, titulo: 'Patrones de diseño', descripcion: 'Patrones de software - GoF', portada: 'https://i.ibb.co/yByGVXP/web-cover-es.png', precio: 150 }
        ];

        const librosActuales = getAllLibros();

        console.log('Libros esperados:', librosEsperados);
        console.log('Libros obtenidos:', librosActuales);
        expect(librosActuales).to.deep.equal(librosEsperados);
      });
    });



    describe('POST /libro', () => {
      const librosActuales = getAllLibros();
    
      it('Deberia añadir un nuevo libro', () => {
        const nuevoLibro = {
          titulo: 'Nuevo libro',
          descripcion: 'Descripcion del nuevo libro',
          portada: 'portada_nuevo_libro.png',
          precio: 75
        };
    
        const nuevaLista = postLibro(librosActuales, nuevoLibro);
    
        console.log('Lista de libros original:', librosActuales);
        console.log('Lista de libros actualizada:', nuevaLista);
    
        expect(nuevaLista.length).to.equal(librosActuales.length + 1);
        expect(nuevaLista[nuevaLista.length - 1]).to.deep.equal({id: librosActuales.length + 1, ...nuevoLibro});
      });
    });



    describe('DELETE /libro/id', () => {
      const librosActuales = getAllLibros();
    
      it('Deberia eliminar un libro existente', () => {
        const idLibro = 2;
        const nuevaLista = deleteLibro(librosActuales, idLibro);
    
        console.log('Lista de libros original:', librosActuales);
        console.log('Lista de libros actualizada:', nuevaLista);
    
        expect(nuevaLista.length).to.equal(librosActuales.length - 1);
        expect(nuevaLista.some(libro => libro.id === idLibro)).to.be.false;
      });

      it('No deberia eliminar un libro que no existente', () => {
        const idLibro = 999;
        const nuevaLista = deleteLibro(librosActuales, idLibro);

        expect(nuevaLista).to.deep.equal(librosActuales);
      });
    });



    describe('UPDATE /libro/id', () => {
      const librosActuales = getAllLibros();
    
      it('Deberia actualizar un libro existente', () => {
        const idLibro = 2;
    
        const nuevosDatos = {
          titulo: 'Titulo actualizado',
          descripcion: 'Descripcion actualizada',
          portada: 'portada_actualizada.png',
          precio: 25,
        };
    
        const nuevaLista = updateLibro(librosActuales, idLibro, nuevosDatos);
    
        console.log('Libros originales:', librosActuales);
        console.log('Libros después de la actualización:', nuevaLista);
    
        const libroActualizado = nuevaLista.find(libro => libro.id === idLibro);
        expect(libroActualizado).to.deep.equal({id: idLibro, ...nuevosDatos,});
      });
    
      it('No deberia actualizar un libro que no existe', () => {
        const idLibro = 999;
    
        const nuevosDatos = {
          titulo: 'Titulo actualizado',
          descripcion: 'Descripcion actualizada',
          portada: 'portada_actualizada.png',
          precio: 25,
        };
    
        const nuevaLista = updateLibro(librosActuales, idLibro, nuevosDatos);
        expect(nuevaLista).to.deep.equal(librosActuales);
      });
    });
    
});


















/*

describe('Backend Unit Test', () => {

    describe('GET /libros', () => {
      it('Deberia retornar libros de la base de datos', () => {  
        const getAllLibrosMock = sinon.stub(librosDatabase, 'getAllLibros')
        .returns([
        { id: 1, titulo: 'El futbol a sol y sombra', descripcion: 'Cuentos de futbol por Eduardo Galeano', portada: 'https://i.ibb.co/2cMVqVJ/9789876294751.jpg', precio: 50},
        { id: 2, titulo: 'Patrones de diseño', descripcion: 'Patrones de software - GoF', portada: 'https://i.ibb.co/yByGVXP/web-cover-es.png', precio: 150}
      ]);

        const res = librosDatabase.getAllLibros();

        console.log('Resultado real:', res);
        console.log('Resultado esperado:', [
          { id: 1, titulo: 'El futbol a sol y sombra', descripcion: 'Cuentos de futbol por Eduardo Galeano', portada: 'https://i.ibb.co/2cMVqVJ/9789876294751.jpg', precio: 50},
          { id: 2, titulo: 'Patrones de diseño', descripcion: 'Patrones de software - GoF', portada: 'https://i.ibb.co/yByGVXP/web-cover-es.png', precio: 150}
        ]);

        expect(res).to.deep.equal([
          { id: 1, titulo: 'El futbol a sol y sombra', descripcion: 'Cuentos de futbol por Eduardo Galeano', portada: 'https://i.ibb.co/2cMVqVJ/9789876294751.jpg', precio: 50},
          { id: 2, titulo: 'Patrones de diseño', descripcion: 'Patrones de software - GoF', portada: 'https://i.ibb.co/yByGVXP/web-cover-es.png', precio: 150}
        ]);

        getAllLibrosMock.restore();
      });
    });




    describe('Actualizar Libro', () => {
      const libro = 
        { id: 1, 
          titulo: 'Libro original',
          descripcion: 'descripcion original',
          precio: 80,
          portada: 'original.png' 
        };

        const nuevosDatos = 
        { titulo: 'Libro actualizado',
          descripcion: 'descripcion actualizado',
          precio: 10,
          portada: 'actualizado.png'  
        };

      it('Debería actualizar un libro en la base de datos', () => {
        const actualizarLibroStub = sinon.stub(librosDatabase, 'actualizarLibro')
          .withArgs(libro.id, nuevosDatos)
          .returns({ id: libro.id, ...nuevosDatos });
    
        
        const resultado = librosDatabase.actualizarLibro(libro.id, nuevosDatos);
    
        
        expect(resultado).to.deep.equal({ id: libro.id, ...nuevosDatos });
    
        
        actualizarLibroStub.restore();
      });
    });




});



*/



/* Tests de conexion a la BD
 describe('GET /', () => {
        it('Retorno de saludo de backend', async () => {
          const res = await fetch('http://localhost:8080/');  
          const data = await res.json();
          assert.equal(res.status, 200);

          console.log('Respuesta completa:', data);
          assert.equal(data, 'Hello this is the backend!');
        });
    });
    
    
    describe('GET /libros', () => {
        it('Retorno de todos los libros', async () => {
          const res = await fetch('http://localhost:8080/libros');  
          const data = await res.json();
          assert.equal(res.status, 200);

          console.log('Libros:', data);
        });
    });


    describe('POST /libros', () => {
        it('Registrar un nuevo libro', async () => {
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

*/
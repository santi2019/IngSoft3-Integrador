Feature('Tests');

Scenario('Añadir-Actualizar-Eliminar libro', ({ I }) => {
    I.amOnPage('https://frontend-vgt7ckbuoq-rj.a.run.app/');
    I.wait(5);
	I.click('Añadir nuevo');
	I.amOnPage('https://frontend-vgt7ckbuoq-rj.a.run.app/registrar')
	I.fillField('Titulo','Titulo integration');
	I.fillField('Descripcion','Descripcion integration');
	I.fillField('Precio','90');
	I.fillField('Portada','imagen.png');
	I.click('Confirmar');
    I.amOnPage('https://frontend-vgt7ckbuoq-rj.a.run.app/');
    I.see('Titulo integration');
    I.wait(5);

    const nombreLibro = 'Titulo integration';
    const actualizarButtonXPath = `//div[@class="libro" and .//h2[contains(text(), "${nombreLibro}")]]//button[@class="actualizar"]`;
    I.click({ xpath: actualizarButtonXPath });
    I.fillField('Titulo', 'Titulo actualizado');
    I.fillField('Descripcion', 'Descripcion actualizada');
    I.fillField('Precio', '30');
    I.fillField('Portada', 'actualizado.png');
    I.click('Confirmar');
    I.amOnPage('https://frontend-vgt7ckbuoq-rj.a.run.app/');
    I.see('Titulo actualizado');
    I.wait(5);

    const nombreActualizado = 'Titulo actualizado';
    const eliminarButtonXPath = `//div[@class="libro" and .//h2[contains(text(), "${nombreActualizado}")]]//button[@class="borrar"]`;
    I.click({ xpath: eliminarButtonXPath });
    I.dontSee('Titulo actualizado');
    I.wait(5);

});


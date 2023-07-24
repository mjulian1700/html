function contacto_initialLoad() {

}

function contacto_validarFormulario() {
    //Solución 1
    //if (document.querySelector('#contacto-inp-propridad').value == 0) {
    //    alert('Selecciona algo')
    //    return false
    //}

    //Solución 2
    console.log(document.forms)
    if (document.forms['contacto-formulario']['Prioridad'].value
        == 0) {
        alert('Selecciona algo')
        return false
    }
    return true
}
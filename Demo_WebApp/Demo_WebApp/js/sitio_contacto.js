function contacto_initialLoad() {
    geolocalizar(geo_success, geo_error)
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

function geo_success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    initMap(latitude, longitude, document.querySelector("#map"), 15)
}

function geo_error() {
    alert("No es posible obtener la ubicación.")
}
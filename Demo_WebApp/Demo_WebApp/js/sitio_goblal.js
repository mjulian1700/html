function addPedido(pedido) {
    pedidos.push(pedido)
}

window.onload = function () {
    productos_loadStaticContent()

    var millisecondsToWait = 1000;
    setTimeout(function () {
        document.getElementById('home-page').onclick = link_anchorWithHtmlPages
        document.getElementById('productos-page').onclick = link_anchorWithHtmlPages
        document.getElementById('pedidos-page').onclick = link_anchorWithHtmlPages
        document.getElementById('contacto-page').onclick = link_anchorWithHtmlPages

        if (typeof (Storage) !== "undefined") {
            let pedidos_temp = recuperarElementoLocalStorage(lsPedidosTemp)
            if (pedidos_temp) {
                for (item of pedidos_temp) {
                    if (buscarFruta(item.fruta)) {
                        pedidos.push(item)
                    }
                    else {
                        alert("La fruta " + item.fruta + " ya no se encuentra en el catálogo")
                    }
                }
            }
        }
        else {
            alert("El navegador no soporta almacenamiento local")
        }
    }, millisecondsToWait);
}

function link_anchorWithHtmlPages(event, objectoEdicion) {
    switch (event.target.id) {
        case 'home-page':
            location.reload()
            break
        case 'productos-page':
            getHtmlContent('../sitio/productos.html', 'GET', objectoEdicion,
                mostrarContenidoHtml)
            break
        case 'pedidos-page':
            getHtmlContent('../sitio/pedidos.html', 'GET', objectoEdicion,
                mostrarContenidoHtml)
            break
        case 'contacto-page':
            getHtmlContent('../sitio/contacto.html', 'GET', objectoEdicion,
                mostrarContenidoHtml)
            break
    }
}

function mostrarContenidoHtml(event, objectoEdicion, url) {
    const divContent = document.getElementById('html-dynamic-content')
    if (event.readyState == 4 && event.status == 200) {
        divContent.innerHTML = event.responseText
        if (url === '../sitio/productos.html') {
            productos_initialLoad(objectoEdicion)
        } else if (url === '../sitio/pedidos.html') {
            pedidos_initialLoad()
        }
        else if (url === '../sitio/contacto.html') {
            contacto_initialLoad()
        }
    }
}

function getHtmlContent(url, metodo, objetoEdicion, callbackSuccess, callbackError) {
    spin.style.display = "block";
    let xhr = new XMLHttpRequest()
    xhr.open(metodo, url, true)
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0')
    xhr.setRequestHeader('Expires', 'Thu, 1 Jan 1970 00:00:00 GMT')
    xhr.setRequestHeader('Pragma', 'no-cache')
    xhr.onerror = function () {
        if (callbackError) {
            callbackError(this)
        }
    }
    xhr.onreadystatechange = function () {
        if (callbackSuccess) {
            callbackSuccess(this, objetoEdicion, url)

            if (this.readyState == 4) {
                spin.style.display = "none";
            }
        }
    }
    xhr.send()
}

function buscarPedido(nombreFruta) {
    for (pedido of pedidos) {
        if (pedido.fruta === nombreFruta) {
            return pedido
        }
    }
    return null
}

function buscarFruta(nombreFruta) {
    for (fruta of catalogoProductos) {
        if (fruta.nombre === nombreFruta) {
            return fruta
        }
    }

    return null
}

function agregarElmentoLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function recuperarElementoLocalStorage(key) {
    let result = localStorage.getItem(key)
    if (result) {
        return JSON.parse(result)
    }

    return null
}

///////////Mapas
function geolocalizar(geo_success, geo_error) {
    if (!navigator.geolocation) {
        alert("La geolocalización no está disponible")
    }
    else {
        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 30000
        }

        navigator.geolocation.getCurrentPosition(geo_success,
            geo_error, geoOptions)
    }
}

async function initMap(lat, long, elemento, zoom) {
    let map;
    const position = { lat: lat, lng: long };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    map = new Map(elemento, {
        zoom: zoom,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: "Finanzas Puebla",
    });
}
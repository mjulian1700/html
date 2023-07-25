function addPedido(pedido) {
    pedidos.push(pedido)
}

window.onload = function () {
    document.getElementById('home-page').onclick = link_anchorWithHtmlPages
    document.getElementById('productos-page').onclick = link_anchorWithHtmlPages
    document.getElementById('pedidos-page').onclick = link_anchorWithHtmlPages
    document.getElementById('contacto-page').onclick = link_anchorWithHtmlPages
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
}
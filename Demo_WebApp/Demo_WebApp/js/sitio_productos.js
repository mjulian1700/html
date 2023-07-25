function productos_initialLoad(objectoEdicion) {
    if (objectoEdicion) {
        const fruta = buscarFruta(objectoEdicion.nombreFruta)
        if (fruta) {
            const catalogSection = document.getElementById('productos-catalogo-frutas')
            catalogSection.innerHTML = ''
            productos_loadContenidoEdicion(fruta, catalogSection, true)
        }
        else {
            productos_loadStaticContent()
        }
    }
    else {
        productos_loadStaticContent()
    }
}

function productos_cargarProductos(event) {
    if (event.readyState == 4 && event.status == 202) {
        catalogoProductos = []
        const result = JSON.parse(event.responseText)
        if (result.length > 0) {
            for (item of result) {
                catalogoProductos.push(new Fruta(
                    item.nombre, item.descripcion, item.precioKg,
                    item.imgUri, item.stockKg))
            }

            productos_pintarFrutas()
        }
    }
}

function productos_pintarFrutas() {
    const catalogSection = document.getElementById('productos-catalogo-frutas')
    catalogSection.innerHTML = ''
    for (let item of catalogoProductos) {
        productos_loadContenidoEdicion(item, catalogSection, false)
    }
}

function productos_loadStaticContent() {
    getHtmlContent('http://localhost:51321/api/frutas/obtener',
        'GET', null, productos_cargarProductos)
}

function productos_loadContenidoEdicion(fruta, catalogSection, esEdicion) {
    const article = document.createElement('article')
    const subtitulo = document.createElement('h2')
    const imagen = document.createElement('img')
    const desc = document.createElement('p')
    const precio = document.createElement('p')

    subtitulo.textContent = fruta.nombre
    imagen.src = fruta.imgUri
    desc.textContent = fruta.descripcion
    precio.textContent = fruta.precioKg

    article.appendChild(subtitulo)
    article.appendChild(imagen)
    article.appendChild(desc)
    article.appendChild(precio)

    catalogSection.appendChild(article)

    if (esEdicion === true) {
        productos_mostrarElementoEdicion(fruta, catalogSection, article)
    }
    else {
        article.addEventListener('click', () => {
            catalogSection.innerHTML = ''
            productos_mostrarElementoEdicion(fruta, catalogSection, article)
        })
    }
}

function productos_mostrarElementoEdicion(fruta, catalogSection, article) {
    const cantidad = document.createElement('input')
    const boton = document.createElement('button')

    cantidad.type = 'text'
    let pedidoActual = buscarPedido(fruta.nombre)
    if (pedidoActual) {
        cantidad.value = pedidoActual.cantidad
    }
    boton.textContent = 'Agregar'

    catalogSection.appendChild(article)
    catalogSection.appendChild(cantidad)
    catalogSection.appendChild(boton)

    boton.addEventListener('click', () => {
        if (pedidoActual) {
            pedidoActual.cantidad = cantidad.value
        }
        else {
            pedidos.push(new Pedido(fruta.nombre, fruta.precioKg, cantidad.value))
        }

        link_anchorWithHtmlPages({ target: { id: 'pedidos-page' } })
    })
}
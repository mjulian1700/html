function productos_initialLoad(objectoEdicion) {
    if (objectoEdicion) {
        const fruta = buscarFruta(objectoEdicion.nombreFruta)
        if (fruta) {
            productos_loadContenidoEdicion(fruta)
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
        const article = document.createElement('article')
        const subtitulo = document.createElement('h2')
        const imagen = document.createElement('img')
        const desc = document.createElement('p')
        const precio = document.createElement('p')

        subtitulo.textContent = item.nombre
        imagen.src = item.imgUri
        desc.textContent = item.descripcion
        precio.textContent = item.precioKg

        article.appendChild(subtitulo)
        article.appendChild(imagen)
        article.appendChild(desc)
        article.appendChild(precio)

        catalogSection.appendChild(article)

        article.addEventListener('click', () => {
            catalogSection.innerHTML = ''

            const cantidad = document.createElement('input')
            const boton = document.createElement('button')

            cantidad.type = 'text'
            pedidoActual = buscarPedido(item.nombre)
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
                    pedidos.push(new Pedido(item.nombre, item.precioKg, cantidad.value))
                }

                link_anchorWithHtmlPages({ target: { id: 'pedidos-page' } })
            })
        })
    }
}

function productos_loadStaticContent() {
    getHtmlContent('http://localhost:51321/api/frutas/obtener',
        'GET', null, productos_cargarProductos)
}

function productos_loadContenidoEdicion(fruta) {
    const catalogSection = document.getElementById('productos-catalogo-frutas')
    catalogSection.innerHTML = ''

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

    const cantidad = document.createElement('input')
    const boton = document.createElement('button')

    cantidad.type = 'text'
    pedidoActual = buscarPedido(fruta.nombre)
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
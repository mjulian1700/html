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
            productos_pintarFrutas()
        }
    }
    else {
        productos_loadStaticContent()
        productos_pintarFrutas()
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
                    item.imgUri, item.stockKg, item.latitude,
                    item.longitude, item.videoUri_1, item.videoUri_2,
                    item.videoUri_3))
            }
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

    const divMapa = document.createElement("div")
    divMapa.id = 'map'
    divMapa.style.width = "50%"
    divMapa.style.height = "200px"

    const divVideo = document.createElement("div")
    const video = document.createElement("video")
    video.id = "video-fruta"
    video.controls = true
    video.src = fruta.videoUri_1
    video.poster = fruta.imgUri
    video.width = "400"
    video.height = "200"

    const btnSiguiente = document.createElement("button")
    btnSiguiente.textContent = "Siguiente Video"
    btnSiguiente.addEventListener("click", () => {
        if (video.src.includes(fruta.videoUri_1.replace("..",""))) {
            video.src = fruta.videoUri_2
        }
        else if (video.src.includes(fruta.videoUri_2.replace("..", ""))) {
            video.src = fruta.videoUri_3
        }
        else {
            video.src = fruta.videoUri_1
        }
        
    })
    divVideo.appendChild(btnSiguiente)
    divVideo.appendChild(video)

    catalogSection.appendChild(article)
    catalogSection.appendChild(cantidad)
    catalogSection.appendChild(boton)
    catalogSection.appendChild(divMapa)
    catalogSection.appendChild(divVideo)

    initMap(fruta.latitude, fruta.longitude, divMapa, 7)

    boton.addEventListener('click', () => {
        if (pedidoActual) {
            pedidoActual.cantidad = parseFloat(cantidad.value)
            agregarElmentoLocalStorage(lsPedidosTemp, pedidos)
        }
        else {
            pedidos.push(new Pedido(fruta.nombre, parseFloat(fruta.precioKg), parseFloat(cantidad.value)))
            agregarElmentoLocalStorage(lsPedidosTemp, pedidos)
        }

        link_anchorWithHtmlPages({ target: { id: 'pedidos-page' } })
    })
}
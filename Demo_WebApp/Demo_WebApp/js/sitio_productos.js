class Fruta {
    #stockKg
    constructor(nombre, descripcion, precioKg, imgUri, stockKg) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precioKg = precioKg
        this.imgUri = imgUri
        this.#stockKg = stockKg
    }

    getStockKg() {
        console.log(this.#stockKg)
    }
}

const catalogoProductos = []

function productos_initialLoad() {
    productos_loadStaticContent()
}

function productos_loadStaticContent() {
    if (catalogoProductos.length == 0) {
        catalogoProductos.push(
            new Fruta(
                "Fresa",
                "Fresa deliciosa de Guanajuato",
                100.00,
                '../media/images/img_fresa.jpg',
                100
            ))

        catalogoProductos.push(
            new Fruta(
                "Mango",
                "Mango delicioso y petacón de Veracrúz",
                40.00,
                '../media/images/img_mango.jpg',
                400
            ))

        catalogoProductos.push(
            new Fruta(
                "Uva",
                "Uva verde deliciosa sin semilla de Baja California",
                80.00,
                '../media/images/img_uva.jpg',
                200
            ))

        catalogoProductos.push(
            new Fruta(
                "Melón",
                "Melón chino delicioso de Torreón Coahuila",
                20.00,
                '../media/images/img_melon.jpg',
                800
            ))

        catalogoProductos.push(
            new Fruta(
                "Pera",
                "Pera deliciosa para los chiles en nogada de Puebla",
                60.00,
                '../media/images/img_pera.jpg',
                1000
            ))
    }

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

                link_anchorWithHtmlPages('pedidos-page')
            })
        })
    }
}

function buscarPedido(nombreFruta) {
    for (pedido of pedidos) {
        if (pedido.fruta === nombreFruta) {
            return pedido
        }
    }
    return null
}
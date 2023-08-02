function pedidos_initialLoad() {
    pedidos_mostrarListado()
}

function pedidos_mostrarListado() {
    const section = document.querySelector('#pedidos-listado')
    const tabla = document.createElement('table')
    const filaEncabezado = document.createElement('tr')
    let total = 0

    section.innerHTML = ''

    let thEncabezado = document.createElement('th')
    thEncabezado.textContent = 'Nombre de la fruta'
    filaEncabezado.appendChild(thEncabezado)

    thEncabezado = document.createElement('th')
    thEncabezado.textContent = 'Cantidad kg.'
    filaEncabezado.appendChild(thEncabezado)

    thEncabezado = document.createElement('th')
    thEncabezado.textContent = 'Precio kg.'
    filaEncabezado.appendChild(thEncabezado)

    thEncabezado = document.createElement('th')
    thEncabezado.textContent = 'Subtotal'
    filaEncabezado.appendChild(thEncabezado)

    thEncabezado = document.createElement('th')
    thEncabezado.textContent = 'Acciones'
    filaEncabezado.appendChild(thEncabezado)

    tabla.appendChild(filaEncabezado)

    for (pedido of pedidos) {
        const fila = document.createElement('tr')
        let frutaSeleccionada = pedido

        thEncabezado = document.createElement('th')
        thEncabezado.textContent = pedido.fruta
        fila.appendChild(thEncabezado)

        let cantidadFormat = pedido.cantidad.toLocaleString('es-MX')
        thEncabezado = document.createElement('td')
        thEncabezado.textContent = cantidadFormat
        fila.appendChild(thEncabezado)

        let precioFormat = pedido.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
        thEncabezado = document.createElement('td')
        thEncabezado.textContent = precioFormat
        fila.appendChild(thEncabezado)

        let subtotal = parseFloat(pedido.precio) * parseFloat(pedido.cantidad)
        let subtotalFormat = subtotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
        thEncabezado = document.createElement('td')
        thEncabezado.textContent = subtotalFormat
        fila.appendChild(thEncabezado)

        thEncabezado = document.createElement('td')
        const editar = document.createElement('a')
        editar.href = '#'
        editar.textContent = 'Editar'
        editar.addEventListener('click', () => {
            link_anchorWithHtmlPages({ target: { id: 'productos-page' } }, { nombreFruta: frutaSeleccionada.fruta, esEdicion: true })
        })
        thEncabezado.appendChild(editar)

        const eliminar = document.createElement('a')
        eliminar.href = '#'
        eliminar.textContent = 'Eliminar'
        eliminar.addEventListener('click', () => {
            pedidos.splice(pedidos.indexOf(frutaSeleccionada), 1)
            pedidos_mostrarListado()
            agregarElmentoLocalStorage(lsPedidosTemp, pedidos)
        })
        thEncabezado.appendChild(eliminar)

        const agrear_1 = document.createElement('a')
        agrear_1.href = '#'
        agrear_1.textContent = 'Agregar 1'
        agrear_1.addEventListener('click', () => {
            frutaSeleccionada.cantidad += 1
            pedidos_mostrarListado()
            agregarElmentoLocalStorage(lsPedidosTemp, pedidos)
        })
        thEncabezado.appendChild(agrear_1)

        const quitar_1 = document.createElement('a')
        quitar_1.href = '#'
        quitar_1.textContent = 'Quitar 1'
        quitar_1.addEventListener('click', () => {
            frutaSeleccionada.cantidad -= 1
            if (frutaSeleccionada.cantidad == 0) {
                pedidos.splice(pedidos.indexOf(frutaSeleccionada), 1)
            }
            pedidos_mostrarListado()
            agregarElmentoLocalStorage(lsPedidosTemp, pedidos)
        })
        thEncabezado.appendChild(quitar_1)

        fila.appendChild(thEncabezado)
        tabla.appendChild(fila)

        total += subtotal
    }
    const filaPie = document.createElement('tr')

    thEncabezado = document.createElement('th')
    thEncabezado.textContent = 'Total'
    thEncabezado.colSpan = 3
    filaPie.appendChild(thEncabezado)

    let totalFormat = total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
    thEncabezado = document.createElement('th')
    thEncabezado.textContent = totalFormat
    filaPie.appendChild(thEncabezado)

    tabla.appendChild(filaPie)
    section.appendChild(tabla)
}
function pedidos_initialLoad() {
    pedidos_mostrarListado()
}

function pedidos_mostrarListado() {
    const section = document.querySelector('#pedidos-listado')
    const ulPedidos = document.createElement('ul')
    for (pedido of pedidos) {
        const liPedido = document.createElement('li')
        const aPedido = document.createElement('a')
        let frutaSeleccionada = pedido.fruta

        aPedido.href = '#'
        let precioFormat = pedido.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
        let cantidadFormat = pedido.cantidad.toLocaleString('es-MX')
        aPedido.textContent = `${pedido.fruta} - ${precioFormat} - ${cantidadFormat}`

        aPedido.addEventListener('click', () => {
            link_anchorWithHtmlPages({ target: { id: 'productos-page' } }, { nombreFruta: frutaSeleccionada, esEdicion: true })
        })

        liPedido.appendChild(aPedido)
        ulPedidos.appendChild(liPedido)
    }
    section.appendChild(ulPedidos)
}
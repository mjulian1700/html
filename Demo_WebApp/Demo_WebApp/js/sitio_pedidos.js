function pedidos_initialLoad() {
    pedidos_mostrarListado()
}

function pedidos_mostrarListado() {
    const section = document.querySelector('#pedidos-listado')
    const ulPedidos = document.createElement('ul')
    for (pedido of pedidos) {
        const liPedido = document.createElement('li')
        const aPedido = document.createElement('a')

        aPedido.href = '#'
        aPedido.textContent = `${pedido.fruta} - ${pedido.precio} - ${pedido.cantidad}`

        aPedido.addEventListener('click', () => {
            link_anchorWithHtmlPages({ target: { id: 'productos-page' } }, { nombreFruta: pedido.fruta, esEdicion: true })
        })

        liPedido.appendChild(aPedido)
        ulPedidos.appendChild(liPedido)
    }
    section.appendChild(ulPedidos)
}
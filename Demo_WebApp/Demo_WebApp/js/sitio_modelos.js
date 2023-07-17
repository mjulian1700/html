class Pedido {
    constructor(fruta, precio, cantidad) {
        this.fruta = fruta
        this.precio = precio
        this.cantidad = cantidad
    }
}

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
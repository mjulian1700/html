class Pedido {
    constructor(fruta, precio, cantidad) {
        this.fruta = fruta
        this.precio = precio
        this.cantidad = cantidad
    }
}

class Fruta {
    #stockKg
    constructor(nombre, descripcion, precioKg, imgUri, stockKg,
        latitude, longitude, videoUri_1, videoUri_2, videoUri_3) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precioKg = precioKg
        this.imgUri = imgUri
        this.latitude = latitude
        this.longitude = longitude
        this.videoUri_1 = videoUri_1
        this.videoUri_2 = videoUri_2
        this.videoUri_3 = videoUri_3
        this.#stockKg = stockKg
    }

    getStockKg() {
        console.log(this.#stockKg)
    }
}
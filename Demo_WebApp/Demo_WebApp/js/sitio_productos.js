function productos_initialLoad() {
    productos_loadStaticContent()
}

function productos_loadStaticContent() {
    let productos = [
        {
            nombre: "Fresa", descripcion: "Fresa deliciosa de Guanajuato",
            precioKg: 100.00, stockKg: 100
        },
        {
            nombre: "Mango", descripcion: "Mango delicioso y petacón de Veracrúz",
            precioKg: 40.00, stockKg: 400
        },
        {
            nombre: "Uva", descripcion: "Uva verde deliciosa sin semilla de Baja California",
            precioKg: 80.00, stockKg: 200
        },
        {
            nombre: "Melón", descripcion: "Melón chino delicioso de Torreón Coahuila",
            precioKg: 20.00, stockKg: 800
        }
    ]
}
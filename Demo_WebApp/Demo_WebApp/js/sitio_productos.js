function productos_initialLoad() {
    productos_loadStaticContent()
}

function productos_loadStaticContent() {
    let productos = [
        {
            nombre: "Fresa", descripcion: "Fresa deliciosa de Guanajuato",
            precioKg: 100.00, stockKg: 100,
            imgUri: '../media/images/img_fresa.jpg'
        },
        {
            nombre: "Mango", descripcion: "Mango delicioso y petacón de Veracrúz",
            precioKg: 40.00, stockKg: 400,
            imgUri: '../media/images/img_mango.jpg'
        },
        {
            nombre: "Uva", descripcion: "Uva verde deliciosa sin semilla de Baja California",
            precioKg: 80.00, stockKg: 200,
            imgUri: '../media/images/img_uva.jpg'
        },
        {
            nombre: "Melón", descripcion: "Melón chino delicioso de Torreón Coahuila",
            precioKg: 20.00, stockKg: 800,
            imgUri: '../media/images/img_melon.jpg'
        },
        {
            nombre: "Pera", descripcion: "Pera deliciosa para los chiles en nogada de Puebla",
            precioKg: 60.00, stockKg: 1000,
            imgUri: '../media/images/img_pera.jpg'
        }
    ]

    const catalogSection = document.getElementById('productos-catalogo-frutas')
    let articles = ''
    for (let item of productos) {
        articles += '<article>'
        articles += '<h2>' + item.nombre + '</h2>'
        articles += "<img src='" + item.imgUri + "'/>"
        articles += '<p>' + item.descripcion + '</p>'
        articles += '<p>$' + item.precioKg + '</p>'
        articles += '</article>'
    }
    catalogSection.innerHTML = articles
}
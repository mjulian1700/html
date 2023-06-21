//Indica que se debe usar el creador de variable var forsozamente
//"use strict"


var variable = 935;
console.log(variable)

variable = 'Hola Finanzas'
console.log(variable)

variable = true
console.log(variable)

console.clear();

//Esta variable global sin var marca error con "use strict"
variableGlobal = 'Esta es una variable global'
console.log(variableGlobal)

function variablesGlobales() {
    variableGlobal2 = 'Variable global dentro de la función'
}

variablesGlobales()
console.log(variableGlobal2)

function variablesGlobales_3() {
    var variableGlobal3 = 'Variable global dentro de la función'
}

variablesGlobales_3()
//Esta línea marca error devido a que variableGlobal3 no está definida
//console.log(variableGlobal3)

console.clear()

var saludar = 'Hola finanzas'
var contador = 3

if (contador < 4) {
    var saludar = 'Yo también digo hola'
}

console.log(saludar)

console.clear()

//uso de let
let saludar_2 = 'Hola Finanzas'
let contador_3 = 3

if (contador_3 < 4) {
    let saludar_2 = 'Yo también digo hola'
    console.log('Dentro de la función: ' + saludar_2)
}

console.log('Fuera de la función: ' + saludar_2)

//Estas líneas marcar error porque las variables ya fueron declaradas
//anteriormente
//let saludar = 'Hola de nuevo'
//let saludar_2 = 'Hola otra vez'

//uso de const
const saludoConstante = 'Hola Finanzas constante'
console.log(saludoConstante)

//Estas líneas marcan error debido a que una variable const debe
//ser inicializada en la declaración y ya no puede ser modificada
//saludoConstante = 'Hola nuevamente'
//console.log(saludoConstante)

//Estas líneas marcan error debido a que la variable const saludoConstante
//ya fue declarada anteriormente
//const saludoConstante = 'Hola nuevamente'
//console.log(saludoConstante)

function saludarconstante() {
    const saludoConstante = 'Hola Finanzas constante, dentro de la función'
    console.log(saludoConstante)
}

saludarconstante()
console.log(saludoConstante)

console.clear()
//Esto es conocido como un JSON (JavaScript Object Notation)
const saludarObj = {
    mensaje: 'Hola Finanzas desde objeto JS',
    contador: 0
}
console.log(saludarObj.contador)

saludarObj.contador = saludarObj.contador + 1
console.log(saludarObj.contador)

console.clear()

//Funciones basics
//Palabra reservada function
//Nombre de la función
//Parámetros
//Cuerpo de la función
//No tiene tipo de retorno, éste se especifica con return
function nombrefuncion() {
}

function sumar(x, y) {
    console.log('El resultado de la suma es: ' + (x + y))
}

sumar(2, 2)
sumar('Hola', 'Finanzas')

function sumar_v2(x, y) {
    return x + y
}

let resultado = sumar_v2(3, 3)
//Esta es una cadena interpolada o conocida en JS como Template String
console.log(`El resultado de la suma es: ${resultado}`)

//Ciclos
console.clear()
console.log("Ciclo for")
for (var i = 0; i < 5; i++) {
    console.log(i)
}

console.log('Ciclo while')
let contadorW = 0
while (contadorW < 5) {
    console.log(contadorW)
    contadorW += 1
}

console.log('Ciclo "do while"')
contadorW = 0
do {
    console.log(contadorW)
    contadorW += 1
} while (contadorW < 5);

//Sentencias de condición
console.clear()
console.log("Condición 'if'")

let a = true
let b = 1
let c = '1'

//Compara solo valores
console.log('==')
console.log(`Evaluación de ${a} == ${b}`)
if (a == b) {
    console.log('Verdadero')
}
else {
    console.log('Falso')
}

console.log(`Evaluación de ${a} == ${c}`)
if (a == c) {
    console.log('Verdadero')
}
else {
    console.log('Falso')
}

console.log(`Evaluación de ${b} == ${c}`)
if (b == c) {
    console.log('Verdadero')
}
else {
    console.log('Falso')
}

//=== compara valor y tipo de dato
console.log('===')
console.log(`Evaluación de ${a} === ${b}`)
if (a === b) {
    console.log('Verdadero')
}
else {
    console.log('Falso')
}

console.log(`Evaluación de ${a} === ${c}`)
if (a === c) {
    console.log('Verdadero')
}
else {
    console.log('Falso')
}

console.log(`Evaluación de ${b} === ${c}`)
if (b === c) {
    console.log('Verdadero')
}
else {
    console.log('Falso')
}

//switch
console.clear()
const fruta = 'fresa'
switch (fruta) {
    case 'fresa':
        console.log('Seleccionaste fresa: $100.00 kg')
        break
    case 'mango':
        console.log('Seleccionaste mango: $40.00 kg')
        break
    case 'pera':
        console.log('Seleccionaste pera: $60.00 kg')
        break
    default:
        console.log('Fruta no encontrada')
}

//Función del mercadito
function validarPrecio(fruta) {
    switch (fruta) {
        case 'fresa':
            console.log('Seleccionaste fresa: $100.00 kg')
            break
        case 'mango':
            console.log('Seleccionaste mango: $40.00 kg')
            break
        case 'pera':
            console.log('Seleccionaste pera: $60.00 kg')
            break
        default:
            console.log('Fruta no encontrada')
    }
}
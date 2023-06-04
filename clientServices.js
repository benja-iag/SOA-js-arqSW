const prompt = require("prompt-sync")({sigint: true})
const messageAndBits = (message) => {
    const size = message.length
    const bits = size >= 10 ? "000" : "0000"
    return bits + size.toString() + message
}
const validateDate = (date) => {
    const formatDateRegex= /^\d{2}\/\d{2}\/\d{4}$/;
    return formatDateRegex.test(date);
}
const validateHour = (hour) => {
    const formatHourRegex= /^([01]\d|2[0-3]):([0-5]\d)$/;
    return formatHourRegex.test(hour);
}
const login = (stream) => {
    console.log("Iniciar sesion")
    const mail = prompt("Ingrese su mail: ")
    const password = prompt("Ingrese su contraseña: ")
    const message = messageAndBits("benj1"  + mail + "|" + password)
    console.log(message)
    stream.write(message)
}
const register = (stream) => {
    console.log("Registrarse")
    const rut = prompt("Ingrese su rut: ")
    const mail = prompt("Ingrese su mail: ")
    const password = prompt("Ingrese su contraseña: ")
    const nombre = prompt("Ingrese su nombre: ")
    const apellido = prompt("Ingrese su apellido: ")
    const message = messageAndBits("benj2" + rut + "|" + mail + "|" + password + "|" + nombre + "|" + apellido)
    stream.write(message)
}
const registerDate = (stream) => {
    console.log("Calendario del dentista")
    const dentistMail= prompt("Ingrese mail del doctor: ")
    const clientMail = prompt("Ingrese su mail: ")
    const date = prompt("Ingrese la fecha de la cita en formato DD/MM/YYYY: ")
    if (!validateDate(date)) {
        console.log("Fecha invalida")
        console.log("Ingrese los datos nuevamente")
        registerDate(stream)
    }
    const hour = prompt("Ingrese la hora de la cita en formato HH:MM: ")
    if (!validateHour(hour)) {
        console.log("Hora invalida")
        console.log("Ingrese los datos nuevamente")
        registerDate(stream)
    }
    const message = messageAndBits("benj3" + dentistMail + "|" + clientMail + "|" + date)
    console.log(message)
    stream.write(message)
}
const services= [
    {
        name: 'Iniciar sesion',
        func: login
    },{
        name: "Registrarse",
        func:  register
    },
    {
        name: "Registrar cita",
        func: registerDate
    }
]
module.exports = services 
import prompt from "prompt-sync"
const input = prompt({ sigint: true })
import { services } from "../clientServices.js"

export const isValidOption = (option) => {
    if (isNaN(option)) return false
    if (option < 0 || option >= services.length) return false
    return true
}
export const validInput = (message, validate) => {
    const input = input(message)
    if (!validate(input)) {
        console.log("Dato invalido")
        console.log("Ingrese los datos nuevamente")
        return validInput(message, validate)
    }
    return input
}
export const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
}
export const validRut = (rut) => {
    const numbers = rut.slice(0, -1)
    const verificator = rut.slice(-1)
    const verificatorCalculated = calcularVerificador(numbers)
    return verificator === verificatorCalculated
}
export const validDate = (date) => {
    const formatDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return formatDateRegex.test(date);
}
export const validHour = (hour) => {
    const formatHourRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return formatHourRegex.test(hour);
}
function calcularVerificador(numero) {
    let sum = 0;
    let mul = 2;

    let i = numero.length;
    while (i--) {
        sum = sum + parseInt(numero.charAt(i)) * mul;
        if (mul % 7 === 0) {
            mul = 2;
        } else {
            mul++;
        }
    }

    const res = sum % 11;

    if (res === 0) {
        return '0';
    } else if (res === 1) {
        return 'k';
    }

    return `${11 - res}`;
};


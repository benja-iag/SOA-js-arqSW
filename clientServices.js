import prompt from "prompt-sync";
const input = prompt({ sigint: true });
import {
    validInput,
    validEmail,
    validRut,
    validDate,
    validHour,
} from "./verify/inputs.js";
const messageAndBits = (message) => {
    const size = message.length;
    const bits = size >= 10 ? "000" : "0000";
    return bits + size.toString() + message;
};

const login = (stream) => {
    console.log("Iniciar sesion");
    const mail = validInput("Ingrese su mail: ", validEmail);
    const password = input("Ingrese su contraseña: ");
    const message = messageAndBits("benj1" + mail + "|" + password);
    console.log("mensaje", message);
    stream.write(message);
};
const register = (stream) => {
    console.log("Registrarse");
    const rut = validInput("Ingrese su rut sin puntos ni guión: ", validRut);
    const mail = validInput("Ingrese su mail: ", validEmail);
    const password = input("Ingrese su contraseña: ");
    const nombre = input("Ingrese su nombre: ");
    const apellido = input("Ingrese su apellido: ");
    const message = messageAndBits(
        "benj2" +
            rut +
            "|" +
            mail +
            "|" +
            password +
            "|" +
            nombre +
            "|" +
            apellido
    );
    stream.write(message);
};
const registerDate = (stream) => {
    console.log("Calendario del dentista");
    const dentistMail = validInput(
        "Ingrese el mail del dentista: ",
        validEmail
    );
    const clientMail = validInput("Ingrese su mail: ", validEmail);
    const date = validInput(
        "Ingrese la fecha de la cita en formato DD/MM/YYYY: ",
        validHour
    );
    const hour = validInput(
        "Ingrese la hora de la cita en formato HH:MM: ",
        validHour
    );
    const message = messageAndBits(
        "benj3" + dentistMail + "|" + clientMail + "|" + date
    );
    console.log(message);
    stream.write(message);
};
export const services = [
    {
        name: "Iniciar sesion",
        func: login,
    },
    {
        name: "Registrarse",
        func: register,
    },
    {
        name: "Registrar cita",
        func: registerDate,
    },
];

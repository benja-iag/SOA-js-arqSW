import prompt from "prompt-sync";
const input = prompt({ sigint: true });
import {
  validInput,
  validEmail,
  validRut,
  validDate,
  validHour,
  validType,
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
    "benj2" + rut + "|" + mail + "|" + password + "|" + nombre + "|" + apellido
  );
  stream.write(message);
};
const registerDate = (stream) => {
  console.log("Calendario del dentista");
  //const dentistMail = validInput("Ingrese el mail del dentista: ", validEmail);
  //const clientMail = validInput("Ingrese su mail: ", validEmail);
  const RUTMed = validInput(
    "Ingrese el RUT del dentista sin puntos ni guión: ",
    validRut
  );
  const RUTPac = validInput("Ingrese su RUT sin puntos ni guión: ", validRut);
  const date = validInput(
    "Ingrese la fecha de la cita en formato DD/MM/YYYY: ",
    validHour
  );
  const hour = validInput(
    "Ingrese la hora de la cita en formato HH:MM: ",
    validHour
  );
  const message = messageAndBits(
    "benj4" + dentistMail + "|" + clientMail + "|" + date + "|" + hour
  );
  console.log(message);
  stream.write(message);
};
const getSchedule = (stream) => {
  console.log("Ingrese el RUT para ver su calendario: ");
  const rut = validInput("Ingrese su rut sin puntos ni guión: ", validRut);
  const message = messageAndBits("benj5" + rut);
  console.log(message);
  stream.write(message);
};
const getHistories = (stream) => {
  console.log("Ingrese el RUT para ver su historial: ");
  const rut = validInput("Ingrese rut sin puntos ni guión: ", validRut);
  const message = messageAndBits("benj6" + rut);
  console.log(message);
};
const addHistoryinput = (stream) => {
  console.log("Ingrese el RUT para agregar un procedimiento o tratamiento: ");
  const rut = validInput("Ingrese rut sin puntos ni guión: ", validRut);
  const fecha = validInput(
    "Ingrese la fecha del procedimiento o tratamiento en formato DD/MM/YYYY: ",
    validDate
  );
  const tipo = validInput(
    "Ingrese si el tipo es procedimiento(1) o tratamiento(2):",
    validType
  );
  const comentario = input(
    "Ingrese el comentario del procedimiento o tratamiento: "
  );
  const message = messageAndBits(
    "benj7" + rut + "|" + tipo + "|" + fecha + "|" + comentario
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
  {
    name: "Visualizar cita",
    func: getSchedule,
  },
  {
    name: "Ver historial medico",
    func: getHistories,
  },
  {
    name: "Agregar procedimiento o tratamiento a historial medico",
    func: addHistoryinput,
  },
];

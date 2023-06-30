import { makeLogin, validateRol } from "../database/user/auth.js";
import { messageAndBits } from "../utilService.js";
export const loginValidate = async (stream, email, password) => {
  // aca se consulta a la base de datos, si el usuario existe, se retorna true, si no, false
  const message = "benj8" + "1" + "|" + email + "|" + password;
  stream.write(messageAndBits(message));
  stream.once("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj1] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
};
export const registerValidate = async (
  stream,
  RUT,
  email,
  password,
  nombre,
  apellido,
  tipo
) => {
  let message =
    "benj8" +
    "2" +
    "|" +
    RUT +
    "|" +
    email +
    "|" +
    password +
    "|" +
    nombre +
    "|" +
    apellido +
    "|" +
    tipo;
  stream.write(messageAndBits(message));
  stream.once("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj2] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
};
export const validateRol = async (stream, RUT, tipo) => {
  // verificar si el rut tiene el rol que se le esta pidiendo
  const message = "benj8" + "3" + "|" + RUT + "|" + tipo;
  stream.write(messageAndBits(message));
  stream.onde("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj3] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
};

import { makeLogin, validateRol } from "./database/user/auth.js";
import { insertDate } from "./database/cita/insert.js";
import { insertUser } from "./database/user/insert.js";
import { getSchedule } from "./database/calendario/schedule.js";
import { getHistories } from "./database/historial/history.js";
import { insertHistory } from "./database/historial/insert.js";

export const servicesDB = [
  async (db, message) => {
    // login
    const RUT = message.split("|")[1];
    const password = message.split("|")[2];
    const response = await makeLogin(db, RUT, password);
    return response;
  },
  async (db, message) => {
    // register
    const RUT = message.split("|")[1];
    const email = message.split("|")[2];
    const password = message.split("|")[3];
    const nombre = message.split("|")[4];
    const apellido = message.split("|")[5];
    const tipo = message.split("|")[6];
    const response = await insertUser(
      db,
      RUT,
      email,
      password,
      nombre,
      apellido,
      tipo
    );
    return response;
  },
  async (db, message) => {
    // validate
    const RUT = message.split("|")[1];
    const tipo = message.split("|")[2];
    const response = await validateRol(db, RUT, tipo);
    return response;
  },
  async (db, message) => {
    // insert date
    const RUTMed = message.split("|")[1];
    const RUTPac = message.split("|")[2];
    const fecha = message.split("|")[3];
    const hora = message.split("|")[4];
    const response = await insertDate(db, RUTMed, RUTPac, fecha, hora);
    return response;
  },
  async (db, message) => {
    // get schedule 5
    const RUT = message.split("|")[1];
    const response = await getSchedule(db, RUT);
    return response;
  },
  async (db, message) => {
    // get histories 6
    const RUT = message.split("|")[1];
    const response = await getHistories(db, RUT);
    return response;
  },
  async (db, message) => {
    // add history 7
    const RUT = message.split("|")[1];
    const tipo = message.split("|")[2];
    const fecha = message.split("|")[3];
    const comentario = message.split("|")[4];
    const response = await insertHistory(db, RUT, tipo, fecha, comentario);
    return response;
  },
];

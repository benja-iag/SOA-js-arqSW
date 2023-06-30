export const getSchedule = async (RUT) => {
  const message = "benj8" + "5" + "|" + RUT;
  stream.write(messageAndBits(message));
  stream.once("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj5] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
};
export const addSchedule = (RUTMed, fecha, hora) => {
  // validar que el RUT tenga los permisos
  return true;
};
export const addDate = async (stream, RUTMed, RUTPac, fecha, hora) => {
  // validar que el RUT tenga los permisos del medico y que exista el paciente
  // validar que el medico tiene hora disponible en esa fecha
  const message =
    "benj8" + "4" + "|" + RUTMed + "|" + RUTPac + "|" + fecha + "|" + hora;
  stream.write(messageAndBits(message));
  stream.once("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj4] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
  return true;
};

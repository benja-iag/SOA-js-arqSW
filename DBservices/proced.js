export const addHistory = (RUT, tipo, fecha, comentario) => {
  // agregar a la base de datos
  return true;
};
export const getHistories = async (stream, RUT) => {
  // obtener todos los procedimientos de ese rut
  const message = "benj8" + "6" + "|" + RUT;
  stream.write(messageAndBits(message));
  stream.once("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj6] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
};
export const getHistory = async (RUT, tipo, fecha) => {
  // obtener un procedimiento de ese rut
  const message = "benj8" + "7" + "|" + RUT + "|" + tipo + "|" + fecha;
  stream.write(messageAndBits(message));
  stream.once("data", (data) => {
    const response = data.toString().substring(10);
    console.log(
      `[Services-benj7] \tData obtained from database service:`,
      data.toString()
    );
    return response;
  });
};

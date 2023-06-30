export const insertHistory = async (db, RUT, tipo, fecha, texto) => {
  await db.run(
    `INSERT INTO PROCEDIMIENTO_TRATAMIENTO(RUT, TIPO, FECHA, COMENTARIO)
            VLALUES (?, ?, ?, ?);`,
    [RUT, tipo, fecha, texto],
    (err) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: err,
          err,
        };
      }
      return {
        status: 200,
        message: "Historial creado correctamente",
        err: null,
      };
    }
  );
};

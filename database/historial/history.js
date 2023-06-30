export const getHistories = async (db, RUT) => {
  await db.all(
    `SELECT * FROM PROCEDIMIENTO_TRATAMIENTO WHERE RUT = ?`,
    [RUT],
    (err, row) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: "Error al obtener el historial",
          err,
        };
      }
      return {
        status: 200,
        message: row,
        err: null,
      };
    }
  );
};

export const getSchedule = async (db, RUT) => {
  await db.get(`SELECT * FROM CITA WHERE RUT = ?`, [RUT], (err, row) => {
    if (err) {
      console.log(err);
      return {
        status: 500,
        message: "Error al obtener el horario",
        err,
      };
    }
    return {
      status: 200,
      message: row,
      err: null,
    };
  });
};

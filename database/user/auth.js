export const validSession = async (db, RUT) => {
  await db.get(
    `SELECT TOKEN_SESSION FROM USER WHERE RUT = ?`,
    [RUT],
    (err, row) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: "Error al validar la sesión",
          err,
        };
      }
      if (row.TOKEN_SESSION == 1) {
        return {
          status: 200,
          message: "Sesión válida",
          err: null,
        };
      }
      return false;
    }
  );
};
export const makeLogin = async (db, RUT, password) => {
  await db.get(
    `SELECT PASSWORD, TOKEN_SESSION FROM USER WHERE RUT = ?`,
    [RUT],
    (err, row) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: "Error al validar la sesión",
          err,
        };
      }
      if (row.PASSWORD == password) {
        if (row.TOKEN_SESSION == 1) {
          return {
            status: 400,
            message: "Sesión ya iniciada",
            err: null,
          };
        }
        return {
          status: 200,
          message: "Sesión válida",
          err: null,
        };
      }
      return false;
    }
  );
};
export const validateRol = async (db, RUT, tipo) => {
  await db.get(
    `SELECT TIPO_USUARIO FROM USER WHERE RUT = ?`,
    [RUT],
    (err, row) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: "Error al validar la sesión",
          err,
        };
      }
      if (row.TIPO_USUARIO == tipo) {
        return {
          status: 200,
          message: "Rol válido",
          err: null,
        };
      }
      return {
        status: 401,
        message: "Rol inválido",
        err: null,
      };
    }
  );
};
export const userAvailable = async (db, RUT, email) => {
  await db.get(
    `SELECT RUT, EMAIL FROM USER WHERE RUT = ? OR EMAIL = ?`,
    [RUT, email],
    (err, row) => {
      if (err) {
        console.log(err);
        return {
          status: 500,
          message: "Error al validar la sesión",
          err,
        };
      }
      if (row.RUT == RUT) {
        return {
          status: 409,
          message: "RUT ya registrado",
          err: null,
        };
      }
      if (row.EMAIL == email) {
        return {
          status: 409,
          message: "Email ya registrado",
          err: null,
        };
      }
      return {
        status: 200,
        message: "Usuario disponible",
        err: null,
      };
    }
  );
};

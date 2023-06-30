export const insertUser = async (
  db,
  nombre,
  apellido,
  password,
  tipo_usuario,
  email,
  rut
) => {
    await db.run(
        `INSERT INTO USER(NOMBRE, APELLIDO, PASSWORD, TIPO_USUARIO, EMAIL, RUT, TOKEN_SESSION)
        VALUES (?, ?, ?, ?, ?, ?);`,
        [nombre, apellido, password, tipo_usuario, email, rut, 1],
        (err) => {
            if (err) {
                console.log(err);
                return {
                    status : 500,
                    message: err,
                    err
                }
            }
            return {
                status : 200,
                message: "Usuario creado correctamente",
                err: null
            }
        }
    )
};

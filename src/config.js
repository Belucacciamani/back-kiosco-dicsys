/**
 *  ESTO HICE CUANDO NO TENIA DB y lo borro también del archivo app,js
 * import {config} from "dotenv"

//declaramos el puerto
config(); //es el de dotenv
const app = {
  port: process.env.PORT || 3000, //lo declaro aca y lo uso en app.js en la configuración
};

export default app;*/

import {config} from "dotenv";
config(); //es el de dotenv
import {createPool} from "mysql2/promise";
//conexión con DB
const pool = createPool({
  port: process.env.PORT,
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
});

export default pool;

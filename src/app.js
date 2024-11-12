import express from "express";
// import config from "./config.js";
import clientes from "./modulos/categorias/ruta.js";
import productos from "./modulos/productos/rutas.js";

const app = express();

app.use(express.json()); //para leer todos los json q edito en las rutas

//configuración de puerto
/*app.set() es un método utilizado en Express.js para establecer configuraciones para la aplicación*/
app.set("port", 4000);

//ponemos la ruta q cree en módulos

app.use("/api/categorias", clientes);

app.use("/api/productos", productos);

export default app;

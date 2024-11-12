import express from "express";
import pool from "../../config.js";

const router = express.Router();

//listar categorías
/*

router.get("/", function (req, res) {
  método get
  res.send("Aquí se van a listar las categorías cuando este conectado a la DB");
});*/
router.get("/", async (req, res) => {
  try {
    const [result] = await pool.query("select * from categorias");
    res.send(result);
  } catch (error) {
    console.log("error al listar", error);
    res.status(404).send("error al listar categorías");
  }
});

//crear categorías
/* sin db:
router.post("/", function (req, res) {
  const body = req.body;
  res.json({
    mensaje: "Se creo la categoría con éxito",
    data: body,
  });
});*/

//con DB
router.post("/", async (req, res) => {
  try {
    const {nombre} = req.body;
    if (!nombre) {
      return res.status(400).send("Error: El campo 'nombre' es obligatorio");
    }
    const result = await pool.query(
      "insert  into categorias (nombre) values(?)",
      [nombre]
    );
    const newCategoryId = result.nombre;
    res.send(newCategoryId);
  } catch (error) {
    console.log("error al crear categorías", error);
    res.status(404).send("error al crear categorías");
  }
});

//actualizar cat
/* SIN DB:
router.put("/:id", asy (req, res) {
  const id = req.params.id; //(req.params.id) extrae el ID de la categoría a actualizar de los parámetros de la URL
  const body = req.body;
  res.json({
    mensaje: "Estoy actualizando la categoría",
    id,
    data: body,
  });
});*/

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {nombre} = req.body;
    if (!id || !nombre) {
      return res
        .status(400)
        .send("Error: El campo 'id'y 'nombre 'son obligatorios");
    }

    await pool.query(
      "UPDATE categorias SET nombre = ? WHERE id_categoria = ?",
      [nombre, id]
    );

    res.status(200).send("Categoría actualizada exitosamente");
  } catch (error) {
    console.log("error al actualizar categoría", error);
    res.status(404).send("error al actualizar categorías");
  }
});

//eliminar cat
/*
router.delete("/:id", function (req, res) {
  const {id} = req.params;

  res.json({
    mensaje: "Se elimino correctamente la categoría",
    id,
  });
});*/

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const result = await pool.query(
      "DELETE FROM productos WHERE id_categoria = ?",
      [id]
    );

    res.status(200).send("Producto eliminado exitosamente");
  } catch (error) {
    console.log("error al eliminar productos", error);
    res.status(404).send("error al actualizar productos");
  }
});

export default router;

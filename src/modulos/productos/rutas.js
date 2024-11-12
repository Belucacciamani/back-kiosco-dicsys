import express from "express";
import pool from "../../config.js";

const router = express.Router();

//listar productos

router.get("/", async (req, res) => {
  try {
    const [result] = await pool.query("select * from productos");
    res.send(result);
  } catch (error) {
    console.log("error al listar", error);
    res.status(404).send("error al listar productos");
  }
});

//CREAR PRODUCTO

router.post("/", async (req, res) => {
  try {
    const {nombre} = req.body;
    const {fecha_vencimiento} = req.body;
    const {id_categoria} = req.body;

    if ((!nombre, !fecha_vencimiento, !id_categoria)) {
      return res
        .status(400)
        .send(
          "Error: El campo 'nombre', 'fecha_vencimiento' y id_categoria son obligatorios"
        );
    }
    const result = await pool.query(
      "insert  into productos (nombre, fecha_vencimiento,  id_categoria) values(?,?,?) ",
      [nombre, fecha_vencimiento, id_categoria]
    );
    const newProductId = result.insertId;
    res.send(newProductId);
  } catch (error) {
    console.log("error al crear productos", error);
    res.status(404).send("error al crear productos");
  }
});

//actualizar producto

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {nombre, fecha_vencimiento, id_categoria, precio, stock} = req.body;

    if (!nombre || !fecha_vencimiento || !id_categoria) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    await pool.query(
      "update productos set nombre =?, fecha_vencimiento =?, id_categoria =?, precio =?, stock=? WHERE id_producto =?",
      [nombre, fecha_vencimiento, id_categoria, precio, stock, id]
    );

    res.json({
      message: "Producto actualizado con éxito",
    });
  } catch (error) {
    console.log("error al actualizar producto", error);
    res.status(404).send("error al actualizar producto");
  }
});

//eliminar productos

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;

    await pool.query("delete from productos where id_producto=?", [id]);

    res.json({
      message: "Producto eliminado con éxito",
      data: {id},
    });
  } catch (error) {
    console.log("Error al eliminar el producto", error);
    res.status(404).send("Error al eliminar el producto");
  }
});

export default router;

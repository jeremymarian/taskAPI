const Employes = require("../models/Employee.model");

module.exports = {
  create(data, res) {
    const newUser = Employes.build({
      name: data.name,
      category: data.category,
      check: data.check,
    });
    newUser
      .save()
      .then(() => {
        console.log("El usuario se guardó correctamente en la base de datos.");
        res
          .status(200)
          .json({
            success: "El usuario se guardó correctamente en la base de datos.",
          });
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error);
        res.status(500).json({ failed: "Error al guardar el usuario.", error });
      });
  },

  async obtainData(res) {
    try {
      const data = await Employes.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la informacion" });
    }
  },

  async selectData(data, res) {
    try {
      const selectedData = await Employes.findByPk(data);
      if (selectedData === null) {
        res.status(500).json({ error: "El usuario no existe" });
      } else {
        res.json(selectedData);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la informacion" });
    }
  },

  async modifyData(position, data, res) {
    try {
      const [numRowsUpdated, employee] = await Employes.update(data, {
        where: { position: position },
        returning: true,
      });

      if (numRowsUpdated === 0) {
        res.status(500).json({ error: "Error al modificar la informacion" });
      } else {
        const updatedEmployee = employee[0].get();
        res
          .status(200)
          .json({ success: "INFORMACION ACTUALIZADA", updatedEmployee });
      }
    } catch (error) {
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  },
  async deleteData(data, res) {
    try {
      const selectedData = await Employes.findByPk(data);
      if (selectedData === null) {
        res.status(500).json({ error: "El usuario no existe" });
      } else {
        await selectedData.destroy();
        res.status(200).json({success:"El usuario ha sido eliminado"})
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la informacion" });
    }
  },
 
};

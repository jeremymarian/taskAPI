var express = require("express");
var router = express.Router();
const tableController = require("../controllers/table.controller");

router.post("/see", function (req, res, next) {
  tableController.create(req.body,res);
});
router.get("/istrue", function (req, res, next) {
  tableController.obtainData(res);
});
router.get("/seldata", function (req, res, next) {
  const id = req.body.position;
  tableController.selectData(id, res);
});
router.patch("/modify/:id", function (req, res, next) {
  const position = req.params.id;
  const data = req.body;
  tableController.modifyData(position, data, res);
});
router.delete("/deldata", function (req, res, next) {
  const id = req.body.position;
  tableController.deleteData(id, res);
});


module.exports = router;

const router = require("express").Router();

const product = require("./controllers/productController");

router.get("/product", product.index);
router.get("/product/create", product.create);
router.get("/product/edit/:id", product.edit);
router.get("/product/:id", product.show);
router.post("/product", product.store);
router.delete("/product", product.destroy);
router.put("/product", product.update);

module.exports = router;

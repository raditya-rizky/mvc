const { Product } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        order: [["updatedAt", "DESC"]],
      });
      res.status(200).render("products/index", { allProducts });
    } catch (error) {
      console.log(error.message);
    }
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const idProducts = await Product.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).render("products/show", (data = idProducts.dataValues));
    } catch (error) {
      console.log(error.message);
    }
  },

  create: (req, res) => {
    res.render("products/create");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    try {
      const idProducts = await Product.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).render("products/edit", (data = idProducts.dataValues));
    } catch (error) {
      console.log(error.message);
    }
  },

  store: async (req, res) => {
    const {
      product_name,
      category,
      variant,
      description,
      price,
      stock,
      instock,
      seller,
    } = req.body;
    if (parseInt(stock) === 0 || variant.length === 0) {
      try {
        const createProduct = await Product.create({
          product_name,
          category,
          variant: "original",
          description,
          price,
          stock,
          instock: false,
          seller,
        });
        res.status(200).redirect("/product");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const createProduct = await Product.create({
          product_name,
          category,
          variant,
          description,
          price,
          stock,
          instock: true,
          seller,
        });
        res.status(200).redirect("/product");
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const idProducts = await Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).redirect("/product");
    } catch (error) {
      console.log(error.message);
    }
  },

  update: async (req, res) => {
    const {
      product_name,
      category,
      variant,
      description,
      price,
      stock,
      instock,
      seller,
    } = req.body;
    const { id } = req.body;
    const ID = id.toString();

    if (parseInt(stock) === 0) {
      try {
        const product = await Product.findOne({
          where: {
            id: parseInt(id),
          },
        });

        const editProduct = await Product.update(
          {
            product_name,
            category,
            variant,
            description,
            price,
            stock,
            instock: false,
            seller,
          },
          {
            where: {
              id: parseInt(id),
            },
          }
        );
        const editedProduct = await Product.findOne({
          where: {
            id: parseInt(id),
          },
        });
        res.status(201).redirect(`/product/${ID}`);
      } catch (error) {
        res.json(error.message);
      }
    } else {
      try {
        const product = await Product.findOne({
          where: {
            id: parseInt(id),
          },
        });

        const editProduct = await Product.update(
          {
            product_name,
            category,
            variant,
            description,
            price,
            stock,
            instock: true,
            seller,
          },
          {
            where: {
              id: parseInt(id),
            },
          }
        );
        const editedProduct = await Product.findOne({
          where: {
            id: parseInt(id),
          },
        });
        res.status(201).redirect(`/product/${ID}`);
      } catch (error) {
        res.json(error.message);
      }
    }
  },
};

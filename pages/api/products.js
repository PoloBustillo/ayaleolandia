/** @format */

let products = [
  {
    id: "1234ss13dkd242414s123",
    relatedProducts: ["21030213"],
    sku: "01001AAM",
    ranking: 5,
    tags: ["gatos", "animales", "otros"],
    categories: ["132134", "1234021"],
    createdOn: "01/24/2021",
    name: "Anillo de perlas",
    shortDescription: "<p>Anillo de perlas con una buena descripción</p>",
    description:
      "<h1>Una descripcion detallada</h1><p>Aqui va todo lo de el producto</p>",
    itemDetails: [
      {
        image: "/anillos/img1.png",
        size: null,
        color: null,
        price: 30,
        discount: 10,
        peso: 0.1,
        salePrice: 50,
        available: true,
        stock: 102,
      },
    ],
  },
  {
    id: "1234ss13dkd242414s124",
    sku: "01001AAM",
    ranking: 5,
    tags: ["gatos", "animales", "otros"],
    categories: ["132134", "1234021"],
    createdOn: "01/24/2021",
    name: "Anillo de perlas",
    shortDescription: "<p>Anillo de perlas con una buena descripción</p>",
    description:
      "<h1>Una descripcion detallada</h1><p>Aqui va todo lo de el producto</p>",
    itemDetails: [
      {
        image: "/anillos/img1.png",
        size: "9",
        color: null,
        price: 10,
        discount: 10,
        peso: 0.1,
        salePrice: 50,
        available: true,
        stock: 5,
      },
      {
        image: "/anillos/img1.png",
        size: "7",
        color: null,
        price: 15,
        discount: 10,
        peso: 0.1,
        salePrice: 50,
        available: true,
        stock: 10,
      },
      {
        image: "/anillos/img1.png",
        size: "5",
        color: null,
        price: 20,
        discount: 10,
        peso: 0.1,
        salePrice: 50,
        available: true,
        stock: 30,
      },
    ],
  },
];
export default function handler(req, res) {
  res.status(200).json(JSON.stringify(products));
}

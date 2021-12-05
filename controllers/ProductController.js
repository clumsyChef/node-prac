const Product = require("../models/ProductModel");

const { postData } = require("../utils");

const findProduct = async (req, res) => {
	try {
		const hasId = req.url.split("/")[3];
		const products = await Product.find(hasId);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(products));
	} catch (err) {
		console.log(err);
	}
};

const createProduct = async (req, res) => {
	try {
		const body = await postData(req);
		const { title, description, price } = JSON.parse(body);
		const product = {
			title,
			description,
			price,
		};
		const finalData = await Product.create(product);
		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify(finalData));
	} catch (err) {
		console.log(err);
	}
};

const updateProduct = async (req, res) => {
	try {
		const hasId = req.url.split("/")[3];
		if (!hasId) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "What to update ?" }));
		}
		const productToUpdate = await Product.find(hasId);
		const body = await postData(req);
		const { title, description, price } = JSON.parse(body);
		const product = {
			id: productToUpdate.id,
			title: title || productToUpdate.title,
			description: description || productToUpdate.description,
			price: price || productToUpdate.price,
		};
		const finalData = await Product.update(hasId, product);
		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify(finalData));
	} catch (error) {
		console.log(error);
	}
};

const removeProduct = async (req, res) => {
	try {
		const hasId = req.url.split("/")[3];
		if (!hasId) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Nothing to delete." }));
		}
		const remainingProducts = await Product.remove(hasId);
		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify(remainingProducts));
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	findProduct,
	createProduct,
	updateProduct,
	removeProduct,
};

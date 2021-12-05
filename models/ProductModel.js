const products = require("../data/products.json");
const { writeToFile } = require("../utils");
const { v4: uuidv4 } = require("uuid");

const find = async (id) => {
	return new Promise((resolve, reject) => {
		let requiredProducts = id ? products.find((p) => p.id === id) : products;
		resolve(requiredProducts);
	});
};

const create = async (data) => {
	return new Promise((resolve, reject) => {
		const dataToAdd = { id: uuidv4(), ...data };
		let finalData = products;
		finalData.push(dataToAdd);
		writeToFile("./data/products.json", finalData);
		resolve(finalData);
	});
};

const update = async (id, data) => {
	return new Promise((resolve, reject) => {
		const finalData = products.map((p) => (p.id === id ? data : p));
		writeToFile("./data/products.json", finalData);
		resolve(finalData);
	});
};

const remove = async (id) => {
	return new Promise((resolve, reject) => {
		const finalData = products.filter((p) => p.id !== id);
		writeToFile("./data/products.json", finalData);
		resolve(finalData);
	});
};

module.exports = {
	find,
	create,
	update,
	remove,
};

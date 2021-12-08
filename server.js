const http = require("http");
const path = require("path");
const fs = require("fs");

const { findProduct, createProduct, updateProduct, removeProduct } = require("./controllers/ProductController");

const PORT = process.env.PORT || 3000;

fs.readFile(path.join(__dirname, "frontend", "index.html"), (err, html) => {
	if (err) {
		throw err;
	}

	const server = http.createServer((req, res) => {
		if (req.url.match(/\/api\/products(\/[0-9]+)?/) && req.method === "GET") {
			findProduct(req, res);
		} else if (req.url.match(/\/api\/products\/?$/) && req.method === "POST") {
			createProduct(req, res);
		} else if (req.url.match(/\/api\/products(\/[0-9]+)/) && req.method === "PUT") {
			updateProduct(req, res);
		} else if (req.url.match(/\/api\/products(\/[0-9]+)/) && req.method === "DELETE") {
			removeProduct(req, res);
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Not Fucking Found" }));
		}
	});

	server.listen(PORT, () => {
		console.log(`Server sun raha hai port number ${PORT} pe.`);
	});
});

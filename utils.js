const fs = require("fs");

const writeToFile = async (fileName, data) => {
	fs.writeFileSync(fileName, JSON.stringify(data), "utf8", (err) => {
		if (err) console.log(err);
	});
};

const postData = async (req) => {
	return new Promise((resolve, reject) => {
		try {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});
			req.on("end", () => {
				resolve(body);
			});
		} catch (err) {
			console.log(err);
			reject(err);
		}
	});
};

module.exports = {
	writeToFile,
	postData,
};

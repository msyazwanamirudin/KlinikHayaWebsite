const crypto = require("crypto");
console.log(crypto.createHash("sha256").update("Admin2024!").digest("hex"));

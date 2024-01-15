const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "zolimar",
    api_key: "827942386824663",
    api_secret: "H7Johj9ti8YucqGQhJb1k8ddLGY"
});

module.exports = {cloudinary}
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image, folder, name) => {
    return await cloudinary.uploader.upload(image, {
        upload_preset: 'ml_default',
        folder: `tatue-se/${folder}`,
        public_id: name
    });
};

module.exports = { uploadImage };

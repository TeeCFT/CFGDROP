const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    if (!body.data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No file data provided" }),
      };
    }

    const uploadRes = await cloudinary.uploader.upload(body.data, {
      resource_type: "auto",
      folder: "cfgdrop",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: uploadRes.secure_url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

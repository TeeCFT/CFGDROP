import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const handler = async (event) => {
  try {
    const file = JSON.parse(event.body);

    const uploadRes = await cloudinary.v2.uploader.upload(file.data, {
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

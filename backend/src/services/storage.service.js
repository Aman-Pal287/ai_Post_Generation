var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, filename) {
  const response = imagekit.upload({
    file: file, //required
    fileName: filename, //required
    folder: "cohort-ai-post-generation",
  });
  return response;
}

module.exports = uploadFile;

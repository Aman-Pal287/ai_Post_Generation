const postModel = require("../model/post.model");
const generateCaption = require("../services/ai.service");
const { v4: uuidv4 } = require("uuid");
const uploadFile = require("../services/storage.service");

async function postController(req, res) {
  const file = req.file;

  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");

  const caption = await generateCaption(base64ImageFile);

  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Post created succesfully",
    post,
  });
}

module.exports = postController;

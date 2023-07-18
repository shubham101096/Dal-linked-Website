const SuccessStory = require("./../models/successStory");

exports.getAllSuccessStories = async (req, res) => {
  try {
    const successStories = await SuccessStory.find();
    res.status(200).json({
      success: true,
      data: successStories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to get all the success stories",
    });
  }
};

exports.createSuccessStory = async (req, res) => {
  //validate the data
  try {
    const newSuccessStory = await SuccessStory.create(req.body);
    res.status(201).json({
      success: true,
      data: newSuccessStory,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create a new SuccessStory.",
    });
  }
};

exports.updateSuccessStory = async (req, res) => {
  // for the post get the details
  const successStory = await SuccessStory.findOne({ _id: req.params.id })
    .then((ss) => console.log(ss))
    .catch((error) => {
      console.log(error);
    });

  if (successStory) {
    successStory.likes.push(req.body.userId);
    const userUpdated = await User.findByIdAndUpdate(
      successStory.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    const finalSuccessStory = await SuccessStory.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      count: finalSuccessStory.likes.length,
    });
  }
};
exports.deleteSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete the document.",
    });
  }
};

/* MADE BY PIYUSH AKOLIYA */

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
  let successStory;
  await SuccessStory.findOne({ _id: req.params.id })
    .then((ss) => (successStory = ss))
    .catch((error) => {
      console.log(error);
    });

  if (successStory) {
    successStory.likes.push(req.body.userId);
    await SuccessStory.findByIdAndUpdate(successStory.id, successStory, {
      new: true,
      runValidators: true,
    });
    const finalSuccessStory = await SuccessStory.findOne({
      _id: req.params.id,
    });
    res.status(200).json({
      likes: finalSuccessStory.likes,
    });
  }
};

exports.updateSuccessStoryRemoveLike = async (req, res) => {
  try {
    const successStory = await SuccessStory.findOne({ _id: req.params.id });

    if (successStory) {
      // Removing the userId from the likes array
      const index = successStory.likes.indexOf(req.body.userId);
      if (index !== -1) {
        successStory.likes.splice(index, 1);
      }

      // Saving the updated success story
      await successStory.save();

      res.status(200).json({
        likes: successStory.likes,
      });
    } else {
      res.status(404).json({ error: "Success story not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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

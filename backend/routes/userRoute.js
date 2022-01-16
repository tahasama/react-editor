const User = require("../models/User");
const router = require("express").Router();

// create a project
router.post("/", async (req, res) => {
  const newProject = new User(req.body);
  console.log("newUUUUUUSER", newProject);
  try {
    const saveProject = await newProject.save();
    console.log("saveProjectTTTTTTT", saveProject);
    res.status(200).json(saveProject);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// get project by uid
router.get("/:uid", async (req, res) => {
  try {
    console.log(req.params.uid);
    const user = await User.find({
      uid: { $regex: req.params.uid, $options: "i" },
    });
    console.log("aaaaand the user iiiiis : ", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get projects search by title and desription
// router.get("/search/q=:value", async (req, res) => {
//   try {
//     const { value } = req.params;
//     console.log("value", value);
//     // const project = await Project.find({
//     //   title: { $regex: title, $options: "i" },
//     // });
//     const project = await User.find({
//       $or: [{ email: { $regex: value, $options: "i" } }],
//     });

//     console.log("project", project);
//     res.status(200).json(project);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// update project
router.put("/:uid", async (req, res) => {
  console.log("before", req.body);
  console.log("before2", req.params.uid);
  try {
    const updateProject = await User.findOneAndUpdate(
      // { uid: { $regex: req.params.uid, $options: "i" } },
      req.params.uid,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProject);
    console.log("after", updateProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

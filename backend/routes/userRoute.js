const User = require("../models/User");
const router = require("express").Router();

// create a project
router.post("/", async (req, res) => {
  const newProject = new User(req.body);
  const UserExists = User.findOne(
    { uid: req.body.uid },
    async (error, result) => {
      if (!error) {
        if (!result) {
          try {
            const saveProject = await newProject.save();
            res.status(200).json(saveProject);
          } catch (err) {
            res.status(500).json(err);
          }
        }
      }
    }
  );

  if (!UserExists) {
  }
});

// get project by uid
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.find({
      uid: { $regex: req.params.uid, $options: "i" },
    });
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
router.put("/:id", async (req, res) => {
  console.log("id...", req.params.id);
  console.log("body...", req.body);

  try {
    const updateProject = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

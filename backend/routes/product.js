const Project = require("../models/Project");
const router = require("express").Router();

// get all projects
router.get("/all/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    let projects;
    projects = await Project.find({ uid: { $regex: uid, $options: "i" } });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a project
router.post("/", async (req, res) => {
  console.log("whoahh....", req.body);
  const newProject = new Project(req.body);

  try {
    const saveProject = await newProject.save();

    res.status(200).json(saveProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get projects search by title and desription
router.get("/search/q=:value", async (req, res) => {
  try {
    const { value } = req.params;
    // const project = await Project.find({
    //   title: { $regex: title, $options: "i" },
    // });
    const project = await Project.find({
      $or: [
        { title: { $regex: value, $options: "i" } },
        { description: { $regex: value, $options: "i" } },
        { email: { $regex: value, $options: "i" } },
      ],
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update project
router.put("/:id", async (req, res) => {
  try {
    const updateProject = await Project.findByIdAndUpdate(
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
router.put("/star/:id", async (req, res) => {
  try {
    const updateProject = await Project.findByIdAndUpdate(
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

//delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    try {
      await project.delete();
      res.status(200).json("Post has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

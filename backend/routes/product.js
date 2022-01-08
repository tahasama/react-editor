const Project = require("../models/Project");
const router = require("express").Router();

// get all projects
router.get("/", async (req, res) => {
  try {
    let projects;
    projects = await Project.find({});
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a project
router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const saveProject = await newProject.save();

    res.status(200).json(saveProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/q=:title", async (req, res) => {
  try {
    const { title } = req.params;
    const project = await Project.find({
      title: { $regex: title, $options: "i" },
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update project
router.put("/:id", async (req, res) => {
  console.log("before", req.body);
  try {
    const updateProject = await Project.findByIdAndUpdate(
      req.params.id,
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

//DELETE POST
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

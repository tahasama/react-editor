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
  console.log("newProject", newProject);
  try {
    const saveProject = await newProject.save();
    res.status(200).json(saveProject);
  } catch (err) {
    // res.status(500).json(err);
    res.send({ message: "project's name can't be more than 50 caratcters" });
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
    console.log("naaaaaaaaa", title);
    const project = await Project.find({
      title: { $regex: title, $options: "i" },
    });
    console.log("seeeeearch sdfsdfsdfd", project);

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
  console.log("aaaaaaaaaaaaaaaaaaaaa", req.params.id);
  console.log("xxxxxxxxxxxxxxxxxx", req.body);
  try {
    const updateProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProject);
    console.log("vvvvvvvvvvvvvvvvvvvvvvvv", updateProject);
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

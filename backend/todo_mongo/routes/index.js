var express = require('express');
var app = express();
var cors = require('cors');
var router = express.Router();
// let dbConnection = require('../config/mongo');
let postModal = require('../modal/postModal');
app.use(cors());

// add a task 
router.post('/add', async (req, res) => {
  const { task } = req.body;
  try {
    const newPost = await postModal.create({ task });
    console.log('newPost', newPost);
    let findTask = await postModal.find();
    let removeId;
    console.log('findTask', findTask.map((data) => {
      if(newPost.task == data.task){
        removeId = data._id;
      }
      else {
        return "no";
      }
      // return data.task;
    }));
    const deletePost = await postModal.findByIdAndDelete({_id:removeId });
    console.log('deletePost',deletePost);
    res.json(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get the all task details
router.get('/get-list', async (req, res) => {
  try {
    const getPost = await postModal.find();
    res.json(getPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get particular task 
router.get('/get-task/:id', async (req, res) => {
  let { id } = req.params;
  try {
    const getPost = await postModal.findById(id);
    res.json(getPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update the task using id
router.put('/edit-task/:id', async (req, res) => {
  let { id } = req.params;
  // let { task } = req.body;
  try {
    const updatePost = await postModal.findByIdAndUpdate({ _id: id }, { done: true });
    res.json(updatePost);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete the task using Id
router.delete('/delete-task/:id', async (req, res) => {
  let { id } = req.params;
  try {
    const deletePost = await postModal.findByIdAndDelete({ _id: id });
    res.json(deletePost);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

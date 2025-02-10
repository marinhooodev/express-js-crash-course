import express from "express";
import { title } from "process";

const router = express.Router();

var posts = [
    { id: 1, title: "Post One" },
    { id: 2, title: "Post Two" },
    { id: 3, title: "Post Three" },
    { id: 4, title: "Post Four" },
];



// GET all posts
router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit);

    if (isNaN(limit) || limit < 0) return res.status(200).json(posts);

    res.status(200).json(posts.slice(0, limit));
});

// GET single post
router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let post = posts.find((post) => post.id === id);

    if(isNaN(id)) {
        return res.status(400).json({message:'Invalid ID!'})
    }

    res.status(200).json(post);
});

// Create new post
router.post("/", (req, res) => {
    const body = req.body;

    if (!body.title) {
        res.status(400).json({ message: "Title not found" });
    }

    const newPost = {
        id: posts.length + 1,
        title: body.title,
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// Update post
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)

    if(!post) {
        return res.status(400).json({message: `A post with the id of ${id} was not found`})
    }

    post.title = req.body.title
    res.status(200).json(post)
})

// DELETE post
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)

    if(!post) {
        return res.status(400).json({message: `A post with the id of ${id} was not found`})
    }

   posts = posts.filter((post) => post.id !== id)
    res.status(200).json({posts})
})

export default router;

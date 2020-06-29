const express = require('express');
const router = express.Router();
const { Blog } = require("../models/Blog");

const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");


router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        console.log(err);
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createPost", (req, res) => {
    let blog = new Blog({ content: req.body.content, title: req.body.title,type:req.body.type });

    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })

});


router.get("/getBlogs", (req, res) => {
    Blog.find()
        .populate("writer")
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
});

router.post("/getPost", (req, res) => {
    console.log(req.body)
    Blog.findOne({ "_id": req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});

router.delete('/getBlogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
            console.log('deletesuccessfully')
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/getBlogs/:id/:index', (req, res) => {
    Blog.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/getBlogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

var users = [
    { title: "User1", email: "user1@gmail.com" },
    { title: "User2", email: "user2@gmail.com" }
];

router.get('/test/getBlogs/search', (req, res) => {
    // search and return here
    var name_search = req.query.title // lấy giá trị của key name trong query parameters gửi lên

    Blog.find()
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            else {
                // res.status(200).json({ success: true, blogs });
                var result = blogs.filter((blog) => {
                    return blog.title.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
                })
                res.send(result)
            }
        });

})

router.put('/getBlogs/:id', (req, res) => {

    var updateRecord = {
        content: req.body.content,
        title: req.body.title
    }

    Blog.findByIdAndUpdate(req.params.id, { $set: updateRecord }, { new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})


router.delete('/',(req, res) => {
    Blog.remove((err, docs) => {
        if (!err) {
            console.log('deletesuccessfully')
        } else {
            console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})
module.exports = router;

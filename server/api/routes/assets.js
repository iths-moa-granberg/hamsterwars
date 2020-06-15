const { Router } = require('express');
const { bucket } = require('../firebase');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const router = new Router();
router.use(fileUpload());

// get image by filename
router.get('/:filename', async (req, res) => {
    try {
        const imgObj = await bucket.file(`hamsters/${req.params.filename}`).download();
        const img = imgObj[0];
        res.status(200).contentType('jpeg').send(img);
    } catch (err) {
        res.status(500).send(err);
    }
});

// add new image
router.post('/', async (req, res) => {
    try {
        const imgName = req.files.photo.name;
        const path = `./server/api/uploads/${imgName}`;

        await req.files.photo.mv(path, err => { if (err) throw err; });

        await bucket.upload(path, { destination: `hamsters/${imgName}` });

        fs.unlink(path, err => { if (err) throw err });

        res.send({ msg: `hamsterpic ${imgName} is uploaded` });

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
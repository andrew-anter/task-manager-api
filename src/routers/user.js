const express = require('express');
const multer = require('multer');
const sharp = require('sharp')
const router = new express.Router();
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');

const User = require('../models/user');
const auth = require('../middleware/authentication')


router.post('/users', async (req, res) => {
    const user =  new User(req.body);
    
    try { 
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user , token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});

    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth , async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (token) =>  token.token !== req.token );
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
        
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth , async (req, res) => {
    res.send(req.user);
});

// update user profile 
router.patch('/users/me' , auth, async (req, res) => {
    const updates = Object.keys(req.body);    
    const allowedUpdateArray = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every( (update) => allowedUpdateArray.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'});
    }

    try {
        updates.forEach( (update) => req.user[update] = req.body[update] ); 
        req.user.save(); 

        res.send(req.user);
    } catch(e){
        res.status(400).send(e);
    }
});

//delete user profile
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name);
        res.send(req.user);

    } catch (e) {
        res.status(500).send(e);
    }
});

// upload user avatar

const upload = multer({
    limits: { 
        fileSize: 1e6 
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|JPG|png|PNG|JPEG|jpeg)/)){
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
})

// creating an avatar picture and updating it
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
     
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
} );

// deleting an avatar picture
router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
});

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch(e){
        res.status(400).send();
    }
})






module.exports = router;
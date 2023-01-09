const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware');
const router = new Router();
const fileService = require('../services/fileService');
const File = require('../models/File');
router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password length should be between 3 and 12').isLength({min: 3, max: 12}),
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Incorrect request", errors});
        }
        const {email, password} = req.body;
        const client = await User.findOne({email});
        if(client){
            return res.status(400).json({message: `User ${email} already exists`});
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const user = new User({email, password: hashPassword});
        await user.save();
        await fileService.createDir(req, new File({user: user.id, name: ''}));
        return res.json({message: 'User created'});
    } catch (err){
        console.error(err);
        res.send({message: "Server error"});
    }
})

router.post('/login',
    async (req, res) => {
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }
            const isValidPas = bcrypt.compareSync(password, user.password);
            if(!isValidPas){
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = jwt.sign({id: user.id}, config.get("jwtKey"), {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (err){
            console.error(err);
            res.send({message: "Server error"});
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try{
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("jwtKey"), {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (err){
            console.error(err);
            res.send({message: "Server error"});
        }
    })
module.exports = router;
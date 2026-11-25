let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Menu = require('../models/menu');

router.get('/',async(req,res,next) => {
    try {
        const Menuitems = await Menu.find();
        res.render('Menu/items', { 
            title:'Menu',
            Menuitems:Menuitems 
        })
    }
    catch (err) {
        console.log(err);
        res.render('Menu/items', {
            error:'Error on server'
        })
    }
})

router.get('/add',async(req,res,next)=>{
    try {
        res.render('Menu/add', {
            title: 'Add book to Database'
        })
    }
    catch (err){
        console.log(err);
        res.render('Menu/table',{
            error:'Error on Server'
        })
    }
});

router.post('/add',async(req,res,next) => {
    try {
        let newMenu = Menu({
            "name":req.body.name,
            "side":req.body.side,
            "drink":req.body.drink,
            "sauce":req.body.sauce,
            "price":req.body.price,
        });
        Menu.create(newMenu).then(() => {
            res.redirect('/')
        });
    }
    catch (err) {
        console.log(err);
        res.render('Menu/items',{
            error:'Error on Server'
        })
    }
});

router.get('/edit/:id', async(req,res,next) => {
    try {
        const id = req.params.id;
        const dataToEdit = await Menu.findById(id);
        res.render('Menu/edit', {
            title:'Edit menu data',
            Menu: dataToEdit
        })
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id', async(req,res,next) => {
    try {
        let id = req.params.id;
        const updateData = await Menu({
            "_id":id,
            "name":req.body.title,
            "side":req.body.side,
            "drink":req.body.drink,
            "sauce":req.body.sauce,
            "price":req.body.price,
        })
        Menu.findByIdAndUpdate(id,updateData).then(()=> {
            res.redirect('/')
        })
    } 
    catch (err) {
        console.error(err);
        res.render('Books/table',{
            error:'Error on Server'
        })
    }
});

router.get('/delete/:id', async(req,res,next) => {
    try {
        const id = req.params.id;
        Menu.deleteOne({_id:id}).then(() => {
            res.redirect('/')
        })
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;

const express = require('express');
const { Router } = express;
const routerViews = new Router();
const productManager = require('../models/productManager')

const product = new productManager;


routerViews.get('/', async (req, res)=>{
    try{
        const products = await product.getProductsFs()

        res.render('home', { products });
    }
    catch(err){
        console.log(err);
    }
  })

  routerViews.get('/realtimeproducts' , async (req , res) => {
    try{
      res.render("realtimeProducts" , {})


    }
    catch(err){

    }
  })

  module.exports = routerViews;
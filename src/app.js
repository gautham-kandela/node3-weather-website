const path = require('path');
const express = require("express");
const hbs = require('hbs');
const { query } = require('express');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirecrotyPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirecrotyPath));

// Load utilities
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            });
        });
    });
});

// app.get('/products',(req, res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term.'
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });

app.get('/',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Gautham Kandela'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'Manu Ginobili - the legend',
        name: 'Gautham Kandela'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'This is the help page.',
        title:'Help',
        name: 'Gautham Kandela'
    })
});

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title:'Help',
        name: 'Gautham Kandela',
        errorMessage:'Help article not found.'
    })
});


app.get('*',(req, res)=>{
    res.render('404', {
        title:'Help',
        name: 'Gautham Kandela',
        errorMessage:'Page not found.'
    })
})


// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help',(req, res)=>{
//     res.send([
//     {
//         name: 'Andrew',
//         age: 27
//     },
//     {
//         name: 'Gautham',
//         age: 25
//     },
//     ]);
// })

app.get('/weather',(req, res)=>{
    res.send({
        forecast: 'It is snowing',
        location: 'Boston'
    });
});

app.listen(port, ()=>{
    console.log('Server is up on port', port);
});

console.log('Client side javascript is loaded.');

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data) => {
        console.log(data);
    });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    console.log('location===',location)
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            }else{
                console.log(data.location);
                messageOne.textContent = data.location;
                console.log(data.forecast.weather_descriptions);
                console.log(data.forecast.precip);
                messageTwo.textContent = data.forecast;
            }
            
        });
    });
});
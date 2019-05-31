const fs = require('fs'); //usually name the variables the same as their library
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((request, response) => {
    
    const pathName = url.parse(request.url, true).pathname;
    const id = url.parse(request.url, true).query.id;
    
    //products overview
    if(pathName === '/products' || pathName === '/') {
        response.writeHead(200, { 'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map(current => replaceTemplate(data, current)).join('');
                overviewOutput = overviewOutput.replace(`{%CARDS%}`, cardsOutput);
                
                response.end(overviewOutput);
            });
        });
    }
    //laptop detail
    else if(pathName === '/laptop' && id < laptopData.length){
        response.writeHead(200, { 'Content-type': 'text/html'});

        //callback function gives us access to the async data return
        //through the "data" parameter
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            response.end(output);
        });
        
    }
    //IMAGES
    else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.end(data);
        });
    }
    //url not found
    else{
        
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now.');
});

function replaceTemplate(originalHtml, laptop){
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
};

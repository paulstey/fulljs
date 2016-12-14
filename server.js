// Using express
import config from './config.js';
import apiRouter from './api'
import sassMiddleware from 'node-sass-middleware';      // to use Sass CSS (.scss) files
import path from 'path';
import serverRender from './serverRender.js';
import express from 'express';

const server = express();

// used for using Sass CSS
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

server.set('veiw engine', 'ejs');


// adding "routes"
server.get(['/', '/contest/:contestId'], (req, res) => {

    // serverRender() returns a promise
    serverRender(req.params.contestId)
        .then(({initialMarkup, initialData}) => {
            res.render('index.ejs', {
                // second arguement to render() is an object with
                // properties, which we can pass to EJS
                initialMarkup,
                initialData
            });
        })
        .catch(console.error);


});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});


// import fs from 'fs';              // serve static content in old way
// // Adding another "route"
// // This is the primitive way to serve static content;
// // The modern way uses express.static()
// server.get('/about.html', (req, res) => {
//     fs.readFile('./about.html', (err, data) => {
//         res.send(data.toString());
//     });
// });



//// Using http module:
// import http from 'http';
//
// const server = http.createServer();
// server.listen(8080);
//
// server.on('request', (req, res) => {
//     res.write('Hello http!\n');
//     setTimeout(() => {
//         res.write('I can stream!\n');
//         res.end();
//     }, 3000);
// });

// https.get('https://www.lynda.com', res => {
//     console.log('Response status code: ', res.statusCode);
//
//     res.on('data', chunk => {
//         console.log(chunk.toString());
//     });
// });

//// Using more modern import syntax with deconstruction
//// syntax to get the non-default variables
// import config, {nodeEnv, logStars} from './config.js';
// console.log(config, nodeEnv);
//
// logStars('my_function');

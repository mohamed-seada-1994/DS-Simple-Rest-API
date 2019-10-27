import express, { json, urlencoded, Router } from 'express';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'express-jwt';

import products from './products';
import users from './users';
import auth from './auth';

import responseFormater from './util/response.formater';

export default  function app(port, secret, dbAdapter, publicDir) {
    const server = express();

    // Host the public folder if configured
    if(publicDir){
        // Host the public folder
        server.use('/', express.static(publicDir));
    }
    
    // Enable security, CORS, compression, favicon and body parsing
    server.use(helmet());
    server.use(cors());
    server.use(compress());
    server.use(json());
    server.use(urlencoded({ extended: true }));

    // Exctract User informations from Authorization header
    server.use(jwt({
        secret,
        credentialsRequired: false
      }));

    server.use((req,res,next)=>{
        res.locals.secret = secret;
        res.locals.dbAdapter = dbAdapter;
        next();
    })
    
    // Expose Routes for app components
    const root = Router();
    root.use(products);
    root.use(users);
    root.use(auth);
    
    server.use('/api', root);

    // MiddleWares
    server.use(responseFormater);

    server.listen(port || 5000);
}
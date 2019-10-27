export default function hidePassword(req, res, next){
    const users = res.locals.data;
    if(users){
        if(Array.isArray(users.data)){
            res.locals.data.data = users.data.map(user => ({...user, password:'hidden'}));
        }
        else{
            res.locals.data = {...users, password:'hidden'};
        }
    }
    next();
}
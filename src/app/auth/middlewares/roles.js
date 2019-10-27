import { UNAUTHORIZED } from '../../util/errors';

export function roles(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    // return a middleware
    return (req, res, next) => {
      if (!req.user || !isAllowed(req.user.role))
      res.locals.error =  {
        type: UNAUTHORIZED,
        msg: 'Unauthorized Access: your role does not has the right privilege'
    };
      next();
    }
    
  }
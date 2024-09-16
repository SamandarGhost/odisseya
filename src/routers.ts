import express from 'express';
const router = express.Router();
import memberController from './controllers/member.controller';
import ownerController from './controllers/owner.controller';

router.get('/',
    memberController.goHome
);

router.get('/signup',
    ownerController.getSignup
);

router.post('/signup',
    ownerController.signup
);

router.get('/login',
    ownerController.getLogin
);

router.post('/login',
    ownerController.login
);

export default router;
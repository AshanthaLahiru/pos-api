let self;

export default class AuthorizationMW {

    constructor(jwt, constants) {
        self = this;
        self.jwt = jwt;
        self.constants = constants;
    }

    verifyToken(req, res, next) {
        let header = req.header("Authorization");
        // if (header) {
        //     let token = header.split(' ')[1];
        //     try {
        //         if (self.jwt.verify(token, self.constants.jwtSecretKey)) {
        //             next();
        //         }
        //     }
        //     catch (e) {
        //         console.log(e);
        //         next(res.status(401).json("Authorization Failed"));
        //     }
        // } else {
        //     next(res.status(401).json("Authorization Failed"));
        // }
        next();
    }
}

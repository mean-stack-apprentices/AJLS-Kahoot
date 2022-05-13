import "express";
import jwt from "jsonwebtoken";
import "../../shared/models/user.model.js";
function authHandle(req, res, next) {
    const cookie = req.cookies["jwt"];
    console.log("auth_cookie", cookie);
    const access_secret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(cookie, access_secret, (err, result) => {
        if (err) {
            return res.sendStatus(403);
        }
        if (result) {
            req.user = result.user;
        }
    });
    next();
}
export const authHandler = authHandle;
//# sourceMappingURL=auth.middleware.js.map
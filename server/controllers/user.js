const bcrypt = require("bcryptjs");

module.exports = {
    register: async (req, res, next) => {
        const { id, username, password, profile_pic } = req.body;
        const db = req.app.get("db");
        const result = await db.user.find_user_by_username([username]);
        const existingUser = result[0];
        if (existingUser) {
            res.status(409).send("Existing User");
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.user.create_user([ username, hash ]);
        const user = registeredUser[0];
        req.session.user = {
            username: user.username,
            id: user.id,
            profile_pic: `https://robohash.org/${username}.png`
        };
        res.status(200).send(req.session.user)
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;
        const foundUser = await req.app.get('db').find_user_by_username([username]);
        const user = foundUser[0];
    if (!user) {
        return res.status(401).send('No User Found!');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
        return res.status(403).send('Incorrect password');
        }
        req.session.user = { 
            id: user.id, 
            username: user.username 
        };
        return res.send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}
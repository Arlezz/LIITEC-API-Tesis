const userSchema = require("../models/user.model");
const keySchema = require("../models/key.model");
const bcrypt = require("bcryptjs");

const AuthController = {

    login: async (req, res) => {

        try {
            if (!req.body) {
                return res.status(400).json({ error: "User data is required" });
            }

            const { credential, password } = req.body;

            const user = await userSchema.findOne({ $or: [{ username: credential }, { email: credential }] });

            if (!user) {
                return res.status(404).json({ error: "Username or email not found" });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: "Invalid password" });
            }

            const keyProjection = { user: 0, _id: 0, __v: 0, createdOn: 0, updatedOn: 0 };

            const key = await keySchema.findOne({ user: user._id }, keyProjection);

            if (!key) {
                return res.status(404).json({ error: "Key not found" });
            }

            const basicUser = {
                _id: user._id,
                username: user.username,
                email: user.email,
                apiKey: key
            };

            res.status(200).json(basicUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting user" });
        }
    }

};

module.exports = AuthController;
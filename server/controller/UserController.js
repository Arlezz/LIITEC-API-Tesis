const userSchema = require("../models/user.Model");
const authorization = require("../auth/apiAuth");

const UserController = {
  regenerateApiKey: async (req, res) => {
    try {
      const { email } = req.params;
        
      const newKey = authorization.genAPIKey();

      const user = await userSchema.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.email !== req.user.email) {
        return res.status(403).json({ error: "Acceso prohibido" });
      }

      user.apiKey.key = newKey;
      await user.save();

      res.json({ message: "New secret generated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error editing user" });
    }
  },
};

module.exports = UserController;

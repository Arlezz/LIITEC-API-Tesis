const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - name
 *         - lastName
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *           example: arodrig
 *         password:
 *           type: string
 *           description: Password of the user
 *           example: 123456
 *         name:
 *           type: string
 *           description: Name
 *           example: Antony
 *         lastName:
 *           type: string
 *           description: Last name
 *           example: Rodriguez
 *         email:
 *           type: string
 *           description: Email
 *           example: antony.rodriguez@userena.cl
 *         createdOn:
 *           type: date
 *           description: Date of creation
 *           example: 2021-02-02T00:00:00.000Z
 *         superuser:
 *           type: boolean
 *           description: Superuser of the broker mqtt (true or false)
 *           example: false
 *         acls:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 description: Topic
 *                 example: /devices/#
 *               acc:
 *                 type: number
 *                 description: Access
 *                 example: 1
 *       example:
 *         username: arodrig
 *         password: $2a$10$fUPEMPopPAYLN6oRFyekKu07rWsCjKqSi.GubGXdafrfKyzjCFbn6
 *         name: Antony
 *         lastName: Rodriguez
 *         email: antony.rodriguez@userena.cl
 *         createdOn: 2021-02-02T00:00:00.000Z
 *         superuser: false
 *         acls:
 *           - topic: /devices/dv-84bc92c8-2c92-494b-bb28-9f04db311454
 *             acc: 2
 *           - topic: /devices/dv-288c2903-45b5-427a-9480-4d736790f9ec
 *             acc: 2
 */




const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  superuser: {
    type: Boolean,
    default: false,
  },
  acls: [
    {
      topic: {
        type: String,
        required: true,
      },
      acc: {
        type: Number,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);

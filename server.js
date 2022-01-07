const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

const UserRouter = require("./routes/user");
const PostRouter = require("./routes/post");
const generateRoutes = require("./routes/generic");
/**
 * /users : Operations de collection sur des Users
 * /users/:id : Operations d'item User
 *
 * /vehicules : Operations de collection sur des Vehicules
 * /vehicules/:id : Operations d'item Vehicule
 *
 * GET récupère un ou plusieurs items
 *  - /users
 *      200 : OK
 *  - /users/:id
 *     200 : OK
 *     404 : Not Found
 *
 * POST crée un item
 *  - /users
 *     201 : Created
 *     400 : Bad Request
 *
 * PUT met à jour un item
 *  - /users/:id
 *    200 : OK
 *    400 : Bad Request
 *    404 : Not Found
 *
 * DELETE supprime un item
 *  - /users/:id
 *    204 : No Content
 *    404 : Not Found
 */

const Post = require("./models/Post");
const User = require("./models/User");

app.use(express.json());
app.use(UserRouter);
app.use(PostRouter);

app.use(generateRoutes(User));
app.use(generateRoutes(Post));

app.listen(3000, () => console.log("Server is listening"));
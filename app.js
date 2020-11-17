
require('dotenv/config')
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const express = require('express');
const app = express();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Routes
const postsRoutes = require('./routes/posts')

// Middlewares third-party
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Middlewares type route
app.use('/posts', postsRoutes)

// Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Posts API',
            version: '1.0.0',
            description: 'Posts management',
            contact: {
                name: 'Nguyen Huu Thach',
                email: 'thachnh.tesse@gmail.com'
            },
            servers: [`http://localhost:${PORT}`]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *  Post:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     description: title of the post
 *     example: 'Tim hieu ve NodeJS MongoDB Swagger RestfulAPI'
 *    description:
 *     type: string
 *     description: description of the post
 *     example: 'The awesome task'
 */


/**
 * @swagger
 * /posts:
 *  get:
 *   summary: get all posts
 *   description: get all posts
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: Bad Request
 */

/**
* @swagger
* /posts/{postId}:
*  get:
*   summary: get post by id
*   description: get post by id
*   parameters:
*    - in: path
*      name: postId
*      schema:
*       type: string
*      required: true
*      description: id of the post
*      example: "5fb3863461320422e4da2136"
*   responses:
*    200:
*     description: success
*    404:
*     description: Not Found
*/

/**
 * @swagger
 * /posts:
 *  post:
 *   summary: create posts
 *   description: create a posts
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Post'
 *   responses:
 *    201:
 *     description: A post created succesfully
 *    404:
 *     description: Not Found
 */

/**
* @swagger
* /posts/{postId}:
*  delete:
*   summary: delete a post
*   description: delete a post
*   parameters:
*    - in: path
*      name: postId
*      schema:
*       type: string
*      required: true
*      description: id of the post
*      example: "5fb3863461320422e4da2136"
*   responses:
*    200:
*     description: success
*    404:
*     description: Not Found
*/

/**
* @swagger
* /posts/{postId}:
*  patch:
*   summary: update a title of the post
*   description: update a title of the post
*   consumes:
*    - application/json
*   produces:
*    - application/json
*   parameters:
*    - in: path
*      name: postId
*      schema:
*       type: string
*      required: true
*      description: id of the post
*      example: "5fb3863461320422e4da2136"
*    - in: body
*      name: body
*      required: true
*      description: body object
*      schema:
*       $ref: '#/definitions/Post/properties/title'
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/definitions/Post/properties/title'
*   responses:
*    200:
*     description: success
*    404:
*     description: Not Found
*/

// Ket noi DATABASE va bat dau listening server
mongoose.connect(process.env.CONNECTION_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`)))
    .catch((error) => console.log(error.message))
// Khong nhan bat ky log warnings nao
mongoose.set('useFindAndModify', false)

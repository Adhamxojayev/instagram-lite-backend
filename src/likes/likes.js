import express from 'express'

const router = express.Router()

import {postLike} from './controller.js'

router.route('/like')
    .post(postLike)


export default router
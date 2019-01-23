import express from 'express'

import { verifyJWT_MW } from '../middlewares'

const router = express.Router()

/*
  R0UTES
*/

router.all('*', verifyJWT_MW)

router.get('/', (req, res) =>
{
    res.status(200)
        .json({
            success: true,
            data: "Super secret data!"
        })
})

export default router
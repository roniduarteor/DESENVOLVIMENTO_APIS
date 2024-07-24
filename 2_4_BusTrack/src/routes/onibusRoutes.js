import {Router} from 'express'

import { getIdOnibus, getOnibus, postOnibus } from '../controllers/onibusController.js'

const router = Router()

router.post('/create', postOnibus)
router.get('/', getOnibus)
router.get('/:onibus_id', getIdOnibus)


export default router
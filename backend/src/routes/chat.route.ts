import app from 'express'
import { chatController } from '../controller/chat.controller'

export const router = app.Router()


router.route('/').post(chatController)

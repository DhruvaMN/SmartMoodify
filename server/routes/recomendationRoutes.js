const express = require('express')
const router = express.Router()
const { getRecommendations } = require('../controllers/recommendations')

router.post('/', getRecommendations)

module.exports = router

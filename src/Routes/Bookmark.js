const express = require('express');
const { toggleBookmark, getBookmarks } = require('../Controller/Bookmark');
const protect = require("../Middleware/authMiddleware");

const Bookmark_Router  = express.Router();

Bookmark_Router.post('/toggle', protect, toggleBookmark);
Bookmark_Router.get('/get', protect, getBookmarks);

module.exports = Bookmark_Router ;
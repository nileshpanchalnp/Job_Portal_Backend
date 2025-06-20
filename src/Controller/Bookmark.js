const User = require('../Models/User');

const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;


    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const user = await User.findById(userId);

    if (!user || user.role !== 'candidate') {
      return res.status(403).json({ message: 'Only candidates can bookmark jobs' });
    }

    const isBookmarked = user.bookmarkedJobs.map(String).includes(jobId);

    if (isBookmarked) {
      user.bookmarkedJobs.pull(jobId);
    } else {
      user.bookmarkedJobs.push(jobId);
    }

    await user.save();

    res.json({
      message: isBookmarked ? 'Job removed from bookmarks' : 'Job bookmarked successfully',
      bookmarked: !isBookmarked,
      bookmarks: user.bookmarkedJobs.filter(Boolean).map(String), // clean + string IDs
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || user.role !== 'candidate') {
      return res.status(403).json({ message: 'Only candidates can access bookmarks' });
    }

res.json({ bookmarks: user.bookmarkedJobs.filter(Boolean).map(String) });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { toggleBookmark, getBookmarks };

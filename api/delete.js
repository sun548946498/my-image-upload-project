const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

export default (req, res) => {
    const { filename } = req.query;
    const filePath = path.join(uploadDir, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(500).json({ error: 'File deletion failed' });
            return;
        }
        res.status(200).json({ message: 'File deleted' });
    });
};

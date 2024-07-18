const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

export default (req, res) => {
    const form = new IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: 'File upload failed' });
            return;
        }
        res.status(200).json({ path: `/uploads/${path.basename(files.file.path)}` });
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

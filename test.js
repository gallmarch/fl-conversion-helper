const fs = require('fs');
const yazl = require('yazl');

const version = require('./package.json').version;

const zipFile = new yazl.ZipFile();
fs.readdir('./build/', (err, files) => {
  files.forEach((file) => {
    console.info(file);
    // zipFile.addFile(`build/${file}`, file);
  });
  if (false)
  zipFile.outputStream.pipe(
    fs.createWriteStream(`dist/fl-conversion-helper-${version}.zip`)
  );
});

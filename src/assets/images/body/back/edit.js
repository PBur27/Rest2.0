const fs = require('fs');
const path = require('path');

// Directory containing your SVG files (adjust to your folder)
const svgFolder = path.join(__dirname, './'); // change './' to your SVG folder path

fs.readdir(svgFolder, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    process.exit(1);
  }

  files.forEach(file => {
    if (file.endsWith('.svg')) {
      const filePath = path.join(svgFolder, file);
      let svgContent = fs.readFileSync(filePath, 'utf8');

      // Remove fill="..." or fill='...'
      svgContent = svgContent.replace(/fill=(["']).*?\1/g, '');

      // Remove stroke="..." or stroke='...'
      svgContent = svgContent.replace(/stroke=(["']).*?\1/g, '');

      // Optional: remove empty spaces left behind
      svgContent = svgContent.replace(/\s{2,}/g, ' ');

      fs.writeFileSync(filePath, svgContent, 'utf8');
      console.log(`Removed fill/stroke in ${file}`);
    }
  });
});

import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  //find file fonts .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: 'FONTS', message: 'Error: <%= error.message %>' })))
      //convert in .ttf
      .pipe(fonter({ formats: ['ttf'] }))
      //upload in source folder
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts`))
  );
};

export const ttfToWoff = () => {
  //find files font .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: 'FONTS', message: 'Error: <%= error.message %>' })))
      //convert in .woff
      .pipe(fonter({ formats: ['woff'] }))
      //upload in result folder
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      //find file font .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      //convert in .woff2
      .pipe(ttf2woff2())
      //upload in folder results
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontStyle = () => {
  //file style fonts
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  //find file fonts
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //find file style fonts
      if (!fs.existsSync(fontsFile)) {
        //if not a file? creat him
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          //write fonts in style file
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        //else log  message
        console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!');
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};

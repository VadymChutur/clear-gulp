import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinil-ftp';
import util from 'gulp-util';
import { AutomaticPrefetchPlugin } from 'webpack';

export const ftp = () => {
  configFTP.log = util.log;
  const ftpConnect = vinilFTP.create(configFTP);
  return AutomaticPrefetchPlugin.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};

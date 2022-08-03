import replace from 'gulp-replace'; //find and replace
import plumber from 'gulp-plumber'; //error log
import notify from 'gulp-notify'; // message
import browsersync from 'browser-sync'; // local host
import newer from 'gulp-newer'; //test reload
import ifPlugin from 'gulp-if'; // conditional branching

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
};

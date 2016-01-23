import 'babel-polyfill';

import gulp from 'gulp';
import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import through from 'through2';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify';

import del from 'del';
import fs from 'fs';

const externalModules = [
  'zone.js/lib/browser/zone-microtask',
  'angular2/core',
  'angular2/router',
  'angular2/platform/browser',
  'reflect-metadata',
  'babel-polyfill',
]

const bootFile = 'src/boot.js';
const buildDir = 'public/ng2';


gulp.task('build-production', () => {
  const b = browserify(bootFile, {
    debug: false
  });
  b.transform(babelify);

  const bundledFiles = bundle(b, 'bundle_production.js');
  return bundledFiles
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(buildDir))
    .pipe(rev.manifest())
    .pipe(gulp.dest(buildDir));
});

gulp.task('build-vendor', () => {
  const b = browserify();

  externalModules.forEach(id => {
    b.require(id);
  });

  b.transform(babelify);
  return bundle(b, 'vendor.js').pipe(gulp.dest(buildDir));
});

gulp.task('build-app', () => {
  const b = browserify(bootFile, {
    debug: true
  });

  externalModules.forEach(id => {
    b.external(id);
  });

  b.transform(babelify);
  return bundle(b, 'app.js');
});

gulp.task('watch', ['build-vendor'], () => {
  const b = browserify(bootFile, Object.assign(watchify.args, {
    debug: true
  }));

  externalModules.forEach(id => {
    b.external(id);
  });

  const w = watchify(b.transform(babelify))
    .on('update', () => bundle(w, 'app.js').pipe(gulp.dest(buildDir)))
    .on('log', gutil.log);
  return bundle(w, 'app.js').pipe(gulp.dest(buildDir));
});

gulp.task('build', ['build-vendor', 'build-app']);

gulp.task('clean', () => {
  return del(buildDir);
});

gulp.task('default', ['watch']);

function bundle(b, name, extra) {
  const errorFile = `${buildDir}/last_error.txt`;
  return b.bundle()
    .on('error', (e) => {
      fs.writeFile(errorFile, e.stack);
      console.error(e.stack);
    })
    .pipe(through.obj((file, encoding, callback) => {
      fs.writeFile(errorFile, '');
      callback(null, file);
    }))
    .pipe(source(name))
    .pipe(buffer());
}

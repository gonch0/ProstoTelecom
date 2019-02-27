"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require ("gulp-rename");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();
var spritesmith = require('gulp.spritesmith');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace-task');

gulp.task("clean", function () {
  return del("build");
})

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task('js', function () {
  var scriptList = [
    "source/js/menu.js",
    "source/js/slider.js",
    "source/js/toggles.js",
    "source/js/backend.js",
    "source/js/popup.js",
    "source/js/custom-select.js"
  ];
  return gulp.src(scriptList)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify({
      compress: false
    }))
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('source/img/sprite/*.png')
    .pipe(spritesmith({
      algorithm: 'left-right',
      padding: 30,
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));
  return spriteData.img.pipe(gulp.dest('build/img'))
});

gulp.task("copy", function () {
  return gulp.src ([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/*.{jpg,png}",
    "source/js/*.json",
    "source/favicon.ico",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html"), gulp.series("html", "refresh");
});


gulp.task('build', gulp.series("clean", "copy", "html", "css", "js", "sprite", "server"));

gulp.task("start", gulp.series("css", "server"));

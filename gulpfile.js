var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var minimist = require("minimist");
var clone = require("gulp-clone");

var envOptions = {
  sting: "env",
  default: { env: "develop" },
};

var options = minimist(process.argv.slice(2), envOptions);

gulp.task("clean", function () {
  return gulp
    .src(
      $.if(
        options.env === "production",
        [("./.tmp", "./dist")],
        [("./.tmp", "./public")]
      ),
      {
        read: false,
        allowEmpty: true,
      }
    )
    .pipe($.clean());
});

gulp.task("cloneCss", function () {
  return gulp
    .src("./static/css/*.css")
    .pipe(clone())
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/css"),
        gulp.dest("./public/css")
      )
    );
});

gulp.task("cloneJs", function () {
  return gulp
    .src("./static/js/*.js")
    .pipe(clone())
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/js"),
        gulp.dest("./public/js")
      )
    );
});

gulp.task("pug", function () {
  return gulp
    .src("./source/views/**/*.pug")
    .pipe($.plumber())
    .pipe(
      $.pug({
        pretty: false,
      })
    )
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/"),
        gulp.dest("./public/")
      )
    )
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return (
    gulp
      .src("./source/sass/**/*.sass")
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass().on("error", $.sass.logError))
      // 編譯完成
      .pipe($.postcss([autoprefixer()]))
      .pipe($.if(options.env === "production", $.cleanCss()))
      .pipe($.sourcemaps.write("."))
      .pipe(
        $.if(
          options.env === "production",
          gulp.dest("./dist/css"),
          gulp.dest("./public/css")
        )
      )
      .pipe(browserSync.stream())
  );
});

gulp.task("babel", () =>
  gulp
    .src("./source/js/**/*.js")
    .pipe($.sourcemaps.init())
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe($.concat("all.js"))
    .pipe(
      $.if(
        options.env === "production",
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
    )
    .pipe($.sourcemaps.write("."))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/js"),
        gulp.dest("./public/js")
      )
    )
    .pipe(browserSync.stream())
);

gulp.task("vendorJs", function () {
  return gulp
    .src("./.tmp/vendors/**/*.js")
    .pipe($.concat("vendors.js"))
    .pipe($.if(options.env === "production", $.uglify()))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/js"),
        gulp.dest("./public/js")
      )
    );
});

gulp.task("image-min", function () {
  return gulp
    .src("./source/images/*")
    .pipe($.if(options.env === "production", $.imagemin()))
    .pipe(
      $.if(
        options.env === "production",
        gulp.dest("./dist/images"),
        gulp.dest("./public/images")
      )
    );
});

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe($.ghPages());
});

gulp.task("clean-publish", function () {
  return gulp
    .src(["./.publish"], {
      read: false,
      allowEmpty: true,
    })
    .pipe($.clean());
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "vendorJs",
    "cloneCss",
    "cloneJs",
    gulp.parallel("pug", "sass", "babel", "image-min")
  )
);

gulp.task(
  "default",
  gulp.series(
    "clean",
    "vendorJs",
    "cloneCss",
    "cloneJs",
    gulp.parallel("pug", "sass", "babel", "image-min"),
    function (done) {
      browserSync.init({
        server: {
          baseDir: "./public",
          reloadDebounce: 2000, //重新整理的間隔必須超過 2 秒
        },
      });

      gulp.watch("./source/sass/**/*.sass", gulp.series("sass"));
      gulp.watch("./source/js/**/*.js", gulp.series("babel"));
      gulp.watch("./source/**/*.pug", gulp.series("pug"));

      done();
    }
  )
);

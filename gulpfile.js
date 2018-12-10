    const gulp = require('gulp');
    const browserSync = require('browser-sync').create();
    const pug = require('gulp-pug');
    const sass = require('gulp-sass');
    const spritesmith = require('gulp.spritesmith');
    var rimraf = require('rimraf');


        gulp.task('server', function() {
            browserSync.init({
                server:{
                    port: 9000,
                    baseDir : 'build'
                }
            });

        gulp.watch('build/**/*').on('change', browserSync.reload);
        }); 

    
        gulp.task('templates:compile', function buildHTML() {
            return gulp.src('source/template/index.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('build'))
        });


        gulp.task('styles:compile', function () {
            return gulp.src('source/styles/main.scss')
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest('build/css'));
          });
      

        gulp.task('sprite', function () {
            var spriteData = gulp.src('source/images/icon/*.png').pipe(spritesmith({
              imgName: 'sprite.png',
              imgPath: '../images/sprite.png',
              cssName: 'sprite.css'
            }));
            return spriteData.pipe(gulp.dest('path/to/output/'));
          });

        gulp.task('clean', function del(cb){
            return rimraf('build', cb)
        });
        
        gulp.task('watch', function(){
            gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
            gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
        });

        gulp.task('default', gulp.series(
            'clean',
            gulp.parallel('templates:compile', 'styles:compile', 'sprite' ),
            gulp.parallel('watch', 'server')
        ));

        
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import ts from 'gulp-typescript';

const plugins = gulpLoadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**', '!react_docs/**', '!server/v1/event_sourcing/node_modules/**'],
  nonJs: ['./package.json', './.gitignore', './.env'],
  tests: './server/tests/*.ts'
};

// Clean up dist and coverage directory
gulp.task('clean', () =>
  del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
);


gulp.task('typescript1', () => {
  gulp.src('*.ts')
    .pipe(ts({
        noImplicitAny: false,
        lib: ['es5', 'es2015', 'es2016']
    }))
    .js.pipe(gulp.dest('dist/'))
});

gulp.task('typescript2', () => {
  gulp.src('config/*.ts')
    .pipe(ts({
        noImplicitAny: false,
        lib: ['es5', 'es2015', 'es2016']
    }))
    .js.pipe(gulp.dest('dist/config/'))
});

gulp.task('typescript', () => {
  gulp.src('server/v1/**/*.ts')
    .pipe(ts({
        noImplicitAny: false,
        lib: ['es5', 'es2015', 'es2016']
    }))
    .js.pipe(gulp.dest('dist/server/v1/'))
});

gulp.task('copyDocs', () =>
  gulp.src(['./server/docs/api_docs.yml'])
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist/server/docs'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest('dist'))
);

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'typescript', 'typescript1','typescript2', 'babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js ts',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js', 'server/v1/event_sourcing/node_modules/**/*.js'],
    tasks: ['copy', 'babel', 'typescript', 'typescript1', 'typescript2']
  })
);

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
  runSequence(
    ['copy', 'babel', 'copyDocs', 'typescript', 'typescript1', 'typescript2']
  );
});

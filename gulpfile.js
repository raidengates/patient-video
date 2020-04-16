var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var path = require('path'), fs = require('fs');

var setting = {
  src_prefixer: {

    baseDir: '\\src\\assets\\',
    dest: '\\httpdocs\\'
  },
  autoprefixer: {
    browser: ['last 2 version', 'Explorer >= 11', 'Android >= 4']
  },
  browserSync: {
    server: {
      baseDir: 'httpdocs',
      proxy: "localhost:3000"
    },
  },
  imagemin: {
    disabled: false,
    level: 7  // 圧縮率
  },
  // css
  minify: {
    css: false,
    js: false
  },
  cssbeautify: {
    disabled: true,
    options: {
      indent: ''
    }
  },
  csscomb: {
    disabled: true,
  },
  path: {
    base: {
      src: 'src',
      dest: 'httpdocs'
    },
    sass: {
      src: 'src/assets/sass/**/*.scss',
      dest: 'httpdocs/assets/css/',
    },
    js: {
      src: 'src/assets/js/**/*.js',
      dest: 'httpdocs/assets/js/',
    },
    image: {
      src: 'src/assets/img/**/*',
      dest: 'httpdocs/assets/img/',
    },
    lib: {
      src: 'src/assets/lib/**/*',
      dest: 'httpdocs/assets/lib/',
    },
    include: {
      src: ['src/assets/include/**/*'],
      dest: 'httpdocs/assets/include/',
    },
    etc: {
      src: 'src/assets/etc/**/*',
      dest: 'httpdocs/assets/etc/',
    },

    app: {
      src: 'src/assets/app/**/*',
      dest: 'httpdocs/app/',
    },
    error: {
      src: 'src/assets/error/**/*',
      dest: 'httpdocs/error/',
    },
    shell: {
      src: 'src/assets/shell/**/*',
      dest: 'httpdocs/shell/',
    },
    script: {
      src: 'src/assets/@scripts/**/*',
      dest: 'httpdocs/@scripts/',
    },


    html: {
      src: ['src/index.html']
    },

    // html: {
    //   src: ['src/**/*', '!src/assets/**/*']
    // },


  }
};

gulp.task('imagemin', function () {
  if (!setting.imagemin.disabled) {
    var imageminOptions = {
      optimizationLevel: setting.imagemin.lebel
    };

    return gulp.src(setting.path.image.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.changed(setting.path.image.dest))
      .pipe($.imagemin(imageminOptions))
      .pipe(gulp.dest(setting.path.image.dest))
      .pipe(browserSync.reload({ stream: true }));
  } else {
    return gulp.src(
      setting.path.image.src
    )
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.changed(setting.path.image.dest))
      .pipe(gulp.dest(setting.path.image.dest))
      .pipe(browserSync.reload({ stream: true }));
  }
});

// SASS
gulp.task('scss', function () {
  return gulp.src(setting.path.sass.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.sass({ outputStyle: 'expanded' }))
    .pipe($.autoprefixer(setting.autoprefixer.browser))
    .pipe(gulp.dest(setting.path.sass.dest))
    .pipe(browserSync.reload({ stream: true }));
});
// HTML
gulp.task('html', function () {
  return gulp.src(
    setting.path.html.src,
    { base: setting.path.base.src }
  )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.base.dest))
    .pipe(gulp.dest(setting.path.base.dest))
    .pipe(browserSync.reload({ stream: true }));
});

// JavaScript
gulp.task('js', function () {
  return gulp.src(
    setting.path.js.src
  )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.js.dest))
    .pipe(gulp.dest(setting.path.js.dest))
    .pipe(browserSync.reload({ stream: true }));
});

//app
gulp.task('app', function () {
  Elements();
  return gulp.src(setting.path.app.src).pipe($.plumber({
    errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
  })).pipe(browserSync.reload({ stream: true }));
});

//error
gulp.task('error', function () {
  return gulp.src(setting.path.error.src).pipe($.plumber({
    errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
  })).pipe(
    $.changed(setting.path.error.dest))
    .pipe(gulp.dest(setting.path.error.dest))
    .pipe(browserSync.reload({ stream: true }));
});
//shell
gulp.task('shell', function () {
  return gulp.src(setting.path.shell.src).pipe($.plumber({
    errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
  })).pipe(
    $.changed(setting.path.shell.dest))
    .pipe(gulp.dest(setting.path.shell.dest))
    .pipe(browserSync.reload({ stream: true }));
});

//script
gulp.task('script', function () {
  return gulp.src(setting.path.script.src).pipe($.plumber({
    errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
  })).pipe(
    $.changed(setting.path.script.dest))
    .pipe(gulp.dest(setting.path.script.dest))
    .pipe(browserSync.reload({ stream: true }));
});


function Elements() {
  let element_array = [];
  //app
  let base_app = 'app';
  let ext_file_app_html = recFindByExt(base_app, 'html');
  if (ext_file_app_html.length > 0)
    ext_file_app_html.forEach(e => { element_array.push(e) });
  let ext_file_app_js = recFindByExt(base_app, 'js');
  if (ext_file_app_js.length > 0)
    ext_file_app_js.forEach(e => { element_array.push(e) });
  //error
  let base_error =  'error';
  let ext_file_error_html = recFindByExt(base_error, 'html');
  if (ext_file_error_html.length > 0)
    ext_file_error_html.forEach(e => { element_array.push(e) });
  let ext_file_error_js = recFindByExt(base_error, 'js');
  if (ext_file_error_js.length > 0)
    ext_file_error_js.forEach(e => { element_array.push(e) });
  //shell;
  let base_shell =  'shell';
  let ext_file_shell_html = recFindByExt(base_shell, 'html');
  if (ext_file_shell_html.length > 0)
    ext_file_shell_html.forEach(e => { element_array.push(e) });

  let ext_file_shell_js = recFindByExt(base_shell, 'js');
  if (ext_file_shell_js.length > 0)
    ext_file_shell_js.forEach(e => { element_array.push(e) });

  let element = "var elements =[{0}]";
  let element_arr = [];
  element_array.forEach(_item => {
    let item_json = "{ name: '{0}', path: '{1}', type: '{2}', content: {3} },"
    let content = "";

    let fs_file =  process.cwd() +setting.src_prefixer.baseDir + _item;

    let contents =  JSON.stringify(fs.readFileSync(fs_file, 'utf8'));       
    let f_parse = path.parse(_item);

    let f_ScriptTypeName =  f_parse.dir.replace(/\\/g,'.') + '.' + f_parse.name;

    let f_ScriptPath = f_parse.dir.replace(/\\/g,'/') + '/'+f_parse.name;
    let f_Extension =  path.extname(_item).replace(/\./g, "");

    if(f_Extension =="html"){
      let HtmlToJsonString = contents;
      content = HtmlToJsonString;
     
    }
    if(f_Extension == "js"){
      var script_vm_name = '//#sourceURL={0}.js \r\n//@sourceURL={1}.js \r\n {2}';
      content = script_vm_name.formatUnicorn(f_ScriptTypeName, f_ScriptPath, contents)
      // element_arr.push(item_json.formatUnicorn(f_ScriptTypeName, f_ScriptPath, f_Extension, JSON.stringify(contents)));
    }
    element_arr.push(item_json.formatUnicorn(f_ScriptTypeName, f_ScriptPath, f_Extension, contents));


    // fs.readFile(fs_file, 'utf8', function (err, contents) {
    //   if (err) {
    //     return console.log(err);
    //   }
    // });

  });
  let json_e ="";
  element_arr.forEach(e => {
    json_e += e;
  });
  element_result=  element.formatUnicorn(json_e);

  let urlfile = process.cwd() + setting.src_prefixer.dest + 'elements.js';
   fs.writeFile(urlfile, element_result, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
};

function recFindByExt(base, ext, files, result) {
  
  let _dirname = process.cwd() + setting.src_prefixer.baseDir + base;

  files = files || fs.readdirSync(_dirname)
  //files = fs.readdirSync(_dirname)

  result = result || []
  files.forEach(
    function (file) {
      let newbase = path.join(base, file)
      let dir_newbase = fs.statSync(process.cwd() + setting.src_prefixer.baseDir + newbase);
      if (dir_newbase.isDirectory()) {
        let chill_dir = fs.readdirSync(process.cwd() + setting.src_prefixer.baseDir + newbase);
        result = recFindByExt(newbase, ext, chill_dir, result)
      }
      else {
        if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
          result.push(newbase)
        }
      }
    }
  )
  return result
}

// Lib
gulp.task('lib', function () {
  return gulp.src(
    setting.path.lib.src
  )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.lib.dest))
    .pipe(gulp.dest(setting.path.lib.dest))
    .pipe(browserSync.reload({ stream: true }));
});

// Include
gulp.task('include', function () {
  return gulp.src(
    setting.path.include.src
  )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.include.dest))
    .pipe(gulp.dest(setting.path.include.dest))
    .pipe(browserSync.reload({ stream: true }));
});

// Etc
gulp.task('etc', function () {
  return gulp.src(
    setting.path.etc.src
  )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.etc.dest))
    .pipe(gulp.dest(setting.path.etc.dest))
    .pipe(browserSync.reload({ stream: true }));
});

// JS Minify
gulp.task('jsminify', function () {
  if (setting.minify.js) {
    return gulp.src(setting.path.js.dest + '**/*.js')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.uglify())
      .pipe(gulp.dest(setting.path.js.dest));
  }
});

// CSS Minify
gulp.task('cssminify', function () {
  if (setting.minify.css) {
    return gulp.src(setting.path.sass.dest + '**/*.css')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.csso())
      .pipe(gulp.dest(setting.path.sass.dest));
  }
});
// CSS Beautify
gulp.task('cssbeautify', function () {
  if (!setting.cssbeautify.disabled && !setting.minify.css) {
    return gulp.src(setting.path.sass.dest + '**/*.css')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.cssbeautify(setting.cssbeautify.options))
      .pipe(gulp.dest(setting.path.sass.dest));
  }
});

// CSS Comb
gulp.task('csscomb', function () {
  if (!setting.csscomb.disabled && !setting.minify.css) {
    return gulp.src(setting.path.sass.dest + '**/*.css')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.csscomb())
      .pipe(gulp.dest(setting.path.sass.dest));
  }
});

// Clean
gulp.task('clean', del.bind(null, setting.path.base.dest));

// Build
gulp.task('build', function () {
  Elements();
  return runSequence(
    ['clean'],
    ['html', 'js', 'scss', 'lib', 'include', 'etc',  'script'],
    ['csscomb'],
    ['imagemin', 'cssminify', 'jsminify', 'cssbeautify']
  );
});
// Watch
gulp.task('watch', function () {
  browserSync.init(setting.browserSync);
 
  gulp.watch([setting.path.app.src], ['app']);
  // gulp.watch([setting.path.error.src], ['error']);
  // gulp.watch([setting.path.shell.src], ['shell']);
  gulp.watch([setting.path.script.src], ['script']);
  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.js.src], ['js']);
  gulp.watch([setting.path.lib.src], ['lib']);
  gulp.watch([setting.path.include.src], ['include']);
  gulp.watch([setting.path.etc.src], ['etc']);
  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.image.src], ['imagemin']);
  //build elements
  Elements();
});
gulp.task('default', ['watch']);
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
  function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var key;
      var args = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(arguments)
        : arguments[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
      }
    }
    return str;
  };

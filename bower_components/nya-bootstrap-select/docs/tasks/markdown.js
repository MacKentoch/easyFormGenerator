/**
 * compile markdown to html
 */

var marked = require('marked'),
  path = require('path'),
  highlightjs = require('highlight.js');

module.exports = function(grunt) {

  function capitalize (str) {
    var words = str.split('-');
    return words.map(function(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }).join('');
  }
  function preCompile(src, basename) {
    var exampleCount = 1;
    var match = src.match(/<example>[\s\S]+?<\/example>/mg);
    if(match && match.length > 0) {
      match.forEach(function(example) {
        var subMatch = example.match(/<file\s*name=".+?">[\s\S]+?<\/file>/mg);
        var group, newExample = example,
          htmlContent,
          appName = capitalize(basename) + 'Example' + exampleCount + 'App',
          folderName = basename + '-example-' + exampleCount,
          htmlFileName,
          jsTemplate,
          jsFileName;
        if(subMatch && subMatch.length > 0) {
          for( var i = 0; i < subMatch.length; i++) {
            group = subMatch[i].match(/<file\s*name="(.+?)">\n*([\s\S]+?)\n*<\/file>/m);
            var fileName = group[1],
              code = group[2],
              lang, codeWrapped;
            if(path.extname(fileName) === '.html') {
              lang = 'html';
              htmlFileName = fileName;
              htmlContent = code;
            } else if(path.extname(fileName) === '.js') {
              lang = 'javascript';
              jsFileName = fileName;
              jsTemplate = grunt.template.process(grunt.file.read('docs/src/script-template'), {
                data: {
                  appName: appName,
                  jsContent: code
                }
              });
              grunt.file.write(path.join( 'docs/dist/examples/' + folderName, fileName), jsTemplate);
            }
            codeWrapped = marked('\n```'+lang+'\n'+code + '\n```\n', {
              highlight: function(code){
                return highlightjs.highlightAuto(code).value;
              }
            });
            newExample = newExample.replace(code, codeWrapped);
          }

          var htmlTemplate = grunt.file.read('docs/src/example-template.html');
          console.log({
            appName: appName,
            jsFile: jsFileName,
            templateHTML: htmlContent
          });
          htmlTemplate = grunt.template.process(htmlTemplate, {
            data:{
              appName: appName,
              jsFile: jsFileName,
              templateHTML: htmlContent
            }
          });
          grunt.file.write(path.join('docs/dist/examples/' + folderName, htmlFileName), htmlTemplate);
        }

        newExample = newExample +
        '\n\n<iframe class="runnable-example-frame" src="examples/' + folderName +'/' + htmlFileName + '"></iframe>';

        src = src.replace(example, newExample);

        exampleCount++;
      });
    }
    console.log(src);

    return src;

  }

  function postCompile(src) {
    // prevent {{ }} being parsed by angular
    var match = src.match(/<pre>[\s\S]+?<\/pre>/mg);
    if(match && match.length > 0) {
      match.forEach(function(str) {
        var subMatch = str.match(/{{[\s\S]+?}}/mg);
        var group, newStr = str;
        if(subMatch && subMatch.length > 0) {
          for( var i = 0; i < subMatch.length; i++) {
            group = subMatch[i].match(/{{([\s\S]+?)}}/m);
            newStr = newStr.replace(subMatch[i], '<span>{{</span>' + group[1] + '<span>}}</span>');
          }
        }
        src = src.replace(str, newStr);
      });
    }

    return src;
  }

  grunt.registerMultiTask('markdown', 'convert markdown to html', function(){

    var template = this.options().template;

    this.files.forEach(function(file) {
      file.src.filter(function(filepath) {
        if(!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var content = grunt.file.read(filepath);
        var basename = path.basename(filepath, '.md');
        content = preCompile(content, basename);
        content = marked(content, {
          highlight: function(code){
            return highlightjs.highlightAuto(code).value;
          }
        });
        return postCompile(content);
      }).map(function(content) {
        var html = grunt.template.process(grunt.file.read(template), {
          data: {
            content: content
          }
        });
        grunt.file.write(file.dest, html);
      });
    });
  });
};

const fs = require('fs');

function HtmlAssetNameReplacerPlugin(options){
    const self = this;
  
    const defaultOptions = {
      fileName: './public/index.html',
      hot: false,
      src: options.hot ? 'http://localhost:8080/dist/' : 'dist/'
    };
  
    self.options = Object.assign(defaultOptions, options || {});
  }
  
  HtmlAssetNameReplacerPlugin.prototype.apply = function(compiler){
    const self = this;

    const html = fs.readFileSync(self.options.fileName, "utf8");
    let processedHtml = html;
    let hasProcessed = false;
 
    compiler.hooks.watchRun.tap('html-assetname-replacer-plugin', function(stats){
      console.log('html-assetname-replacer-plugin: watching for changes');
    });

    compiler.hooks.watchClose.tap('html-assetname-replacer-plugin', function(stats){
      console.log('html-assetname-replacer-plugin: stopped watching for changes');

      fs.writeFileSync(self.options.fileName, html);
    });

    compiler.hooks.done.tap('html-assetname-replacer-plugin', function(stats){
      if(hasProcessed){
        return;
      }
      
      console.log('Replacing asset names in: ' + self.options.fileName);

      stats.compilation.chunks.forEach(chunk => {
        chunk.files.forEach(file => {
          if(file.endsWith('.css')){
            console.log('Injecting asset: ' + self.options.src + file);
            processedHtml = processedHtml.replace('</head>', '<link href="' + self.options.src + file + '" rel="stylesheet">\r\n</head>');
          }
  
          if(file.endsWith('.js')){
            console.log('Replacing assetname: ' + 'dist/' + chunk.name + '.js' + ' with: ' + self.options.src + file);

            processedHtml = processedHtml.replace('dist/' + chunk.name + '.js', self.options.src + file);
          }
        });
      });
  
      fs.writeFileSync(self.options.fileName, processedHtml);

      hasProcessed = true;
    });
    
  }

  module.exports = HtmlAssetNameReplacerPlugin;
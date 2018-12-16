const fs = require('fs');

function HtmlAssetNameReplacerPlugin(options){
    const self = this;
  
    const defaultOptions = {
      fileName: './public/index.html',
      hot: false,
      src: options.hot ? 'http://localhost:8080/public/dist/' : 'dist/'
    };
  
    self.options = Object.assign(defaultOptions, options || {});
  }
  
  HtmlAssetNameReplacerPlugin.prototype.apply = function(compiler){
    const self = this;

    const html = fs.readFileSync(self.options.fileName, "utf8");
    let processedHtml = '';
    let processHtml = true;

    compiler.hooks.watchRun.tap('html-assetname-replacer-plugin', function(stats){
      console.log('html-assetname-replacer-plugin: watching for changes');
      
      processHtml = processedHtml === '';
    });

    compiler.hooks.watchClose.tap('html-assetname-replacer-plugin', function(stats){
      console.log('html-assetname-replacer-plugin: stopped watching for changes');

      fs.writeFileSync(self.options.fileName, html);
    });

    compiler.hooks.done.tap('html-assetname-replacer-plugin', function(stats){
      console.log('Replacing asset names in: ' + self.options.fileName);
  
      if(!processHtml) {
        return;
      }

      stats.compilation.chunks.forEach(chunk => {
        chunk.files.forEach(file => {
          if(file.indexOf('.css') !== -1){
            processedHtml = html.replace('dist/' + chunk.name + '.css', self.options.src + file);
          }
  
          if(file.indexOf('.js') !== -1){
            processedHtml = html.replace('dist/' + chunk.name + '.js', self.options.src + file);
          }
        });
      });
  
      fs.writeFileSync(self.options.fileName, processedHtml);
    });
  }

  module.exports = HtmlAssetNameReplacerPlugin;
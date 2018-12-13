const fs = require('fs');

function HtmlAssetNameReplacerPlugin(options){
    const self = this;
  
    const defaultOptions = {
      fileName: './public/index.html',
    };
  
    self.options = Object.assign(defaultOptions, options || {});
  }
  
  HtmlAssetNameReplacerPlugin.prototype.apply = function(compiler){
    const self = this;
  
    compiler.hooks.done.tap('Html assetname replacer plugin', function(stats){ 
      console.log('Replacing asset names in: ' + self.options.fileName);
      
      let html = fs.readFileSync(self.options.fileName, "utf8");
      
      stats.compilation.chunks.forEach(chunk => {
        chunk.files.forEach(file => {
          if(file.indexOf('.css') !== -1){
            html = html.replace(chunk.name + '.css', file);
          }
  
          if(file.indexOf('.js') !== -1){
            html = html.replace(chunk.name + '.js', file);
          }
        });
      });
  
      fs.writeFileSync(self.options.fileName, html);
    })
  }

  module.exports = HtmlAssetNameReplacerPlugin;
/**
 * config.js
 *
 * @version   1.0.2
 * @author    Ricky Hurtado <ricky@aelogica.com>
 *
 * Required JS configuration file for Ironframework.
 */

/**
 * Development option
 *
 * Use 'dev' for development and 'min' for production
 * Disable the console.log() function if option value is 'min'
 */
I.JsVersion = 'dev';

if (I.JsVersion == 'min')
{
  console.log = function(){};
}

/**
 * Init properties
 */
I.CoreModule = ['core'];
I.JsPath     = I.BaseURL + '/assets/js';
I.Paths      = {};
I.Shim       = {};

/**
 * Init the namespaces
 */
I.Core    = {};
I.Helper  = {};
I.Library = {};

/**
 * Register the required JS files from CDN
 */
I.Paths.backbone   = ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min', 'vendor/backbone/backbone-1.1.2.min'];
I.Paths.jquery     = ['//code.jquery.com/jquery-1.11.1.min', 'vendor/jquery/jquery-1.11.1.min'];
I.Paths.modernizr  = ['//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min', 'vendor/modernizr/modernizr-2.8.2.min'];
I.Paths.underscore = ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min', 'vendor/underscore/underscore-1.6.0.min'];

/**
 * Register the required JS files from localhost
 */
I.Paths.backbone_extend       = ['vendor/backbone/backbone-extend-1.0.0.min'];
I.Paths.backbone_subroute     = ['vendor/backbone/backbone-subroute-0.4.3.min'];
I.Paths.backbone_localstorage = ['vendor/backbone/backbone-localstorage-1.1.9.min'];
I.Paths.ejs                   = ['vendor/ejs/ejs-1.0.min'];

/**
 * Register the I.Shim for vendor
 */
I.Shim.backbone              = { deps    : ['underscore'], exports : 'Backbone' };
I.Shim.backbone_extend       = { deps    : ['backbone'] };
I.Shim.backbone_subroute     = { deps    : ['backbone'] };
I.Shim.backbone_localstorage = { deps    : ['backbone'] };
I.Shim.modernizr             = { exports : 'Modernizr' };
I.Shim.underscore            = { exports : '_' };

/**
 * Libraries
 *
 * Library modules must be enabled here by adding the JS file name (excluding the prefix).
 */
I.Libraries = [
  'collection',
  'form',
  'sse'
];

/**
 * Helpers
 *
 * Helper modules must be enabled here by adding the JS file name (excluding the prefix).
 */
I.Helpers = [
  'sha1',
  'utf8-encode'
];

/**
 * Convert dashed string into camel case
 */
I.toCamel = function(string)
{
  return (string.charAt(0).toUpperCase() + string.slice(1)).replace(/(\-[a-z])/g, function($1)
  {
    return $1.toUpperCase().replace('-','');
  });
};

/**
 * Register the modules in I.Paths and I.Shim object
 */
I.RegisterModule = function(modules, type)
{
  if (modules != undefined)
  {
    for (var i = 0; i < modules.length; i++)
    {
      var module       = modules[i];
      var module_prop  = module.replace(/-/g, '_');
      var module_path  = type + '/' + module + '/' + I.JsVersion + '/' + module;
      var module_class = I.toCamel(module);

      if (type.match(/libraries|helpers/))
      {
        // Convert libraries or helpers into singular form otherwise, retain the type value
        new_type = type == 'libraries' ? 'library' : 'helper';

        I.Paths[module_prop + '_' + new_type] = [module_path + '.' + new_type + '.' + I.JsVersion];
        I.Shim[module_prop + '_' + new_type]  = { deps : ['jquery'], exports : module_class + I.toCamel(type) };
      }
      else
      {
        if (type == 'collections')
        {
          I.Paths[module_prop + '_collection'] = [module_path + '.collection.' + I.JsVersion];
          I.Paths[module_prop + '_model']      = [module_path + '.model.' + I.JsVersion];

          I.Shim[module_prop + '_collection']  = { deps : ['backbone'] };
          I.Shim[module_prop + '_model']       = { deps : ['backbone'] };
        }

        if (type == 'modules')
        {
          I.Paths[module_prop + '_module']     = [module_path + '.module.' + I.JsVersion];
          I.Paths[module_prop + '_controller'] = [module_path + '.controller.' + I.JsVersion];
          I.Paths[module_prop + '_router']     = [module_path + '.router.' + I.JsVersion];
          I.Paths[module_prop + '_view']       = [module_path + '.view.' + I.JsVersion];

          I.Shim[module_prop + '_module']      = { deps : ['backbone'] };
          I.Shim[module_prop + '_controller']  = { deps : ['backbone'] };
          I.Shim[module_prop + '_router']      = { deps : ['backbone'] };
          I.Shim[module_prop + '_view']        = { deps : ['backbone'] };
        }
      }
    }
  }
};

/**
 * Register the modules to I.Paths object and I.Shim object export
 */

I.Module = I.CoreModule.concat(I.Module);
I.RegisterModule(I.Module, 'modules');
I.RegisterModule(I.BaseModule, 'modules');
I.RegisterModule(I.Collection, 'collections');
I.RegisterModule(I.Libraries, 'libraries');
I.RegisterModule(I.Helpers, 'helpers');

/**
 * Log the I.Paths and I.Shim
 */
console.log('---\n[START] I.Paths and I.Shim Object Registration');
console.log(I.Paths);
console.log(I.Shim);
console.log('[END] I.Paths and I.Shim Object Registration\n---');

/**
 * Log use minified version
 */
if (I.JsVersion == 'dev')
{
    console.log('[NOTE] You are using the development version of the JavaScript files.\n---');
}

/**
 * Initialize requirejs.config
 */
requirejs.config({
  appDir  : '.',
  baseUrl : I.JsPath,
  paths   : I.Paths,
  shim    : I.Shim
});

/**
 * Initialize the modules. Add paths here if the JS file must be initially loaded.
 */
require([
  'jquery',
  'underscore',
  'backbone',
  'backbone_extend',
  'backbone_subroute',
  'backbone_localstorage',
  'modernizr',
  'ejs',
  'core_router'
],
function()
{
  // Change the EJS template extension from .ejs to .html
  EJS.config({ext:".html"});

  for (var i = 0; i < I.Module.length; i++)
  {
    var active_module = I.Module[i].replace(/-/g, '_') + '_module';

    require([active_module], function(module_class)
    {
      // Instantiate the module class
      I.Modules = new module_class;
    });
  }
});

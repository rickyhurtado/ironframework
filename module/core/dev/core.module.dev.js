/**
 * core.module.dev.js
 * 
 * @package   CoreModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_view',
  'core_controller',
  'core_router'
],
function(
  CoreView,
  CoreController,
  CoreRouter
){
  /**
   * Init Core properties
   */
  I.Core.View       = new CoreView;
  I.Core.Controller = new CoreController;
  I.Core.Router     = new CoreRouter;

  /**
   * Init CoreModule class
   */
  var CoreModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.CoreModule has been initialized.');
      
      // Init browser history
      if (!Backbone.History.started)
      {
        Backbone.history.start();
        Backbone.history.navigate(Backbone.history.fragment, {trigger: true});
      }
      
      // Push history function for link with data-route attribute
      $(document).on('click', 'a[data-route-on=true]', function(e)
      {
        // Init var
        var fragment = $(this).attr('href').replace(I.BaseURL, '');
        
        // Prevent the default event of the link
        if (!(e.metaKey || e.ctrlKey))
        {
          e.preventDefault();
        }
        
        Backbone.history.navigate(fragment, true);
      });
    }
  });
  
  return CoreModule;
});
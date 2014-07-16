/**
 * data.router.dev.js
 * 
 * @package   DataRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module',
  'init_module'
],
function()
{
  /**
   * Init DataRouter class
   */
  var DataRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      I.Data.View.renderDataPage();
      
      console.log('Backbone.SubRoute.DataRouter has been initialized.');
    },
            
    /**
     * Register routes
     */
    routes :
    {
      ''          : 'index',
      ':category' : 'displayContacts'
    },
    
    /**
     * Index route function
     */
    index : function()
    {
      console.log('[Route] model-and-collection');
      
      clearTimeout(this.checkPage);
      
      // Check if syncing process is active
      I.Init.Controller.checkSyncingProcess(function()
      {
        I.Data.View.displayCategory();
        I.Data.Controller.showContent(I.Data.View.target.categoryContent);
      });
    },
    
    /**
     * displayContacts route function
     */
    displayContacts : function(category)
    {
      console.log('[Route] model-and-collection/' + category);
      
      clearTimeout(this.checkPage);
      
      // Check if syncing process is active
      I.Init.Controller.checkSyncingProcess(function()
      {
        I.Data.View.displayContacts(category);
        I.Data.Controller.showContent(I.Data.View.target.contactsContent);
      });
    }
  });
  
  return DataRouter;
});
/**
 * contacts.router.dev.js
 * 
 * @package   ContactsRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module',
  'data_module'
],
function()
{
  /**
   * Init ContactsRouter class
   */
  var ContactsRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      
      console.log('Backbone.SubRoute.ContactsRouter has been initialized.');
    },
    
    /**
     * Register routes
     */
    routes :
    {
      ':category/:person_id' : 'profile'
    },
    
    /**
     * Profile route function
     */
    profile : function(category, person_id)
    {
      console.log('[Route] model-and-collection/' + category + '/' + person_id);
      
      clearTimeout(this.checkPage);
      
      // Check if syncing process is active
      I.Init.Controller.checkSyncingProcess(function()
      {
        I.Contacts.View.displayProfile(category, person_id);
        I.Data.Controller.showContent();
        I.Core.Controller.showContent( { el : I.Contacts.View.target.profileContent, rel : '.data-content' } );
      });
    }
  });
  
  return ContactsRouter;
});
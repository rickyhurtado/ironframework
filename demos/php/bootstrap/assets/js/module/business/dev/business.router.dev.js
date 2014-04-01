/**
 * business.router.dev.js
 * 
 * @package   BusinessRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'contacts_router',
  'core_module',
  'data_module'
],
function(
  ContactsRouter
){
  /**
   * Init BusinessRouter class
   */
  var BusinessRouter = ContactsRouter.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      
      console.log('Backbone.SubRoute.BusinessRouter has been initialized.');
    },
    
    /**
     * Register routes
     */
    routes :
    {
      'business/:person_id'  : 'business',
      ':category/:person_id' : 'profile'
    },
    
    /**
     * Business route function
     */
    business : function(person_id)
    {
      console.log('[Route] model-and-collection/business/' + person_id);
      
      clearTimeout(this.checkPage);
      
      // Check if syncing process is active
      I.Init.Controller.checkSyncingProcess(function()
      {
        I.Business.View.personID = person_id;
        I.Business.View.displayProfile('business', person_id);
        I.Data.Controller.showContent();
        I.Core.Controller.showContent( { el : I.Business.View.target.profileContent, rel : '.data-content' } );
      });
    }
  });
  
  return BusinessRouter;
});
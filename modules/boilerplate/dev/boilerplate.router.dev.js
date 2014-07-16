/**
 * boilerplate.router.dev.js
 * 
 * @package   BoilerplateRouter
 * @category  Router
 * @version   0.0
 * @author    Firstname Lastname <firstname.lastname@email.com>
 */

define([
  'core_module'
], function()
{
  /**
   * Init BoilerplateRouter class
   */
  var BoilerplateRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      // Check if route function exits; otherwise display 404 page template
      this.checkPage = I.Core.Router.checkPage;
      
      // Make the route link clickable
      I.Core.Controller.enableObjectRoute(['data-route-value']);
      
      // Render the boilerplate page
      I.Boilerplate.View.renderBoilerplatePage();
      
      console.log('Backbone.SubRoute.BoilerplateRouter has been initialized.');
    },
    
    /**
     * Register routes
     */
    routes:
    {
      '' : 'index'
    },
    
    /**
     * Index route function
     */
    index : function()
    {
      console.log('[Route] boilerplate');
      
      // Clear the checking of page
      clearTimeout(this.checkPage);
      
      // Display the page
      I.Core.Controller.showContent( { el : I.Login.View.target.boilerplateContent, rel : '.sub-content[id]' } );
    }
  });
  
  return BoilerplateRouter;
});
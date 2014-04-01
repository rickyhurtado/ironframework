/**
 * login.router.dev.js
 * 
 * @package   LoginRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module'
], function()
{
  /**
   * Init LoginRouter class
   */
  var LoginRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      
      // Make the route link clickable
      I.Core.Controller.enableObjectRoute(['login']);
      
      // Insert new data role page
      I.Login.View.renderLoginPage();
      
      console.log('Backbone.SubRoute.LoginRouter has been initialized.');
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
      console.log('[Route] login');
      
      clearTimeout(this.checkPage);
      I.Core.Controller.showContent( { el : I.Login.View.target.loginContent, rel : '.mini-layout[id]' } );
    }
  });
  
  return LoginRouter;
});
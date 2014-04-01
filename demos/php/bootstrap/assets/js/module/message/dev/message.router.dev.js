/**
 * message.router.dev.js
 * 
 * @package   MessageRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module'
],
function()
{
  /**
   * Init MessageRouter class
   */
  var MessageRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      I.Message.View.renderMessagePage();
      
      console.log('Backbone.SubRoute.MessageRouter has been initialized.');
    },
    
    /**
     * Register routes
     */
    routes :
    {
      ''        : 'index',
      'message' : 'index'
    },
    
    /**
     * Index route function
     */
    index : function()
    {
      console.log('[Route] router-and-view');
      
      clearTimeout(this.checkPage);
      $(I.Message.View.target.message).html('');
      I.Core.Controller.showContent( { el : '#message-content', rel : '.mini-layout[id]' } );
    }
  });
  
  return MessageRouter;
});
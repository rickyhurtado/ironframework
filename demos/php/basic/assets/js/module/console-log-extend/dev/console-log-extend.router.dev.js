/**
 * console-log-extend.router.dev.js
 * 
 * @package   ConsoleLogExtendRouter
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
   * Init ConsoleLogExtendRouter class
   */
  var ConsoleLogExtendRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      
      console.log('Backbone.SubRoute.ConsoleLogExtendRouter has been initialized.');
    },
    
    /**
     * Register routes
     */
    routes :
    {
      'message/console-log' : 'consoleLog'
    },
    
    /**
     * ConsoleLog route function
     */
    consoleLog : function()
    {
      console.log('[Route] router-and-view/message/console-log');
      
      clearTimeout(this.checkPage);
      I.ConsoleLogExtend.View.displayConsoleLogMessage();
      I.Core.Controller.showContent( { el : '#message-content', rel : '.sub-content[id]' } );
    }
  });
  
  return ConsoleLogExtendRouter;
});
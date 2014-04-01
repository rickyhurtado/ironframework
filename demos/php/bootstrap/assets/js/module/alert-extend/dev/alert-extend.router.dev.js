/**
 * alert-extend.router.dev.js
 * 
 * @package   AlertExtendRouter
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
   * Init AlertExtendRouter class
   */
  var AlertExtendRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      
      console.log('Backbone.SubRoute.AlertExtendRouter has been initialized.');
    },
    
    /**
     * Register routes
     */
    routes :
    {
      'message/alert' : 'alert'
    },
    
    /**
     * Alert route function
     */
    alert : function()
    {
      console.log('[Route] router-and-view/message/alert');
      
      clearTimeout(this.checkPage);
      I.AlertExtend.View.displayAlertMessage();
      I.Core.Controller.showContent({ el : '#message-content', rel : '.mini-layout[id]' });
    }
  });
  
  return AlertExtendRouter;
});
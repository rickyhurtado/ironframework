/**
 * server-sent-event.router.dev.js
 * 
 * @package   ServerSentEventRouter
 * @category  Router
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module'
], function()
{
  /**
   * Init ServerSentEventRouter class
   */
  var ServerSentEventRouter = Backbone.SubRoute.extend(
  {
    /**
     * Initialize router
     */
    initialize : function()
    {
      this.checkPage = I.Core.Router.checkPage;
      
      // Render the server-sent-event page
      I.ServerSentEvent.View.renderServerSentEventPage();
      
      console.log('Backbone.SubRoute.ServerSentEventRouter has been initialized.');
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
      console.log('[Route] server-sent-event');
      
      clearTimeout(this.checkPage);
      I.Core.Controller.showContent( { el : I.ServerSentEvent.View.target.serverSentEventContent, rel : '.sub-content[id]' } );
      
      // Trigger the sessions SSE function
      // Check if the time element of any sse blocks is empty to avoid multiple sessions of sse
      if ($('#first-sse-session time').text() == '')
      {
        I.ServerSentEvent.Controller.firstSessionSSE();
        I.ServerSentEvent.Controller.secondSessionSSE();
        
        // Change the id value of $json['newId'] = 7 in data/json.php to see the dynamic changing of URL
        I.ServerSentEvent.Controller.thirdSessionSSE();
      }
    }
  });
  
  return ServerSentEventRouter;
});
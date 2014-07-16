/**
 * server-sent-event.module.dev.js
 * 
 * @package   ServerSentEventModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

// ServerSentEvent Namespace
I.ServerSentEvent = {};

define([
  'server_sent_event_view',
  'server_sent_event_controller',
  'server_sent_event_router'
],
function(
  ServerSentEventView,
  ServerSentEventController,
  ServerSentEventRouter
){
  /**
   * Init ServerSentEvent properties
   */
  I.ServerSentEvent.View       = new ServerSentEventView;
  I.ServerSentEvent.Controller = new ServerSentEventController;
  I.ServerSentEvent.Router     = new ServerSentEventRouter('server-sent-event');
  
  /**
   * Init ServerSentEventModule class
   */
  var ServerSentEventModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.ServerSentEventModule has been initialized.');
    }
  });
  
  return ServerSentEventModule;
});
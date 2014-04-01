/**
 * message.module.dev.js
 * 
 * @package   MessageModule
 * @category  Module
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 *
 * This module is for the demonstration of the router and view
 */

// Message Namespace
I.Message = {};

define([
  'message_view',
  'message_controller',
  'message_router'
],
function(
  MessageView,
  MessageController,
  MessageRouter
){
  /**
   * Init Message properties
   */
  I.Message.View       = new MessageView;
  I.Message.Controller = new MessageController;
  I.Message.Router     = new MessageRouter('router-and-view');

  /**
   * Init MessageModule class
   */
  var MessageModule = Backbone.Module.extend(
  {
    /**
     * Initialize module
     */
    initialize : function()
    {
      console.log('Backbone.Module.MessageModule has been initialized.');
      
      // Display the buttons from the buttons template
      I.Message.Controller.displayButtons();
      I.Message.Controller.setOptionAlertMessage('The original alert message has been override in message.module.dev.js on line #46. Comment out the line to see the original message.');
    }
  });
  
  return MessageModule;
});
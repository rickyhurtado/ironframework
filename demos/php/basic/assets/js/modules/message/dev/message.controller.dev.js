/**
 * message.controller.dev.js
 * 
 * @package   MessageController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init MessageController class
   */
  var MessageController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.MessageController has been initialized.');
    },
    
    /**
     * Display the buttons
     */
    displayButtons : function()
    {
      I.Message.View.renderButton('console');
      I.Message.View.renderButton('alert');
    },
    
    /**
     * Set the options console log message
     */
    setOptionConsoleMessage : function(msg)
    {
      I.Message.View.options.message.consoleLog = msg;
    },
    
    /**
     * Set the target content value
     */
    setOptionAlertMessage : function(msg)
    {
      I.Message.View.options.message.alert = msg;
    }
  });
  
  return MessageController;
});
/**
 * console-log-extend.view.js
 * 
 * @package   ConsoleLogExtendView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'message_view'
],
function(
  MessageView
){
  /**
   * Init ConsoleLogExtendView class
   */
  var ConsoleLogExtendView = MessageView.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('MessageView.ConsoleLogExtendView has been initialized.');
      this.options.message.consoleLog = 'This console log message has been changed via ConsoleLogExtendView class.';
    },
    
    /**
     * Attach events to elements
     */
    events :
    {
      'click .console-log-extend-button' : 'consoleLogFunction'
    },
    
    /**
     * ConsoleLog function triggered by click event
     */
    consoleLogFunction : function()
    {
      console.log('[Function] This message was displayed via ConsoleLogExtendView::consoleLogFunction() by a click event declared in ConsoleLogExtendView class.');
    },
    
    /**
     * Display message
     */
    displayMessage : function(message)
    {
      $(this.target.message).html('<p><strong>Message:</strong> ' + message + '</p><p><em>Message::displayMessage() function has been override via ConsoleLogExtendView class.</em></p>');
    }
  });
  
  return ConsoleLogExtendView;
});
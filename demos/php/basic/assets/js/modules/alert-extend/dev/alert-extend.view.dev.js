/**
 * alert-extend.view.js
 * 
 * @package   AlertExtendView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'message_view',
  'message_module'
],
function(
  MessageView
){
  /**
   * Init AlertExtendView class
   */
  var AlertExtendView = MessageView.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('AlertView.AlertExtendView has been initialized.');
      I.Message.Controller.setOptionAlertMessage('This alert message has been changed via AlertExtendView class.');
    },
    
    /**
     * Display message
     */
    displayMessage : function(message)
    {
      $(this.target.message).html('<p><strong>Message:</strong> ' + message + '<p></p><em>Message::displayMessage() function has been override via AlertExtendView class.</em></p>');
    }
  });
  
  return AlertExtendView;
});
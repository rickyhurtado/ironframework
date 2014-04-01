/**
 * message.view.dev.js
 * 
 * @package   MessageView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'core_module'
], function()
{
  /**
   * Init MessageView class
   */
  var MessageView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.MessageView has been initialized.');
    },
    
    /**
     * Default values
     */
    options :
    {
      message :
      {
        consoleLog : 'Default message of console log button.',
        alert      : 'Default message of alert button.'
      }
    },
    
    /**
     * Set the el property
     */
    el : $('body'),
    
    /**
     * Target element container
     */
    target :
    {
      mainContent : '#main-content',
      content     : '#target-content',
      message     : '#log-message'
    },
    
    /**
     * Init template property for EJS container
     */
    template :
    {
      messagePage : new EJS( {url: I.JsPath + '/module/message/template/' + I.JsVersion + '/message-page.' + I.JsVersion + '.html'} ),
      buttons     : new EJS( {url: I.JsPath + '/module/message/template/' + I.JsVersion + '/buttons.' + I.JsVersion + '.html'} )
    },
    
    /**
     * Attach events to elements
     */
    events :
    {
      'click .console-log-btn' : 'displayConsoleLogMessage',
      'click .alert-btn'       : 'displayAlertMessage'
    },
    
    /**
     * Render message page
     */
    renderMessagePage : function()
    {
      $(this.target.mainContent).append(this.template.messagePage.render({}));
    },
    
    /**
     * Display console log or alert button from EJS template
     */
    renderButton : function(button)
    {
      $(this.target.content).append(this.template.buttons.render({ button : button }));
    },
    
    /**
     * Display message
     */
    displayMessage : function(message)
    {
      $(this.target.message).html('<p><strong>Message:</strong> ' + message + '</p>');
    },
    
    /**
     * Display console log message
     */
    displayConsoleLogMessage : function()
    {
      var message = this.options.message.consoleLog;
      
      this.displayMessage(message);
      console.log(message);
    },
    
    /**
     * Display alert message
     */
    displayAlertMessage : function()
    {
      var message = this.options.message.alert;
      
      this.displayMessage(message);
      console.log('[Message displayed via alert]');
      alert(message);
    }
  });
  
  return MessageView;
});
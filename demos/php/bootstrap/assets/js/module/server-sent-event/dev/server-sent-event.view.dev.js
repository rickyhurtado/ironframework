/**
 * server-sent-event.view.dev.js
 * 
 * @package   ServerSentEventView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([], function()
{
  /**
   * Init ServerSentEventView class
   */
  var ServerSentEventView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.ServerSentEventView has been initialized.');
    },
    
    /**
     * Init template property fpr EJS container
     */
    template :
    {
      serverSentEventPage : new EJS( {url: I.JsPath + '/module/server-sent-event/template/' + I.JsVersion + '/server-sent-event-page.' + I.JsVersion + '.html'} )
    },
    
    /**
     * Target element container
     */
    target :
    {
      mainContent            : '#main-content',
      serverSentEventContent : '#server-sent-event-content'
    },
    
    /**
     * Render server-sent-event page
     */
    renderServerSentEventPage : function()
    {
      $(this.target.mainContent).append(this.template.serverSentEventPage.render({}));
    }
  });
  
  return ServerSentEventView;
});
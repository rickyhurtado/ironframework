/**
 * server-sent-event.controller.dev.js
 * 
 * @package   ServerSentEventController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'sse_library'
], function()
{
  /**
   * Init ServerSentEventModule class
   */
  var ServerSentEventController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.ServerSentEventController has been initialized.');
    },
    
    /**
     * SSE library init for first session
     */
    firstSessionSSE : function()
    {
      // Init vars
      var refresh    = 3;
      var expiration = 12;
      
      I.Library.SSE.init(
      {
        id         : 'first-session',
        url        : I.BaseURL + '/data/json.php?process=sse&refresh=' + refresh,
        refresh    : refresh,
        expiration : expiration,
        success    : function(data)
        {
          $('#first-sse-session time').html(data.date_time);
          $('#first-sse-session span.request').html(data.request);
          $('#first-sse-session span.status').html('Active');
          $('#first-sse-session span.refresh').html(refresh);
          $('#first-sse-session span.expire').html(expiration);
        },
        error      : function()
        {
          $('#first-sse-session span.status').html('Error');
        },
        expire     : function()
        {
          $('#first-sse-session span.status').html('Inactive');
        }
      });
    },
    
    /**
     * SSE library init for second session forcing to use AJAX instead of SSE
     */
    secondSessionSSE : function()
    {
      // Init vars
      var refresh    = 5;
      var expiration = 15;
      
      I.Library.SSE.init(
      {
        id         : 'second-session',
        url        : I.BaseURL + '/data/json.php?process=sse',
        refresh    : refresh,
        ajax       : true,
        expiration : expiration,
        success    : function(data)
        {
          $('#second-sse-session time').html(data.date_time);
          $('#second-sse-session span.request').html(data.request);
          $('#second-sse-session span.status').html('Active');
          $('#second-sse-session span.refresh').html(refresh);
          $('#second-sse-session span.expire').html(expiration);
        },
        error      : function()
        {
          $('#second-sse-session span.status').html('Error');
        },
        expire     : function()
        {
          $('#second-sse-session span.status').html('Inactive');
        }
      });
    },
    
    /**
     * SSE library init for third session; updating the URL
     *
     * Change the id value of $json['newId'] = 7 in data/json.php to see the dynamic changing of URL
     */
    thirdSessionSSE : function()
    {
      // Init vars
      var refresh    = 4;
      var expiration = 20;
      var url        = I.BaseURL + '/data/json.php?process=sse&refresh=' + refresh + '&with-id=true';
      var sse_id     = 'third-session';
      
      I.Library.SSE.init(
      {
        id         : sse_id,
        url        : url,
        refresh    : refresh,
        expiration : expiration,
        success    : function(data)
        {
          // Init var
          var id = $('#third-sse-session span.current-id').html();
          
          if (id != data.newId)
          {
            console.log('SSE has been manually stopped...');
            
            // Update the URL
            I.Library.SSE.url[sse_id] = url + '&new-id=' + data.newId;
            
            // Restart the SSE
            I.Library.SSE.reset(sse_id);
          }
          
          $('#third-sse-session span.current-id').html(data.newId);
          $('#third-sse-session span.current-url').html(I.Library.SSE.url[sse_id]);
          $('#third-sse-session time').html(data.date_time);
          $('#third-sse-session span.request').html(data.request);
          $('#third-sse-session span.status').html('Active');
          $('#third-sse-session span.refresh').html(refresh);
          $('#third-sse-session span.expire').html(expiration);
        },
        error      : function()
        {
          $('#third-sse-session span.status').html('Error');
        },
        expire     : function()
        {
          $('#third-sse-session span.status').html('Inactive');
        }
      });
    }
  });
  
  return ServerSentEventController;
});
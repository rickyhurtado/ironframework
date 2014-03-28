/**
 * sse.library.dev.js
 * 
 * @category  Library
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

I.Library.SSE =
{
  /**
   * Initialize properties
   */
  url           : {}, // URL for SSE request
  sseObj        : {}, // Store the SSE session ID
  startSseObj   : {}, // Store the startAJAX session if SSE is not used
  sseObjExpire  : {}, // Store the SSE expiration timeout session
  sseObjRestart : [], // Restart the SSE object that has been expired
  ajax          : {}, // Force real time update to use AJAX long polling method
  refresh       : {}, // Refresh time in seconds
  expiration    : {}, // Expiration time in seconds of inactive items with SSE/AJAX long polling process
  restart       : {}, // Enable or disable the restart of SSE when
  success       : {}, // Success function callback
  error         : {}, // Error function callback
  expire        : {}, // Expiration function callback
  
  /**
   * Initialize SSE library
   */
  init : function(opt)
  {
    // Set and initialize the library properties
    this.url[opt.id]          = opt.url;
    this.ajax[opt.id]         = opt.ajax ? opt.ajax : false;
    this.refresh[opt.id]      = opt.refresh ? opt.refresh : 30;
    this.expiration[opt.id]   = opt.expiration ? opt.expiration : false;
    this.success[opt.id]      = opt.success;
    this.error[opt.id]        = opt.error;
    this.expire[opt.id]       = opt.expire;
    this.restart[opt.id]      = opt.restart ? opt.restart : true;
    this.sseObjExpire[opt.id] = 0;
    
    // Bind events
    this.bindEvents();
    
    // Start SSE
    this.start(opt.id);
  },
  
  /**
   * Bind the mouse move and keyup events to restart the expired SSE
   */
  bindEvents : function()
  {
    // Init var
    var self  = this;
    var reset = true;
    
    $(document).on('mousemove keyup', 'body', function()
    {
      // Restart SSE of inactive objects
      if (self.sseObjRestart.length > 0)
      {
        _.map(self.sseObjRestart, function(id)
        {
          if (self.restart[id])
          {
            self.start(id);
          }
        });

        self.sseObjRestart = [];
      }
      
      // Clear timeout of the active SSE objects before it will expire
      if (reset)
      {
        // Set reset to false before clearing the timeouts
        reset = false;
        
        _.map(self.sseObjExpire, function(val, id)
        {
          clearTimeout(self.sseObjExpire[id]);
          self.sseObjExpire[id] = 0;
          self.setExpiration(id);
        });
        
        // Set reset to true after clearing the timeouts
        reset = true;
      }
    });
  },
  
  /**
   * SSE function
   */
  start : function(id)
  {
    // Init var
    var self = this;
    
    // Check if modern browser
    if (typeof(EventSource) == undefined)
    {
      self.ajax[id] = true;
    }
    
    // Create an SSE object
    if (id != null && !self.ajax[id])
    {
      // Start SSE
      self.sseObj[id] = new EventSource(self.url[id]);                    
      
      console.log('[' + id + '] SSE session has been started.');
      
      // Check if session is expired
      self.sseObj[id].onerror = function()
      {
        if (self.sseObj[id].readyState == 2)
        {
          // Callback error function
          self.error[id]();
        }
      };
      
      // SSE success response
      self.sseObj[id].onmessage = function(e)
      {
        // Parse the string data
        var data = JSON.parse(e.data);
        
        console.log('[SSE] ID: ' + id);
        console.log('[SSE] URL: ' + self.url[id]);
        
        // Callback success function
        self.success[id](data);
      }
    }
    else
    {
      console.log('[' + id + '] SSE (AJAX) session has been started.');
  
      // AJAX long polling method option
      self.startAJAX(id);
    }
    
    // Set SSE expiration
    self.setExpiration(id);
  },
  
  /**
   * AJAX long polling method
   */
  startAJAX : function(id)
  {
    // Init var
    var self = this;
    
    // Request data via AJAX request
    self.sseObj[id] = Backbone.ajax({
      url      : self.url[id],
      type     : 'post',
      dataType : 'json',
      cache    : false,
      success  : function(json)
      {
        // Restart AJAX after refresh time
        self.startSseObj[id] = setTimeout(function()
        {
          console.log('[SSE AJAX] ID: ' + id);
          self.startAJAX(id);
          
        }, self.refresh[id] * 1000);
        
        // Call the success function
        self.success[id](json);
      },
      error    : function()
      {
        // Call the error function
        self.error[id];
      }
    });
  },
  
  /**
   * Set the expiration of the SSE/AJAX long polling method
   */
  setExpiration : function(id)
  {
    // Init var
    var self = this;
    
    if (self.sseObjExpire[id] == 0 && self.expiration[id])
    {
      self.sseObjExpire[id] = setTimeout(function()
      {
        // Abort all processes
        self.abort(id);

        // Call the expiration function
        self.expire[id]();
        
      }, self.expiration[id] * 1000);
    }
  },
  
  /**
   * Abort SSE/AJAX long polling method upon expiration timeout
   */
  abort : function(id)
  {
    // Abort AJAX long polling method
    if (this.ajax[id])
    {
      // Clear set time out
      clearTimeout(this.startSseObj[id]);
      
      // Abort AJAX request
      this.sseObj[id].abort();
      
      console.log('[' + id + '] SSE (AJAX) session has been stopped.');
    }
    // Abort the SSE session
    else
    {
      this.sseObj[id].close();
      console.log('[' + id + '] SSE session has been stopped.');
    }
    
    // Clear the timeout for expiration
    clearTimeout(this.sseObjExpire[id]);
    
    // Init the SSE object for expiration
    this.sseObjExpire[id] = 0;
    
    // Store the expired session for restarting
    if (_.indexOf(this.sseObjRestart, id) < 0)
    {
      this.sseObjRestart.push(id);
    }
  },
  
  /**
   * Manually restart the SSE
   */
  reset : function(id)
  {
    this.abort(id);
    $('body').trigger('keyup');
    console.log('[' + id + '] SSE session has been reset.');
  }
};
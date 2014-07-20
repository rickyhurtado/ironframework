/**
 * init.controller.dev.js
 *
 * @package   InitController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'settings_module',
  'collection_library'
], function()
{
  /**
   * Init InitModule class
   */
  var InitController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.InitController has been initialized.');

      // Init and set the settings property
      this.settings = I.Settings.Controller;

      // Update the settings
      // this.settings.update( { setting : 'sync_data_on_login', value : false } );
      // this.settings.update( { setting : 'sync_data_on_page_load', value : false } );
      // this.settings.update( { setting : 'auto_sync_data', value : true } );
      this.settings.update( { setting : 'storage_cache_time', value : 1 } );
      this.settings.update( { setting : 'cache_time_type', value : 'hour' } );
      console.log(this.settings.models());

      // Set the models

      // Set the collections
    },

    /**
     * Init options
     */
    options :
    {
      sync_url        : I.BaseURL + '/data/json.php?data=sync',
      cache_time_type : 'second',
      models          : {},
      collections     : {},
      json_data       : {}
    },

    /**
     * Start checking the local storage settings syncing time schedule
     */
    syncData : function()
    {
      // Init vars
      var self                 = this;
      var auto_sync            = this.settings.get('auto_sync_data');
      var sync_data_in_process = this.settings.get('sync_data_in_process');
      var sync_on_page_load    = this.settings.get('sync_data_on_page_load');
      // var sync_data_on_login   = this.settings.get('sync_data_on_login'); // If login feature is present

      if (auto_sync || sync_on_page_load)
      {
        // Init syncing remote data
        // If login feature is present
        // if (self.checkSyncStatus() && (sync_on_page_load || sync_data_in_process || sync_data_on_login))
        if (self.checkSyncStatus() && (sync_on_page_load || sync_data_in_process))
        {
          self.syncLocalStorage();
        }

        if (auto_sync)
        {
          // Check the syncing time expiration
          setInterval(function()
          {
            if (self.checkSyncStatus())
            {
              self.syncLocalStorage();
            }
          }, 10000);
        }
      }
    },

    /**
     * Check the sync time
     *
     * Sample settings functions:
     *
     * this.settings.add({ setting : 'cache_time_type', value : 'hour', title : 'Cache Time Type', description : 'Select hour or second for time type.' });
     * this.settings.add({ setting : 'storage_cache_time', value : 60, title : 'Storage Cache Time', description : 'Length of time before auto-syncing of server data.' });
     * this.settings.add({ setting : 'date_time_synced', value : null, title : 'Date and Time Synced', description : 'Data and time of last syncing of server data.' });
     * this.settings.update({ setting : 'storage_cache_time', value : 360 });
     * this.settings.remove('storage_cache_time');
     * this.settings.get('storage_cache_time');
     * this.settings.get('storage_cache_time');
     * this.settings.get('storage_cache_time', true); // If true, returns the model object
     * JSON.stringify(this.settings.collection()); // Return the collection object
     * JSON.stringify(this.settings.models()); // Return the collection model objects
     */
    checkSyncStatus : function()
    {
        // Init vars
        var today              = parseInt(new Date().getTime()/1000);
        var storage_cache_time = this.settings.get('storage_cache_time');
        var cache_time_type    = this.settings.get('cache_time_type');
        var date_last_synced   = this.settings.get('date_time_synced');
        var multiplier         = 1;

        // Convert time into milliseconds
        switch(cache_time_type)
        {
          case 'hour'   : multiplier = 3600;
          case 'minute' : multiplier = 60;
          default       : storage_cache_time *= multiplier;
        }

        // Check if local storage sync time has been reached
        return today - date_last_synced >= storage_cache_time;
    },

    /**
     * Call back process function when syncing process is completed
     */
    callbackProcess : function(callback)
    {
      callback();
    },

    /**
     * Check if syncing process is active
     */
    checkSyncingProcess : function(callback)
    {
      // Init var
      var self = this;
      var check_sync_process;

      if (self.settings.get('sync_data_in_process'))
      {
        console.log('Syncing remote data is in process...');

        check_sync_process = setInterval(function()
        {
          console.log(self.settings.get('sync_data_in_process'));

          if (!self.settings.get('sync_data_in_process'))
          {
            self.settings.update( { setting : 'sync_data_in_process', value : false } );
            self.callbackProcess(callback);
            clearInterval(check_sync_process);

            console.log('Syncing remote data has been completed.');
          }
        }, 100);
      }
      else
      {
        self.callbackProcess(callback);
      }
    },

    /**
     * Sync local storage
     */
    syncLocalStorage : function()
    {
      // Init var
      var self    = this;
      var options = self.options;

      // Set the the sync data in process
      this.settings.update({ setting : 'sync_data_in_process', value : true });

      // Sync local storage data
      console.log('Fetching the remote data...');

      I.Library.Collection.sync(
      {
        models      : options.models,
        collections : options.collections,
        url         : options.sync_url,
        data        : options.json_data,
        success     : function(data)
        {
          console.log('Fetching remote data is successful!');
          console.log(data);

          self.settings.update({ setting : 'sync_data_in_process', value : false });
          self.settings.update( { setting : 'date_time_synced', value : parseInt(new Date().getTime()/1000) } );
        },
        error       : function()
        {
          console.log('Fetching data from live server failed!');
        }
      });
    }
  });

  return InitController;
});

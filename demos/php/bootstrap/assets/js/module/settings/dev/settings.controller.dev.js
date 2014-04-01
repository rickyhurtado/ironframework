/**
 * settings.controller.dev.js
 * 
 * @package   SettingsController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'settings_model'
], function(
  SettingsModel
){
  /**
   * Init SettingsModule class
   */
  var SettingsController = Backbone.Controller.extend(
  {
      /**
       * Initialize controller
       */
      initialize : function()
      {
        console.log('Backbone.Controller.SettingsController has been initialized.');
        
        // Set settings property
        this.settings = I.Settings.Collection;
        this.settings.fetch();
        
        // Reset the sync settings
        // this.remove('sync_data_on_login');
        // this.remove('sync_data_on_page_load');
        // this.remove('sync_data_in_process');
        // this.remove('auto_sync_data');
        // this.remove('cache_time_type');
        // this.remove('storage_cache_time');
        // this.remove('date_time_synced');
        // this.remove('sync_data_in_process');
        
        // Init settings collection
        if (!this.get('storage_cache_time'))
        {
          this.add({ setting : 'sync_data_on_login', value : true, title : 'Sync Data on Log In', description : 'Sync the remote data upon successful log in.' });
          this.add({ setting : 'sync_data_on_page_load', value : true, title : 'Sync Data on Page Load', description : 'Sync the remote data on page load.' });
          this.add({ setting : 'sync_data_in_process', value : true, title : 'Sync Data in Process', description : 'Set true if syncing is in process and false if done.' });
          this.add({ setting : 'auto_sync_data', value : false, title : 'Auto-sync Data', description : 'Auto-sync the remote data.' });
          this.add({ setting : 'cache_time_type', value : 'minute', title : 'Cache Time Type', description : 'Select hour or second for time type.' });
          this.add({ setting : 'storage_cache_time', value : 60, title : 'Storage Cache Time', description : 'Set the expiration time before auto-syncing the remote data.' });
          this.add({ setting : 'date_time_synced', value : 0, title : 'Date and Time Last Synced', description : 'Date and time of recent syncing of the remote data.' });
        }
          
         // console.log(JSON.stringify(this.models()));
      },
      
      /**
       * Return all the collection model objects
       * 
       * @returns {object}
       */
      models : function()
      {
        return this.settings.models;
      },
      
      /**
       * Return the collection object
       * 
       * @returns {object}
       */
      collection : function()
      {
        return this.settings;
      },
      
      /**
       * Add new setting to settings collection local storage
       * If setting already exists, update the value instead
       * 
       * @returns {collection} If setting is added sucessfully
       * @returns {boolean} If setting is updated sucessfully
       */
      add : function(setting)
      {
        if (this.get(setting.setting) == undefined)
        {
          return this.settings.create( new SettingsModel(setting) );
        }
        else
        {
          return this.update(setting);
        }
      },
      
      /**
       * Return the setting value or model object
       * If return_model is set to true, return the model object
       * 
       * @param {object} return_model
       * @param {model.value} model.get('value') Any value except undefined
       */
      get : function(setting, return_model)
      {
        // Init var
        var model = this.settings.find(function(s)
        {
          return s.get('setting') == setting;
        });
        
        if (model == undefined)
        {
          return undefined;
        }
        
        if (return_model)
        {
          return model;
        }
        
        return model.get('value');
      },
      
      /**
       * Update the setting value
       * 
       * @returns {boolean}
       */
      update : function(setting)
      {
        // Init var
        var model  = this.get(setting.setting, true);
        var result = true;
        
        if (model)
        {
          model.save( setting, { error : function(){ result = false; } } );
        }
        else
        {
          return false;
        }
        
        return result;
      },
      
      /**
       * Delete the setting
       * 
       * @returns {boolean}
       */
      remove : function(setting)
      {
        // Init var
        var model  = this.get(setting, true);
        var result = true;
        
        if (model)
        {
          model.destroy( { error : function(){ result = false; } } );
        }
        else
        {
          return false;
        }
        
        return result;
      }
  });
  
  return SettingsController;
});
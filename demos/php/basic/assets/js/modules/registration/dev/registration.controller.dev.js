/**
 * registration.controller.dev.js
 * 
 * @package   RegistrationController
 * @category  Controller
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'registration_model',
  'registration_contacts_model',
  'utf8_encode_helper',
  'sha1_helper',
  'form_library',
  'settings_module'
], function(
  RegistrationModel,
  RegistrationContactsModel
){
  /**
   * Init RegistrationModule class
   */
  var RegistrationController = Backbone.Controller.extend(
  {
    /**
     * Initialize controller
     */
    initialize : function()
    {
      console.log('Backbone.Controller.RegistrationController has been initialized.');
    },
    
    /**
     * Options
     */
    options :
    {
      settingFormDate : 'registration_form_date',
      dataForm        : 'registration',
      inputContainer  : 'p',
      sessionTime     : 1800,
      collections     : {}
    },
    
    /**
     * Set the collection instances and options
     */
    setCollections : function()
    {
      this.settings = I.Settings.Controller;
      this.options.collections.registration = I.Registration.Collections.Registration;
      this.options.collections.contacts     = I.Registration.Collections.Contacts;
    },
    
    /**
     * Fetch the collections
     */
    fetchCollections : function()
    {
      // Init var
      var collections = this.options.collections;
      
      collections.registration.fetch();
      collections.contacts.fetch();
    },
    
    /**
     * Create models for registration collections
     */
    createModels : function()
    {
      // Init var
      var collections = this.options.collections;
      
      // Check if the initial model is already added, otherwise add new model with default values
      if (collections.registration.length == 0)
      {
        collections.registration.create( new RegistrationModel({}) );
        console.log('New registration model has been added to collection.');
      }
      
      if (collections.contacts.length == 0)
      {
        collections.contacts.create( new RegistrationContactsModel({}) );
        console.log('New registration contacts model has been added to collection.');
      }
    },
    
    /**
     * Set the registration form date in settings collection
     */
    setFormDateSetting : function()
    {
      if (!this.settings.get(this.options.settingFormDate))
      {
        this.settings.add({ setting : this.options.settingFormDate, value : 0, title : 'Registration Form Date', description : 'Set the date of the registration if form data has been updated.' });
      }
    },
    
    /**
     * Warning function
     */
    warning : function()
    {
      $('[data-form-continue=registration]').removeClass('hide');
    },
    
    /**
     * Response to warning message
     */
    response : function(response)
    {
      if (response == 'yes')
      {
        $('[data-form-continue=registration]').addClass('hide');
      }
      else
      {
        // Reset form and redirect to cancelled page
        this.resetForm();
        Backbone.history.navigate('register/cancelled', true);
      }
    },
    
    /**
     * Registration expired function
     */
    expired : function()
    {
      // Reset form and redirect to session expired page
      this.resetForm();
      Backbone.history.navigate('register/session-expired', true);
    },
    
    /**
     * Check the form expiration function
     */
    checkExpiration : function()
    {
      // Init var
      var self = this;
      
      // Check if form data from local storage is expired
      // Reset the local storage form data if expired
      this.form.checkExpiration(function()
      {
        I.Library.Form.reset({form : self.options.dataForm});
        
        // Re-initialize registration form
        self.initForm();
      });
    },
    
    /**
     * Set and initialize form
     */
    initForm : function()
    {
      // Init var
      var self    = this;
      var options = self.options;
      
      // Set and initialize collections and models
      self.setCollections();
      
      // Register and set the registration form update date
      self.setFormDateSetting();
      
      // Fetch the collections
      self.fetchCollections();
      
      // Create the models for registration collections
      self.createModels();
      
      // Set form library
      self.form = I.Library.Form;
      
      // Init form
      self.form.init({
        settings        : I.Settings.Controller,
        settingFormDate : options.settingFormDate,
        form            : options.dataForm,
        inputContainer  : options.inputContainer,
        collections     : options.collections,
        sessionTime     : options.sessionTime,
        warning         : function()
        {
          self.warning();
        },
        response :
        {
          yes : function()
          {
            self.response('yes');
          },
          no  : function()
          {
            self.response('no');
          }
        },
        expired : function()
        {
          self.expired();
        }
      });
      
      self.checkExpiration();
    },
    
    /**
     * Reset form
     */
    resetForm : function()
    {
      // Init var
      var self = this;
      
      I.Library.Form.reset({
        form : self.options.dataForm,
        init : function()
        {
          self.initForm();
        }
      });
    },
    
    /**
     * Submit the registration form
     */
    submitRegistrationForm : function()
    {
      // Init var
      var self  = this;
      var token = I.Helper.Sha1($('#registration-index-page [name=email]').val()).match(/.{1,8}/g);
      var data  = {};
      
      // Revalidate the form
      if (I.Library.Form.validate(self.options.dataForm))
      {
        // Set the person data
        data.person             = {};
        data.person.firstname   = $('[name=firstname]').val();
        data.person.lastname    = $('[name=lastname]').val();
        data.person.gender      = $('[name=gender]').val();
        data.person.birth_month = $('[name=birth_month]').val();

        // Set the contacts data
        data.contacts                   = {};
        data.contacts.email             = $('[name=email]').val();
        data.contacts.phone             = $('[name=phone]').val();
        data.contacts.direction_address = $('[name=direction_address]').val();

        // Set the subscription data
        data.subscription = {};
        data.subscription = I.Library.Form.getGroupedValue($('[data-form-input-group=subscription]'), true);

        // Set the other data
        data.confirmed              = I.Library.Form.getValue($('[name=confirmed]'));
        data[I.Token.registration] = token[0];

        // Request data via AJAX request
        Backbone.ajax({
          url      : I.BaseURL + '/data/json.php?process=register',
          type     : 'post',
          data     : data,
          dataType : 'json',
          cache    : false,
          success  : function(json)
          {
            // Change the page before resetting the form
            Backbone.history.navigate('register/success', true);
            
            // Reset form
            self.resetForm();
            
            I.Token.registration = json.token;
          },
          error    : function()
          {
            I.Library.Form.enable(self.options.dataForm, true);
          }
        });
      }
    }
  });
  
  return RegistrationController;
});
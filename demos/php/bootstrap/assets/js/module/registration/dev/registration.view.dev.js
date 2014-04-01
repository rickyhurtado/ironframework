/**
 * registration.view.dev.js
 * 
 * @package   RegistrationView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'select2',
  'core_module'
], function()
{
  /**
   * Init RegistrationView class
   */
  var RegistrationView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.RegistrationView has been initialized.');
      
      // Initialize registration form
      I.Registration.Controller.initForm();
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
      mainContent      : '#main-content',
      registrationPage : '#registration-main-content'
    },
    
    /**
     * Init template property fpr EJS container
     */
    template :
    {
      registrationPage : new EJS( {url: I.JsPath + '/module/registration/template/' + I.JsVersion + '/registration-page.' + I.JsVersion + '.html'} ),
      resultPage       : new EJS( {url: I.JsPath + '/module/registration/template/' + I.JsVersion + '/result-page.' + I.JsVersion + '.html'} )
    },
    
    /**
     * Attach events to elements
     */
    events :
    {
      'click #registration-next-step' : 'displayContactPage',
      'click #registration-submit'    : 'submitRegistrationForm'
    },
    
    /**
     * Render registration page
     */
    renderRegistrationPage : function()
    {
      // Init var
      var collections  = I.Registration.Controller.options.collections;
      var registration = collections.registration.find(function(model)
      {
        return model.get('id') == 0;
      });
      
      var contacts = collections.contacts.find(function(model)
      {
        return model.get('id') == 0;
      });
      
      if ($(this.target.registrationPage).length == 0)
      {
        $(this.target.mainContent).append(this.template.registrationPage.render({
          registration : registration,
          contacts     : contacts
        }));
      }
      else
      {
          I.Library.Form.enable('registration', true);
      }

      // Initialize other form fields
      $('[name=birth_day] option[value=' + registration.get('birth_day') + ']').prop('selected', true);
      $('[name=birth_month] option[value=' + registration.get('birth_month') + ']').prop('selected', true);
      $('[name=birth_year] option[value=' + registration.get('birth_year') + ']').prop('selected', true);

      if ($('[data-form-input-group=subscription]:checked').length == 0)
      {
        $('[data-form-input-group=subscription].form-input-uncheck-all').click();
      }

      if ($('[data-form-input-group=interest]:checked').length == 0)
      {
        $('[data-form-input-group=interest].form-input-uncheck-all').click();
      }

      // Bind the Select2 plugin to all select elements
      $('select').not('.select2-offscreen').each(function()
      {
        $(this).select2({ width : 'resolve', minimumResultsForSearch : -1 });
      });
      
      // Start form session within form page fragment
      I.Library.Form.sessionStart();
    },
    
    /**
     * Render result page
     */
    renderResultPage : function()
    {
      $(this.target.mainContent).append( this.template.resultPage.render({}) );
    },
    
    /**
     * Display the contacts page
     */
    displayContactPage : function()
    {
      // Revalidate the form step before proceeding to the next page
      // If all fields are valid, then continue to next page
      if (I.Registration.Controller.form.validateStep(1))
      {
        Backbone.history.navigate('register/contacts', true);
      }
    },
    
    /**
     * Submit the registration form via controller
     */
    submitRegistrationForm : function()
    {
      I.Registration.Controller.submitRegistrationForm();
    }
  });
  
  return RegistrationView;
});
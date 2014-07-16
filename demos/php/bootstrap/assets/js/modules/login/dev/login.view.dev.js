/**
 * login.view.dev.js
 *
 * @package   LoginView
 * @category  View
 * @version   1.0.1
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'utf8_encode_helper',
  'sha1_helper',
  'core_module'
], function()
{
  /**
   * Init LoginView class
   */
  var LoginView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.LoginView has been initialized.');
    },

    /**
     * Default options
     */
    options :
    {
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
      loginPage   : '#login-page',
      loginContent : '#login-content'
    },

    /**
     * Init template property fpr EJS container
     */
    template :
    {
      loginPage : new EJS( {url: I.JsPath + '/modules/login/template/' + I.JsVersion + '/login-page.' + I.JsVersion + '.html'} ),
      loginForm : new EJS( {url: I.JsPath + '/modules/login/template/' + I.JsVersion + '/login-form.' + I.JsVersion + '.html'} )
    },

    /**
     * Attach events to elements
     */
    events :
    {
      'click #login-form [type=button]' : 'submitLoginForm',
      'keyup #username, #password'      : 'createLoginData',
      'focusout #username, #password'   : 'validateField'
    },

    /**
     * Render log in page
     */
    renderLoginPage : function()
    {
      $(this.target.mainContent).append(this.template.loginPage.render({}));
    },

    /**
     * Submit the login form
     */
    createLoginData : function()
    {
      // Init vars
      var username = I.Helper.Sha1($('#username').val());
      var password = I.Helper.Sha1($('#password').val());

      $('#login-form [name=data]').val(username + password);
    },

    /**
     * Create login data in Sha1 to be stored in data hidden field
     */
    validateField : function(e)
    {
      console.log($(e.target).attr('id'));
    },

    /**
     * Submit the login form
     */
    submitLoginForm : function()
    {
      // Init var
      var json  = {};
      var token = I.Helper.Sha1($('#password').val()).match(/.{1,8}/g);

      // Set the json data
      json.data            = $('#login-form [name=data]').val();
      json[I.Token.login] = token[0];

      console.log(json, I.Helper.Sha1($('#password').val()));
    }
  });

  return LoginView;
});

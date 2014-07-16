/**
 * business.view.dev.js
 *
 * @package   BusinessView
 * @category  View
 * @version   1.0.1
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'contacts_view',
  'contacts_business_model',
  'init_module'
], function(
  ContactsView,
  ContactsBusinessModel
){
  /**
   * Init BusinessView class
   */
  var BusinessView = ContactsView.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('ProfileView.BusinessView has been initialized.');

      // Add template
      this.template.business = new EJS( {url : I.JsPath + '/modules/business/template/' + I.JsVersion + '/business.' + I.JsVersion + '.html'});

      this.initCollections();

      // Add and set the collection property
      this.contactsBusiness = I.Init.Collections.ContactsBusiness;

      // Fetch category data from local storage
      this.contactsBusiness.fetch();

      console.log('Fetch contacts business from local storage data.');
    },

    /**
     * Set the person ID
     */
    personID : 0,

    /**
     * Render business info from EJS template
     */
    renderBusiness : function(person_id)
    {
      // Init vars
      var contacts_business_model;

      // Get the category ID
      contacts_business_model = this.contactsBusiness.find(function(m)
      {
        return m.get('person_id') == person_id;
      });

      return this.template.business.render( { details : contacts_business_model } );
    },

    /**
     * Extra details
     */
    extraDetails : function()
    {
      var business = this.renderBusiness(this.personID);

      return business;
    }
  });

  return BusinessView;
});

/**
 * contacts.view.dev.js
 * 
 * @package   ContactsView
 * @category  View
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'profile_view'
], function(
  ProfileView
){
  /**
   * Init ContactsView class
   */
  var ContactsView = ProfileView.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('ProfileView.ContactsView has been initialized.');
      
      this.initCollections();
    },
    
    /**
     * Initialize collections
     */
    initCollections : function()
    {
      // Add and set the collection property
      this.category = I.Init.Collections.Category;
      this.contacts = I.Init.Collections.Contacts;
      
      // Fetch category data from local storage
      this.category.fetch();
      this.contacts.fetch();
      
      console.log('Fetch categories and contacts from local storage data.');
    },
    
    /**
     * Get the contacts details
     */
    getDetails : function(category, person_id)
    {
      // Init vars
      var data = [];
      var category_model, contacts_model;
      
      // Set data
      data['details'] = {};
      
      // Get the category
      category_model = this.category.find(function(m)
      {
        return m.get('fragment') == category;
      });
      
      // Change the header title of the contacts list page
      if (category_model)
      {
        $('#contacts-details-page .category-title').text(category_model.get('category'));
      }
      
      // Fetch the contacts by profile_id
      if (this.contacts)
      {
        contacts_model = this.contacts.find(function(m)
        {
          return m.get('person_id') == person_id;
        });
      }
                  
      // Add details
      if (contacts_model != null)
      {
        data['details'] = contacts_model;
      }
      
      return data;
    },
    
    /**
     * Display contacts profile
     */
    displayProfile : function(category, person_id)
    {
      $(this.target.profileContent).html(this.renderProfile(category, this.getDetails(category, person_id)));
    }
  });
  
  return ContactsView;
});
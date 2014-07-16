/**
 * data.view.dev.js
 *
 * @package   DataView
 * @category  View
 * @version   1.0.1
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

define([
  'category_model',
  'init_module',
  'core_module'
], function(
  CategoryModel
){
  /**
   * Init DataView class
   */
  var DataView = Backbone.View.extend(
  {
    /**
     * Initialize view
     */
    initialize : function()
    {
      console.log('Backbone.View.DataView has been initialized.');

      // Add and set the collection property
      this.category = I.Init.Collections.Category;
      this.contacts = I.Init.Collections.Contacts;

      // Fetch category data from local storage
      this.category.fetch();
      this.contacts.fetch();

      console.log('Fetch categories and contacts from local storage data.');
    },

    /**
     * Target element container
     */
    target :
    {
      mainContent     : '#main-content',
      dataPage        : '#data-page',
      dataContent     : '#data-content',
      categoryContent : '#category-list-content',
      contactsContent : '#contacts-list-content',
      relatedContent  : '.data-content'
    },

    /**
     * Init template property for EJS container
     */
    template :
    {
      dataPage : new EJS( {url: I.JsPath + '/modules/data/template/' + I.JsVersion + '/data-page.' + I.JsVersion + '.html'} ),
      category : new EJS( {url: I.JsPath + '/modules/data/template/' + I.JsVersion + '/category.' + I.JsVersion + '.html'} ),
      contacts : new EJS( {url: I.JsPath + '/modules/data/template/' + I.JsVersion + '/contacts.' + I.JsVersion + '.html'} )
    },

    /**
     * Render data page
     */
    renderDataPage : function()
    {
      $(this.target.mainContent).append(this.template.dataPage.render({}));
    },

    /**
     * Display category list
     */
    renderCategory : function(data)
    {
      // Init vars
      var view = I.Data.View;
      var el   = view.target.categoryContent;

      $(el).html( view.template.category.render( { categories : data } ) );
      I.Core.Controller.enableObjectRoute(['contacts-category']);
      I.Core.Controller.showContent( { el : el, rel : view.target.relatedContent } );
    },

    /**
     * Display category list
     */
    displayCategory : function()
    {
      // Init vars
      var self  = this;
      var model = null;

      console.log('[START MANAGING COLLECTION AND MODEL] ==================================================================');

      // Get the Business category by ID
      model = self.category.get(2);

      if (model != undefined)
      {
        console.log('Get the Business category by ID:\n\t' + model.get('category'));

        // Edit and save the current model
        model.save( { category : 'Business'} );
      }

      // Get the Business category by category_id attribute (field name)
      model = self.category.find(function(m)
      {
        return m.get('category_id') == 3;
      });

      if (model != undefined)
      {
        console.log('Get the Business category by category_id:\n\t' + model.get('category'));
      }

      // Get the categories by where function
      model = self.category.where( { status : 1 } );

      console.log('Get the categories by where function:\n[ARRAY RETURN] ' + JSON.stringify(self.category.where( { status : 1 } )) + '\nCategory list:');

      _.map(model, function(m, i)
      {
        console.log('\t' + (i + 1) + '. ' + m.get('category'));
      });

      // Get the categories by findWhere function (returns the first model only from the collction)
      model = self.category.findWhere( { status : 1 } );

      if (model != undefined)
      {
        console.log('Get the categories by findWhere function:\n\t' + model.get('category'));
      }

      // Add new category dynamically
      self.addCategory({
        category : 'Ironman',
        fragment : 'ironman'
      });

      // Remove category by ID from category collection to avoid multiple insertion of Ironman category
      self.removeCategory(5);

      console.log('[END MANAGING COLLECTION AND MODEL] ====================================================================');

      // Render the category
      self.renderCategory(self.category.models);
    },

    /**
     * Sort category
     */
    sortCategoryBy : function(type, order)
    {
      this.category.comparator = function(collection)
      {
        if (order == 'desc')
        {
          return -collection.get(type);
        }

        return collection.get(type);
      };

      // Execute sorting
      this.category.sort( { sort : true } );
    },

    /**
     * Add new category to category collection local storage
     */
    addCategory : function(data)
    {
      // Init vars
      var model = null;

      // Change the order reference from ID kay to order key
      this.sortCategoryBy('id');

      // Set the id and order of the new category
      data.id    = this.category.newId();
      data.order = this.category.newOrder();

      // Create new category model and store to collection (use .add() function if not a localStorage)
      // category_id is set to 0 by default from category model class
      // json attribute is added dynamically (not part of the defaults property of model)
      this.category.create( new CategoryModel(data) );

      // Return default comparator
      this.sortCategoryBy('order');
    },

    /**
     * Remove a category from category collection local storage
     */
    removeCategory : function(id)
    {
      // Init vars
      var model = null;

      // Destroy a category model
      model = this.category.get(id);

      if (model != undefined)
      {
        model.destroy({
          success : function(m)
          {
            console.log('Destroy a category model:\n"' + m.get('category') + '" category has been destroyed!');
          }
        });
      }
    },

    /**
     * Render contacts list
     */
    renderContacts : function(category)
    {
      // Init vars
      var category_model, contacts_model;

      // Get the category model
      category_model = this.category.find(function(m)
      {
        return m.get('fragment') == category;
      });

      // Change the header title of the contacts list page
      if (category_model)
      {
        $('#contacts-list-page .category-title').text(category_model.get('category'));
      }

      // Sort by alphabetical order by first name
      this.contacts.comparator = function(collection)
      {
        return collection.get('firstname');
      };

      this.contacts.sort( { sort : true } );

      // Fetch the contacts by category ID
      if (category_model)
      {
        contacts_model = this.contacts.where( { category_id : category_model.get('category_id') } );
      }

      return this.template.contacts.render( { contacts : contacts_model, category : category } );
    },

    /**
     * Display contacts list by category
     */
    displayContacts : function(category)
    {
      // Init var
      var el = this.target.contactsContent;

      $(el).html( this.renderContacts(category) );

      I.Core.Controller.enableObjectRoute([category + '-info']);
      I.Core.Controller.showContent( { el : el, rel : this.target.relatedContent } );
    }
  });

  return DataView;
});

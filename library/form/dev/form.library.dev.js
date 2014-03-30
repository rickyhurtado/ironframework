/**
 * form.library.dev.js
 * 
 * @category  Library
 * @version   1.0
 * @author    Ricky Hurtado <ricky@aelogica.com>
 */

I.Library.Form =
{
  /**
   * Init properties
   */
  session : {
    time    : 1800, // in seconds
    warning : 0, // setTimeout ID for warning
    expired : 0 // setTimeout ID for expired
  },
  warning  : null,
  response :
  {
    yes  : null,
    no   : null
  },
  expired  : null,
  inputs   : '[type=text], [type=password], [type=radio], [type=checkbox], textarea, select',
  
  /**
   * Initialize form library
   */
  init : function(opt)
  {
    this.settings        = opt.settings;
    this.settingFormDate = opt.settingFormDate;
    this.form            = opt.form;
    this.inputContainer  = opt.inputContainer;
    this.collections     = opt.collections;
    this.session.time    = opt.sessionTime ? opt.sessionTime : this.session.time;
    
    if (opt.warning && opt.response.yes && opt.response.no && opt.expired)
    {
      this.warning      = opt.warning;
      this.response.yes = opt.response.yes;
      this.response.no  = opt.response.no;
      this.expired      = opt.expired;
    }
    
    this.bindEvents();
  },
  
  /**
   * Bind events for field validation
   */
  bindEvents: function()
  {
    // Init var
    var self = this;
    
    // Validate current field on blur or change events before saving the data to local storage
    $(document).on('blur change', '[data-form=' + this.form + ']' + ' ' + self.inputs, function()
    {
      // Init var
      var type = $(this).attr('type');
      
      if (type && type.match(/radio|checkbox/))
      {
        var group       = $(this).data('form-input-group');
        var other       = $(this).data('form-input-other');
        var checked     = $('[data-form-input-group=' + group + ']:checked');
        var uncheck_all = $('[data-form-input-group=' + group + '].form-input-uncheck-all');
        
        // Check/Uncheck grouped checkboxes
        if ($(this).hasClass('form-input-uncheck-all'))
        {
          if (uncheck_all.is(':checked'))
          {
            checked.not('.form-input-uncheck-all').click();
            
            if (!uncheck_all.is(':checked'))
            {
              uncheck_all.click();
            }
          }
        }
        else
        {
          if (checked.length > 0 && uncheck_all.is(':checked'))
          {
            uncheck_all.click();
          }
          
          if (checked.length == 0)
          {
            uncheck_all.click();
          }
        }

        // Show the other field if other input is checked
        if (other || type == 'radio')
        {
          // Init var
          var input_other_name  = $(this).attr('id');
          var input_other_group = $('[data-form-input-other=' + input_other_name + ']');
          var input_other       = input_other_group.find('[type=text]');
          
          // Hide the other input field of current radio button
          if (type == 'radio')
          {
            $(this).closest(self.inputContainer).find('div[data-form-input-other]').addClass('hide')
                                                .find('[type=text]').each(function()
                                                {
                                                    $(this).data('form-rules', false).val('');
                                                });
          }
          
          if ($(this).is(':checked'))
          {
            input_other.attr('data-form-rules', 'required');
            input_other.data('form-rules', 'required');
            input_other_group.removeClass('hide');
          }
          else
          {
            $(this).val('');
            input_other_group.addClass('hide');
            input_other.data('form-rules', false).val('');
            self.validateInput(input_other);
          }
        }
      }
      
      // Update the other radio or checkbox value
      var input_other = $('#' + $(this).closest('[data-form-input-other]').data('form-input-other'));
      
      if (input_other.data('form-input-other'))
      {
        input_other.val($(this).val());
        self.updateModel(input_other);
      }
      else
      {
        input_other = '';
      }
      
      // Validate input
      if ($(this).attr('data-form-rules'))
      {
        self.validateInput($(this));
      }
      
      // Update the collection
      if (input_other == '')
      {
        self.updateModel($(this));
      }
    });
    
    // For form session expiration events
    if (self.warning && self.response.yes && self.response.no && self.expired)
    {
      // Bind events to body to restart the session
      $(document).on('keyup click mousemove', 'body', function()
      {
        if (self.session.warning)
        {
            self.sessionStart();
        }
      });
      
      // Bind click event to data-form-continue-next
      $(document).on('click', '[data-form-continue-response]', function()
      {
        clearTimeout(self.session.warning);
        clearTimeout(self.session.expired);
          
        if ($(this).data('form-continue-response'))
        {
          self.response.yes();
          self.sessionStart();
        }
        else
        {
          self.session.warning = false;
          self.session.expired = 0;
          self.response.no();
        }
      });
    }
  },
  
  /**
   * Form session will be expired if no activity has been detected
   * First half of session time, warning function will be triggered
   * Second half of session, expired function will be triggered
   */
  sessionStart : function()
  {
    // Init vars
    var self = this;
    var time = self.session.time/2 * 1000;

    // Check the form session time from local storage
    clearTimeout(self.session.warning);

    self.session.warning = setTimeout(function()
    {
      if (self.settings.get(self.settingFormDate) > 0)
      {
        self.session.warning = 0;

        // Call the warning function
        self.warning();

        self.session.expired = setTimeout(function()
        {
          self.session.expired = 0;

          // Call the expired function
          self.expired();

        }, time);
      }
    }, time);
  },
  
  /**
   * Get the value of the field; return empty for unchecked checkbox
   */
  getValue : function(el)
  {
    // Init var
    var value  = el.val();
    
    // If checkbox is unchecked, empty the value
    if (el.attr('type') == 'checkbox' && !el.is(':checked'))
    {
      value = '';
    }
    
    return value;
  },
  
  /**
   * Get the value of the grouped elements
   */
  getGroupedValue : function(el, submit)
  {
    // Init vars
    var self  = this;
    var input = el.data('form-input-group');
    var value = {};

    $('[data-form-input-group=' + input + ']' + (submit ? ':checked' : '')).each(function()
    {
      if (!$(this).hasClass('form-input-uncheck-all'))
      {
        value[$(this).attr('name')] = self.getValue($(this));
      }
    });
    
    return value;
  },
  
  /**
   * Get the model
   */
  getModel : function(model, id)
  {
    // Init var
    var collection = this.collections[model];
    
    if (collection)
    {
      return collection.find(function(m)
      {
        return m.get('id') == id;
      });
    }
    
    return false;
  },
  
  /**
   * Update the local storage model on blur or change event trigger
   */
  updateModel : function(el)
  {
    // Init var
    var data  = {};
    var model = el.data('model');
    var id    = el.data('model-id');
    var input = el.data('form-input-group') && el.data('form-input-group-save') == undefined ? el.data('form-input-group') : el.attr('name');
    var value = this.getValue(el);
    
    // Get the value of grouped input fields
    if (el.data('form-input-group') && el.data('form-input-group-save') == undefined)
    {
      value = this.getGroupedValue(el, false);
    }
    
    // Set the model key and value
    data[input] = value;
    
    // Get the model
    model = this.getModel(model, id);
    
    // Update the selected model key
    if (model)
    {
      model.save(data);
      this.updateFormDate();
    }
  },
  
  /**
   * Check if the local storage session data has been expired
   */
  checkExpiration : function(callback)
  {
    // Init vars
    var today     = parseInt(new Date().getTime()/1000);
    var form_date = this.settings.get(this.settingFormDate);
    
    if (form_date != 0 && today - form_date >= this.session.time)
    {
      callback();
    }
  },
  
  /**
   * Update the rgistration form date from settings collection
   */
  updateFormDate : function()
  {
    // Init var
    var self = this;
    
    self.settings.update( { setting : self.settingFormDate, value : parseInt(new Date().getTime()/1000) } );
  },
  
  /**
   * Reset the collection
   */
  resetCollection : function(collection)
  {
    // Init var
    var models = [];
    
    // Push the models in modal array
    collection.each(function(model)
    {
      models.push(model);
    });
    
    // Destroy each models from array
    for (var i=0; i < models.length; i++)
    {
      models[i].destroy();
    }
  },

  /**
   * Enable/Disable the form fields
   */
  enable : function(form, enable)
  {
    // Init var
    var step      = typeof form == 'number' ? true : false;
    var step_text = step ? 'step ' : '';
    var inputs    = $('[data-form=' + this.form + '] ' + (step ? '[data-form-step=' + form + ']' : '') + ' ' + I.Library.Form.inputs);

    if (form)
    {
      form = step_text + form;

      if (enable)
      {
        inputs.removeAttr('disabled')
              .removeClass('disabled');
        console.log('[' + form + '] Form input fields enabled.');
      }
      else
      {
        inputs.attr('disabled', true)
              .addClass('disabled');
        console.log('[' + form + '] Form input fields disabled.');
      }
    }
  },

  /**
   * Clear or reset the form fields
   */
  reset : function(opt)
  {
    // Init var
    var self = this;
    
    // Reset and initialize collections
    _.map(self.collections, function(collection)
    {
      self.resetCollection(collection);
    });
    
    // Reset form session
    clearTimeout(self.session.warning);
    clearTimeout(self.session.expired);
    self.session.warning = 0;
    self.session.expired = 0;
    
    // Reset the local storage form session
    self.settings.update( { setting : self.settingFormDate, value : 0 } );
    
    // Initialize collection
    if (opt.init)
    {
      opt.init();

      // Remove form
      setTimeout(function()
      {
        $('[data-form=' + opt.form + ']').remove();
        
        // Reset the local storage form session
        self.settings.update( { setting : self.settingFormDate, value : 0 } );
      }, 500);
    }
    
    console.log('[' + opt.form + '] Form has been reset.');
  },
  
  /**
   * Clear validation
   */
  clearValidation : function()
  {
    this.formMarker.removeClass('data-form-input-success data-form-input-error');
    this.formIcon.removeClass('data-form-icon-success data-form-icon-error');
    this.inputElement.removeAttr('data-form-validation');
  },
  
  /**
   * Mark input field with class data-form-input-success or data-form-input-error
   */
  markInput : function(mark)
  {
    // Init var
    var mark_input = true;
    
    // Clear the validation
    this.clearValidation();
    
    // Do not mark the radio buttons or checkbox if mark is true
    if (mark && this.inputElement.attr('type') && this.inputElement.attr('type').match(/radio|checkbox/))
    {
      mark_input = false;
    }
    
    if (mark_input)
    {
      this.formMarker.addClass('data-form-input-' + (mark ? 'success' : 'error'));
      this.inputElement.attr('data-form-validation', (mark ? 'success' : 'error'));
    }
    
    // Add message
    if (this.formMessage.text() == '')
    {
      this.formMessage.text('The ' + this.formLabel + ' is invalid.');
    }
    
    // Clear message if field is valid
    if (mark)
    {
      this.formMessage.text('');
    } 
    
    // Add icon class
    this.formIcon.addClass('data-form-icon-' + (mark ? 'success' : 'error'));
  }
};

I.Library.Form.validateInput = function(el)
{
  // Init var
  var self      = this;
  var container = el.closest('[data-form-input-other]').length > 0 ? el.closest('[data-form-input-other]') : el.closest(self.inputContainer);
  
  // Set and init form properties
  self.inputElement    = el;
  self.formValue       = self.getValue(el);
  self.formLabel       = el.data('form-label');
  self.defaultOption   = el.data('form-default-option');
  self.formRules       = el.data('form-rules') ? el.data('form-rules').split(',') : false;
  self.formMessage     = container.find('.data-form-input-message');
  self.formIcon        = container.find('.data-form-input-icon');
  self.formMarker      = container.find(el.data('form-input-marker'));
  self.formAllowedTags = el.data('form-allowed-tags');
  
  // Get the value of grouped input fields
  if (el.data('form-input-group'))
  {
    self.formValue = self.getGroupedValue(el, false);
  }
  
  // Sanitize the form value
  if (el.attr('type') == 'text' || el.is('textarea'))
  {
    self.formValue = self.stripTags($.trim(self.formValue));
    self.inputElement.val(self.formValue);
}
  
  // Validate fields with form rules only
  if (self.formRules)
  {
    for (var i = 0; i < self.formRules.length; i++)
    {
      // Init var
      var test_function = 'test' + I.toCamel(self.formRules[i]);
      
      console.log('[Test Function] ' + test_function);
      
      if (i == 0 && test_function != 'testRequired' && self.formValue == '')
      {
        self.clearValidation();
        self.formMessage.text('');
        return true;
      }
      
      if (self[test_function](el))
      {
        self.markInput(true);
      }
      else
      {
        self.markInput(false);
        return true;
      }
    };
  }
  else
  {
    self.clearValidation();
    self.formMessage.text('');
  }
};

/**
* Revalidate form fields (fields with error and has been repopulated in the form upon page refresh)
*/
I.Library.Form.validate = function(el)
{
  // Init var
  var self     = this;
  var step     = typeof el == 'number' ? true : false;
  var form     = '[data-form=' + self.form + ']' + (step ? ' [data-form-step=' + el + '] ' : '');
  var result   = true;
  var fragment = '';
  
  // Disable input fields
  I.Library.Form.enable(el, false);
  
  // Validate the fields
  $(form).each(function()
  {
    $(this).find(self.inputs).not('[data-form-validation=success]').each(function()
    {
      if ($(this).attr('data-form-rules'))
      {
        self.validateInput($(this));
        console.log('[Validate] Field name: ' + $(this).attr('name'));
      }
      
      // Check if data form validation error exists
      if ($(this).closest('[data-form-fragment] [data-form-validation=error]').length > 0)
      {
        // Get the fragment of the form for Backbone navigation
        if (fragment == '')
        {
          fragment = $(this).closest('[data-form-fragment]').data('form-fragment');
        }
      }
    });
  });
  
  // Check if data form validation error exists
  if ($(form + ' [data-form-validation=error]').length > 0)
  {
    result = false;
  }
  
  // Enable the form after validation if failed
  if (!result)
  {
    I.Library.Form.enable(el, true);
    
    // Navigate to form part using the fragment
    if (fragment != '')
    {
      Backbone.history.navigate(fragment, true);
    }
  }
  
  return result;
};

/**
* Validate form partial (step)
*/
I.Library.Form.validateStep = function(step)
{
  return I.Library.Form.validate(step);
};

/**
* Strip tags of the input value
*/
I.Library.Form.stripTags = function(value)
{
  // Init var
  var allowed_tags = this.formAllowedTags;

  allowed_tags = ( ( ( allowed_tags || '' ) + '' ).toLowerCase().match( /<[a-z][a-z0-9]*>/g ) || [ ] ).join( '' );

  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  var comments_and_tags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

  if ( value != null )
  {
    return value.replace( comments_and_tags, '' ).replace( tags, function( $0, $1 )
    {
      return allowed_tags.indexOf( '<' + $1.toLowerCase() + '>' ) > -1 ? $0 : '';
    } );
  }
};

/**
* Test field if required
*/
I.Library.Form.testRequired = function()
{
  // Test the value
  if (this.formValue == '' || (this.defaultOption && this.defaultOption == this.formValue))
  {
    this.formMessage.text('The ' + this.formLabel + ' field is required.');
    return false;
  }
  
  return true;
};

/**
* Test field if there are spaces in between characters
*/
I.Library.Form.testNoSpaces = function()
{
  this.formValue = this.formValue.replace( /\s+/g, '' );
  this.inputElement.val(this.formValue);
  
  return true;
};

/**
* Test field if number
*/
I.Library.Form.testNumber = function()
{
  var filter = /^([0-9])+$/;

  if (!filter.test(this.formValue))
  {
    this.formMessage.text('The ' + this.formLabel + ' must be a number.');
    return false;
  }
  
  return true;
};

/**
* Test field if valid email address
*/
I.Library.Form.testEmail = function()
{
  var filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
  
  return filter.test(this.formValue);
};

/**
* Test field if matches the required length 
*/
I.Library.Form.testLength = function()
{
  // Init var
  var required_length = this.inputElement.data('form-rules-length');
  
  if (required_length != this.formValue.length)
  {
    this.formMessage.text('The ' + this.formLabel + ' must be ' + required_length + '-character long.');
    return false;
  }
  
  return true;
};

/**
* Test field if valid date
*/
I.Library.Form.testDate = function()
{
  // Init
  var date_group  = this.inputElement.closest('[data-form-input-date]').data('form-input-date');
  var input_day   = $('#form-input-' + date_group + '-day');
  var input_month = $('#form-input-' + date_group + '-month');
  var input_year  = $('#form-input-' + date_group + '-year');
  var date_day    = input_day.find('option:selected').val();
  var date_month  = input_month.find('option:selected').val();
  var date_year   = input_year.find('option:selected').val();
  var date        = (date_day ? date_day : 1) + '.' + date_month + '.' + (date_year ? date_year : 1977);
  var result      = true;
  
  if (input_day.attr('data-form-validation') == 'error')
  {
    this.validateInput(input_day);
  }
  
  if (input_month.attr('data-form-validation') == 'error')
  {
    this.validateInput(input_month);
  }
  
  if (input_year.attr('data-form-validation') == 'error')
  {
    this.validateInput(input_year);
  }
  
  if (/^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(date))
  {
    var a = date.split('.');
    var d = parseInt(a[0], 10);
    var m = parseInt(a[1], 10);
    var y = parseInt(a[2], 10);
    var b = new Date(y, (m - 1), d);

    if (((b.getMonth() + 1) !== m) || (b.getDate() !== d) || (b.getFullYear() !== y))
    {
      result = false;
    }
  }
  else
  {
    result = false;
  }

  if (!result)
  {
    $('[data-form-input-date=' + date_group + '] .data-form-input-message').text('The ' + this.formLabel + ' field is invalid.');
    return false;
  }
  
  return true;
};
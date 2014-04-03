//  System core UI component
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

define(['app','backbone'], function(app, Backbone) {

  "use strict";

  var Module = {};

  var template = '<input style="margin-top:1px;" type="checkbox" {{#if readonly}}disabled{{/if}} {{#if selected}}checked{{/if}}/> Active \
                  <input style="margin-top:1px;" type="checkbox" {{#if readonly}}disabled{{/if}} {{#if selected}}checked{{/if}}/> Draft \
                  <span id="delete">Delete</span> \
                  <input type="hidden" name="{{name}}" value="{{#if selected}}1{{else}}0{{/if}}">';

  Module.id = 'system';
  Module.dataTypes = ['TINYINT'];

  Module.variables = [];

  Module.Input = Backbone.Layout.extend({

    tagName: 'div',
    attributes: {
      'class': 'field'
    },
    template: Handlebars.compile(template),

    events: {
      'change input[type=checkbox]': function(e) {
        var val = (this.$el.find('input[type=checkbox]:checked').val() === undefined) ? 0 : 1;
        this.$el.find('input[type=hidden]').val(val);
      }
    },

    serialize: function() {
      var value = this.options.value;

      // Get default value if there is one...
      if (value === undefined && this.options.schema.has('def')) {
        value = this.options.schema.get('def');
      }

      var selected = (parseInt(value,10) === 1) ? true : false;

      if (
        this.options.model.isNew() &&
        this.options.schema.has('default_value')) {
          selected = parseInt(this.options.schema.get('default_value'),10) === 1;
      }

      return {
        name: this.options.name,
        selected: selected,
        comment: this.options.schema.get('comment'),
        readonly: !this.options.canWrite
      };
    }

  });

  Module.list = function(options) {
    var val = (options.value) ? '<input type="checkbox" checked="true" disabled>' : '<input type="checkbox" disabled>';
    //var val = options.value.toString().replace(/<(?:.|\n)*?>/gm, '').substr(0,100);
    return val;//val;
  };


  return Module;
});
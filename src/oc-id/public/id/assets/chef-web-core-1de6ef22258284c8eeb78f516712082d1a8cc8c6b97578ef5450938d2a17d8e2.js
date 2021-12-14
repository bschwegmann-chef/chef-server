
(function($, window, document) {

  window.Chef = window.Chef || {};
  window.Chef.Web = window.Chef.Web || {};

  (function() {
    var self;

    Chef.Web.Core = {
      
      init: function(doc, opts) {
        self = this;

        self.options = opts || {
          assets: {
            images: '/assets'
          }
        };
        
        for (var name in self.components) {
          self.components[name].init();
        }
      },

      components: {},
      
      imageUrl: function(asset) {
        return [self.options.assets.images, asset].join('/');
      }
    };
  })();

  $.fn.chef = function() {
    $(document).foundation.apply(this, arguments);

    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function() {
      Chef.Web.Core.init.apply(Chef.Web.Core, [this].concat(args));
      return this;
    });
  };

})(jQuery, window, window.document);

(function($, window) {
  'use strict';

  Chef.Web.Core.components.icon = {
    init: function() {

      var $icons = $('<div id="chef-icons"></div>');
      $('body').prepend($icons);

      $icons.load(Chef.Web.Core.imageUrl('icons/all.svg'), function() {
        $('i[class^=icon-]').each(function() {
          var $el = $(this);
          var className = $el.attr('class').split(' ')[0];

          $el.append($('<svg class="' + className + '"><use xlink:href="#' + className + '"></use></svg>'));

          if ($el.data('caption')) {
            $el.append($('<span></span>').html($el.data('caption'))).addClass('caption');
          }
        });
      });
    },
    refresh: function() {
      $('i[class^=icon-] svg, i[class^=icon-] span').remove();
      this.init();
    }
  };

})(jQuery, window);

(function($, window) {
  'use strict';

  $.fn.logo = function(action) {

    function toggleClasses(el) {
      el.toggleClass('animate', action === 'animate');
      el.toggleClass('deanimate', action === 'deanimate');
    }

    if (action === 'deanimate') {
      this.find('.mark g').one('webkitAnimationIteration MSAnimationIteration animationiteration', $.proxy(function() {
        toggleClasses(this);
      }, this));
    }
    else {
      toggleClasses(this);
    }
  };

  Chef.Web.Core.components.logo = {
    init: function() {

      $('.logo').each(function() {
        var $el = $(this);
        
        if ($el.find('> svg').length === 0) {
          $el.load(Chef.Web.Core.imageUrl('chef-logo.svg'), function() {
            var tag = $el.data('tag-line');
            if (tag) {
              var tag = this.querySelector('svg .tag-line text');
              if (tag) {
                tag.textContent = tag;
              }
            }
          });  
        }
      });
    },

    refresh: function() {
      $('.logo svg').remove();
      this.init();
    }
  };

})(jQuery, window);

(function($, window) {
  'use strict';

  Chef.Web.Core.components.sideNav = {
    init: function() {

    }
  };

})(jQuery, window);

(function($, window) {
  'use strict';

  Chef.Web.Core.components.topBar = {
    init: function() {
      // Hide/show the nav items when the nav icon is clicked
      $(".top-bar .nav-icon").click(function (event) {
        $(event.target).siblings("ul").slideToggle()
      });

      // Ensure the menu items get put back to inline if the window gets bigger
      $(window).resize(function (event) {
        var display = "inline";
        if ($(".top-bar .nav-icon").is(":visible")) { display = "block"; }
        $(".top-bar ul").css("display", display);
      });
    }
  };
})(jQuery, window);

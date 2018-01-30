;
(function($, window, document, undefined) {

    'use strict';

    var pluginName = 'showmore',
        defaults = {
            closedHeight: 100,
            buttonTextMore: 'show more',
            buttonTextLess: 'show less',
            buttonCssClass: 'showmore-button',
            animationSpeed: 0.5,
            openHeightOffset: 0
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {
            this.showmore();
        },
        showmore: function() {

            var element = $(this.element);
            var settings = this.settings;
            // var innerHeight = element.innerHeight();

            if (settings.animationSpeed > 10) {
                settings.animationSpeed = settings.animationSpeed / 1000;
            }

            var showMoreInner = $('<div />', {
                'class': settings.buttonCssClass + '-inner more',
                text: settings.buttonTextMore
            });
            var showLessInner = $('<div />', {
                'class': settings.buttonCssClass + '-inner less',
                text: settings.buttonTextLess
            });

            element.addClass('closed').css({
                'height': settings.closedHeight,
                'transition': 'all ' + settings.animationSpeed + 's ease',
                'overflow': 'hidden'
            });

            var showMoreButton = $('<div />', {
                'class': settings.buttonCssClass,
                click: function(e) {
                    e.preventDefault();
                    if (element.hasClass('closed')) {
                        element.css({'height': 'auto', 'transition': 'none'});
                        var targetHeight = element.innerHeight();
                        element.css({'height': settings.closedHeight});
                        // we must call innerHeight() otherwhise there will be no animation
                        element.innerHeight();
                        element.removeClass('closed').css({
                            'height': targetHeight, 
                            'transition': 'all ' + settings.animationSpeed + 's ease'
                        });
                        showMoreButton.html(showLessInner);
                    } else {
                        element.addClass('closed').css('height', settings.closedHeight);
                        showMoreButton.html(showMoreInner);
                    }
                },
                html: showMoreInner
            });
            element.after(showMoreButton);
        }
    });

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

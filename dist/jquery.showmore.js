/*
 *  jquery-showmore - v1.0.0
 *  JQuery Plugin to toggle a container's height by a button.
 *  https://grandgeorg.de
 *
 *  Made by Viktor Grandgeorg
 *  Under MIT License
 */
;
(function($, window, document, undefined) {

    'use strict';

    var pluginName = 'showmore',
        defaults = {
            closedHeight: 100,
            buttonTextMore: 'show more',
            buttonTextLess: 'show less',
            buttonCssClass: 'showmore-button',
            animationSpeed: 0.5
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
            var currentId = element.attr('id') !== undefined ?
                element.attr('id') : Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
            var innerHeight = element.innerHeight();

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

            $(window).resize(function() {
                element.css('height', 'auto');
                innerHeight = element.innerHeight();
                if (element.hasClass('closed')) {
                    element.css('height', settings.closedHeight);
                } else {
                    element.css('height', innerHeight);
                }
            });

            var showMoreButton = $('<div />', {
                id: 'showmore-button-' + currentId,
                'class': settings.buttonCssClass,
                click: function(e) {
                    e.preventDefault();
                    if (element.hasClass('closed')) {
                        element.removeClass('closed').css('height', innerHeight);
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

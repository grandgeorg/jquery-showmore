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
            animationSpeed: 0.5,
            openHeightOffset: 0,
            onlyWithWindowMaxWidth: 0
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.btn;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {
            if (this.settings.onlyWithWindowMaxWidth > 0) {
                this.bindResize();
                this.responsive();                
            } else {
                this.showmore();
            }
        },
        bindResize: function() {
            if (this.settings.onlyWithWindowMaxWidth > 0) {
                var self = this;
                var resizeTimer;
                $(window).on('resize', function() {
                    if (resizeTimer) {
                        clearTimeout(resizeTimer);
                    }
                    resizeTimer = setTimeout(function() {
                        self.responsive();
                    }, 250);
                });
            }
        },
        responsive: function() {
            if (this.settings.onlyWithWindowMaxWidth > 0) {
                if ($(window).innerWidth() <= this.settings.onlyWithWindowMaxWidth) {
                    this.showmore();
                } else {
                    this.remove();
                }
            } else {
                this.showmore();
            }
        },
        showmore: function() {

            if (this.btn) {
                return;
            }

            var element = $(this.element);
            var settings = this.settings;

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

            var resizeTimer;
            $(window).on('resize', function() {
                if (!element.hasClass('closed')) {
                    if (resizeTimer) {
                        clearTimeout(resizeTimer);
                    }
                    resizeTimer = setTimeout(function() {
                        // resizing has "stopped"
                        element.css({'height': 'auto', 'transition': 'none'});
                        var targetHeight = element.innerHeight();
                        element.css({'height': settings.closedHeight});
                        element.innerHeight();
                        element.css({
                            'height': targetHeight, 
                            'transition': 'all ' + settings.animationSpeed + 's ease'
                        });
                    }, 150); // this must be less than bindResize timeout!
                }
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
            this.btn = showMoreButton;
        },
        remove: function() {
            var element = $(this.element);
            var settings = this.settings;
            if (element.hasClass('closed')) {
                element.css({'height': 'auto', 'transition': 'none'});
                var targetHeight = element.innerHeight();
                element.css({'height': settings.closedHeight});
                element.innerHeight();
                element.removeClass('closed').css({
                    'height': targetHeight, 
                    'transition': 'all ' + settings.animationSpeed + 's ease'
                });
            }
            if (this.btn) {
                this.btn.off('click').empty().remove();
                this.btn = undefined;
            }
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

/*!
 * jQuery TrEVo MegaMenu v1.1
 * https://github.com/djtrevo/MegaMenu
 *
 * Copyright 2012, Marco Trevisani
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */ (function ($) {
    $.fn.trevoMenu = function (options) {

        var defaults = {
            type: "hover",
            fadeIn: 200,
            fadeOut: 200
        };

        var options = $.extend(defaults, options);

        return this.each(function () {
            $(this).find("li.lvl1 a").each(function () {
                var oggetto = $(this);

                if ((options.type == "click") || ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)))) {
                    // -- ON MOUSE CLICK OR iPHONE/iPAD/iPOD ---
                    $(this).click(function () {
                        subMenu = $(this).parent().find(".lvl2");
                        if (subMenu.is(":visible")) {
                            $(this).parent().find(".lvl2").fadeOut(options.fadeOut);
                        } else {
                            $(this).parent().find(".lvl2").fadeIn(options.fadeIn);
                            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                                $(this).parent().find(".lvl2").bind('touchstart click', function () {
                                    $(this).fadeOut(options.fadeOut)
                                })
                            }
                        }
                    });
                } else {
                    // -- HOVER ---
                    $(this).hover(
                    //. lvl1 mouseenter
                    function () {
                        // Show the Lvl2 SubMenu
                        $(this).parent().find(".lvl2").fadeIn(options.fadeIn);

                        // Set lvl2 SubMenu Hover
                        $(this).parent().find(".lvl2").hover(
                        //. lvl2 mouseenter
                        function () {
                            // Stop SubMenu Hide Timer
                            clearTimeout(trvTimer);
                        },
                        //. lvl2 mouseleave
                        function () {
                            // Start fadeOut Timer
                            var e = $(this);
                            setTimeout(function () {
                                if (!e.parent().children("a").ismouseover()) {
                                    e.fadeOut(options.fadeOut);
                                }
                            }, 100);
                        })
                    },
                    //. lvl1 mouseleave
                    function () {
                        $(this).parent().children(".lvl2").each(function () {
                            var e = $(this);
                            trvTimer = setTimeout(function () {
                                e.fadeOut(options.fadeOut);
                            }, 100);
                        })
                    });

                }
            })
        });
    };
})(jQuery);

//jQuery ismouseover method
(function ($) {
    $.mlp = {
        x: 0,
        y: 0
    }; // Mouse Last Position
    function documentHandler() {
        var $current = this === document ? $(this) : $(this).contents();
        $current.mousemove(function (e) {
            jQuery.mlp = {
                x: e.pageX,
                y: e.pageY
            }
        });
        $current.find("iframe").load(documentHandler);
    }
    $(documentHandler);
    $.fn.ismouseover = function (overThis) {
        var result = false;
        this.eq(0).each(function () {
            var $current = $(this).is("iframe") ? $(this).contents().find("body") : $(this);
            var offset = $current.offset();
            result = offset.left <= $.mlp.x && offset.left + $current.outerWidth() > $.mlp.x && offset.top <= $.mlp.y && offset.top + $current.outerHeight() > $.mlp.y;
        });
        return result;
    };
})(jQuery);
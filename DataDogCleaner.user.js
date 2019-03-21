// ==UserScript==
// @name         DataDogCleaner
// @namespace    http://tampermonkey.net/
// @version      0.91
// @updateURL    https://github.com/romio-r/GoogleCalendarToTeamup.user.js/raw/master/DataDogCleaner.user.js
// @description  Hides header at TV
// @author       You
// @match        https://p.datadoghq.com/sb/0eb50b720-2abe8d769e71809bcbd0e72109e354a1*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Attempt to remove header every 30 seconds
    setInterval(() => {
        $(".header_sticky_vertical").hide()
        $(window).trigger('resize')
    }, 30000)
    
    // Attempt to reload page every 5 minutes
    setInterval(() => {
        location.reload()
    }, 300000)
})();

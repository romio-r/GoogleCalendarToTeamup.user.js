// ==UserScript==
// @name         DataDogCleaner
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides header at TV
// @author       You
// @match        https://p.datadoghq.com/sb/0eb50b720-2abe8d769e71809bcbd0e72109e354a1*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        $(".header_sticky_vertical").hide()
    }, 1000)
})();
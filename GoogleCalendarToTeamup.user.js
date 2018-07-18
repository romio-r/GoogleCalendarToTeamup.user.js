// ==UserScript==
// @name         Google calendar to Teamup teamup.com
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://github.com/romio-r/GoogleCalendarToTeamup.user.js/raw/master/GoogleCalendarToTeamup.user.js
// @description  Adds button to add Google calendar event to Teamup teamup.com calendar
// @author       romio-r
// @match        https://calendar.google.com/calendar/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

var tu_debug = false;
(function() {
    'use strict';
    $(document).ready(function(){
            //$('body').prepend('<div>testing....</div>');
            setInterval(function(){
                // ask for calendar id
                var teamupId = localStorage.getItem('teamupClaendarId');
                if(tu_debug){
                    console.log('teamupId: ' + teamupId);
                }

                if((!teamupId) || (teamupId == 'null')){
                   teamupId = prompt("Please your Teamup ID:", "");
                   localStorage.setItem('teamupClaendarId', teamupId);
                }

                // if no opened calendar event details popup
                if($(".osAuJb span").length == 0){
                   if(tu_debug){
                       console.log('No opened calendar event details popup');
                   }
                   return;
                }

                // if integration is applied
                if($("div.gctotsiyowise").length != 0){
                   return;
                }

                // get name of event
                var title = $(".osAuJb span").text();

                //get username
                var user = $("a.gb_b.gb_R").attr('aria-label');
                if(tu_debug){
                    console.log('User raw: ' + user);
                }
                var reUser = /\((.+?)\@/im;
                user = user.match(reUser)[1];
                if(tu_debug){
                    console.log('User final: ' + user);
                }

                // get year
                var reYear = /\d{4}/im;
                var year = $(".rSoRzd").text().match(reYear)[0];

                //get start and end time
                var startEndTime = $("div.NI2kfb div div.DN1TJ span").first().text().split(" – ");

                // get date
                var date = $("div.kMp0We.OcVpRe>div.NI2kfb > div:first-child").first().contents().filter(function() {
                    return this.nodeType === 3;
                }).text();
                date = date.split(", ")[1].split(" ");
                // convert text name of month into number (example Jun into 7)
                date[0] = new Date(Date.parse(date[0] +" 1, 2012")).getMonth()+1;
                // add leading zero
                date = date.map(x => ((x <= 9 ) ? "0"+x : x));

                // build Teamup URL
                var teamupBaseURL = 'https://teamup.com/' + teamupId + '/events/new';
                var teamupURL = teamupBaseURL
                + "?start_dt=" + encodeURIComponent(year + '-' + date[0] + '-' + date[1] + ' ' + startEndTime[0] + ':00')
                + "&end_dt=" + encodeURIComponent(year + '-' + date[0] + '-' + date[1] + ' ' + startEndTime[1] + ':00')
                + "&title=" + encodeURIComponent(title)
                + "&who=" + encodeURIComponent(user);

                //add super button
                var a = "<a \
                    style=\"font-size: 75%\" \
                    href=\"" + teamupURL + "\"\
                    target=\"_blank\">Add to Teamup</a>";

                if(($(".osAuJb span").length == 0) && tu_debug){
                    console.log('No place to append integration');
                }
                $(".osAuJb").append("<div class=\"gctotsiyowise\" style=\"position: absolute; top: 12px; left: 20px; \">" + a + "</div>");
            }, 500);
    });
})();

 $("#show-hide").hide();
 $(".center").hide();
 $(".left").hide();
 $(".cont1-13").hide();


 $(document).ready(function () {
     var data;
     var membersD = [];
     var membersR = [];
     var membersI = [];
     var votesWithPartyD = [];
     var votesWithPartyR = [];
     var votesWithParty = [];
     var membersMostvoteWithParty = [];
     var membersLeastvoteWithParty = [];
     var votesMiss = [];
     var membersLeastMissvotes = [];
     var membersMostMissvotes = [];
     var statistics;

     forScroll();

     if ($("div").hasClass("senate-loyalty")) {

         $.ajax({
             url: 'https://api.propublica.org/congress/v1/113/senate/members.json',
             headers: {
                 'X-API-Key': 'AUuJMv1tlUhOXJosDeDBdhEdC9WFEOGOBkUGR9XC'
             },
             success: function (data) {

                 var members = data.results[0].members;
                 $('.loadingDiv').hide();
                 $("#show-hide").show();
                 $(".left").show();
                 $(".center").show();
                 $(".cont1-13").show();
                 getMembersParty(members, membersD, membersR, membersI);

                 var numberMembersD = membersD.length;
                 var numberMembersR = membersR.length;
                 var numberMembersI = membersI.length;
                 getVotesWithParty(membersD, votesWithPartyD, membersD);
                 getVotesWithParty(membersR, votesWithPartyR, membersR);
                 getVotesWithParty(members, votesWithParty, members);
                 var averageVotesD = +averageVotes(votesWithPartyD).toFixed(2);
                 var averageVotesR = +averageVotes(votesWithPartyR).toFixed(2);
                 var percentMembers = Math.round((members.length) * 10 / 100);
                 var sortedMembers = members.slice(0);

                 var sortedVotes = votesWithParty.sort();
                 sortedMembers.sort(function (a, b) {
                     return a.votes_with_party_pct - b.votes_with_party_pct;
                 });

                 var sortedMembersInverted = members.slice(0);
                 sortedMembersInverted.sort(function (a, b) {
                     return b.votes_with_party_pct - a.votes_with_party_pct;
                 });
                 var sortedVotesInverted = votesWithParty.slice(0);
                 sortedVotesInverted.sort(function (a, b) {
                     return b - a
                 });
                 OftenVoteWithParty(members, sortedMembersInverted, sortedVotesInverted, membersMostvoteWithParty);
                 OftenVoteWithParty(members, sortedMembers, sortedVotes, membersLeastvoteWithParty);

                 var statistics = {
                     "number-of-Democrats": numberMembersD,
                     "number-of-Replublicans": numberMembersR,
                     "number-of-Independents": numberMembersI,
                     "R-votes-with-party": averageVotesR,
                     "D-votes-with-party": averageVotesD,

                     "members-most-often-vote-with-party": membersMostvoteWithParty,
                     "members-least-ofen-vote-with-party": membersLeastvoteWithParty,
                     "members-most-missed-vote": membersMostMissvotes,
                     "members-least-missed-vote": membersLeastMissvotes,
                 };

                 createTable1(statistics);
                 frame();

                 calling("least-loyal", createTable2);
                 frame();
                 calling("most-loyal", createTable3);
                 frame();
                 dataTab2("#most");
                 dataTab("#least");
             }
         })
     };



     if ($("div").hasClass("senate-attendance")) {

         $.ajax({
             url: 'https://api.propublica.org/congress/v1/113/senate/members.json',
             headers: {
                 'X-API-Key': 'AUuJMv1tlUhOXJosDeDBdhEdC9WFEOGOBkUGR9XC'
             },
             success: function (data) {
                 //    if ($("div").hasClass("senate-attendance")) {
                 //        $.getJSON("JS/pro-congress-113-house.json", function (data) {

                 var members = data.results[0].members;
                 $('.loadingDiv').hide();
                 $("#show-hide").show();
                 $(".center").show();
                 $(".left").show();
                 $(".cont1-13").show();
                 getMembersParty(members, membersD, membersR, membersI);
                 console.log(membersD);
                 var numberMembersD = membersD.length;
                 var numberMembersR = membersR.length;
                 var numberMembersI = membersI.length;
                 getVotesWithParty(membersD, votesWithPartyD, membersD);
                 getVotesWithParty(membersR, votesWithPartyR, membersR);
                 getVotesWithParty(members, votesWithParty, members);
                 var averageVotesD = +averageVotes(votesWithPartyD).toFixed(2);
                 var averageVotesR = +averageVotes(votesWithPartyR).toFixed(2);
                 var percentMembers = Math.round((members.length) * 10 / 100);
                 var sortedMembers = members.slice(0);

                 getVotesMissed(members);
                 var sortedMembersByMiss = members.slice(0);
                 var sortedVotesByMiss = votesMiss.slice(0);

                 sortedMembersByMiss.sort(function (a, b) {
                     return a.missed_votes_pct - b.missed_votes_pct;
                 });



                 sortedVotesByMiss.sort(function (a, b) {
                     return a - b
                 });
                 var sortedMembersByMissInverted = members.slice(0)
                 sortedMembersByMissInverted.sort(function (a, b) {
                     return b.missed_votes_pct - a.missed_votes_pct;
                 });
                 var sortedVotesByMissInverted = votesMiss.slice(0);

                 sortedVotesByMissInverted.sort(function (a, b) {
                     return b - a
                 });

                 MissedVotes(members, sortedMembersByMissInverted, sortedVotesByMissInverted, membersMostMissvotes);
                 MissedVotes(members, sortedMembersByMiss, sortedVotesByMiss, membersLeastMissvotes, membersLeastMissvotes);


                 var statistics = {
                     "number-of-Democrats": numberMembersD,
                     "number-of-Replublicans": numberMembersR,
                     "number-of-Independents": numberMembersI,
                     "R-votes-with-party": averageVotesR,
                     "D-votes-with-party": averageVotesD,

                     "members-most-often-vote-with-party": membersMostvoteWithParty,
                     "members-least-ofen-vote-with-party": membersLeastvoteWithParty,
                     "members-most-missed-vote": membersMostMissvotes,
                     "members-least-missed-vote": membersLeastMissvotes,
                 };

                 createTable1(statistics);
                 frame();
                 calling("least-engaged", createTable4);
                frame();
                 calling("most-engaged", createTable5);
                 frame();

                 dataTab("#most");
                 dataTab2("#least");
             }
         })
     };

     if ($("div").hasClass("house-loyalty")) {
         //        $("#show-hide").hide();
         //        $(".center").hide();
         //        $(".left").hide();
         //        $(".cont1-13").hide();
         $.ajax({
             url: 'https://api.propublica.org/congress/v1/113/house/members.json',
             headers: {
                 'X-API-Key': 'AUuJMv1tlUhOXJosDeDBdhEdC9WFEOGOBkUGR9XC'
             },
             success: function (data) {

                 //    if ($("div").hasClass("house-loyalty")) {
                 //        $.getJSON("JS/pro-congress-113-senate.json", function (data) {

                 var members = data.results[0].members;
                 $('.loadingDiv').hide();
                 $("#show-hide").show();
                 $(".center").show();
                 $(".left").show();
                 $(".cont1-13").show();
                 getMembersParty(members, membersD, membersR, membersI);
                 console.log(membersD);
                 var numberMembersD = membersD.length;
                 var numberMembersR = membersR.length;
                 var numberMembersI = membersI.length;
                 getVotesWithParty(membersD, votesWithPartyD, membersD);
                 getVotesWithParty(membersR, votesWithPartyR, membersR);
                 getVotesWithParty(members, votesWithParty, members);
                 var averageVotesD = +averageVotes(votesWithPartyD).toFixed(2);
                 var averageVotesR = +averageVotes(votesWithPartyR).toFixed(2);
                 var percentMembers = Math.round((members.length) * 10 / 100);
                 var sortedMembers = members.slice(0);

                 var sortedVotes = votesWithParty.sort();
                 sortedMembers.sort(function (a, b) {
                     return a.votes_with_party_pct - b.votes_with_party_pct;
                 });

                 var sortedMembersInverted = members.slice(0);
                 sortedMembersInverted.sort(function (a, b) {
                     return b.votes_with_party_pct - a.votes_with_party_pct;
                 });
                 var sortedVotesInverted = votesWithParty.slice(0);
                 sortedVotesInverted.sort(function (a, b) {
                     return b - a
                 });
                 OftenVoteWithParty(members, sortedMembersInverted, sortedVotesInverted, membersMostvoteWithParty);
                 OftenVoteWithParty(members, sortedMembers, sortedVotes, membersLeastvoteWithParty);

                 var statistics = {
                     "number-of-Democrats": numberMembersD,
                     "number-of-Replublicans": numberMembersR,
                     "number-of-Independents": numberMembersI,
                     "R-votes-with-party": averageVotesR,
                     "D-votes-with-party": averageVotesD,

                     "members-most-often-vote-with-party": membersMostvoteWithParty,
                     "members-least-ofen-vote-with-party": membersLeastvoteWithParty,
                     "members-most-missed-vote": membersMostMissvotes,
                     "members-least-missed-vote": membersLeastMissvotes,
                 };

                 createTable1(statistics);



                 calling("least-loyal", createTable2);


                 calling("most-loyal", createTable3);
                  dataTab2("#most");
                 dataTab("#least");





             }
         })
     };

     if ($("div").hasClass("house-attendance")) {
         //        $("#show-hide").hide();
         //        $(".center").hide();
         //        $(".left").hide();
         //        $(".cont1-13").hide();
         $.ajax({
             url: 'https://api.propublica.org/congress/v1/113/house/members.json',
             headers: {
                 'X-API-Key': 'AUuJMv1tlUhOXJosDeDBdhEdC9WFEOGOBkUGR9XC'
             },
             success: function (data) {

                 //    if ($("div").hasClass("house-attendance")) {
                 //        $.getJSON("JS/pro-congress-113-senate.json", function (data) {

                 var members = data.results[0].members;
                 $('.loadingDiv').hide();
                 $("#show-hide").show();
                 $(".center").show();
                 $(".left").show();
                 $(".cont1-13").show();
                 getMembersParty(members, membersD, membersR, membersI);
                 console.log(membersD);
                 var numberMembersD = membersD.length;
                 var numberMembersR = membersR.length;
                 var numberMembersI = membersI.length;
                 getVotesWithParty(membersD, votesWithPartyD, membersD);
                 getVotesWithParty(membersR, votesWithPartyR, membersR);
                 getVotesWithParty(members, votesWithParty, members);
                 var averageVotesD = +averageVotes(votesWithPartyD).toFixed(2);
                 var averageVotesR = +averageVotes(votesWithPartyR).toFixed(2);
                 var percentMembers = Math.round((members.length) * 10 / 100);
                 var sortedMembers = members.slice(0);

                 getVotesMissed(members);
                 var sortedMembersByMiss = members.slice(0);
                 var sortedVotesByMiss = votesMiss.slice(0);

                 sortedMembersByMiss.sort(function (a, b) {
                     return a.missed_votes_pct - b.missed_votes_pct;
                 });

                 //    var sortedVotesByMiss = votesMiss.slice(0);

                 sortedVotesByMiss.sort(function (a, b) {
                     return a - b
                 });
                 var sortedMembersByMissInverted = members.slice(0)
                 sortedMembersByMissInverted.sort(function (a, b) {
                     return b.missed_votes_pct - a.missed_votes_pct;
                 });
                 var sortedVotesByMissInverted = votesMiss.slice(0);

                 //    var sortedVotesByMissInverted = votesMiss.slice(0);
                 sortedVotesByMissInverted.sort(function (a, b) {
                     return b - a
                 });

                 MissedVotes(members, sortedMembersByMissInverted, sortedVotesByMissInverted, membersMostMissvotes);
                 MissedVotes(members, sortedMembersByMiss, sortedVotesByMiss, membersLeastMissvotes, membersLeastMissvotes);


                 var statistics = {
                     "number-of-Democrats": numberMembersD,
                     "number-of-Replublicans": numberMembersR,
                     "number-of-Independents": numberMembersI,
                     "R-votes-with-party": averageVotesR,
                     "D-votes-with-party": averageVotesD,

                     "members-most-often-vote-with-party": membersMostvoteWithParty,
                     "members-least-ofen-vote-with-party": membersLeastvoteWithParty,
                     "members-most-missed-vote": membersMostMissvotes,
                     "members-least-missed-vote": membersLeastMissvotes,
                 };

                 createTable1(statistics);
                 

                 //
                 //                calling("least-loyal", createTable2);
                 //                calling("most-loyal", createTable3);
                 calling("least-engaged", createTable4);
                 calling("most-engaged", createTable5);
                 dataTab("#most");
                 dataTab2("#least");


             }
         })
     };


     function dataTab(id) {

         $(id).dataTable({
             "bPaginate": false,
             "sScrollY": "600",
             "bScrollCollapse": true,
             "fixedHeader": true,
             "searching": false,
             "showNEntries": false,
             "bInfo": false,
             "order": [[ 2, "asc"]]

         });
     };
function dataTab2(id) {

         $(id).dataTable({
             "bPaginate": false,
             "sScrollY": "600",
             "bScrollCollapse": true,
             "fixedHeader": true,
             "searching": false,
             "showNEntries": false,
             "bInfo": false,
             "order": [[ 2, "desc"]]

         });
     };



     function frame() {
         $(".iframe").colorbox({
             iframe: true,
             innerWidth: "70%",
             innerHeight: "70%",
             opacity: 0.8
         });
     };



     function getMembersParty(members, membersD, membersR, membersI) {
         for (var i = 0; i < members.length; i++) {
             if (members[i].party === "D") {
                 membersD.push(members[i]);
             }
             if (members[i].party === "R") {
                 membersR.push(members[i]);
             }
             if (members[i].party === "I") {
                 membersI.push(members[i]);
             }
         }

     }




     function getVotesWithParty(array, array2, array3) {
         for (var i = 0; i < array.length; i++) {
             array2.push(array3[i].votes_with_party_pct);

         }
     }





     function averageVotes(arry) {
         var sum = arry.reduce(function (v, x) {
             return v + x
         }, 0);
         return sum / arry.length;
     }






     function OftenVoteWithParty(members, arr, arr2, arr3) {
         var percentMembers = Math.round((members.length) * 10 / 100);
         for (let i = 0; i < percentMembers; i++) {
             if (arr[i].votes_with_party_pct == arr2[i]) {
                 arr3.push(arr[i]);
             }
         }
         for (let i = 0; i < members.length; i++) {
             if (members[i].votes_with_party_pct == arr2[percentMembers - 1] && !arr3.includes(members[i])) {
                 arr3.push(members[i]);
             }
         }

     }




     function getVotesMissed(arr) {
         for (var i = 0; i < arr.length; i++) {
             votesMiss.push(arr[i].missed_votes_pct);

         }
     }




     function MissedVotes(members, filed, filed2, filed3) {
         var percentMembers = Math.round((members.length) * 10 / 100);
         for (var i = 0; i < percentMembers; i++) {
             if (filed[i].missed_votes_pct == filed2[i]) {
                 filed3.push(filed[i]);
             }
         }
         for (var i = 0; i < members.length; i++) {
             if (members[1].missed_votes_pct === filed2[percentMembers - 1] && !filed3.includes(members[i])) {
                 filed3.push(members[i]);
             }
         }

     }







     function createTable1(statistics) {
         var sortedVotesByMiss = votesMiss.slice(0);
         document.getElementById("numberRepR").innerHTML = statistics["number-of-Democrats"];
         document.getElementById("numberRepD").innerHTML = statistics["number-of-Replublicans"];
         document.getElementById("numberRepI").innerHTML = statistics["number-of-Independents"];
         document.getElementById("pct-w-parrtyR").innerHTML = statistics["R-votes-with-party"];
         document.getElementById("pct-w-parrtyD").innerHTML = statistics["D-votes-with-party"];
         document.getElementById("pct-w-parrtyI").innerHTML = "/";
         document.getElementById("totalReps").innerHTML = (statistics["number-of-Democrats"]) + (statistics["number-of-Independents"]) + (statistics["number-of-Replublicans"]);
     }





     function calling(id, name) {
         if (document.getElementById(id) !== null) {
             name(statistics);
         }

     }



     function createTable4() {
         var tblBody = document.getElementById("least-engaged");
         for (var i = 0; i < membersMostMissvotes.length; i++) {
             if (membersMostMissvotes[i].middle_name === null) {
                 membersMostMissvotes[i].middle_name = "";
             }
             var fullName = membersMostMissvotes[i].last_name + "," + " " + membersMostMissvotes[i].first_name + " " + membersMostMissvotes[i].middle_name;
             var pctWithParty = membersMostMissvotes[i].missed_votes_pct;
             var totalVotes = membersMostMissvotes[i].missed_votes;
             var urlMembers = membersMostMissvotes[i].url;
             var link = document.createElement("a");

             link.setAttribute("href", urlMembers);
             link.setAttribute("target", "_blank");
             link.innerHTML = fullName;
             link.setAttribute("class", "iframe");
             var tr = document.createElement("tr");
             var col0 = document.createElement("td");
             col0.append(link);
             var col1 = document.createElement("td");
             col1.innerHTML = totalVotes;
             var col2 = document.createElement("td");
             col2.innerHTML = pctWithParty + "%";

             tr.append(col0);
             tr.append(col1);
             tr.append(col2);
             tblBody.append(tr);
         }
     }




     function createTable5() {
         var tblBody = document.getElementById("most-engaged");
         for (var i = 0; i < membersLeastMissvotes.length; i++) {
             if (membersLeastMissvotes[i].middle_name === null) {
                 membersLeastMissvotes[i].middle_name = "";
             }
             var fullName = membersLeastMissvotes[i].last_name + "," + " " + membersLeastMissvotes[i].first_name + " " + membersLeastMissvotes[i].middle_name;
             var pctWithParty = membersLeastMissvotes[i].missed_votes_pct;
             var totalVotes = membersLeastMissvotes[i].missed_votes;
             var urlMembers = membersLeastMissvotes[i].url;
             var link = document.createElement("a");

             link.setAttribute("href", urlMembers);
             link.setAttribute("target", "_blank");
             link.innerHTML = fullName;
             link.setAttribute("class", "iframe");
             var tr = document.createElement("tr");
             var col0 = document.createElement("td");
             col0.append(link);
             var col1 = document.createElement("td");
             col1.innerHTML = totalVotes;
             var col2 = document.createElement("td");
             col2.innerHTML = pctWithParty + "%";

             tr.append(col0);
             tr.append(col1);
             tr.append(col2);
             tblBody.append(tr);
         }
     }




     function createTable2() {
         var tblBody = document.getElementById("least-loyal");
         for (var i = 0; i < membersLeastvoteWithParty.length; i++) {
             if (membersLeastvoteWithParty[i].middle_name === null) {
                 membersLeastvoteWithParty[i].middle_name = "";
             }
             var fullName = membersLeastvoteWithParty[i].last_name + "," + " " + membersLeastvoteWithParty[i].first_name + " " + membersLeastvoteWithParty[i].middle_name;
             var pctWithParty = membersLeastvoteWithParty[i].votes_with_party_pct;
             var totalVotes = Math.round((membersLeastvoteWithParty[i].votes_with_party_pct) * (membersLeastvoteWithParty[i].total_votes) / 100);
             var urlMembers = membersLeastvoteWithParty[i].url;
             var link = document.createElement("a");

             link.setAttribute("href", urlMembers);
             link.setAttribute("target", "_blank");
             link.innerHTML = fullName;
             link.setAttribute("class", "iframe");
             var tr = document.createElement("tr");
             var col0 = document.createElement("td");
             col0.append(link);
             var col1 = document.createElement("td");
             col1.innerHTML = totalVotes;
             var col2 = document.createElement("td");
             col2.innerHTML = pctWithParty + "%";

             tr.append(col0);
             tr.append(col1);
             tr.append(col2);
             tblBody.append(tr);
         }
     }




     function createTable3() {
         var tblBody = document.getElementById("most-loyal");
         for (var i = 0; i < membersMostvoteWithParty.length; i++) {
             if (membersMostvoteWithParty[i].middle_name === null) {
                 membersMostvoteWithParty[i].middle_name = "";
             }
             var fullName = membersMostvoteWithParty[i].last_name + "," + " " + membersMostvoteWithParty[i].first_name + " " + membersMostvoteWithParty[i].middle_name;
             var pctWithParty = membersMostvoteWithParty[i].votes_with_party_pct;
             var totalVotes = Math.round((membersMostvoteWithParty[i].votes_with_party_pct) * (membersMostvoteWithParty[i].total_votes) / 100);
             var urlMembers = membersMostvoteWithParty[i].url;
             var link = document.createElement("a");

             link.setAttribute("href", urlMembers);
             link.setAttribute("target", "_blank");
             link.innerHTML = fullName;
             link.setAttribute("class", "iframe");
             var tr = document.createElement("tr");
             var col0 = document.createElement("td");
             col0.append(link);
             var col1 = document.createElement("td");
             col1.innerHTML = totalVotes;
             var col2 = document.createElement("td");
             col2.innerHTML = pctWithParty + "%";

             tr.append(col0);
             tr.append(col1);
             tr.append(col2);
             tblBody.append(tr);
         }
     }

     function forScroll() {
         $(window).scroll(function () {
             if ($(this).scrollTop()) {
                 $('#toTop:hidden').stop(true, true).fadeIn();
             } else {
                 $('#toTop').stop(true, true).fadeOut(0);
             }
         });
     };






 });

$("#FilterForm").hide();

$(document).ready(function () {
    var data;
    var uniqueArray = [];
    var checkedi = document.getElementById("I");
    var checkedd = document.getElementById("D");
    var checkedr = document.getElementById("R");
    var inpu = $("#inputSearch")

    if ($("body").hasClass("senate")) {
        $.ajax({
            url: 'https://api.propublica.org/congress/v1/113/senate/members.json',
            headers: {
                'X-API-Key': 'AUuJMv1tlUhOXJosDeDBdhEdC9WFEOGOBkUGR9XC'
            },
            success: function (data) {

                var members = data.results[0].members;

                $('.loadingDiv').hide();
                $("#FilterForm").show();
                arrayWithNoDuplicates(data);
                createSelectors(data);
                createTabledata(data);
                 frame();
                dataTab();

                document.getElementById("inputSearch").onkeyup = function () {
                    searchInput()
                };
                
                document.getElementById("R").onclick = function () {
                    createTabledata2(data),
                    searchInput(),
                    checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")
                };
                
                document.getElementById("I").onclick = function () {
                    createTabledata2(data),
                    searchInput(),
                    checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")
                };
                
                document.getElementById("D").onclick = function () {
                    createTabledata2(data),
                    searchInput(),
                    checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")
                };
                
                document.getElementById("stateselect").onchange = function () {
                    createTabledata2(data),
                     searchInput()
                };
                
                forScroll();



            }

        })
    };



    if ($("body").hasClass("house")) {
        $("#FilterForm").hide();

        $.ajax({
            url: 'https://api.propublica.org/congress/v1/113/house/members.json',
            headers: {
                'X-API-Key': 'AUuJMv1tlUhOXJosDeDBdhEdC9WFEOGOBkUGR9XC'
            },
            success: function (data) {

                var members = data.results[0].members;

                $('.loadingDiv').hide();
                $("#FilterForm").show();
                arrayWithNoDuplicates(data);
                createSelectors(data);
                createTabledata(data);
                dataTab();
              
                checked(checkedi, "ifont", "changei", "change2i");
                checked(checkedd, "dfont", "changed", "change2d");
                checked(checkedr, "rfont", "changer", "change2r");

                document.getElementById("inputSearch").onkeyup = function () {
                    searchInput()

                };
                document.getElementById("R").onclick = function () {
                    createTabledata2(data),
                        searchInput(),
                        checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")
                };
                document.getElementById("I").onclick = function () {
                    createTabledata2(data),
                        searchInput(),
                        checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")
                };
                document.getElementById("D").onclick = function () {
                    createTabledata2(data),
                        searchInput(),
                        checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")

                };
                document.getElementById("stateselect").onchange = function () {
                    createTabledata2(data),
                        searchInput(),
                        checked(checkedi, "ifont", "changei", "change2i")
                    checked(checkedd, "dfont", "changed", "change2d")
                    checked(checkedr, "rfont", "changer", "change2r")
                };
                forScroll();


            }



        })
    };






    //Funciones//


    function dataTab() {

        $('#table-data').dataTable({
            "bPaginate": false,
            "sScrollY": "600",
            "bScrollCollapse": true,
            "fixedHeader": true,
            "searching": false,
            "showNEntries": false,
            "bInfo": false,
            

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

    function checked(field, filed2, field3, field4) {

        if (field.checked == true) {
            document.getElementById(filed2).setAttribute("class", "fontbold");
            document.getElementById(field3).style.display = "inline";
            document.getElementById(field4).style.display = "none";
        } else {
            document.getElementById(filed2).setAttribute("class", "notfontbold");

            document.getElementById(field3).style.display = "none";
            document.getElementById(field4).style.display = "inline";
        }
    };



    function createTabledata(fill) {
        var dropselected = document.getElementById("stateselect").value;
        var tableElement = document.getElementById("table-data");
        while (tableElement.firstChild) {
            tableElement.firstChild.remove();
        }

        var members = fill.results[0].members;

        var checkedArray = [];
        var tblH = document.createElement("thead");
        var tblBody = document.createElement("tbody");
        tableElement.append(tblH);
        tableElement.append(tblBody);


        for (var i = 0; i < members.length; i++) {
            if (document.getElementById("R").checked == true) {
                if ((members[i].party === "R") && ((members[i].state == dropselected) || ("All" == dropselected))) {
                    checkedArray.push(members[i]);
                }
            }

        }
        for (var i = 0; i < members.length; i++) {
            if (document.getElementById("I").checked == true) {
                if ((members[i].party === "I") && ((members[i].state == dropselected) || ("All" == dropselected))) {
                    checkedArray.push(members[i]);
                }
            }
        }
        for (var i = 0; i < members.length; i++) {
            if (document.getElementById("D").checked == true) {
                if ((members[i].party === "D") && ((members[i].state == dropselected) || ("All" == dropselected))) {
                    checkedArray.push(members[i]);
                }
            }
        }
        if (checkedArray.length == 0) {
            tableElement.firstChild.remove();
            var divElement = document.getElementById("noResultss");
            divElement.innerHTML = "No results match your search criteria";

        }


        var th0 = document.createElement("th");
        th0.innerHTML = "Name";
        var th1 = document.createElement("th");
        th1.innerHTML = "Party Affilication";
        var th2 = document.createElement("th");
        th2.innerHTML = "State";
        var th3 = document.createElement("th");
        th3.innerHTML = "Seniority";
        var th4 = document.createElement("th");
        th4.innerHTML = "Votes with Party";

        var tr2 = document.createElement("tr");
        tr2.append(th0);
        tr2.append(th1);
        tr2.append(th2);
        tr2.append(th3);
        tr2.append(th4);
        tblH.append(tr2);


        for (var i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i].middle_name === null) {
                checkedArray[i].middle_name = "";
            }
            var fullName = checkedArray[i].last_name + "," + " " + checkedArray[i].first_name + " " + checkedArray[i].middle_name;
            var party = checkedArray[i].party;
            var state = checkedArray[i].state;
            var urlMembers = checkedArray[i].url;
            var link = document.createElement("a");
            //        var nameForlink = fullName;
            link.setAttribute("href", urlMembers);
            link.setAttribute("class", "iframe");
            link.setAttribute("target", "_blank");
            link.innerHTML = fullName;
            var percentage = checkedArray[i].votes_with_party_pct + "%";

            var tr = document.createElement("tr");
            var col0 = document.createElement("td");
            col0.append(link);
            var col1 = document.createElement("td");
            col1.innerHTML = party;
            var col2 = document.createElement("td");
            col2.innerHTML = state;
            var col3 = document.createElement("td");
            col3.innerHTML = checkedArray[i].seniority;
            var col4 = document.createElement("td");
            col4.innerHTML = percentage;

            tr.setAttribute("class", state);


            tr.append(col0);
            tr.append(col1);
            tr.append(col2);
            tr.append(col3);
            tr.append(col4);



            tblBody.append(tr);






        }
    }

    function createTabledata2(fill) {
        var dropselected = document.getElementById("stateselect").value;
        var tableElement = document.getElementById("table-data");
        while (tableElement.firstChild) {
            tableElement.firstChild.remove();
        }


        var members = fill.results[0].members;

        var checkedArray = [];

        var tblBody = document.createElement("tbody");

        tableElement.append(tblBody);


        for (var i = 0; i < members.length; i++) {
            if (document.getElementById("R").checked == true) {
                if ((members[i].party === "R") && ((members[i].state == dropselected) || ("All" == dropselected))) {
                    checkedArray.push(members[i]);
                }
            }

        }
        for (var i = 0; i < members.length; i++) {
            if (document.getElementById("I").checked == true) {
                if ((members[i].party === "I") && ((members[i].state == dropselected) || ("All" == dropselected))) {
                    checkedArray.push(members[i]);
                }
            }
        }
        for (var i = 0; i < members.length; i++) {
            if (document.getElementById("D").checked == true) {
                if ((members[i].party === "D") && ((members[i].state == dropselected) || ("All" == dropselected))) {
                    checkedArray.push(members[i]);
                }
            }
        }
        if (checkedArray.length == 0) {
            tableElement.firstChild.remove();
            var divElement = document.createElement("div");
            divElement.innerHTML = "No results match your search criteria.";
            divElement.setAttribute("class", "noResults");
            tableElement.append(divElement);

        }









        for (var i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i].middle_name === null) {
                checkedArray[i].middle_name = "";
            }
            var fullName = checkedArray[i].last_name + "," + " " + checkedArray[i].first_name + " " + checkedArray[i].middle_name;
            var party = checkedArray[i].party;
            var state = checkedArray[i].state;
            var urlMembers = checkedArray[i].url;
            var link = document.createElement("a");
            //        var nameForlink = fullName;
            link.setAttribute("href", urlMembers);
            link.setAttribute("class", "iframe");
            link.setAttribute("target", "_blank");
            link.innerHTML = fullName;
            var percentage = checkedArray[i].votes_with_party_pct + "%";

            var tr = document.createElement("tr");
            var col0 = document.createElement("td");
            col0.append(link);
            var col1 = document.createElement("td");
            col1.innerHTML = party;
            var col2 = document.createElement("td");
            col2.innerHTML = state;
            var col3 = document.createElement("td");
            col3.innerHTML = checkedArray[i].seniority;
            var col4 = document.createElement("td");
            col4.innerHTML = percentage;

            tr.setAttribute("class", state);


            tr.append(col0);
            tr.append(col1);
            tr.append(col2);
            tr.append(col3);
            tr.append(col4);



            tblBody.append(tr);






        }

    }










    var uniqueArray = [];

    function arrayWithNoDuplicates(fill) {

        var arrayOfStates = [];
        var members = fill.results[0].members;
        for (var i = 0; i < members.length; i++) { /// si no contiene este valor, push al new array.
            var state = members[i].state;
            arrayOfStates.push(state);
            if (uniqueArray.indexOf(arrayOfStates[i]) == -1) {
                uniqueArray.push(arrayOfStates[i])
            }
        }
        console.log(uniqueArray);
    }

    function createSelectors(fill) {
        var selectElement = document.getElementById("stateselect");
        for (var i = 0; i < uniqueArray.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", uniqueArray[i])
            option.innerHTML = uniqueArray[i];
            selectElement.append(option);
        }

    }

    function searchInput() {
        $("#table-data").show();
        $("#noResultss").hide();
        var input, filter, table, tr, td, i;
        var status = true;
        input = document.getElementById("inputSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("table-data");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    status = false;
                } else {
                    tr[i].style.display = "none";



                }
            }
        }
        if (status) {
            var table = document.getElementById("table-data");
            $("#noResultss").show();
            $("#table-data").hide();
            var divElement = document.getElementById("noResultss");
            divElement.innerHTML = "No results match your search criteria";


        }
    }

    function emptyTable() {

        if (td = null) {
            var tr = document.createElement("tr");
            var col0 = document.createElement("td");
            col0.innerHTML = "No results found";
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

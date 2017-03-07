$(document).ready(() => {
    //Initialise the select
    $('select').material_select();

    //Display the current filters
    //f=Naruto&s=4&t=14
    let url = window.location.search.split('?')[1];
    //Naruto&s=4&t=14
    if (url != null) {
        url = url.substr(2);
    }
    //Naruto
    // let fanfiction = url.split("&")[0];
    //s=4
    let sort;
    if (url != null) {
        sort = url.split("&")[1];
    }
    if (sort != null) {
        sort = sort.substr(2);
    }
    //t=14
    let time;
    if (url != null) {
        time = url.split("&")[2];
    }
    if (time != null) {
        time = time.substr(2);

    }
    if (sort != null) {
        //console.log("here");
        //console.log(sort);
        // $("#sort").val(sort);
        $("#sort option[value='" + sort + "']").attr("selected", "selected");
    }
    if (time != null) {
        //console.log("here");
        //console.log(time);
        // $("#time").val(time);
        $("#time option[value='" + time + "']").attr("selected", "selected");
    }

    //If the pagination buttons aree clicked
    $(".pagination a").click((event) => {
        //Couldn't use "this" so used event instead
        let page = event.target.id;
        //when the chevrons are pressed
        if (page == "-1" || page == "+1") {
            let fanfiction = window.location.search.split("?")[1];
            fanfiction = fanfiction.substr(2);
            let filterSelected = window.location.search.split("&")[2];
            //check if the filter has been selected
            if (filterSelected == null) {
                //the filter has not been selected
                console.log("In if");
                filterSelected = window.location.search.split("&")[1];
                if (filterSelected != null) {
                    filterSelected = filterSelected.substr(2);
                    filterSelected = parseInt(filterSelected);
                    if (page == "+1") {
                        filterSelected = filterSelected + 1;
                        if (filterSelected > 9) {
                            fanfiction = fanfiction.slice(0, -5);
                        } else {
                            fanfiction = fanfiction.slice(0, -4);
                        }
                    } else {
                        console.log(filterSelected);
                        filterSelected = filterSelected - 1;
                        if (filterSelected >= 9) {
                            fanfiction = fanfiction.slice(0, -5);
                        } else {
                            fanfiction = fanfiction.slice(0, -4);
                        }
                    }
                } else {
                    if (page == "+1") {
                        filterSelected = 2;
                    } else {
                        filterSelected = 1;
                    }
                }
            } else {
                console.log("In else");
                //the filter has been selected
                filterSelected = window.location.search.split("&")[3];
                if (filterSelected != null) {
                    filterSelected = filterSelected.substr(2);
                    filterSelected = parseInt(filterSelected);
                    if (page == "+1") {
                        filterSelected = filterSelected + 1;
                        if (filterSelected > 9) {
                            fanfiction = fanfiction.slice(0, -5);
                        } else {
                            fanfiction = fanfiction.slice(0, -4);
                        }
                    } else {
                        console.log(filterSelected);
                        filterSelected = filterSelected - 1;
                        if (filterSelected >= 9) {
                            fanfiction = fanfiction.slice(0, -5);
                        } else {
                            fanfiction = fanfiction.slice(0, -4);
                        }
                    }
                } else {
                    filterSelected = 1;
                    if (page == "+1") {
                        filterSelected = 2;
                    } else {
                        filterSelected = 1;
                    }
                }
            }
            window.location.href = `/fics?f=${fanfiction}&p=${filterSelected}`;
        } else {
            //When the numbers are pressed
            let fanfiction = window.location.search.split('?')[1];
            fanfiction = fanfiction.substr(2);
            let filterSelected = window.location.search.split("&")[2];
            //check if the filter has been selected
            if (filterSelected == null) {
                //the filter has not been selected
                filterSelected = window.location.search.split("&")[1];
                console.log(filterSelected);
                if (filterSelected != null) {
                    filterSelected = filterSelected.substr(2);
                    if (filterSelected > 9) {
                        fanfiction = fanfiction.slice(0, -5);
                    } else {
                        fanfiction = fanfiction.slice(0, -4);
                    }
                }
            } else {

            }
            window.location.href = `/fics?f=${fanfiction}&p=${page}`;
        }
    });
    //if the filter has been changed
    $("#filter").click(() => {
        //Get the fanfiction
        let fanfiction = window.location.search.split('?')[1];
        fanfiction = fanfiction.split("&")[0];
        fanfiction = fanfiction.substr(2);
        //Get the sort from the dropdown
        let sort = $("#sort :selected").val();
        let time = $("#time :selected").val();
        //for some reason it doesnt get the rest of the href
        window.location.href = `/fics?f=${fanfiction}&s=${sort}&t=${time}`;
    });


});
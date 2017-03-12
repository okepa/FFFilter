$(document).ready(() => {
    let sort;
    let time;
    let page;
    //Display the current filters
    let url = window.location.search.split('?')[1];
    if (url != null) {
        url = url.substr(2);
        sort = url.split("&")[1];
        time = url.split("&")[2];
        page = url.split("&")[3];
    }
    if (sort != null) {
        if (sort.indexOf("p=") > -1) {
            page = sort.substr(2);
            $(`#${page}`).addClass("active");
        } else {
            sort = sort.substr(2);
            $("#sort option[value='" + sort + "']").attr("selected", "selected");
        }
    } else {
        $("#1").addClass("active");
    }
    if (time != null) {
        time = time.substr(2);
        $("#time option[value='" + time + "']").attr("selected", "selected");
    }
    if (page != null) {
        page = page.substr(2);
        $(`#${page}`).addClass("active");
    } else {
        $("#1").addClass("active");
    }
    //Initialise the select
    $('select').material_select();

    //If the pagination buttons are clicked
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
            let url = window.location.href;
            url = url.indexOf("fics");
            if (url > -1) {
                window.location.href = `/fics?f=${fanfiction}&p=${filterSelected}`;
            } else {
                let fanfiction1 = fanfiction.split("-and-")[0];
                let fanfiction2 = fanfiction.split("-and-")[1];
                window.location.href = `/crossovers?f=${fanfiction1}-and-${fanfiction2}&p=${filterSelected}`;
            }
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
                //the filter has been selected
                filterSelected = window.location.search.split("&")[3];
                if (filterSelected != null) {
                    filterSelected = filterSelected.substr(2);
                    filterSelected = parseInt(filterSelected);
                    if (filterSelected > 9) {
                        fanfiction = fanfiction.slice(0, -5);
                    } else {
                        fanfiction = fanfiction.slice(0, -4);
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
            let url = window.location.href;
            url = url.indexOf("fics");
            if (url > -1) {
                window.location.href = `/fics?f=${fanfiction}&p=${page}`;
            } else {
                let fanfiction1 = fanfiction.split("-and-")[0];
                let fanfiction2 = fanfiction.split("-and-")[1];
                window.location.href = `/crossovers?f=${fanfiction1}-and-${fanfiction2}&p=${page}`;
            }
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
        //Go to either fic or crossover
        let url = window.location.href;
        url = url.indexOf("fics");
        if (url > -1) {
            window.location.href = `/fics?f=${fanfiction}&s=${sort}&t=${time}`;
        } else {
            let fanfiction1 = fanfiction.split("-and-")[0];
            let fanfiction2 = fanfiction.split("-and-")[1];
            window.location.href = `/crossovers?f=${fanfiction1}-and-${fanfiction2}&s=${sort}&t=${time}`;
        }
    });

    $("#fanfiction1").click((event) => {
        let fanfiction1 = event.target.id;
        $(".one").removeClass("active");
        $(`[id="${fanfiction1}"]`).addClass("active");
    });

    $("#fanfiction2").click((event) => {
        let fanfiction2 = event.target.id;
        $(".two").removeClass("active");
        $(`[id="${fanfiction2}"]`).addClass("active");
    });

    $("#crossover").click(() => {
        let fanfiction1 = $("#fanfiction1 .active").html();
        let fanfiction2 = $("#fanfiction2 .active").html();
        if (fanfiction1 == null || fanfiction2 == null) {
            $("#error").append("Choose one fanfiction from each side");
        } else {
            window.location.href = `/crossovers?f=${fanfiction1}-and-${fanfiction2}`;
        }
    });
});
$(document).ready(() => {
    $(".pagination a").click((event) => {
        //Couldn't use "this" so used event instead
        let page = event.target.id;
        //when the chevrons are pressed
        if (page == "-1" || page == "+1") {
            //need to find out what the original page number is to add it to that
            let originalPage = window.location.search.split("&")[1];
            if (originalPage == null) {
                originalPage = 1;
            } else {
                originalPage = originalPage.substr(2);
                originalPage = parseInt(originalPage)
            }
            if (page == "+1") {
                originalPage = originalPage + 1;
            } else {
                originalPage = originalPage - 1;
            }
            let fanfiction = window.location.search.split('?')[1];
            fanfiction = fanfiction.split("&")[0];
            fanfiction = fanfiction.substr(2);
            window.location.href = `/fics?f=${fanfiction}&p=${originalPage}`;

        } else {
            //When the numbers are pressed
            //get the fanfiction from url
            let fanfiction = window.location.search.split('?')[1];
            fanfiction = fanfiction.substr(2);
            window.location.href = `/fics?f=${fanfiction}&p=${page}`;
        }

    });
});
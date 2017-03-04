$(document).ready(() => {
    $(".pagination a").click((event) => {
        //Couldn't use "this" so used event instead
        let page = event.target.id;
        console.log(page);
        //get the fanfiction from url
        let fanfiction = window.location.search.split('?')[1];
        fanfiction = fanfiction.substr(2);
        window.location.href = `/favorites?f=${fanfiction}&p=${page}`;
    });
});
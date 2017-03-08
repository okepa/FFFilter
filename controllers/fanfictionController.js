const Fanfiction = require('../models/fanfiction');
const Favorites = require('../models/favorites');
const scraperjs = require('scraperjs');

class FanfictionController {
    //Load the fanfiction onto the page
    static getFanfiction(req, res) {
        Fanfiction.find({}, (err, fanfiction) => {
            if (err) {
                reject(err);
            } else {
                res.render("components/fanfiction", {
                    title: "Fanfiction",
                    fanfiction: fanfiction
                });
            }
        });
    }
    //Scrape all the fics for the selected fanfiction
    static getFics(req, res) {
        //Select what the medium is by doing a find
        Fanfiction.findOne({ "fanfiction": req.query.f }, (err, fm) => {
            if (err) {
                reject(err);
            } else {
                //Gets the medium for the database
                let medium = fm.medium;
                //Gets the fanfiction from the url
                let fanfiction = req.query.f;
                //get the sort of the fics from the url
                let sort;
                //select the sort or default 5
                if (req.query.s == null) {
                    sort = 5;
                } else {
                    sort = req.query.s;
                }
                //get the time of the fics from the url
                let time;
                //select the sort or default 5
                if (req.query.t == null) {
                    time = 4;
                } else {
                    time = req.query.t;
                }
                //Gets the page from the url
                let page;
                //Select the page or default to 1
                if (req.query.p == null) {
                    page = 1;
                } else {
                    page = req.query.p;
                }
                fanfiction = fanfiction.replace(/ /g, "-");
                fanfiction = fanfiction.replace("/", "-");
                fanfiction = fanfiction.replace("×", "-");
                let favorite = false;
                let finalArray = [];
                Favorites.find({"fanfiction":req.query.f}, (err, favorites) => {
                    console.log(favorites);
                    if (err) {
                        reject(err);
                    } else {
                        scraperjs.StaticScraper.create(`https://www.fanfiction.net/${medium}/${fanfiction}/?&srt=${sort}&lan=1&r=10&len=20&t=${time}&p=${page}`)
                            .scrape(($) => {
                                return $(".z-list.zhover.zpointer *").map(function () {
                                    let scrapeArray = [];
                                    var text = $(this).text();
                                    var href = $(this).attr("href");
                                    scrapeArray.push(text);
                                    scrapeArray.push(href);
                                    return scrapeArray;
                                }).get();
                            })
                            .then((info) => {
                                let count = 20;
                                for (let i in info) {
                                    for (let j in favorites) {
                                        if (info[i] == favorites[j].title) {
                                            favorite = true;
                                        }
                                    }
                                    if (favorite == true) {
                                        if (count % 20 == 19) {
                                            favorite = false;
                                        } else {
                                            favorite = true;
                                        }
                                    }
                                    else if (count % 20 == 0 || count % 20 == 1 || count % 20 == 8 || count % 20 == 9 || count % 20 == 12) {
                                        finalArray.push(info[i]);
                                    }
                                    count++;
                                }
                                res.render("components/fics", {
                                    title: "Favorite",
                                    storyTitles: finalArray
                                });
                            });
                    }
                });
            }
        });
    }
}

module.exports = FanfictionController;
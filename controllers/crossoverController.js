const Fanfiction = require('../models/fanfiction');
const Favorites = require('../models/favorites');
const scraperjs = require('scraperjs');

class CrossoverFanfictionController {
    //Load the fanfiction onto the page
    static getCrossoverFanfiction(req, res) {
        Fanfiction.find({}, (err, crossoverFanfiction) => {
            if (err) {
                reject(err);
            } else {
                res.render("components/crossoverFanfiction", {
                    title: "Crossover Fanfiction",
                    fanfiction: crossoverFanfiction
                });
            }
        });
    }
    //Scrape all the fics for the selected fanfiction
    static getCrossovers(req, res) {
        let fanfiction = req.query.f;
        let fanfiction1 = fanfiction.split("-and-")[0];
        let fanfiction2 = fanfiction.split("-and-")[1];
        //get id of the first fanfiction
        Fanfiction.findOne({ "fanfiction": fanfiction1 }, (err, ff1) => {
            if (err) {
                reject(err);
            } else {
                //get id of the second fanfiction
                Fanfiction.findOne({ "fanfiction": fanfiction2 }, (err, ff2) => {
                    if (err) {
                        reject(err);
                    } else {
                        let finalArray = [];
                        let favorite = false;
                        let ff1Id = ff1.ffid;
                        let ff2Id = ff2.ffid;
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
                        //get fanfiction1
                        Favorites.find({ "fanfiction": fanfiction1 }, (err, favorites1) => {
                            if (err) {
                                reject(err);
                            } else {
                                //get fanfiction2
                                Favorites.find({ "fanfiction": fanfiction2 }, (err, favorites2) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        //combine the two arrays together
                                        let favorites = favorites1.concat(favorites2);
                                        fanfiction1 = fanfiction1.replace(/ /g, "-");
                                        fanfiction1 = fanfiction1.replace("/", "-");
                                        fanfiction1 = fanfiction1.replace("×", "-");
                                        fanfiction2 = fanfiction2.replace(/ /g, "-");
                                        fanfiction2 = fanfiction2.replace("/", "-");
                                        fanfiction2 = fanfiction2.replace("×", "-");
                                        scraperjs.StaticScraper.create(`https://www.fanfiction.net/${fanfiction1}-and-${fanfiction2}-Crossovers/${ff1Id}/${ff2Id}/?&srt=${sort}&lan=1&r=10&len=20&t=${time}&p=${page}`)
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
                                                console.log(finalArray);
                                                res.render("components/crossovers", {
                                                    title: "Crossovers",
                                                    storyTitles: finalArray
                                                });
                                            });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });


        //Select what the medium is by doing a find
        // Fanfiction.findOne({ "fanfiction": req.query.f }, (err, fm) => {
        //     if (err) {
        //         reject(err);
        //     } else {
        //         //Gets the medium for the database
        //         let medium = fm.medium;
        //         //Gets the fanfiction from the url
        //         let fanfiction = req.query.f;
        //         //get the sort of the fics from the url
        //         let sort;
        //         //select the sort or default 5
        //         if (req.query.s == null) {
        //             sort = 5;
        //         } else {
        //             sort = req.query.s;
        //         }
        //         //get the time of the fics from the url
        //         let time;
        //         //select the sort or default 5
        //         if (req.query.t == null) {
        //             time = 4;
        //         } else {
        //             time = req.query.t;
        //         }
        //         //Gets the page from the url
        //         let page;
        //         //Select the page or default to 1
        //         if (req.query.p == null) {
        //             page = 1;
        //         } else {
        //             page = req.query.p;
        //         }
        //         fanfiction = fanfiction.replace(/ /g, "-");
        //         fanfiction = fanfiction.replace("/", "-");
        //         fanfiction = fanfiction.replace("×", "-");
        //         let favorite = false;
        //         let finalArray = [];
        //         Favorites.find({"fanfiction":req.query.f}, (err, favorites) => {
        //             console.log(favorites);
        //             if (err) {
        //                 reject(err);
        //             } else {
        //                 scraperjs.StaticScraper.create(`https://www.fanfiction.net/${medium}/${fanfiction}/?&srt=${sort}&lan=1&r=10&len=20&t=${time}&p=${page}`)
        //                     .scrape(($) => {
        //                         return $(".z-list.zhover.zpointer *").map(function () {
        //                             let scrapeArray = [];
        //                             var text = $(this).text();
        //                             var href = $(this).attr("href");
        //                             scrapeArray.push(text);
        //                             scrapeArray.push(href);
        //                             return scrapeArray;
        //                         }).get();
        //                     })
        //                     .then((info) => {
        //                         let count = 20;
        //                         for (let i in info) {
        //                             for (let j in favorites) {
        //                                 if (info[i] == favorites[j].title) {
        //                                     favorite = true;
        //                                 }
        //                             }
        //                             if (favorite == true) {
        //                                 if (count % 20 == 19) {
        //                                     favorite = false;
        //                                 } else {
        //                                     favorite = true;
        //                                 }
        //                             }
        //                             else if (count % 20 == 0 || count % 20 == 1 || count % 20 == 8 || count % 20 == 9 || count % 20 == 12) {
        //                                 finalArray.push(info[i]);
        //                             }
        //                             count++;
        //                         }
        //                         res.render("components/fics", {
        //                             title: "Fics",
        //                             storyTitles: finalArray
        //                         });
        //                     });
        //             }
        //         });
        //     }
        // });
    }
}

module.exports = CrossoverFanfictionController;
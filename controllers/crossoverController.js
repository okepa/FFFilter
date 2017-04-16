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
                        let ff1Id = parseInt(ff1.ffid);
                        let ff2Id;
                        if (fanfiction2 == "All") {
                            ff2Id = 0;
                        } else {
                            ff2Id = parseInt(ff2.ffid);
                            if (ff1Id < ff2Id) {
                                ff1Id = ff1.ffid;
                                if (fanfiction2 == "All") {
                                    ff2Id = 0;
                                } else {
                                    ff2Id = ff2.ffid;
                                }
                            } else {
                                ff2Id = ff1.ffid;
                                if (fanfiction2 == "All") {
                                    ff1Id = 0;
                                } else {
                                    ff1Id = ff2.ffid;
                                }
                            }
                        }
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
                                        fanfiction1 = fanfiction1.replace("é", "e");
                                        if (fanfiction1 == "High-School-DxD-ハイスクールD-D") {
                                            fanfiction1 = "High-School-DxD-%E3%83%8F%E3%82%A4%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%ABD-D";
                                        }
                                        if (fanfiction1 == "Akame-ga-Kiru-アカメが斬る") {
                                            console.log("the same");
                                            fanfiction1 = "Akame-ga-Kiru-%E3%82%A2%E3%82%AB%E3%83%A1%E3%81%8C%E6%96%AC%E3%82%8B";
                                        }
                                        if (fanfiction1 == "Tokyo-Ghoul-東京喰種トーキョーグール") {
                                            console.log("the same");
                                            fanfiction1 = "Tokyo-Ghoul-%E6%9D%B1%E4%BA%AC%E5%96%B0%E7%A8%AE%E3%83%88%E3%83%BC%E3%82%AD%E3%83%A7%E3%83%BC%E3%82%B0%E3%83%BC%E3%83%AB";
                                        }
                                        fanfiction2 = fanfiction2.replace(/ /g, "-");
                                        fanfiction2 = fanfiction2.replace("/", "-");
                                        fanfiction2 = fanfiction2.replace("×", "-");
                                        fanfiction2 = fanfiction2.replace("é", "e");
                                        if (fanfiction2 == "High-School-DxD-ハイスクールD-D") {
                                            fanfiction2 = "High-School-DxD-%E3%83%8F%E3%82%A4%E3%82%B9%E3%82%AF%E3%83%BC%E3%83%ABD-D";
                                        }
                                        if (fanfiction2 == "Akame-ga-Kiru-アカメが斬る") {
                                            fanfiction2 = "Akame-ga-Kiru-%E3%82%A2%E3%82%AB%E3%83%A1%E3%81%8C%E6%96%AC%E3%82%8B";
                                        }
                                        if (fanfiction2 == "Tokyo-Ghoul-東京喰種トーキョーグール") {
                                            fanfiction2 = "Tokyo-Ghoul-%E6%9D%B1%E4%BA%AC%E5%96%B0%E7%A8%AE%E3%83%88%E3%83%BC%E3%82%AD%E3%83%A7%E3%83%BC%E3%82%B0%E3%83%BC%E3%83%AB";
                                        }
                                        scraperjs.StaticScraper.create(`https://www.fanfiction.net/${fanfiction1}-and-${fanfiction2}-Crossovers/${ff1Id}/${ff2Id}/?&srt=${sort}&lan=1&r=10&len=20&t=${time}&p=${page}`)
                                            .scrape(($) => {
                                                return $(".z-list.zhover.zpointer *").map(function () {
                                                    let scrapeArray = [];
                                                    var text = $(this).text();
                                                    var href = $(this).attr("href");
                                                    scrapeArray.push(text);
                                                    // console.log(text);
                                                    scrapeArray.push(href);
                                                    return scrapeArray;
                                                }).get();
                                            })
                                            .then((info) => {
                                                
                                                let count = 20;
                                                for (let i in info) {
                                                    if (typeof info[i] === "string") {
                                                        console.log(info[i]);
                                                    }
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
    }
}

module.exports = CrossoverFanfictionController;
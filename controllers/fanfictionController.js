const Fanfiction = require('../models/fanfiction');
const Favorites = require('../models/favorites');
const scraperjs = require('scraperjs');

class FanfictionController {

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

    static getAddToFavorites(req, res) {
        res.render("components/addToFavorites");
    }

    static addToFavorites(req, res) {

                Fanfiction.insert({}, (err, favorites) => {
                    if (err) {
                        reject(err);
                    } else {

                    }
                });
            }

    static getFavorites(req, res) {
                //Select what the medium is by doing a find
                Fanfiction.findOne({ "fanfiction": req.query.f }, (err, fm) => {
                    if (err) {
                        reject(err);
                    } else {
                        let medium = fm.medium;
                        let fanfiction = req.query.f;
                        let page;
                        //Select the page or default to 1
                        if (req.query.p == null) {
                            page = 1;
                        } else {
                            page = req.query.p;
                        }
                        fanfiction = fanfiction.replace(" ", "-");

                        let favorite = false;
                        let finalArray = [];
                        //Put this into the database
                        let HarryPotterArray = [

                            "For Love of Magic",
                            "Shrouded Veil",
                            "The Difference One Man Can Make",
                            "The Obscure Tome",
                            "I'm Still Here",
                            "Chrysochlorous",
                            "Hogwarts Battle School",
                            "What's a Little Death between friends?",
                            "Harry Potter and the Game",
                            "Contractual Invalidation",
                            "The Bloody Ashikabi",
                            "Niflheim Academy",
                            "The House of Potter Rebuilt",
                            "Fighting Without a Cause (discontinued)",
                            "Barefoot",
                            "The Legacy Preservation Act",
                            "The Black Prince",
                            "Serpents and Celestial Bronze",
                            "Magic and Monsters",
                            "Harry Potter and the Heaven's Feel",
                            "Harry Potter: Junior Inquisitor",
                            "Breath of the Inferno",
                            "Whiskey Time Travel",
                            "The Merging",
                            "10th Life",
                            "The Accidental Animagus",
                            "Sitting on a bench",
                            "Lessons From a Grateful Veela",
                            "True Love Isn't Always Conventional",
                            "The Adventures Of Harry Potter, the Video Game: Exploited",
                            "An Inconvenient Truth",
                            "The Legacy",
                            "Petrification Proliferation",
                            "Harry Potter and the Metamorph",
                            "The Second Time Around",
                            "Wit Beyond Measure",
                            "The Spider's Web",
                            "Harry Potter and the Gathering Storm",
                            "Wand, Knife and Silence",
                            "We All Fall After The Yule Ball",
                            "Harry Potter and the Best Man's Job",
                            "Harry Potter and the Wand of Uru",
                            "Anarkia",
                            "Purebloods and Their Tedious Traditions",
                            "Ignition",
                            "The Benefits",
                            "Crosswinds of Fate",
                            "Harry Potter and the Rejected Path",
                            "Old Friends, New Friends",
                            "A Cadmean Victory",
                            "Beginnings of Truth",
                            "When a Veela Cries",
                            "Harry Potter and the Devil's Sorcery",
                            "Magicks of the Arcane",
                            "Knight of Sitri",
                            "Harry Potter and the Invincible TechnoMage",
                            "The Lawyers Against the Cup",
                            "Requiem out of Emptiness",
                            "The Great Pursuit",
                            "The Pureblood Princess",
                            "Embraced by the Darkness",
                            "Harry Potter and The Veela",
                            "Dancing in the Green",
                            "Harry Potter and the Nightwalker",
                            "HP: Dolen Amser",
                            "Feral",
                            "Gabriel",
                            "Awaken Sleeper",
                            "Harry Potter and the Nightmares of Futures Past",
                            "His Angel",
                            "The Chosen Imprint",
                            "Greenery",
                            "The Wizard of Harrenhal",
                            "Harry Potter, Savior-of-the-World",
                            "What You Leave Behind",
                            "His Own Man",
                            "Wand and Shield",
                            "Death's Precious Master",
                            "Sixth Year: The Steps Toward The End",
                            "Harry Potter: Whiskey Accident",
                            "Harry Potter and the Illusions of Reality",
                            "Nymphadora's Beau",
                            "Harry Potter And The Elemental's Power",
                            "Harry Potter and the Power of Paranoia",
                            "Harry's Armada",
                            "Dark as Night",
                            "The Prince That Was Promised",
                            "Vengeance from the grave",
                            "Harry Potter and the Boy Who Lived",
                            "Passageways",
                            "FateProphecy Break",
                            "Harry Potter and the Two Flowers",
                            "A Boon for Bill",
                            "Retsu's Folly",
                            "Darkness Falls Upon Us",
                            "Harry Potter and the World Beneath",
                            "DUEL",
                            "On the Way to Greatness",
                            "Forging the Sword",
                            "Weres Harry?",
                            "A Second Chance",
                            "Prince of the Dark Kingdom",
                            "Lord Emperor - Dark Hunter",
                            "The Taste Of Your Magic",
                            "Rise of the Wizards",
                            "The British Reformation",
                            "A Shadowed Soul",
                            "Enveloped in the Darkness",
                            "Harry Potter: The Last Avatar",
                            "Harry Potter and the Veela Life Debts",
                            "Trouble",
                            "Family, Duty, Honour",
                            "Delenda Est",
                            "The Master of Death",
                            "Freak of Nature",
                            "Firebird's Son: Book I of the Firebird Trilogy",
                            "Harry Potter and the Rise of the Amphiptere",
                            "Harry Potter and the Oriental Philosophy",
                            "The Girl who Imprinted",
                            "In the Mind of a Scientist",
                            "Harry Stark of the Red Winter",
                            "The Well Groomed Mind",
                            "Betrayal",
                            "Sacrificial Second Chance",
                            "The Forgotten Contract",
                            "Heir of Dracula",
                            "Brutal Harry",
                            "Letters",
                            "Harry Potter and the Sun Source",
                            "Deprived",
                            "Renegade Cause",
                            "Ectomancer",
                            "Control",
                            "Myrddin Emrys Returns",
                            "Harry Potter and the Siren's Song",
                            "Harry Potter and the World that Waits",
                            "Catharsis",
                            "Harry Potter and the Veela Bond",
                            "Harry Prongs Tatum",
                            "Balancing Destinies",
                            "The Lies that Bind",
                            "Blood of the Phoenix",
                            "Unsung Hero",
                            "The Thief of Hogwarts",
                            "Poison Pen",
                            "Bleached",
                            "Harry Potter and Merlin's Reaper",
                            "Runic Animagi",
                            "Harry Potter: Rise of the Technomancers",
                            "The Potter Conspiracy"
                        ];

                        scraperjs.StaticScraper.create(`https://www.fanfiction.net/${medium}/${fanfiction}/?&srt=5&lan=1&r=10&len=20&t=4&p=${page}`)
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
                                    for (let j in HarryPotterArray) {
                                        if (info[i] == HarryPotterArray[j]) {
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
                                res.render("components/favorites", {
                                    title: "The title",
                                    storyTitles: finalArray
                                });
                            })
                    }
                });
            }
}

module.exports = FanfictionController;
const { promisify } = require("util");
const memes = [{
        'name': 'Gold',
        'price': 1000,
        'url': 'https://i.redd.it/h7rplf9jt8y21.png'
    },
    {
        'name': 'Platinum',
        'price': 1100,
        'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'
    },
    {
        'name': 'Elite',
        'price': 1200,
        'url': 'https://i.imgflip.com/30zz5g.jpg'
    },
    {
        'name': 'Harry Potter',
        'price': 900,
        'url': 'https://external-preview.redd.it/1l05jfSHZdO2J38-zSuTuDFG9QZyUGN6R-PlyjyExFc.jpg?width=712&auto=webp&s=a797be158e9136177b2ce1910dfda2db2ae45c20'
    },
    {
        'name': 'Pikachu',
        'price': 1500,
        'url': 'https://preview.redd.it/ig5u8ke5qo421.png?width=768&auto=webp&s=91aed73160808e864cbfe6a9d78a6d13a940965c'
    },
    {
        'name': 'Rickroll',
        'price': 1600,
        'url': 'https://preview.redd.it/bo8pac9hfer41.png?width=389&auto=webp&s=c5797f871c0c0d2553084f2c01cc5138fec79e53'
    },
    {
        'name': 'Platinum',
        'price': 1100,
        'url': 'https://preview.redd.it/jd25yqv8xsf31.jpg?width=768&auto=webp&s=6e1688aa6bfe15a292627f254dd544e245e5c461'
    },
    {
        'name': 'Platinum',
        'price': 1300,
        'url': 'https://preview.redd.it/gph4rp6drvo41.jpg?width=680&auto=webp&s=5114d5ae9fa9cc3611bfacaa15876900b857823a'
    }
]

const run = (db) => promisify(db.run.bind(db));
const get = (db) => promisify(db.get.bind(db));
const all = (db) => promisify(db.all.bind(db));

async function initDB(db, admin_id) {
    await run(db)("BEGIN TRANSACTION;");
    await run(db)("DROP TABLE IF EXISTS memes");
    await run(db)("DROP TABLE IF EXISTS memes_price");
    await run(db)("CREATE TABLE IF NOT EXISTS memes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT)");
    await run(db)("CREATE TABLE IF NOT EXISTS memes_price (id INTEGER PRIMARY KEY AUTOINCREMENT, meme_id INTEGER, price INTEGER,\
                   user_id INTEGER, FOREIGN KEY(meme_id) REFERENCES memes(id), FOREIGN KEY(user_id) REFERENCES user(id))");

    for (var i = 0; i < memes.length; i++) {
        await run(db)("INSERT INTO memes (name, url) VALUES ('" + memes[i].name + "','" + memes[i].url + "')");
        let id = await get(db)("SELECT last_insert_rowid() as id");
        await run(db)("INSERT INTO memes_price (meme_id, price, user_id) VALUES (" + id.id + "," + memes[i].price + "," + admin_id.id + ")");
    }

    await run(db)("COMMIT TRANSACTION;");
}



async function updatePrice(db, meme_id, new_price, user_id) {
    await run(db)("BEGIN TRANSACTION;");
    await run(db)("INSERT INTO memes_price (meme_id, price, user_id) VALUES (" + meme_id + "," + new_price + "," + user_id + ")");
    await run(db)("COMMIT TRANSACTION;");
}

async function getMeme(db, meme_id) {
    await run(db)("BEGIN TRANSACTION;");
    var meme = await get(db)("SELECT * FROM memes WHERE id =" + meme_id);
    var prices = await all(db)("SELECT price FROM memes_price WHERE meme_id =" + meme_id + " ORDER BY id DESC");
    await run(db)("COMMIT TRANSACTION;");
    meme.prices = prices;
    return meme;
}

async function getTopMemes(db) {
    await run(db)("BEGIN TRANSACTION;");
    var top_memes = await all(db)("WITH latest_prices as (\
        SELECT meme_id, max(id) as latest_price_id FROM memes_price GROUP BY meme_id ORDER BY price DESC LIMIT 3)\
        SELECT memes_price.meme_id FROM memes_price JOIN latest_prices ON latest_price_id = id");
    var ret = [];

    for (var i = 0; i < 3; i++) {
        var meme = await get(db)("SELECT * FROM memes WHERE id =" + top_memes[i].meme_id);
        ret.push(meme);
    }

    await run(db)("COMMIT TRANSACTION;");
    return ret;
}

module.exports = { initDB, updatePrice, getMeme, getTopMemes }
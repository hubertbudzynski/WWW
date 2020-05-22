var express = require('express');
var router = express.Router();
class Meme {
    constructor(id, memeUrl, price, name) {
      this.id = id;
      this.url = memeUrl;
      this.priceOverTime = new Array([price]);
      this.price = price;
      this.name = name;  
    }

    change_price(price) {
        this.price = price;
        this.priceOverTime.unshift(price);
    }

    toJSON() {
        return {
          id : this.id,
          url: this.url,
          name:  this.name,
          price:   this.price,
          priceOverTime : this.priceOverTime
        };
    }
}

class MemeList {

    constructor(headerMeme) {
        this.headerMeme = headerMeme;
        this.memeList = new Array();
        this.topMemes = new Array();
        this.size = 0;
    }

    addMeme(memeUrl, price, name) {
        this.memeList.push(new Meme(this.size, memeUrl, price, name));

        this.topMemes.push(new Meme(this.size, memeUrl, price, name));
        this.topMemes.sort((a, b) => b.price - a.price);
        
        this.size++;

        if (this.size > 3)
            this.topMemes.pop();
    }

    toJSON() {
        return JSON.stringify(this.memeList);
    }

    get_meme(id) {
        console.log(this.memeList.find(function(el) {return el.id === +id;}));
        return this.memeList.find(function(el) {return el.id === +id;});
    }

    change_price(memeId, price) {
        let meme = this.get_meme(memeId);
        meme.change_price(price);
        this.memeList.sort((a, b) => b.price - a.price);
        this.topMemes = [];
        console.log("po change_price:", this.memeList);
        for (var i = 0; i < 3; i++)
            this.topMemes.push(this.memeList[i]);
    }
}

const memes = [
    {
    'name': 'Gold',
    'price': 1000,
    'url': 'https://i.redd.it/h7rplf9jt8y21.png'},
    {
    'name': 'Platinum',
    'price': 1100,
    'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'},
    {
    'name': 'Elite',
    'price': 1200,
    'url': 'https://i.imgflip.com/30zz5g.jpg'},
    {
    'name': 'Harry Potter',
    'price': 900,
    'url': 'https://external-preview.redd.it/1l05jfSHZdO2J38-zSuTuDFG9QZyUGN6R-PlyjyExFc.jpg?width=712&auto=webp&s=a797be158e9136177b2ce1910dfda2db2ae45c20'},
    {
    'name': 'Pikachu',
    'price': 1500,
    'url': 'https://preview.redd.it/ig5u8ke5qo421.png?width=768&auto=webp&s=91aed73160808e864cbfe6a9d78a6d13a940965c'},
    {
    'name': 'Rickroll',
    'price': 1600,
    'url': 'https://preview.redd.it/bo8pac9hfer41.png?width=389&auto=webp&s=c5797f871c0c0d2553084f2c01cc5138fec79e53'},
    {
    'name': 'Platinum',
    'price': 1100,
    'url': 'https://preview.redd.it/jd25yqv8xsf31.jpg?width=768&auto=webp&s=6e1688aa6bfe15a292627f254dd544e245e5c461'},
    {
    'name': 'Platinum',
    'price': 1300,
    'url': 'https://preview.redd.it/gph4rp6drvo41.jpg?width=680&auto=webp&s=5114d5ae9fa9cc3611bfacaa15876900b857823a'}
    ]

const headerMeme = new Meme(0, "https://i.imgur.com/Hm8qYo5.jpeg", 0, "Seals");

var memeList = new MemeList(headerMeme);
for (var i = 0; i <  memes.length; i++) {
    var meme = memes[i];
    memeList.addMeme(meme.url, meme.price, meme.name);
}

console.log(memeList);

module.exports = memeList;
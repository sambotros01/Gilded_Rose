class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateByItemType(this.items[i])
      if (this.items[i].quality < 0) this.items[i].quality = 0;
    }
    return this.items;
  }

  updateByItemType(item){
    const name = item.name.toLowerCase();
    if(name.includes("conjured"))
      return this.updateConjured(item)
    else if (name.includes("brie"))
      return this.updateBrie(item)
    else if (name.includes("passes"))
      return this.updatePasses(item)
    else if (name.includes("sulfuras"))
      return this.updateSulfuras(item)
    else {
      return this.updateNormal(item)
    }
  }

  qualityCheck(item){
    return (item.quality > 0 && item.quality < 50)
  }

  sellInCheck(item){
    return (item.sellIn >= 0)
  }

  updateConjured(item) {
    if (this.qualityCheck(item) && this.sellInCheck(item)){
      item.quality -= 2;
    } else if (this.qualityCheck(item)) {
      item.quality -= 4;
    }
    item.sellIn -= 1
    return item
  }

  updateBrie(item) {
    if (this.qualityCheck(item)){
      item.quality += 1;
    }
    item.sellIn -= 1;
    return item
  }

  updatePasses(item) {
    if (this.qualityCheck(item) && this.sellInCheck(item)){
      if (item.sellIn <= 10) {
        item.quality += 2
      }
      if (item.sellIn <= 5) {
        item.quality += 1
      }
    } else {
      item.quality = 0;
    }
    item.sellIn -= 1
    return item
  }

  updateSulfuras(item) {
    item.quality = 80;
    return item
  }

  updateNormal(item) {
    if (this.qualityCheck(item) && this.sellInCheck(item)){
      item.quality -= 1;
    } else if (this.qualityCheck(item)) {
      item.quality -= 2;
    }
    item.sellIn -= 1
    return item
  }
}

module.exports = {
  Item,
  Shop
}
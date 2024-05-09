const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {
  test ('Shop initializes items as an empty array', () => {
    let gildedRose = new Shop()

    expect (gildedRose.items.length).toBe(0)
  })

  test('Each item should contain a name, sell by date and quality value', () => {
    let normalItem = new Item("normal", 15, 45);
    const gildedRose = new Shop([normalItem]);

    const item = gildedRose.items[0]

    expect(item.name).toEqual("normal");
    expect(item.sellIn).toBe(15);
    expect(item.quality).toBe(45);

  })

  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(19);
  });

  test('Quality of "Aged Brie" should increase by 1 each day only if quality is below 50', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    let maxAgedBrie = new Item("Aged Brie", 10, 50);
    const gildedRose = new Shop([agedBrie, maxAgedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
    expect(items[1].quality).toBe(50);
  });

  test('Quality of "Backstage passes" should increase by 2 when there are 10 days - 5 days till concert', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(22);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(23);
  });

  test('Normal items should degrade in quality by 2 after sell by date has passed', () => {
    let normalItem = new Item("normal", -1, 20);
    let edgeNormalItem = new Item("normal", -1, 1);
    const gildedRose = new Shop([normalItem, edgeNormalItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18)
    expect(items[1].quality).toBe(0)
  })

  test('SellIn date reduces by one each day except for Sulfuras', () => {
    let normalItem = new Item("normal", 10, 20);
    let sulfurasItem = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
    const gildedRose = new Shop([normalItem, sulfurasItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[1].sellIn).toBe(10);
  })

  test('Quality of "Backstage passes" should be 0 if sellIn is less than 0', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });

  test('Conjure items degrade in quality twice as fast as normal items', () => {
    let conjuredItem = new Item("Conjured item", 10, 20);
    let expiredConjuredItem = new Item("Conjured item", -1, 20);
    let edgeCaseConjuredItem = new Item("Conjured item", -1, 1);
    const gildedRose = new Shop([conjuredItem, expiredConjuredItem, edgeCaseConjuredItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18);
    expect(items[1].quality).toBe(16);
    expect(items[2].quality).toBe(0);
  })

  test('Sulfuras items have a default quality value of 80', () => {
    let sulfurasItem = new Item("sulfuras", 10, 70)
    const gildedRose = new Shop([sulfurasItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
  })
});

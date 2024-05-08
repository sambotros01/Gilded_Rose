const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {
  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(19); //check
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
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  test('Normal items should degrade in quality by 2 after sell by date has passed', () => {
    let normalItem = new Item("normal", 0, 20);
    const gildedRose = new Shop([normalItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18)
  })

  test('SellIn date reduces by one each day except for Sulfuras', () => {
    let normalItem = new Item("normal", 10, 20); //build
    let sulfurasItem = new Item('Sulfuras, Hand of Ragnaros', 10, 20);
    const gildedRose = new Shop([normalItem, sulfurasItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].sellIn).toBe(9); //check
    expect(items[1].sellIn).toBe(10); //check
  })

  test('Quality of "Backstage passes" should be 0 if sellIn is 0', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

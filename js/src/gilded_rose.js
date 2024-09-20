class Item {
  constructor(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  }
} // Do not change, to remain the same

const items = [];

const MAX_QUALITY = 50;
const SULFURAS_QUALITY = 80;

function update_quality() {
  items.forEach(item => {
    switch (item.name) {
      case "Sulfuras, Hand of Ragnaros":
        // Legendary item does not change
        break;
      case "Aged Brie":
        updateAgedBrie(item);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        updateBackstagePasses(item);
        break;
      case "Conjured":
        updateConjured(item);
        break;
      default:
        updateNormalItem(item);
        break;
    }

    // Update sell_in and handle quality degradation after sell date
    item.sell_in -= 1;
    if (item.sell_in < 0) {
      handlePostSellIn(item);
    }
  });
}

function updateAgedBrie(item) {
  if (item.quality < MAX_QUALITY) {
    item.quality += 1;
  }
}

function updateBackstagePasses(item) {
  if (item.quality < MAX_QUALITY) {
    item.quality += 1;
    if (item.sell_in < 11) {
      if (item.quality < MAX_QUALITY) {
        item.quality += 1;
      }
    }
    if (item.sell_in < 6) {
      if (item.quality < MAX_QUALITY) {
        item.quality += 1;
      }
    }
  }
  if (item.sell_in < 0) {
    item.quality = 0; // Quality drops to 0 after the concert
  }
}

function updateNormalItem(item) {
  if (item.quality > 0) {
    item.quality -= 1;
  }
}

function updateConjured(item) {
  if (item.quality > 0) {
    item.quality -= 2; // conjured inventory/items degrade two times faster
  }
}

function handlePostSellIn(item) {
  if (
    item.name !== "Aged Brie" &&
    item.name !== "Backstage passes to a TAFKAL80ETC concert"
  ) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  } else if (item.name === "Aged Brie") {
    updateAgedBrie(item);
  }
}

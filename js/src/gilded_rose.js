function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const MAX_QUALITY = 50;
const SULFURAS_QUALITY = 80;

const items = []; // Changed to const since items should not be reassigned

function update_quality() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]; // Using const for item since it won't be reassigned
    switch (item.name) {
      case "Sulfuras, Hand of Ragnaros":
        // Do nothing; Sulfuras does not change
        break;
      case "Aged Brie":
        if (item.quality < MAX_QUALITY) {
          item.quality++;
        }
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        if (item.quality < MAX_QUALITY) {
          item.quality++;
          if (item.sell_in < 11 && item.quality < MAX_QUALITY) {
            item.quality++;
          }
          if (item.sell_in < 6 && item.quality < MAX_QUALITY) {
            item.quality++;
          }
        }
        if (item.sell_in <= 0) {
          item.quality = 0; // Quality drops to 0 after the concert
        }
        break;
      case "Conjured":
        item.quality = Math.max(0, item.quality - 2); // Degrade twice as fast
        break;
      default:
        if (item.quality > 0) {
          item.quality--; // Normal items degrade by 1
        }
        break;
    }

    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sell_in--; // sell_in is updated for all items except Sulfuras
    }

    // Post-sell-in quality handling
    if (item.sell_in < 0) {
      switch (item.name) {
        case "Aged Brie":
          if (item.quality < MAX_QUALITY) {
            item.quality++; // Increases in quality after sell date
          }
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item.quality = 0; // Quality drops to 0 after the concert
          break;
        default:
          if (item.quality > 0) {
            item.quality--; // Normal items degrade by 1 more
          }
          break;
      }
    }
  }
}

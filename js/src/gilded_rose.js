/**
 * @constructor
 * @param {string} name   - item_name
 * @param {number} sell_in - expiry days.
 * @param {number} quality - quality of the item (0 - MAX_QUALITY.
 */
function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const MAX_QUALITY = 50; // max quality (regular_items)
const SULFURAS_QUALITY = 80;

const items = [];

/**
 * this method updates the quality and sell-in values of all items.
 */
function update_quality() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    switch (item.name) {
      case "Sulfuras, Hand of Ragnaros":
        // break since Sulfuras does not change
        break;
      case "Aged Brie":
        // Aged Brie increases in quality as it gets older
        if (item.quality < MAX_QUALITY) {
          item.quality++;
        }
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        // Backstage passes increase in quality as the concert date approaches
        if (item.quality < MAX_QUALITY) {
          item.quality++;
          if (item.sell_in < 11 && item.quality < MAX_QUALITY) {
            item.quality++;
          }
          if (item.sell_in < 6 && item.quality < MAX_QUALITY) {
            item.quality++;
          }
        }
        // Quality drops to 0 after the concert
        if (item.sell_in <= 0) {
          item.quality = 0;
        }
        break;
      case "Conjured":
        // Conjured items degrade in quality twice as fast as normal items
        item.quality = Math.max(0, item.quality - 2);
        break;
      default:
        // Normal items degrade by 1 unless their quality is already 0
        if (item.quality > 0) {
          item.quality--;
        }
        break;
    }

    // Update sell_in value for all items except Sulfuras
    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sell_in--;
    }

    // Post-sell-in quality handling
    if (item.sell_in < 0) {
      switch (item.name) {
        case "Aged Brie":
          // Aged Brie continues to increase in quality after sell date
          if (item.quality < MAX_QUALITY) {
            item.quality++;
          }
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          // Quality drops to 0 after the concert
          item.quality = 0;
          break;
        default:
          // Normal items degrade by an additional point after sell date
          if (item.quality > 0) {
            item.quality--;
          }
          break;
      }
    }
  }
}

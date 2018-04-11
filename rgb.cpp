#include "pxt.h"


/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#0078D7 icon="\uf00a"
namespace rgb {
    //% help=basic/show-leds
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="show leds" icon="\uf00a" imageLiteral=4
    //% parts="ledmatrix" 
    void lleds(ImageLiteral leds, int interval = 400) {
      uBit.display.print(MicroBitImage(imageBytes(leds)), 0, 0, 0, interval);
    }

    //% help=basic/show-number
    //% weight=96
    //% blockId=device_show_number block="show|number %number" blockGap=8 imageLiteral=3
    //% async
    //% parts="ledmatrix" 
    void showN(int value, int interval = 150) {
      if (interval <= 0)
        interval = 1;
      ManagedString t(value);
      if (value < 0 || value >= 10) {
        uBit.display.scroll(t, interval);
      } else {
        uBit.display.printChar(t.charAt(0), interval * 5);
      }
    }

    //% weight=75 help=images/create-image
    //% blockId=device_build_image block="create image" imageLiteral=1
    //% parts="ledmatrix" 
    void createI(ImageLiteral leds) {
      return;
    }

    //% weight=74 help=images/create-big-image
    //% blockId=device_build_big_image block="create big image" imageLiteral=2
    //% parts="ledmatrix" 
    Image createBigI(ImageLiteral leds) {
        return MicroBitImage(imageBytes(leds)).clone().leakData();
    } 
    
}
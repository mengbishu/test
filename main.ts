/**
 * Well known colors for a NeoPixel strip
 */
enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

/**
 * Different modes for RGB or RGB+W NeoPixel strips
 */
enum NeoPixelMode {
    //% block="RGB (GRB format)"
    RGB = 0,
    //% block="RGB+W"
    RGBW = 1,
    //% block="RGB (RGB format)"
    RGB_RGB = 2
}

enum Direction{
    east = 0,
    southeast = 1,
    south = 2,
    southwest = 3,
    west = 4,
    northwest  = 5,
    north = 6,
    northeast = 7
    }
    


/**
 * Functions to operate NeoPixel strips.
 */
//% color=#0078D7 icon="\uf00a"
namespace pixel {
    /**
     * A NeoPixel strip
     */
    let chrs: string[] = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    let dirs:number[] = [
        0x00,0x00,0x04,0x7E,0x04,0x00,0x00,0x00, //->
        0x00,0x40,0x20,0x10,0x0A,0x06,0x0E,0x00,
        0x00,0x10,0x10,0x10,0x10,0x38,0x10,0x00, //|
        0x00,0x02,0x04,0x08,0x50,0x60,0x70,0x00,
        0x00,0x00,0x20,0x7E,0x20,0x00,0x00,0x00, //<-
        0x00,0x70,0x60,0x50,0x08,0x04,0x02,0x00,
        0x00,0x10,0x38,0x10,0x10,0x10,0x10,0x00, //^
        0x00,0x0E,0x06,0x0A,0x10,0x20,0x40,0x00]
    
    let chr: number[] = [0x3C, 0x66, 0x42, 0x42, 0x42, 0x66, 0x3C, 0x00,
        0x10, 0x70, 0x10, 0x10, 0x10, 0x10, 0x7C, 0x00,
        0x3C,0x42,0x02,0x04,0x18,0x22,0x7E,0x00,
        0x3C,0x42,0x02,0x1C,0x02,0x42,0x3C,0x00,
        0x0C,0x14,0x24,0x44,0x7E,0x04,0x0C,0x00,
        0x7E,0x40,0x7C,0x02,0x02,0x42,0x3C,0x00,
        0x3C,0x20,0x40,0x7C,0x42,0x42,0x3C,0x00,
        0x7E,0x44,0x08,0x10,0x10,0x10,0x10,0x00,
        0x3C,0x42,0x42,0x3C,0x42,0x42,0x3C,0x00,
        0x38,0x46,0x42,0x3E,0x02,0x04,0x3C,0x00,
        0x10,0x18,0x28,0x24,0x7C,0x42,0xE7,0x00,
        0xFC,0x44,0x78,0x46,0x42,0x42,0xFC,0x00,
        0x3E,0x42,0x80,0x80,0x80,0x42,0x3C,0x00,
        0xF8,0x46,0x42,0x42,0x42,0x44,0xF8,0x00,
        0xFC,0x42,0x40,0x78,0x40,0x46,0xFC,0x00,
        0xFC,0x42,0x48,0x78,0x48,0x40,0xE0,0x00,
        0x3C,0xC4,0x80,0x80,0x8E,0x44,0x78,0x00,
        0xE7,0x42,0x42,0x7E,0x42,0x42,0xE7,0x00,
        0x7C,0x10,0x10,0x10,0x10,0x10,0x7C,0x00,
        0x3E,0x08,0x08,0x08,0x08,0x08,0x08,0xF0,
        0xFE,0x48,0x70,0x70,0x48,0x44,0xEE,0x00,
        0xE0,0x40,0x40,0x40,0x40,0x42,0xFE,0x00,
        0xEE,0x6C,0x6C,0x54,0x54,0x54,0xC6,0x00,
        0xC7,0x62,0x52,0x4A,0x4A,0x46,0xE2,0x00,
        0x3C,0x46,0x82,0x82,0x82,0x44,0x38,0x00,
        0xFC,0x42,0x42,0x7C,0x40,0x40,0xE0,0x00,
        0x78,0xC6,0x82,0x82,0xB2,0xCE,0x38,0x06,
        0xFE,0x42,0x7C,0x48,0x44,0x46,0xE3,0x00,
        0x3E,0x42,0x60,0x18,0x06,0x42,0x7C,0x00,
        0xFE,0x92,0x10,0x10,0x10,0x10,0x38,0x00,
        0xE7,0x42,0x42,0x42,0x42,0x42,0x3C,0x00,
        0xE7,0x42,0x64,0x24,0x28,0x18,0x10,0x00,
        0xD6,0x92,0x92,0xAA,0xAE,0x44,0x44,0x00,
        0xE7,0x66,0x24,0x18,0x34,0x26,0xE7,0x00,
        0xEE,0x44,0x28,0x10,0x10,0x10,0x38,0x00,
        0x7E,0x84,0x08,0x10,0x20,0x42,0xFC,0x00,
        0x00,0x00,0x3C,0x42,0x3E,0x42,0x3F,0x00,
        0xC0,0x40,0x5C,0x62,0x42,0x42,0x7C,0x00,
        0x00,0x00,0x3C,0x62,0x40,0x42,0x3C,0x00,
        0x06,0x02,0x1E,0x62,0x42,0x42,0x3F,0x00,
        0x00,0x00,0x3C,0x42,0x7E,0x40,0x3E,0x00,
        0x0F,0x10,0x7E,0x10,0x10,0x10,0x7C,0x00,
        0x00,0x00,0x3E,0x44,0x38,0x60,0x5E,0x7E,
        0xC0,0x40,0x5C,0x62,0x42,0x42,0xE7,0x00,
        0x30,0x00,0x70,0x10,0x10,0x10,0x7C,0x00,
        0x0C,0x00,0x1C,0x04,0x04,0x04,0x04,0x78,
        0xC0,0x40,0x4E,0x58,0x70,0x48,0xEE,0x00,
        0x70,0x10,0x10,0x10,0x10,0x10,0x7C,0x00,
        0x00,0x00,0xFF,0x49,0x49,0x49,0xED,0x00,
        0x00,0x00,0xD8,0x66,0x42,0x42,0xE7,0x00,
        0x00,0x00,0x3C,0x42,0x42,0x42,0x3C,0x00,
        0x00,0x00,0xF8,0x46,0x42,0x42,0x7C,0xE0,
        0x00,0x00,0x3E,0x42,0x42,0x42,0x3E,0x07,
        0x00,0x00,0xEE,0x30,0x20,0x20,0xF8,0x00,
        0x00,0x00,0x3E,0x40,0x3C,0x42,0x7C,0x00,
        0x10,0x10,0x7C,0x10,0x10,0x10,0x0C,0x00,
        0x00,0x00,0xC6,0x42,0x42,0x42,0x3F,0x00,
        0x00,0x00,0xE7,0x46,0x24,0x28,0x10,0x00,
        0x00,0x00,0xD7,0x92,0xAA,0x6A,0x44,0x00,
        0x00,0x00,0x6E,0x3C,0x18,0x3C,0x76,0x00,
        0x00,0x00,0xE7,0x66,0x3C,0x18,0x10,0xE0,
        0x00, 0x00, 0x7E, 0x44, 0x18, 0x32, 0x7E, 0x00];
      
    let queue: number[] = [0];
    let screen: number[] = [0];
    
    export class Strip {
        buf: Buffer;
        pin: DigitalPin;
        // TODO: encode as bytes instead of 32bit
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: NeoPixelMode;
        _matrixWidth: number; // number of leds in a matrix - if any

        setPixel(x: number, y: number, color: number): void { 
            let offset = y*8+x
            this.setPixelColor(offset, color)
            this.show()
        }        

        setChar(ch: string, color: number): void { 
            let i=0;
            let j=0;
            let index=0;
            for (i = 0; i < 62; i++) { 
                if (ch == chrs[i]) { 
                    index = i;
                }
            }
            index *= 8; 
            for (i = 0; i < 8; i++) {
                for (j = 0; j < 8; j++) {
                    if (((chr[index+i] >> j) & 0x1) == 1) {
                        this.setPixel(j, 7-i, color)
                    }
                }
            }
        }

        //% blockId="showPixel" block="%strip| display pixel %x| %y| color %color"
        //% x.min=0 x.max=8
        //% y.min=0 y.max=8
        showPixel(x: number, y: number, color: number): void{
            this.setPixel(x, y, color);
        }
        
        //% blockId="clearPixel" block="%strip| clear pixel %x| %y"
        clearPixel(x: number, y: number): void{
            this.setPixel(x, y, NeoPixelColors.Black);
        }

        //% blockId="showNumber" block="%strip| show number %num| color %color"
        //% parts="neopixel"
        showNumber(num:number,color:NeoPixelColors): void { 
            this.showString(num.toString(),color)
        }

        //% blockId="showString" block="%strip| display string %str| color %color"
        showString(str: string, color: NeoPixelColors): void{
            let len = str.length;
            let i = 0;
            for (i = 0; i < len; i++){
                this.setChar(str[i], color);
            }
        }

        //% blockId="showDir" block="%strip/ show dir %dir| color %color"
        showDir(dir: Direction,color:NeoPixelColors): void{
            let i=0;
            let j=0;
            let index=0;            
            index = dir*8; 
            for (i = 0; i < 8; i++) {
                for (j = 0; j < 8; j++) {
                    if (((dirs[index+i] >> j) & 0x1) == 1) {
                        this.setPixel(j, 7-i, color)
                    }
                }
            }
        }


        //% blockId="neopixel_set_strip_color" block="%strip|show color %rgb=neopixel_colors" 
        //% weight=85 blockGap=8
        //% parts="neopixel"
        showColor(rgb: number) {
            this.setAllRGB(rgb);
            this.show();
        }

        //% blockId="neopixel_set_pixel_color" block="%strip|set pixel color at %pixeloffset|to %rgb=neopixel_colors" 
        //% blockGap=8
        //% weight=80
        //% parts="neopixel" 
        setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset, rgb);
        }

        //% blockId="neopixel_show" block="%strip|show" blockGap=8
        //% weight=79
        //% parts="neopixel"
        show() {
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        //% blockId="neopixel_clear" block="%strip|clear"
        //% weight=76
        //% parts="neopixel"
        clear(): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
        }

        //% blockId="neopixel_set_brightness" block="%strip|set brightness %brightness" blockGap=8
        //% weight=59
        //% parts="neopixel" 
        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }

        //% blockId="neopixel_shift" block="%strip|shift pixels by %offset" blockGap=8
        //% weight=40
        //% parts="neopixel"
        shift(offset: number = 1): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
        }

        //% blockId="neopixel_rotate" block="%strip|rotate pixels by %offset" blockGap=8
        //% weight=39
        //% parts="neopixel"
        rotate(offset: number = 1): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
        }

        //% weight=10
        //% parts="neopixel" 
        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
            // don't yield to avoid races on initialization
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === NeoPixelMode.RGB_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }
        private setAllW(white: number) {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            let end = this.start + this._length;
            for (let i = this.start; i < end; ++i) {
                let ledoffset = i * 4;
                buf[ledoffset + 3] = white;
            }
        }
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }
        private setPixelW(pixeloffset: number, white: number): void {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            pixeloffset = (pixeloffset + this.start) * 4;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            buf[pixeloffset + 3] = white;
        }
    }

    //% blockId="neopixel_create" block="NeoPixel at pin %pin|with %numleds|leds as %mode"
    //% weight=90 blockGap=8
    //% parts="neopixel"
    //% trackArgs=0,2
    export function create(pin: DigitalPin, numleds: number, mode: NeoPixelMode): Strip {
        let strip = new Strip();
        let stride = mode === NeoPixelMode.RGBW ? 4 : 3;
        strip.buf = pins.createBuffer(numleds * stride);
        strip.start = 0;
        strip._length = numleds;
        strip._mode = mode;
        strip._matrixWidth = 0;
        strip.setBrightness(255)
        strip.setPin(pin)
        return strip;
    }

    //% weight=1
    //% blockId="neopixel_rgb" block="red %red|green %green|blue %blue"
    export function rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    //% weight=2 blockGap=8
    //% blockId="neopixel_colors" block="%color"
    export function colors(color: NeoPixelColors): number {
        return color;
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }


}

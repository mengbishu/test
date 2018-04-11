
//% color=#0078D7 icon="\uf00a"
declare namespace rgb {

    //% help=basic/show-leds
    //% weight=95 blockGap=8
    //% imageLiteral=1 async
    //% blockId=device_show_leds
    //% block="show leds" icon="\uf00a" imageLiteral=4
    //% interval.defl=400 shim = rgb:: lleds
    //% parts="ledmatrix" 
    function lleds(leds: string, interval?: number): void;


    //% help=basic/show-number
    //% weight=96
    //% blockId=device_show_number block="show|number %number" blockGap=8
    //% async imageLiteral=3
    //% interval.defl=150 shim = rgb:: showN  
    //% parts="ledmatrix" 
    function showN(value: number, interval?: number): void;

    //% weight=75 help=images/create-image
    //% blockId=device_build_image block="create image" imageLiteral=1
    //% shim = rgb:: createI
    //% parts="ledmatrix" 
    function createI(leds: string): void;

    //% weight=74 help=images/create-big-image
    //% blockId=device_build_big_image block="create big image" imageLiteral=2
    //% shim = rgb:: createBigI 
    //% parts="ledmatrix" 
    function createBigI(leds: string): Image;
}
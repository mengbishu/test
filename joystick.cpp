#include "pxt.h"

using namespace pxt;
//% weight=100 color=#DF6721 icon="\uf11b" block="joysticks"
namespace joystick {
    bool initialized = false;

    //%
    void init() {
        if (initialized) return;

    // mount buttons on the pins with a pullup mode
    // TODO: fix this issue in the DAL itself
#define ALLOC_PIN_BUTTON(id) new MicroBitButton(getPin(id)->name, id, MICROBIT_BUTTON_ALL_EVENTS, PullUp);
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P13)
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P14)
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P15)
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P8)
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P1)
    ALLOC_PIN_BUTTON(MICROBIT_ID_IO_P2)
#undef ALLOC_PIN_BUTTON

        initialized = true;
    }

    void forever_stub(void *a,int pin,int num) {
        while (true) {
            num = pins.analogReadPin(pin);
            runAction0((Action)a);
            fiber_sleep(50);
        }
    }
    //% weight=60
    //% blockGap=40
    //% blockId=isShake block="joystick on| %pin|is shake, value %num"
    void isShake(int pin,int num,Action a) {
        if (a != 0) { 
            incr(a);
            create_fiber(forever_stub, (void*)a,pin,num);
        }
    }
    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="pause (ms) %pause"
    //% blockId=device_pause icon="\uf110"
    void pause(int ms) {
      fiber_sleep(ms);
    }
}

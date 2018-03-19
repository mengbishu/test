#include "pxt.h"

using namespace pxt;
//% weight=10 color=#DF6721 icon="\uf11b" block="joystick"
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


    //%
    void Shake(int pin,int value,Action a) {
        if (a != 0) { 
            incr(a);
//            while (true) {
                value = pins.analogReadPin(pin);
                runAction0((Action)a);
//                fiber_sleep(50);
//            }
        }
    }
}

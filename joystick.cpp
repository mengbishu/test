#include "pxt.h"

using namespace pxt;
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
    //% blockId=action block="joystick on| %pin|is shake, value %value"
    void isShake(int pin,int num,Action a) {
        if (a != 0) { 
            incr(a);
            create_fiber(forever_stub, (void*)a,pin,num);
        }
    }
}

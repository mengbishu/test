/**
* Jordan Electronics
* May, 2018
* Based on Weatherbit code from Sparkfun:
* https://github.com/sparkfun/pxt-weather-bit

* Development environment specifics:
* Written in Microsoft PXT
*
* This code is released under the [MIT License](http://opensource.org/licenses/MIT).
* Distributed as-is; no warranty is given.
*/

#include "pxt.h"
#include <cstdint>
#include <math.h>

using namespace pxt;

namespace DS1820 {
  class microbitp : public MicroBitComponent
{
  public:
    void *pin;
    PinCapability capability;
    uint8_t pullMode;
    PinName name;

    void disconnect(){
        if (status & IO_STATUS_DIGITAL_IN)
            delete ((DigitalIn *)pin);
        if (status & IO_STATUS_DIGITAL_OUT)
            delete ((DigitalOut *)pin);
        if (status & IO_STATUS_ANALOG_IN){
            NRF_ADC->ENABLE = ADC_ENABLE_ENABLE_Disabled; // forcibly disable the ADC - BUG in mbed....
            delete ((AnalogIn *)pin);
        }
        if (status & IO_STATUS_ANALOG_OUT)
            delete ((DynamicPwm *)pin);
        if (status & IO_STATUS_TOUCH_IN)
            delete ((MicroBitButton *)pin);
        if ((status & IO_STATUS_EVENT_ON_EDGE) || (status & IO_STATUS_EVENT_PULSE_ON_EDGE))
            delete ((TimedInterruptIn *)pin);
        this->pin = NULL;
        this->status = 0;
    }
/*
    microbitp(int id, PinName name, PinCapability capability){
        //set mandatory attributes
        this->id = id;
        this->name = name;
        this->capability = capability;
        this->pullMode = MICROBIT_DEFAULT_PULLMODE;
        this->status = 0x00;
        this->pin = NULL;
    }

    int setDigitalValue(int value){
        // Check if this pin has a digital mode...
        if(!(PIN_CAPABILITY_DIGITAL_OUT & capability))
            return MICROBIT_NOT_SUPPORTED;

        // Ensure we have a valid value.
        if (value < 0 || value > 1)
            return MICROBIT_INVALID_PARAMETER;

        // Move into a Digital input state if necessary.
        if (!(status & IO_STATUS_DIGITAL_OUT)){
            disconnect();
            pin = new DigitalOut(name);
            status |= IO_STATUS_DIGITAL_OUT;
        }

        // Write the value.
        ((DigitalOut *)pin)->write(value);

        return MICROBIT_OK;
    }

    int getDigitalValue(){
        //check if this pin has a digital mode...
        if(!(PIN_CAPABILITY_DIGITAL_IN & capability))
            return MICROBIT_NOT_SUPPORTED;

        // Move into a Digital input state if necessary.
        if (!(status & (IO_STATUS_DIGITAL_IN | IO_STATUS_EVENT_ON_EDGE | IO_STATUS_EVENT_PULSE_ON_EDGE)))
        {
//            disconnect();
//            pin = new DigitalIn(name, (PinMode)pullMode);
        ((DigitalIn *)pin)->mode(PullNone);
            status |= IO_STATUS_DIGITAL_IN;
        }

        if(status & (IO_STATUS_EVENT_ON_EDGE | IO_STATUS_EVENT_PULSE_ON_EDGE))
            return ((TimedInterruptIn *)pin)->read();

        return ((DigitalIn *)pin)->read();
    }
    */
};
  
    MicroBitPin WritePin = uBit.io.P2;
    MicroBitPin ReadPin = uBit.io.P1;

    uint8_t init() {
        WritePin.setDigitalValue(0);
        for (volatile uint16_t i = 0; i < 600; i++);
        WritePin.setDigitalValue(1);
        for (volatile uint8_t i = 0; i < 30; i++);
        int b = ReadPin.getDigitalValue();
        for (volatile uint16_t i = 0; i < 600; i++);
        return b;
    }

    void sendZero() {
        WritePin.setDigitalValue(0);
        for (volatile uint8_t i = 1; i < 75; i++);
        WritePin.setDigitalValue(1);
        for (volatile uint8_t i = 1; i < 6; i++);
    }

    void sendOne() {
        WritePin.setDigitalValue(0);
        for (volatile uint8_t i = 1; i < 1; i++);
        WritePin.setDigitalValue(1);
        for (volatile uint8_t i = 1; i < 80; i++);
    }

    void writeBit(int b) {
        int delay1, delay2;
        if (b == 1) {
            delay1 = 1;
            delay2 = 80;
        } else {
            delay1 = 75;
            delay2 = 6;
        }
        WritePin.setDigitalValue(0);
        for (uint8_t i = 1; i < delay1; i++);
        WritePin.setDigitalValue(1);
        for (uint8_t i = 1; i < delay2; i++);
    }

    void sendskip() {
        writeBit(0);
        writeBit(0);
        writeBit(1);
        writeBit(1);
        writeBit(0);
        writeBit(0);
        writeBit(1);
        writeBit(1);
    }

    void writeByte(int byte) {
        int i;
        for (i = 0; i < 8; i++) {
            if (byte & 1) {
                writeBit(1);
            } else {
                writeBit(0);
            }
            byte = byte >> 1;
        }
    }

    int readBit() {
        volatile int i;
        WritePin.setDigitalValue(0);
        WritePin.setDigitalValue(1);
        for (i = 1; i < 20; i++);
        int b = ReadPin.getDigitalValue();
        for (i = 1; i < 60; i++);
        return b;
    }

    int convert() {
        volatile int i;
        int j;
        writeByte(0x44);
        for (j = 1; j < 1000; j++) {
            for (i = 1; i < 900; i++) {
        };
        if (readBit() == 1)
            break;
        };
        return (j);
    }

    int readByte() {
        int byte = 0;
        int i;
        for (i = 0; i < 8; i++) {
            byte = byte | readBit() << i;
        };
        return byte;
    }

    //%
    int16_t Temperature() {
        init();
        writeByte(0xCC);
        convert();
        init();
        writeByte(0xCC);
        writeByte(0xBE);
        int b1 = readByte();
        int b2 = readByte();

        int16_t temp = (b2 << 8 | b1);
        return temp * 100 / 16;
    }
 
}

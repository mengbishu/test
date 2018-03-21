/**
 * User Buttons for DFRobot joystick.
 */
//%
enum Z_Pin {
    //% blockId="P8" block="Z button"
    P8 = <number>DAL.MICROBIT_ID_IO_P8,
}

enum XY_Pin { 
    //% blockId="P1" block="X"
    P1 = <number>DAL.MICROBIT_ID_IO_P1,
    //% blockId="P2" block="Y"
    P2 = <number>DAL.MICROBIT_ID_IO_P2
}

//% weight=10 color=#DF6721 icon="\uf11b" block="joystick"
namespace joystick { 

    let PIN_INIT = 0;

    export enum Vibrator { 
        //% blockId="V0" block="stop"
        V0 = 0,
        //% blockId="V1" block="Vibration"
        V1 = 255,     
    }

    export enum Led {
        //% blockId="OFF" block="off"
        OFF = 0,
        //% blockId="ON" block="on"
        ON = 1
    }
    
    //%
    export enum joystickEvent {
        //% block="pressed"
        Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
        //% block="released"
        Up = DAL.MICROBIT_BUTTON_EVT_UP,
        //% block="click"
        Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
    }

    export enum read { 
        //% block='X'
        value_x = (pins.analogReadPin(AnalogPin.P1)-512)/50,
        //% block='Y'
        value_y = (pins.analogReadPin(AnalogPin.P2)-512)/50
    }

    
    export enum compare{
        //% block='>'
        a = 1,
        //% block='='
        b = 2,
        //% block='<'
        c = 3
    }

    //% shim=joystick::init
    function init(): void { 
        return;
    }

    export function PinInit(): void { 
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P5, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P11, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P16,  PinPullMode.PullUp);
        PIN_INIT = 1;
        return;
    }

    //% blockId=pressedZ block="joystick Z is pressed"
    export function pressed(): boolean { 
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = false;
        if (0 == pins.digitalReadPin(<number>DAL.MICROBIT_ID_IO_P8)) {
            num = true;
        }
        return num;
    }


    //% blockId=ZState block="joystick Z is %event"
    export function onEvent(event: joystickEvent, handler: Action) {
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
        control.onEvent(<number>DAL.MICROBIT_ID_IO_P8, <number>event, handler); // register handler
    }

    
    //% blockId=vibratorMotor block="Vibrator motor switch|%index|"
    export function vibratorMotor(index: Vibrator): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

 
    //% blockId=vibratorMotorSpeed block="Vibrator motor intensity|%degree"
    //% degree.min=0 degree.max=255
    export function vibratorMotorSpeed(degree: number): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = degree * 4;
        pins.analogWritePin(AnalogPin.P12, <number>num);
        return;
    }

    //% blockId=compare block="joystick|%read_|%compare_|%value_"
    //% value_.min=-10 value_.max=10
    export function detect(read_: read, compare_: compare, value_: number): boolean { 
        if (compare_ == 1) { 
            if (read_ > value_) { 
                return true;
            }
        }
        if (compare_ == 2) { 
            if (read_ == value_) { 
                return true;
            }
        }
        if (compare_ == 3) { 
            if (read_ < value_) { 
                return true;
            }
        }
        return false;
    }
    
    //% shim=joystick::Shake
    export function Shake(a: Action): void { 
        return;
    }

    //% help=radio/on-data-packet-received
    //% mutate=objectdestructuring
    //% mutateText=Packet
    //% mutateDefaults="amplitude"
    //% blockId=radio block="joystick on %pin " blockGap=8
    export function onData(pin: XY_Pin,cb: (packet: Packet) => void) {
        Shake(() => {
            const packet = new Packet();
            if (pin == XY_Pin.P1) {
                packet.amplitude = (pins.analogReadPin(AnalogPin.P1) - 512) / 50;
            }
            else if (pin == XY_Pin.P2) { 
                packet.amplitude = (pins.analogReadPin(AnalogPin.P2) - 512) / 50;
            }
            cb(packet);
        });
    }

    export class Packet {
        public amplitude: number;
    }

    //% blockId=joystick_led block="LED|%index|"
    export function led(index: Led): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        pins.digitalWritePin(DigitalPin.P16, <number>index);
    }
}
/**
 * User Buttons for DFRobot gamer:bit Players.
 */
//%
enum Z_Pin {
    //% block="Z button"
    P8 = <number>DAL.MICROBIT_ID_IO_P8,
}

enum XY_Pin { 
    P1 = <number>DAL.MICROBIT_ID_IO_P1,
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
    export enum GamerBitEvent {
        //% block="pressed"
        Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
        //% block="released"
        Up = DAL.MICROBIT_BUTTON_EVT_UP,
        //% block="click"
        Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
    }

    export enum read { 
        //% block='x'
        value_x = (pins.analogReadPin(AnalogPin.P1)-500)/50,
        //% block='y'
        value_y = (pins.analogReadPin(AnalogPin.P2)-500)/50
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

    //% weight=70
    //% blockId=joystick_keyState block="button|%button|is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=1
    export function pressed(button: Z_Pin): boolean { 
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = false;
        if (0 == pins.digitalReadPin(<number>button)) {
            num = true;
        }
        return num;
    }

    /**
     * Registers code to run when a DFRobot gamer:bit event is detected.
     */
    //% weight=60
    //% blockGap=50
    //% blockId=joystick_onEvent block="on button|%button|is %event"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=1
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=1
    export function onEvent(button: Z_Pin, event: GamerBitEvent, handler: Action) {
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
//        control.onEvent(<number>button, <number>event, handler); // register handler
        control.onEvent(<number>DAL.MICROBIT_ID_IO_P8, <number>DAL.MICROBIT_BUTTON_EVT_HOLD, handler)
    }


    /**
     * Vibrating motor switch.
     */
    //% weight=50
    //% blockId=joystick_vibratorMotor block="Vibrator motor switch|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function vibratorMotor(index: Vibrator): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

    /**
     * Vibration motor speed setting, adjustable range 0~255.
     */
    //% weight=30
    //% blockGap=50
    //% blockId=joystick_vibratorMotorSpeed block="Vibrator motor intensity|%degree"
    //% degree.min=0 degree.max=255
    export function vibratorMotorSpeed(degree: number): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = degree * 4;
        pins.analogWritePin(AnalogPin.P12, <number>num);
        return;
    }

    /**
     * Detect the analog value of the rocker.
     */
    //% weight=60
    //% blockGap=40
    //% blockId=detect block="joystick|%read_|%compare_|%value_"
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
    
    export class Data {
        public receivedNumber: number;
    }



    /**
     * Detect the analog value of the rocker.
     */
    //% weight=60
    //% blockGap=40
    //% blockId=action block="joystick on| %pin|is shake, value %value"
    export function isShake(pin: XY_Pin, num: number, a: Action): void { 
        Shake(pin,num,a);
        return;
    }

    //% shim=joystick::Shake
    export function Shake(pin: number, num: number, a: Action): void { 
        return;
    }

    /**
     * Detect the analog value of the rocker.
     */
    //% weight=60
    //% blockGap=40
    //% blockId=action block="joystick  %pin shake, value %value"
    export function wasShake(pin: XY_Pin, num: number, a: Action): void { 
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
        while (true) {
            if (pin == <number>DAL.MICROBIT_ID_IO_P1) {
                num = (pins.analogReadPin(AnalogPin.P1) - 500) / 50;
            }
            else if (pin == <number>DAL.MICROBIT_ID_IO_P2) { 
                num = (pins.analogReadPin(AnalogPin.P2) - 500) / 50;
            }
            if (num != 0) {
                control.onEvent(<number>DAL.MICROBIT_ID_IO_P15, <number>DAL.MICROBIT_BUTTON_EVT_UP, a); // register handler
            }    
        }    
    } 
    

    

    /**
     * LED indicator light switch.
     */
    //% weight=20
    //% blockId=joystick_led block="LED|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function led(index: Led): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        pins.digitalWritePin(DigitalPin.P16, <number>index);
    }
}
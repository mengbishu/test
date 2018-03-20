/**
 * User Buttons for DFRobot gamer:bit Players.
 */
//%
enum Z_Pin {
    //% blockId="V0" block="Z button"
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

    //% weight=70
    //% blockId=pressedZ block="joystick Z is pressed"
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
    //% blockId=ZState block="joystick Z is %event"
    export function onEvent(button: Z_Pin, event: joystickEvent, handler: Action) {
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
        control.onEvent(<number>button, <number>event, handler); // register handler
    }

    /**
     * Vibrating motor switch.
     */
    //% weight=50
    //% blockId=vibratorMotor block="Vibrator motor switch|%index|"
    export function vibratorMotor(index: Vibrator): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

    /**
     * Vibration motor speed setting, adjustable range 0~255.
     */
    //% weight=30
    //% blockGap=50
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

    /**
     * Detect the analog value of the rocker.
     */
    //% weight=60
    //% blockGap=40
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
    

    /**
     * Detect the analog value of the rocker.
     */
    //% weight=60
    //% blockGap=40
    //% blockId=action block="joystick on| %pin|is shake, value %value"
    export function isShake(pin: XY_Pin, num: number, a: Action): void { 
        while (true) {
            if (pin == XY_Pin.P1) {
                num = (pins.analogReadPin(AnalogPin.P1) - 512) / 50;
            }
            else if (pin == XY_Pin.P2) { 
                num = (pins.analogReadPin(AnalogPin.P2) - 512) / 50;
            }
            serial.writeNumber(num);
            if (num != 0) {
                Shake(pin, num, a);
            }
            basic.pause(50);
        }
    }

    //% shim=joystick::Shake
    export function Shake(pin: number, num: number, a: Action): void { 
        return;
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
import * as tailwind from '@root/tailwind';

type ColorType = 'red'|'green'|'yellow';
export class Color {
    static get RED(): Color {
        return new Color('red');
    }
    static get GREEN(): Color {
        return new Color('green');
    }
    static get YELLOW(): Color {
        return new Color('yellow');
    }
    static get RANDOM(): Color {
        const rand = Math.floor(Math.random()*3);
        return [
            Color.RED,
            Color.GREEN,
            Color.YELLOW
        ][rand];
    }

    value: null|ColorType = null;
    private constructor(color: ColorType) {
        this.value = color;
    }

    get hexa(): string {
        if (this.value === null)
            throw new Error('Can\'t get the hexadecimal code of an undefined color!');

        return tailwind.theme.colors[this.value];
    }
}

import * as colors from '@root/colors';
import { intValues as screensizes } from '@root/screensize';

type ColorType = 'red' | 'green' | 'yellow';
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
        const rand = Math.floor(Math.random() * 3);
        return [
            Color.RED,
            Color.GREEN,
            Color.YELLOW
        ][rand];
    }

    value: null | ColorType = null;
    private constructor(color: ColorType) {
        this.value = color;
    }

    /**
     * Returns the hexadecimal value of the color, as a string
     *
     * @returns The value of the color, as a string
     */
    get hexa(): string {
        if (this.value === null)
            throw new Error('Can\'t get the hexadecimal code of an undefined color!');

        return colors[this.value];
    }
}

export class ScreenSize {
    static get currentSize(): number {
        return window.document.body.offsetWidth;
    }
    static isMobile(): boolean {
        return this.currentSize < screensizes.lg;
    }
    static whenChangeCall(fn: () => unknown): void {
        WindowWatcher.instance.listenTo('resize', 'above', screensizes.lg, fn);
        WindowWatcher.instance.listenTo('resize', 'below', screensizes.lg, fn);
    }
}

export class Debouncer {
    private _debounceTimer = 0;
    private _timeoutID: NodeJS.Timeout | null = null;
    private _callback: () => unknown;
    private _time: number;

    constructor(fn: () => unknown, debounceTime = 100) {
        this._callback = fn;
        this._time = debounceTime;
    }

    /**
     * My custom implementation of the debounce function, this will force a
     * function to be called a maximum of 1 time per <time>ms
     *
     * @param callback The function to call
     * @param time The minimum amount of time (in ms) between each function call
     */
    call(): void {
        const now = new Date().getTime();
        if (this._timeoutID !== null) {
            clearTimeout(this._timeoutID);
        }
        if (!this._debounceTimer || this._debounceTimer < (now - this._time)) {
            this._callback();
            this._debounceTimer = now;
        } else {
            this._timeoutID = setTimeout(this._callback, this._time);
        }
    }
}

type Listener = { id: number, limit: number, when: 'above' | 'below', callback: (() => unknown) };
export class WindowWatcher {
    static _instance: WindowWatcher | null = null;
    private lastID = 0;
    private _htmlElem: HTMLElement | null = null;
    private scrollAmount = 0;
    private resizeAmount = 0;
    private scrollListeners: Listener[] = [];
    private resizeListeners: Listener[] = [];

    private scrolled(): void {
        if (!this.htmlElem || !('scrollTop' in this.htmlElem))
            return;

        const scroll = this.htmlElem.scrollTop;

        this.scrollListeners.forEach(listener => {
            if (
                scroll > this.scrollAmount
                && listener.when === 'below'
                && scroll > listener.limit
                && this.scrollAmount < listener.limit
            )
                listener.callback();

            if (
                scroll < this.scrollAmount
                && listener.when === 'above'
                && scroll < listener.limit
                && this.scrollAmount > listener.limit
            )
                listener.callback();
        });

        this.scrollAmount = scroll;
    }

    private resized(): void {
        if (!this.htmlElem || !('offsetWidth' in this.htmlElem))
            return;

        const resize = this.htmlElem.offsetWidth;

        this.resizeListeners.forEach(listener => {
            if (listener.limit < 0) {
                listener.callback();
                return;
            }

            if (
                resize > this.resizeAmount
                && listener.when === 'below'
                && resize > listener.limit
                && this.resizeAmount < listener.limit
            )
                listener.callback();

            if (
                resize < this.resizeAmount
                && listener.when === 'above'
                && resize < listener.limit
                && this.resizeAmount > listener.limit
            )
                listener.callback();
        });

        this.resizeAmount = resize;
    }

    /**
     * Caching for the <html> DOM element
     */
    private get htmlElem(): HTMLElement | null {
        if (!this._htmlElem) this._htmlElem = document.querySelector('html');
        return this._htmlElem;
    }

    listenTo(what: 'resize' | 'scroll', when: 'above' | 'below', limit: number, callback: (() => unknown)): number {
        this.lastID++;

        if (what === 'resize') {
            this.resizeListeners.push({
                limit,
                when,
                callback,
                id: this.lastID
            });
        } else {
            this.scrollListeners.push({
                limit,
                when,
                callback,
                id: this.lastID
            });
        }
        return this.lastID;
    }

    stopListening(id: number): void {
        let idx = this.scrollListeners.findIndex(({ id: id0 }) => id === id0);

        if (idx === -1) {
            // it's probably a resize listener
            idx = this.resizeListeners.findIndex(({ id: id0 }) => id === id0);
            if (idx === -1) return;
            this.resizeListeners.splice(idx, 1);
            return;
        }

        this.scrollListeners.splice(idx, 1);
    }

    private constructor() {
        const scrollDeb = new Debouncer(this.scrolled.bind(this), 200);
        window.addEventListener('scroll', () => { scrollDeb.call(); }, { passive: true });

        const resizeDeb = new Debouncer(this.resized.bind(this), 200);
        window.addEventListener('resize', () => { resizeDeb.call(); }, { passive: true });
    }

    static get instance(): WindowWatcher {
        if (this._instance === null)
            this._instance = new WindowWatcher();

        return this._instance;
    }
}

export class Time {
    private _totalSeconds: number;

    readonly _secondsInDay: number = 86400;
    readonly _secondsInMinute: number = 60;
    readonly _secondsInHour: number = 3600;

    constructor(totalSeconds: number) {
        if (totalSeconds < 0) throw 'Время не может быть отрицательным';
        this._totalSeconds = totalSeconds % this._secondsInDay;
    }

    public get hour() { return Math.floor(this._totalSeconds / 3600); }
    public get minute() { return Math.floor((this._totalSeconds % 3600) / 60); }
    public get second() { return Math.floor(this._totalSeconds % 60); }
    public get totalSeconds() { return this._totalSeconds; }

    toJSON = () => this._totalSeconds.toString();
}

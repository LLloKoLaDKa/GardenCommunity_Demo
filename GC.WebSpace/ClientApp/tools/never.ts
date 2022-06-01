export class Never extends Error {
    constructor(value: never) {
        super("Этот код недостижим")
    }
}
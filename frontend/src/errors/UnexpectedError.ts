export class UnexpectedError extends Error {
    constructor(message?: string) {
        super(message || 'Неизвестная ошибка')
        this.name = 'UnexpectedError'
    }
}
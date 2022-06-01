export class ModalButton {
    constructor(
        public content: string,
        public color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info',
        public onClick: () => void,
        public hidden?: boolean
    ) { }
}   
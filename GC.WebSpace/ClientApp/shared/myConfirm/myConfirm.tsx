import React from "react";
import { CustomModal } from "../mymodal/customModal";
import { ModalButton } from "../mymodal/modalButton";

interface IProps {
    title: string,
    onAccept: () => void,
    onClose: () => void
}

export class MyConfirm extends React.Component<IProps> {

    render() {
        const { title, onAccept, onClose } = this.props;

        return <>
            <CustomModal
                size={500}
                headerText={title}
                buttons={[
                    new ModalButton('Нет', 'error', () => { }),
                    new ModalButton('Да', 'success', onAccept)
                ]}
                onClose={onClose}
            />
        </>
    }
}
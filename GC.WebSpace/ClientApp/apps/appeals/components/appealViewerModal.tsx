import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import React from "react";
import { Appeal } from "../../../domain/gardens/appeals/appeal";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import styles from '../content/appealViewerModal.module.scss';

interface IProps {
    appeal: Appeal,
    onClose: () => void
}

export class AppealViewerModal extends React.Component<IProps> {

    componentDidMount = () => {
        const { appeal } = this.props;
    }


    render() {
        const { appeal, onClose } = this.props;

        return <>
            <CustomModal
                headerText={appeal.title}
                buttons={[
                    new ModalButton('Закрыть', 'primary', onClose)
                ]}
                onClose={onClose}
                size={500}
            >
                <div className={styles.container}>
                    <Divider>
                        <Chip label='Начало сообщения' />
                    </Divider>

                    <div className={styles.text}>
                        {appeal.message}
                    </div>

                    <Divider>
                        <Chip label='Конец сообщения' />
                    </Divider>

                    <div className={styles.info}>
                        <span>Отправитель:</span> {appeal.fullName}
                    </div>

                    <div className={styles.info}>
                        <span>Телефон:</span> {appeal.phoneNumber}
                    </div>

                    {
                        appeal.email != null &&
                        <div className={styles.info}>
                            <span>Почта:</span> {appeal.email}
                        </div>
                    }

                    <div className={styles.info}>
                        <span>Дата отправки:</span> {appeal.date.toLocaleDateString('ru')}
                    </div>
                </div>
            </CustomModal>
        </>
    }
}
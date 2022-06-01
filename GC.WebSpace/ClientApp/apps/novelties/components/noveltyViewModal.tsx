import React from "react";
import { Novelty } from "../../../domain/records/novelties/novelty";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import styles from '../content/noveltyViewModal.module.scss';

interface IProps {
    novelty: Novelty,
    onClose: () => void
}

interface IState { }

export class NoveltyViewModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { novelty, onClose } = this.props;

        return <>
            <CustomModal
                size={500}
                onClose={() => onClose()}
                buttons={[
                    new ModalButton('Закрыть', 'primary', () => { }),
                ]}
            >

                <div className={styles.view}>
                    <div className={styles.header}>
                        <h4>{novelty.title}</h4>
                        <div className={styles.date}>
                            {novelty.publishDate?.toLocaleDateString('ru')}
                        </div>
                    </div>

                    {
                        novelty.image != null &&
                        <img src={novelty.image} width={150} />
                    }

                    <div className={styles.description}>
                        {novelty.description}
                    </div>
                </div>
            </CustomModal>
        </>
    }
}
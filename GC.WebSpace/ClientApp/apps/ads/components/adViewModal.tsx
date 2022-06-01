import React from "react";
import { Ad } from "../../../domain/records/ads/ad";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import styles from '../content/adsViewModal.module.scss';

interface IProps {
    ad: Ad,
    onClose: () => void
}

export class AdViewModal extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { ad, onClose } = this.props;

        return <>
            <CustomModal
                onClose={onClose}
                size={600}
                buttons={[
                    new ModalButton('Закрыть', 'primary', () => { })
                ]}>
                <div className={styles.view}>
                    <div className={styles.ad_header}>
                        <h4>{ad.title}</h4>
                        <div className={styles.date}>
                            {ad.publishDate?.toLocaleDateString('ru')}
                        </div>
                    </div>

                    {
                        ad.image != null &&
                        <img src={ad.image} width={150} />
                    }

                    <div className={styles.ad_description}>
                        {ad.description}
                    </div>

                    <div className={styles.contacts}>
                        <div>{ad.fullname}</div>
                        <div> {ad.phoneNumber}</div>
                    </div>
                </div>
            </CustomModal>
        </>
    }
}
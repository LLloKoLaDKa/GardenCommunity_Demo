import React from "react";
import { GardenStreet } from "../../../../../domain/gardens/gardenStreet";
import { SectorSale } from "../../../../../domain/gardens/sectorSales/sectorSale";
import { CustomModal } from "../../../../../shared/mymodal/customModal";
import { ModalButton } from "../../../../../shared/mymodal/modalButton";
import styles from './sectorSaleViewModal.module.scss';

interface IProps {
    sale: SectorSale,
    onClose: () => void
}

export class SectorSaleViewModal extends React.Component<IProps> {
    renderInfo = (title: string, content: any) => {
        return <div className={styles.info}>
            <span>{title}</span>
            {content}
        </div>
    }

    render() {
        const { sale, onClose } = this.props;
        const street = GardenStreet.findStreetBySectroNumber(sale.sector.sectorNumber);
        const streetString = street == null ? "" : GardenStreet.getDisplayName(street);

        return <>
            <CustomModal
                headerText={`Участок ${sale.sector.sectorNumber}`}
                onClose={onClose}
                size={500}
                buttons={[
                    new ModalButton("Закрыть", "primary", onClose)
                ]}
            >
                <fieldset>
                    <legend>
                        Данные об участке
                    </legend>

                    {this.renderInfo("Количество соток:", sale.sector.numberOfAcres)}
                    {this.renderInfo("Цена:", sale.price.toLocaleString('ru-RU'))}
                    {this.renderInfo("Улица:", streetString)}
                    {this.renderInfo("Участок:", sale.sector.sectorNumber)}
                    {this.renderInfo("Описание:", sale.description == null ? 'отсутствует' : sale.description)}
                </fieldset>

                <fieldset>
                    <legend>
                        Контактная информация
                    </legend>

                    {this.renderInfo("ФИО:", sale.fullName)}
                    {this.renderInfo("Телефон:", sale.phoneNumber)}
                </fieldset>
            </CustomModal>
        </>
    }
}
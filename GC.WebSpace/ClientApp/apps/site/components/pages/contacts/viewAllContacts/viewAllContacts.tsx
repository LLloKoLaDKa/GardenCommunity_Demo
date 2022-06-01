import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import React from "react";
import { GardenContact } from "../../../../../../domain/contacts/gardenContacts/gardenContact";
import { GardenSector } from "../../../../../../domain/gardens/gardenSectors/gardenSector";
import { GardenStreet } from "../../../../../../domain/gardens/gardenStreet";
import { CustomModal } from "../../../../../../shared/mymodal/customModal";
import { ModalButton } from "../../../../../../shared/mymodal/modalButton";
import styles from "./viewAllContacts.module.scss";

interface IProps {
    street: GardenStreet,
    contacts: GardenContact[],
    sectors: GardenSector[],
    onClose: () => void
}

export class ViewAllContacts extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    renderContact = (contact: GardenContact, index: number) => {
        const sector = this.props.sectors.find(s => contact.gardener.sectorId);
        if (sector == undefined) return <></>;

        return <div className={styles.contact}>
            <div className={styles.title}>
                {`Контакт №${index + 1}`}
            </div>

            <div className={styles.info}>
                <div className={styles.icon}>
                    <AccountCircleOutlinedIcon />
                </div>

                <div className={styles.data}>
                    {contact.gardener.fullName()}
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.icon}>
                    <LocalPhoneIcon />
                </div>

                <div className={styles.data}>
                    {contact.phoneNumber}
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.icon}>
                    <SignpostOutlinedIcon />
                </div>

                <div className={styles.data}>
                    {`Улица: ${GardenStreet.getDisplayNameBySectorNumber(sector?.sectorNumber)}`}
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.icon}>
                    <HomeOutlinedIcon />
                </div>

                <div className={styles.data}>
                    {`Участок: ${sector?.sectorNumber}`}
                </div>
            </div>
        </div>
    }

    render() {
        const { street, contacts, onClose } = this.props;

        return <>
            <CustomModal
                headerText={`Улица: ${GardenStreet.getDisplayName(street)}`}
                size={400}
                buttons={[
                    new ModalButton('Закрыть', 'primary', () => onClose())
                ]}
                onClose={() => onClose()}

            >
                <div className={styles.container}>
                    {contacts.map(this.renderContact)}
                </div>
            </CustomModal>
        </>
    }
}
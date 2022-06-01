import React from "react";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { GardenStreet } from "../../../domain/gardens/gardenStreet";
import { SectorCredit } from "../../../domain/gardens/sectorCredits/sectorCredit";
import { SectorCreditBlank } from "../../../domain/gardens/sectorCredits/sectorCreditBlank";
import NumberBox from "../../../shared/myinputs/numberBox/numberBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";
import styles from "../content/editCreditModal.module.scss";

interface IProps {
    currentCredit: SectorCredit,
    onClose: (isEdited: boolean) => void
}

interface IState {
    credit: SectorCreditBlank
}

export class EditCreditModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            credit: SectorCreditBlank.create(props.currentCredit)
        }
    }

    changeCredit = (creditNumber: number | null) => {
        const { credit } = this.state;
        credit.credit = creditNumber;

        this.setState({ credit });
    }

    save = async () => {
        const { credit } = this.state;
        if (credit.credit == null) return ModalErrorStorage.setError("Укажите задолженность участка");

        const result = await GardensProvider.Credits.saveCredit(credit);
        if (!result.isSuccess) return ModalErrorStorage.setError(result.getErrorsString());

        ModalErrorStorage.setNullError();
        this.props.onClose(true);
    }

    render() {
        const { currentCredit, onClose } = this.props;
        const { credit } = this.state;

        return <>
            <CustomModal
                headerText="Редактирование задолжности"
                size={500}
                buttons={[
                    new ModalButton("Сохранить", "primary", this.save)
                ]}
                onClose={() => onClose(false)}
            >
                <div className={styles.infos}>
                    <div className={styles.info}>
                        <span>Участок: </span>
                        {`${currentCredit.sector.sectorNumber} - ${GardenStreet.getDisplayName(GardenStreet.findStreetBySectroNumber(currentCredit.sector.sectorNumber)!)} улица`}
                    </div>

                    <div className={styles.info}>
                        <span>Владелец: </span>
                        {currentCredit.gardener.fullName()}
                    </div>
                </div>

                <NumberBox
                    required
                    min={0}
                    onChange={this.changeCredit}
                    value={credit.credit}
                    label="Общая задолженность"
                />

            </CustomModal>
        </>
    }
}
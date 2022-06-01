import React, { Component } from "react";
import { GardenSectorBlank } from "../../../domain/gardens/gardenSectors/gardenSectorBlank";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { GardenStreet } from "../../../domain/gardens/gardenStreet";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MaskedTextBox } from "../../../shared/myinputs/maskedTextBox/maskedTextBox";
import NumberBox from "../../../shared/myinputs/numberBox/numberBox";
import NewSelectBox from "../../../shared/myinputs/selectBox/newSelectBox";
import { Option } from '../../../shared/myinputs/selectBox/option';
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from '../../../shared/mymodal/modalErrorStorages/modalErrorStorage';
import { Space } from "../../../shared/space/space";
import { enumToOptions } from "../../../tools/enum";
import { addSuccessNotification } from "../../../tools/notifications";
import styles from "../content/sectorEditorModal.module.scss";

interface IProps {
    editingGardenSector: GardenSectorBlank,
    onClose: (isEdited: boolean) => void,
}

interface IState {
    editingSector: GardenSectorBlank,
    streetOptions: Option<GardenStreet>[],
    sectorOptions: Option<number>[],
    selectedStreet: Option<GardenStreet> | null,
    selectedSector: Option<number> | null,
    memberContribution: number,
    targetContribution: number
}

export class SectorEditorModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingSector: props.editingGardenSector,
            streetOptions: enumToOptions(GardenStreet, GardenStreet.getDisplayName),
            sectorOptions: [],
            selectedStreet: null,
            selectedSector: null,
            memberContribution: 0,
            targetContribution: 0
        }
    }

    componentDidMount = () => {
        BlockUi.blockAsync(async () => {
            const { editingSector } = this.state;
            const findedStreet = GardenStreet.findStreetBySectroNumber(editingSector.sectorNumber)!;
            const selectedStreet = this.state.streetOptions.find(so => so.value == findedStreet)!;
            const { targetContribution, memberContribution } = (window as any).payload;

            let sectorOption: Option<number> | null = null;
            if (editingSector.id != null) {
                this.changeStreet(selectedStreet);
                sectorOption = new Option(`Участок ${editingSector.sectorNumber!}`, editingSector.sectorNumber!);
            }

            this.setState({
                selectedStreet,
                selectedSector: sectorOption,
                targetContribution, memberContribution
            });
        });
    }

    changeStreet = (selectedStreet: Option<GardenStreet> | null) => {
        if (selectedStreet == null) return this.setState({ selectedStreet, selectedSector: null, sectorOptions: [] });

        const sectorOptions = GardenStreet
            .getNumbersForStreet(selectedStreet.value)
            .map(n => new Option(`Участок ${n}`, n))
        this.setState({ selectedStreet, sectorOptions, selectedSector: null });
    }

    changeSector = (selectedSector: Option<number> | null) => {
        if (selectedSector == null) return this.setState({ selectedSector });

        const { editingSector, sectorOptions } = this.state;
        const sector = selectedSector.value;
        editingSector.sectorNumber = sector;

        this.setState({ selectedSector, editingSector });
    }

    changeSectorNumber = (sectorNumber: number | null) => {
        const editingSector = this.state.editingSector;
        editingSector.sectorNumber = sectorNumber;

        this.setState({ editingSector });
    }

    changeElectricityNumber = (electricityNumber: string | null) => {
        if (electricityNumber == null) return;

        const editingSector = this.state.editingSector;
        editingSector.electricityNumber = electricityNumber;


        this.setState({ editingSector });
    }

    changeNumberOfAcres = (numberOfAcres: number | null) => {
        const editingSector = this.state.editingSector;
        editingSector.numberOfAcres = numberOfAcres;

        this.setState({ editingSector });
    }

    changeCadastralNumber = (cadastralNumber: string) => {
        const { editingSector } = this.state;
        cadastralNumber = cadastralNumber.replace("_", "");
        editingSector.cadastralNumber = cadastralNumber;

        this.setState({ editingSector });
    }

    save = async () => {
        await BlockUi.blockAsync(async () => {
            const { editingSector } = this.state;

            const result = await GardensProvider.GardenSectors.saveGardenSector(this.state.editingSector);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.errors[0].message);

            addSuccessNotification("Участок сохранён");
            ModalErrorStorage.setNullError();
            this.props.onClose(true);
        });
    }

    render() {
        let { editingSector,
            streetOptions,
            sectorOptions,
            selectedStreet,
            selectedSector,
            memberContribution,
            targetContribution } = this.state;
        const { onClose } = this.props;

        return <>
            <CustomModal
                headerText={editingSector.id == null ? 'Создание участка' : `Редактирование участка ${editingSector.sectorNumber}`}
                size={500}
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton('Сохранить', 'primary', this.save)
                ]}
            >
                <NewSelectBox
                    required
                    disabled={editingSector.id != null ? true : false}
                    label={"Улица участка"}
                    options={streetOptions}
                    value={selectedStreet}
                    onChange={this.changeStreet}
                />

                <NewSelectBox
                    required
                    disabled={editingSector.id != null ? true : false}
                    label={'Номер участка'}
                    options={sectorOptions.sort(so => so.value)}
                    value={selectedSector}
                    onChange={this.changeSector}
                />

                <NumberBox
                    value={editingSector.numberOfAcres}
                    min={1}
                    label='Количество соток участка'
                    onChange={this.changeNumberOfAcres}
                />

                <MaskedTextBox
                    label='Номер договора электроснабжения'
                    value={editingSector.electricityNumber}
                    mask='99999-999-99'
                    onChange={this.changeElectricityNumber}
                />

                <MaskedTextBox
                    label='Кадастровый номер участка'
                    value={editingSector.cadastralNumber}
                    mask='99:99:9999999:999'
                    onChange={this.changeCadastralNumber}
                />

                <div className={styles.contributions}>
                    <div className={styles.member_contribution}>
                        <div className={styles.contribution_title}>Членский взнос</div>
                        <div className={styles.contribution}>
                            {editingSector.numberOfAcres ?? 0} x {memberContribution} руб. за сотку = <Space />
                            {Math.floor((editingSector.numberOfAcres ?? 0) * memberContribution)} рублей
                        </div>
                    </div>

                    <div className={styles.target_contribution}>
                        <div className={styles.contribution_title}>Целевой взнос</div>
                        <div>Постоянная величина: {targetContribution} рублей</div>
                    </div>
                </div>
            </CustomModal>
        </>
    }
}
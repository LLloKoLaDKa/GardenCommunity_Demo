import React, { Component } from "react";
import { GardenerBlank } from "../../../domain/gardens/gardeners/gardenerBlank";
import { GardenSector } from "../../../domain/gardens/gardenSectors/gardenSector";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { GardenStreet } from "../../../domain/gardens/gardenStreet";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import NewSelectBox from "../../../shared/myinputs/selectBox/newSelectBox";
import { Option } from "../../../shared/myinputs/selectBox/option";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";
import { enumToOptions } from "../../../tools/enum";
import { addSuccessNotification } from "../../../tools/notifications";

interface IProps {
    editingGardenerBlank: GardenerBlank,
    onClose: (isEdited: boolean) => void,
}

interface IState {
    editingGardener: GardenerBlank,
    streetOptions: Option<GardenStreet>[],
    selectedStreet: Option<GardenStreet> | null,
    sectors: GardenSector[],
    sectorOptions: Option<GardenSector>[],
    selectedSector: Option<GardenSector> | null
}

export class GardenerEditorModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingGardener: props.editingGardenerBlank,
            streetOptions: enumToOptions(GardenStreet, GardenStreet.getDisplayName),
            sectorOptions: [],
            selectedStreet: null,
            selectedSector: null,
            sectors: []
        }
    }

    componentDidMount = async () => {
        await BlockUi.blockAsync(async () => {
            const sectors = await GardensProvider.GardenSectors.getAll();
            const sector = sectors.find(s => s.id == this.props.editingGardenerBlank.sectorId) ?? null;
            if (sector == null) return this.setState({ sectors });

            const street = GardenStreet.findStreetBySectroNumber(sector.sectorNumber);
            if (street == null) return;

            const selectedStreet = this.state.streetOptions.find(s => s.value == street)!;

            this.setState({ sectors, selectedSector: new Option(`Участок ${sector.sectorNumber}`, sector) },
                async () => this.changeStreet(selectedStreet));
        });
    }

    changeFirstName = (firstName: string) => {
        const editingGardener = this.state.editingGardener;
        editingGardener.firstName = firstName;

        this.setState({ editingGardener });
    }

    changeLastName = (lastName: string) => {
        const editingGardener = this.state.editingGardener;
        editingGardener.lastName = lastName;

        this.setState({ editingGardener });
    }

    changeMiddleName = (middleName: string) => {
        const editingGardener = this.state.editingGardener;
        editingGardener.middleName = middleName;

        this.setState({ editingGardener });
    }

    changeStreet = (selectedStreet: Option<GardenStreet> | null) => {
        const { sectors, streetOptions } = this.state;
        if (selectedStreet == null) return this.setState({ selectedStreet, selectedSector: null, sectorOptions: [] });

        const streetNumbers = GardenStreet.getNumbersForStreet(selectedStreet.value).filter(n => sectors.some(s => s.sectorNumber == n));
        const sectorOptions = streetNumbers.map(n => {
            const sector = sectors.find(s => s.sectorNumber == n)!;
            return new Option(`Участок ${n}`, sector)
        })
        this.setState({ selectedStreet, sectorOptions });
    }

    changeSector = (selectedSector: Option<GardenSector> | null) => {
        if (selectedSector == null) return this.setState({ selectedSector });

        const { editingGardener, } = this.state;
        editingGardener.sectorId = selectedSector.value.id;

        this.setState({ selectedSector, editingGardener });
    }

    save = async () => {
        await BlockUi.blockAsync(async () => {
            const result = await GardensProvider.Gardeners.saveGardener(this.state.editingGardener);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.errors[0].message);

            addSuccessNotification("Садовод сохранён");
            ModalErrorStorage.setNullError();
            this.props.onClose(true);
        });
    }

    render() {
        const { editingGardener, streetOptions, sectorOptions, selectedStreet, selectedSector } = this.state;
        const { onClose } = this.props;

        return <>
            <CustomModal
                headerText={editingGardener.id == null ? 'Создание садовода' : 'Редактирование садовода'}
                size={500}
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton('Сохранить', 'primary', this.save)
                ]}
            >
                <TextBox
                    required
                    value={editingGardener.firstName}
                    label='Имя садовода'
                    onChange={this.changeFirstName}
                />

                <TextBox
                    required
                    value={editingGardener.lastName}
                    label='Фамилия садовода'
                    onChange={this.changeLastName}
                />

                <TextBox
                    required
                    value={editingGardener.middleName ?? ''}
                    label='Отчество садовода'
                    onChange={this.changeMiddleName}
                />

                <NewSelectBox
                    required
                    label="Улица участка"
                    options={streetOptions}
                    value={selectedStreet}
                    onChange={this.changeStreet}
                />

                <NewSelectBox
                    required
                    disabled={sectorOptions.length == 0}
                    label={'Номер участка'}
                    options={sectorOptions}
                    value={selectedSector}
                    onChange={this.changeSector}
                />
            </CustomModal>
        </>
    }
}
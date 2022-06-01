import React, { Component } from "react";
import { GardenSector } from "../../../domain/gardens/gardenSectors/gardenSector";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { GardenStreet } from "../../../domain/gardens/gardenStreet";
import { SectorSaleBlank } from "../../../domain/gardens/sectorSales/sectorSaleBlank";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MaskedTextBox } from "../../../shared/myinputs/maskedTextBox/maskedTextBox";
import NumberBox from "../../../shared/myinputs/numberBox/numberBox";
import NewSelectBox from "../../../shared/myinputs/selectBox/newSelectBox";
import { Option } from "../../../shared/myinputs/selectBox/option";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage as ModalErrorKeeper } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";
import { enumToOptions } from "../../../tools/enum";
import { addSuccessNotification } from "../../../tools/notifications";

interface IProps {
    editingSale: SectorSaleBlank,
    onClose: (isEdited: boolean) => void,
}

interface IState {
    editingSale: SectorSaleBlank,
    streetOptions: Option<GardenStreet>[],
    selectedStreet: Option<GardenStreet> | null,
    sectors: GardenSector[],
    sectorOptions: Option<GardenSector>[],
    selectedSector: Option<GardenSector> | null
}

export class SectorSaleEditorModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingSale: props.editingSale,
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
            const sector = sectors.find(s => s.id == this.props.editingSale.sectorId) ?? null;
            if (sector == null) return this.setState({ sectors });

            const street = GardenStreet.findStreetBySectroNumber(sector.sectorNumber);
            if (street == null) return;

            const selectedStreet = this.state.streetOptions.find(s => s.value == street)!;

            this.setState({ sectors, selectedSector: new Option(`Участок ${sector.sectorNumber}`, sector) },
                async () => this.changeStreet(selectedStreet));
        });
    }

    changeFirstName = (firstName: string) => {
        const editingSale = this.state.editingSale;
        editingSale.firstName = firstName;

        this.setState({ editingSale });
    }

    changeLastName = (lastName: string) => {
        const editingSale = this.state.editingSale;
        editingSale.lastName = lastName;

        this.setState({ editingSale });
    }

    changeMiddleName = (middleName: string) => {
        const editingSale = this.state.editingSale;
        editingSale.middleName = middleName;

        this.setState({ editingSale });
    }

    changePhoneNumber = (phone: string) => {
        const editingSale = this.state.editingSale;
        editingSale.phoneNumber = phone;

        this.setState({ editingSale });
    }

    changeDescription = (description: string) => {
        const editingSale = this.state.editingSale;
        editingSale.description = description;

        this.setState({ editingSale });
    }

    changePrice = (price: number | null) => {
        const editingSale = this.state.editingSale;
        editingSale.price = price;

        this.setState({ editingSale });
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

        const { editingSale, } = this.state;
        editingSale.sectorId = selectedSector.value.id;

        this.setState({ selectedSector, editingSale });
    }

    save = async () => {
        await BlockUi.blockAsync(async () => {
            const result = await GardensProvider.SectorSales.saveSale(this.state.editingSale);
            if (!result.isSuccess) return ModalErrorKeeper.setError(result.errors[0].message);

            addSuccessNotification("Продажа сохранена");
            ModalErrorKeeper.setNullError();
            this.props.onClose(true);
        });
    }

    render() {
        const { editingSale, streetOptions, sectorOptions, selectedStreet, selectedSector } = this.state;
        const { onClose } = this.props;

        return <>
            <CustomModal
                headerText={editingSale.id == null ? 'Создание продажи участка' : 'Редактирование продажи участка'}
                size={500}
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton('Сохранить', 'primary', this.save)
                ]}
            >
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

                <TextBox
                    required
                    value={editingSale.firstName}
                    label='Имя контактного лица'
                    onChange={this.changeFirstName}
                />

                <TextBox
                    required
                    value={editingSale.lastName}
                    label='Фамилия контактного лица'
                    onChange={this.changeLastName}
                />

                <TextBox
                    value={editingSale.middleName ?? ''}
                    label='Отчество контактного лица'
                    onChange={this.changeMiddleName}
                />

                <MaskedTextBox
                    value={editingSale.phoneNumber}
                    label="Контактный телефон"
                    onChange={this.changePhoneNumber}
                    mask="+7 (999) 999-99-99"
                />

                <NumberBox
                    value={editingSale.price}
                    label='Цена'
                    onChange={this.changePrice}
                />

                <TextBox
                    multiline
                    value={editingSale.description ?? ''}
                    label='Описание участка'
                    onChange={this.changeDescription}
                />
            </CustomModal>
        </>
    }
}
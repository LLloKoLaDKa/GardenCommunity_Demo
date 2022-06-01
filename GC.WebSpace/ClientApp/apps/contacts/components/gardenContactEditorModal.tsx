import React from "react";
import { GardenContactBlank } from "../../../domain/contacts/gardenContacts/gardenContactBlank";
import { GardenContactType } from "../../../domain/contacts/gardenContacts/gardenContactType";
import { Gardener } from "../../../domain/gardens/gardeners/gardener";
import { GardenSector } from "../../../domain/gardens/gardenSectors/gardenSector";
import { GardenStreet } from "../../../domain/gardens/gardenStreet";
import { MaskedTextBox } from "../../../shared/myinputs/maskedTextBox/maskedTextBox";
import NewSelectBox from "../../../shared/myinputs/selectBox/newSelectBox";
import { Option } from "../../../shared/myinputs/selectBox/option";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from '../../../shared/mymodal/modalErrorStorages/modalErrorStorage';

interface IProps {
    contactBlank: GardenContactBlank,
    gardenSectors: GardenSector[],
    gardeners: Gardener[],
    isDeletable: boolean,
    onClose: () => void,
    toSave: (gardenContact: GardenContactBlank) => void,
    toDelete: (gardenContactId: string) => void
}

interface IState {
    contactBlank: GardenContactBlank,
    gardenerOptions: Option<Gardener>[]
    selectedGardener: Option<Gardener> | null,
    isDeletable: boolean
}

export class GardenContactEditorModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        const gardenerOptions = props.gardeners
            .filter(g => props.gardenSectors.find(gs => gs.id == g.sectorId) != undefined)
            .map(g => new Option(`(${props.gardenSectors.find(gs => gs.id == g.sectorId)!.sectorNumber}) ${g.fullName()}`, g))
            .sort((g1, g2) => {
                const sector1 = props.gardenSectors.find(gs => gs.id == g1.value.sectorId)!.sectorNumber
                const sector2 = props.gardenSectors.find(gs => gs.id == g2.value.sectorId)!.sectorNumber

                return sector1 - sector2;
            });

        this.state = {
            contactBlank: props.contactBlank,
            gardenerOptions,
            selectedGardener: props.contactBlank.gardenerId ?
                gardenerOptions.find(g => g.value.id == props.contactBlank.gardenerId) || null
                : null,

            isDeletable: props.isDeletable ?? false
        }
    }

    changeGardener = (selectedGardener: Option<Gardener> | null) => this.setState({ selectedGardener });

    changePhoneNumber = (phoneNumber: string) => {
        const { contactBlank } = this.state;
        contactBlank.phoneNumber = phoneNumber;

        this.setState({ contactBlank });
    }

    delete = async () => {
        this.props.toDelete(this.state.contactBlank.id!);
    }

    save = () => {
        const { contactBlank, selectedGardener } = this.state;

        if (selectedGardener == null) return ModalErrorStorage.setError("Укажите садовода");
        if (contactBlank.phoneNumber == null || contactBlank.phoneNumber.replace('_', '').length != 18)
            return ModalErrorStorage.setError("Укажите номер телефона");

        contactBlank.gardenerId = selectedGardener.value.id;

        ModalErrorStorage.setNullError();
        this.props.toSave(contactBlank);
    }

    render() {
        let { gardenSectors, gardeners, onClose } = this.props;
        let { contactBlank, selectedGardener, isDeletable, gardenerOptions } = this.state;

        if (contactBlank.street != undefined)
            gardenerOptions = gardenerOptions.filter(gs => GardenStreet.sectorMatchStreet(contactBlank.street!, gardenSectors.find(s => s.id == gs.value.sectorId)!))

        return <>
            <CustomModal
                size={400}
                headerText={`Редактирование контакта «${GardenContactType.getDisplayName(contactBlank.type!)}»`}
                onClose={onClose}
                buttons={[
                    new ModalButton('Удалить контакт', 'error', this.delete, !isDeletable),
                    new ModalButton('Сохранить', 'primary', this.save),
                ]}
            >

                <NewSelectBox
                    required
                    value={selectedGardener}
                    options={gardenerOptions}
                    label={'Выберите садовода'}
                    onChange={this.changeGardener}
                />

                <MaskedTextBox
                    required
                    mask='+7 (999) 999-99-99'
                    value={contactBlank.phoneNumber ?? ''}
                    onChange={this.changePhoneNumber}
                    label='Номер телефона'
                />

            </CustomModal>
        </>
    }
}
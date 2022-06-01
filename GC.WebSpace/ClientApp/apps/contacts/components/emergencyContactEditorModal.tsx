import React from "react";
import { EmergencyContactBlank } from "../../../domain/contacts/emergencyContacts/emergencyContactBlank";
import { EmergencyContactType } from "../../../domain/contacts/emergencyContacts/emergencyContactType";
import { MaskedTextBox } from "../../../shared/myinputs/maskedTextBox/maskedTextBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";

interface IProps {
    contactBlank: EmergencyContactBlank,
    isDeletable: boolean,
    onClose: () => void,
    toSave: (gardenContact: EmergencyContactBlank) => void,
    toDelete: (gardenContactId: string) => void
}

interface IState {
    contactBlank: EmergencyContactBlank,
    isDeletable: boolean
}

export class EmergencyContactEditorModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            contactBlank: props.contactBlank,
            isDeletable: props.isDeletable ?? false
        }
    }

    changeMobilePhone = (mobilePhone: string) => {
        const { contactBlank } = this.state;
        contactBlank.mobilePhone = mobilePhone;

        this.setState({ contactBlank });
    }

    changeCityPhone = (cityPhone: string) => {
        const { contactBlank } = this.state;
        contactBlank.cityPhone = cityPhone;

        this.setState({ contactBlank });
    }

    delete = () => {
        const { contactBlank } = this.state;
        this.props.toDelete(contactBlank.id!);
    }

    save = () => {
        const { contactBlank } = this.state;

        if (contactBlank.cityPhone == null || contactBlank.cityPhone.replace('_', '').length != 18) return ModalErrorStorage.setError("Укажите городской номер телефона");
        if (contactBlank.mobilePhone == null || (contactBlank.type == EmergencyContactType.LandCommittee && contactBlank.mobilePhone.replace('_', '').length != 18))
            return ModalErrorStorage.setError("Укажите мобильный номер телефона");

        ModalErrorStorage.setNullError();
        this.props.toSave(contactBlank);
    }

    render() {
        const { onClose } = this.props;
        const { contactBlank, isDeletable } = this.state;

        return <>
            <CustomModal
                size={400}
                headerText={`Редактирование контакта «${EmergencyContactType.getDisplayName(contactBlank.type!)}»`}
                onClose={onClose}
                buttons={[
                    new ModalButton('Удалить контакт', 'error', this.delete, !isDeletable),
                    new ModalButton('Сохранить', 'primary', this.save)
                ]}
            >
                <MaskedTextBox
                    value={contactBlank.mobilePhone ?? ''}
                    label='Мобильный телефон'
                    mask={contactBlank.type == EmergencyContactType.LandCommittee ? "+7 (999) 999-99-99" : "999"}
                    onChange={this.changeMobilePhone}
                />

                <MaskedTextBox
                    value={contactBlank.cityPhone ?? ''}
                    label='Городской телефон'
                    mask="+7 (999) 999-99-99"
                    onChange={this.changeCityPhone}
                />
            </CustomModal>
        </>
    }
}
import React from "react";
import { ForeignContactBlank } from "../../../domain/contacts/foreignContacts/foreignContactBlank";
import { ForeignContactType } from "../../../domain/contacts/foreignContacts/foreignContactType";
import { MaskedTextBox } from "../../../shared/myinputs/maskedTextBox/maskedTextBox";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";

interface IProps {
    contactBlank: ForeignContactBlank,
    isDeletable: boolean,
    onClose: () => void,
    toSave: (foreignContact: ForeignContactBlank) => void,
    toDelete: (contactId: string) => void
}

interface IState {
    contactBlank: ForeignContactBlank,
    isDeletable: boolean
}

export class ForeignContactEditorModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            contactBlank: props.contactBlank,
            isDeletable: props.isDeletable ?? false
        }
    }

    changeFirstName = (name: string) => {
        const { contactBlank } = this.state;
        contactBlank.firstName = name;

        this.setState({ contactBlank });
    }

    changeLastName = (lastName: string) => {
        const { contactBlank } = this.state;
        contactBlank.lastName = lastName;

        this.setState({ contactBlank });
    }

    changeMiddleName = (middleName: string) => {
        const { contactBlank } = this.state;
        contactBlank.middleName = middleName;

        this.setState({ contactBlank });
    }

    changePhoneNumber = (phoneNumber: string) => {
        const { contactBlank } = this.state;
        contactBlank.phoneNumber = phoneNumber;

        this.setState({ contactBlank });
    }

    delete = () => {
        const { contactBlank } = this.state;
        this.props.toDelete(contactBlank.id!);
    }

    save = () => {
        const { contactBlank } = this.state;

        if (contactBlank.phoneNumber == null || contactBlank.phoneNumber.replace('_', '').length != 18) return ModalErrorStorage.setError("?????????????? ?????????? ????????????????");

        ModalErrorStorage.setNullError();
        this.props.toSave(contactBlank)
    }

    render() {
        let { onClose, toSave, toDelete } = this.props;
        const { contactBlank, isDeletable } = this.state;

        return <>
            <CustomModal
                size={400}
                headerText={`???????????????????????????? ???????????????? ??${ForeignContactType.getDisplayName(contactBlank.type!)}??`}
                onClose={onClose}
                buttons={[
                    new ModalButton("?????????????? ??????????????", 'error', this.delete, !isDeletable),
                    new ModalButton("??????????????????", 'primary', this.save)
                ]}
            >
                <TextBox
                    required
                    value={contactBlank.firstName ?? ''}
                    onChange={this.changeFirstName}
                    label='?????? ?????????????????????????????? ????????'
                />

                <TextBox
                    required
                    value={contactBlank.lastName ?? ''}
                    onChange={this.changeLastName}
                    label='?????????????? ?????????????????????????????? ????????'
                />

                <TextBox
                    value={contactBlank.middleName ?? ''}
                    onChange={this.changeMiddleName}
                    label='???????????????? ?????????????????????????????? ????????'
                />

                <MaskedTextBox
                    required
                    mask='+7 (999) 999-99-99'
                    value={contactBlank.phoneNumber ?? ''}
                    onChange={this.changePhoneNumber}
                    label='?????????? ????????????????'
                />
            </CustomModal>
        </>
    }
}
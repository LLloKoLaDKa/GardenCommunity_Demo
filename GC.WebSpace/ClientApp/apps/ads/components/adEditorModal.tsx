import React from "react";
import { AdBlank } from "../../../domain/records/ads/adBlank";
import { RecordsProvider } from "../../../domain/records/recordsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { FileInput } from "../../../shared/inputs/fileInput/fileInput";
import { MyConfirm } from "../../../shared/myConfirm/myConfirm";
import { MaskedTextBox } from "../../../shared/myinputs/maskedTextBox/maskedTextBox";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from '../../../shared/mymodal/modalErrorStorages/modalErrorStorage';
import { id } from "../../../tools/id/id";
import { addSuccessNotification } from "../../../tools/notifications";

interface IProps {
    editingAd: AdBlank,
    onClose: () => void
    beforeClose: () => Promise<void>,
    isOffered?: boolean
}

interface IState {
    editingAd: AdBlank,
    deletableAd: AdBlank | null
}

export class AdEditorModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingAd: props.editingAd,
            deletableAd: null
        }
    }

    changeTitle = (title: string | null) => {
        const editingAd = this.state.editingAd;
        editingAd.title = title;

        this.setState({ editingAd });
    }

    changeDescription = (description: string | null) => {
        const editingAd = this.state.editingAd;
        editingAd.description = description;

        this.setState({ editingAd });
    }

    changeFirstName = (firstName: string | null) => {
        const editingAd = this.state.editingAd;
        editingAd.firstName = firstName;

        this.setState({ editingAd });
    }

    changeLastName = (lastName: string | null) => {
        const editingAd = this.state.editingAd;
        editingAd.lastName = lastName;

        this.setState({ editingAd });
    }

    changeMiddleName = (middleName: string | null) => {
        const editingAd = this.state.editingAd;
        editingAd.middleName = middleName;

        this.setState({ editingAd });
    }

    changeImage = (base64File: string | null) => {
        let editingAd = this.state.editingAd;
        editingAd.image = base64File;

        this.setState({ editingAd });
    }

    changePhoneNumber = (phone: string) => {
        const editingAd = this.state.editingAd;
        editingAd.phoneNumber = phone;

        this.setState({ editingAd });
    }

    markToDeleteAd = () => {
        ModalErrorStorage.setError("?????????????? ???????????????? ???? ??????????????????????", false);
        this.setState({ deletableAd: this.state.editingAd })
    };

    unmarkToDeleteAd = () => {
        ModalErrorStorage.setNullError();
        this.setState({ deletableAd: null });
    }

    save = async () => {
        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.ads.save(this.state.editingAd);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.errors[0].message);

            addSuccessNotification("???????????????????? ??????????????????");
            ModalErrorStorage.setNullError();
            await this.props.beforeClose();
        });
    }

    removeAd = async () => {
        const { deletableAd } = this.state;
        if (deletableAd == null) return;

        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.ads.remove(deletableAd.id!);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.getErrorsString());

            await this.props.beforeClose();
            ModalErrorStorage.setNullError();
            addSuccessNotification("???????????????????? ??????????????!");

            this.props.onClose();
        });
    }

    publishAd = async () => {
        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.ads.publish(this.state.editingAd);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.getErrorsString());

            await this.props.beforeClose();
            ModalErrorStorage.setNullError();
            addSuccessNotification("???????????????????? ????????????????????????!");
        });
    }

    render() {
        const { editingAd, deletableAd } = this.state;
        const { onClose, isOffered } = this.props;

        return <>
            <CustomModal
                size={600}
                headerText={editingAd.id == null ? '???????????????? ????????????????????' : '???????????????????????????? ????????????????????'}
                onClose={onClose}
                buttons={[
                    new ModalButton('??????????????', 'error', this.markToDeleteAd, editingAd.id == null),
                    new ModalButton('??????????????????', 'primary', this.save, editingAd.publishDate != null),
                    new ModalButton('????????????????????????', 'primary', this.publishAd)
                ]}
            >

                <TextBox
                    required
                    value={editingAd.title ?? ''}
                    label='???????????????? ????????????????????'
                    onChange={this.changeTitle}
                />

                <TextBox
                    required
                    multiline
                    value={editingAd.description ?? ''}
                    label='???????????????? ????????????????????'
                    onChange={this.changeDescription}
                />

                <TextBox
                    required
                    value={editingAd.firstName ?? ''}
                    label='?????? ????????????????'
                    onChange={this.changeFirstName}
                />

                <TextBox
                    required
                    value={editingAd.lastName ?? ''}
                    label='?????????????? ????????????????'
                    onChange={this.changeLastName}
                />

                <TextBox
                    value={editingAd.middleName ?? ''}
                    label='???????????????? ????????????????'
                    onChange={this.changeMiddleName}
                />

                <MaskedTextBox
                    required
                    value={editingAd.phoneNumber ?? ''}
                    mask='+7 (999) 999-99-99'
                    label='?????????????? ????????????????'
                    onChange={this.changePhoneNumber}
                />


                <FileInput
                    hidden
                    id={id()}
                    accept="image/jpeg,image/png,image/jpg"
                    file={editingAd.image}
                    onChange={this.changeImage}
                />
            </CustomModal>

            {
                deletableAd != null &&
                <MyConfirm
                    title={`???? ??????????????, ?????? ???????????? ?????????????? ???????????????????? ${deletableAd.title}?`}
                    onAccept={this.removeAd}
                    onClose={this.unmarkToDeleteAd}
                />
            }
        </>
    }
}
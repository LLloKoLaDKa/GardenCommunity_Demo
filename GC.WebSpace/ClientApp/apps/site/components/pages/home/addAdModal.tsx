import React from "react";
import { AdBlank } from "../../../../../domain/records/ads/adBlank";
import { AdType } from "../../../../../domain/records/ads/adType";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { BlockUi } from "../../../../../shared/blockUi/blockUi";
import { FileInput } from "../../../../../shared/inputs/fileInput/fileInput";
import { MaskedTextBox } from "../../../../../shared/myinputs/maskedTextBox/maskedTextBox";
import { TextBox } from "../../../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../../../shared/mymodal/customModal";
import { ModalButton } from "../../../../../shared/mymodal/modalButton";
import { id } from "../../../../../tools/id/id";
import { addErrorNotification, addSuccessNotification } from "../../../../../tools/notifications";

interface IProps {
    ad: AdBlank,
    onClose: () => void;
}

interface IState {
    ad: AdBlank
}

export class AddAdModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            ad: props.ad
        }
    }

    changeTitle = (title: string | null) => {
        const ad = this.state.ad;
        ad.title = title;

        this.setState({ ad });
    }

    changeDescription = (description: string | null) => {
        const ad = this.state.ad;
        ad.description = description;

        this.setState({ ad });
    }

    changeFirstName = (firstName: string | null) => {
        const ad = this.state.ad;
        ad.firstName = firstName;

        this.setState({ ad });
    }

    changeLastName = (lastName: string | null) => {
        const ad = this.state.ad;
        ad.lastName = lastName;

        this.setState({ ad });
    }

    changeMiddleName = (middleName: string | null) => {
        const ad = this.state.ad;
        ad.middleName = middleName;

        this.setState({ ad });
    }

    changeImage = (base64File: string | null) => {
        let ad = this.state.ad;
        ad.image = base64File;

        this.setState({ ad });
    }

    changePhoneNumber = (phone: string) => {
        const ad = this.state.ad;
        ad.phoneNumber = phone;

        this.setState({ ad });
    }

    saveAd = async () => {
        const { ad } = this.state;

        await BlockUi.blockAsync(async () => {
            ad.type = AdType.Offered;

            const result = await SiteProvider.Ads.saveOffered(ad);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            addSuccessNotification("Ваше объявление отправлено! Его проверит администратор и добавит в раздел «Объявления».");
            this.props.onClose();
        });
    }

    render() {
        const { onClose } = this.props;
        const { ad } = this.state;

        return <>
            <CustomModal
                headerText="Добавление объявления"
                size={500}
                buttons={[
                    new ModalButton("Сохранить", "primary", this.saveAd)
                ]}
                onClose={onClose}
            >
                <TextBox
                    required
                    value={ad.title ?? ''}
                    label='Название объявления'
                    onChange={this.changeTitle}
                />

                <TextBox
                    required
                    multiline
                    value={ad.description ?? ''}
                    label='Описание объявления'
                    onChange={this.changeDescription}
                />

                <TextBox
                    required
                    value={ad.firstName ?? ''}
                    label='Имя отправителя'
                    onChange={this.changeFirstName}
                />

                <TextBox
                    required
                    value={ad.lastName ?? ''}
                    label='Фамилия отправителя'
                    onChange={this.changeLastName}
                />

                <TextBox
                    value={ad.middleName ?? ''}
                    label='Отчество отправителя'
                    onChange={this.changeMiddleName}
                />

                <MaskedTextBox
                    required
                    value={ad.phoneNumber ?? ''}
                    mask='+7 (999) 999-99-99'
                    label='Телефон отправителя'
                    onChange={this.changePhoneNumber}
                />

                <FileInput
                    hidden
                    id={id()}
                    accept="image/jpeg,image/png,image/jpg"
                    file={ad.image}
                    onChange={this.changeImage}
                />
            </CustomModal>
        </>
    }
}
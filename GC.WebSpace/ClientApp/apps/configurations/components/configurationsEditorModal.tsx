import React, { Component } from "react";
import { ConfigurationItemBlank } from "../../../domain/configurations/configurationItemBlank";
import { ConfigurationsProvider } from "../../../domain/configurations/configurationsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";
import { addSuccessNotification } from "../../../tools/notifications";

interface IProps {
    defaultConfiguration: ConfigurationItemBlank;
    onClose: (reload: boolean) => void
}

interface IState {
    editingConfig: ConfigurationItemBlank
}

export class ConfigurationEditorModal extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingConfig: this.props.defaultConfiguration
        }
    }

    changeKey = (key: string) => {
        const { editingConfig } = this.state;
        editingConfig.key = key.replace(' ', '');
        this.setState({ editingConfig });
    }

    changeValue = (value: string) => {
        const { editingConfig } = this.state;
        editingConfig.value = value;
        this.setState({ editingConfig });
    }

    saveConfiguration = () => {
        BlockUi.blockAsync(async () => {
            const result = await ConfigurationsProvider.saveConfiguration(this.state.editingConfig);
            if (!result.isSuccess) {
                ModalErrorStorage.setError(result.errors[0].message);
                return;
            }

            addSuccessNotification("Конфигурация успешно сохранена", "Работа с конфигурациями");
            ModalErrorStorage.setNullError();
            this.props.onClose(true);
        });
    }

    render() {
        const { editingConfig } = this.state;
        const { onClose } = this.props;

        return <>
            <CustomModal
                headerText="Редактор конфигурации приложения"
                size={400}
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton('Сохранить', 'primary', this.saveConfiguration)
                ]}
            >

                <TextBox
                    required
                    value={editingConfig.key}
                    onChange={this.changeKey}
                    label='Ключ конфигурации'
                />

                <TextBox
                    required
                    value={editingConfig.value}
                    onChange={this.changeValue}
                    label='Значение конфигурации'
                />
            </CustomModal>
        </>
    }
}

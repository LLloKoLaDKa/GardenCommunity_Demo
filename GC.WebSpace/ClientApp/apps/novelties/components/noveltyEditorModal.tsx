import React from "react";
import { NoveltyBlank } from "../../../domain/records/novelties/noveltyBlank";
import { RecordsProvider } from "../../../domain/records/recordsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { FileInput } from "../../../shared/inputs/fileInput/fileInput";
import { MyConfirm } from "../../../shared/myConfirm/myConfirm";
import { TextBox } from "../../../shared/myinputs/textBox/textBox";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";
import { id } from "../../../tools/id/id";
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";

interface IProps {
    editingNovelty: NoveltyBlank,
    onClose: (isEdited: boolean) => void
}

interface IState {
    editingNovelty: NoveltyBlank,
    deletableNovelty: NoveltyBlank | null
}

export class NoveltyEditorModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editingNovelty: props.editingNovelty,
            deletableNovelty: null
        }
    }

    changeTitle = (title: string | null) => {
        const editingNovelty = this.state.editingNovelty;
        editingNovelty.title = title;

        this.setState({ editingNovelty });
    }

    changeImage = (base64File: string | null) => {
        let editingNovelty = this.state.editingNovelty;
        editingNovelty.image = base64File;

        this.setState({ editingNovelty });
    }

    changeDescription = (description: string | null) => {
        const editingNovelty = this.state.editingNovelty;
        editingNovelty.description = description;

        this.setState({ editingNovelty });
    }

    markToDeleteNovelty = () => {
        ModalErrorStorage.setError('deleting', false);
        this.setState({ deletableNovelty: this.state.editingNovelty });
    }
    unmarkToDeleteNovelty = () => {
        ModalErrorStorage.setNullError();
        this.setState({ deletableNovelty: null });
    }

    save = async () => {
        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.Novelties.save(this.state.editingNovelty);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.errors[0].message);

            addSuccessNotification("Объявление сохранёно");
            ModalErrorStorage.setNullError();
            this.props.onClose(true);
        });
    }

    publishNovelty = async () => {
        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.Novelties.publish(this.state.editingNovelty);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.getErrorsString());

            await this.props.onClose(true);
            addSuccessNotification("Новость опубликована!");
        });
    }

    remove = async () => {
        const { deletableNovelty } = this.state;
        if (deletableNovelty == null) return;

        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.Novelties.remove(deletableNovelty.id!);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            await this.props.onClose(true);
            addSuccessNotification("Новость удалена!");
        });
    }

    render() {
        const { editingNovelty, deletableNovelty } = this.state;
        const { onClose } = this.props;

        return <>
            <CustomModal
                size={500}
                headerText={editingNovelty.id == null ? "Создание обьявления" : "Редактирование обьявления"}
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton('Удалить', 'error', this.remove, editingNovelty.id == null),
                    new ModalButton('Сохранить', 'primary', this.save, editingNovelty.publishDate != null),
                    new ModalButton('Опубликовать', 'primary', this.publishNovelty),
                ]}
            >
                <TextBox
                    required
                    value={editingNovelty.title ?? ''}
                    label='Название новости'
                    onChange={this.changeTitle}
                />

                <TextBox
                    required
                    multiline
                    value={editingNovelty.description ?? ''}
                    label='Описание новости'
                    onChange={this.changeDescription}
                />

                <FileInput
                    hidden
                    id={id()}
                    accept="image/jpeg,image/png,image/jpg"
                    file={editingNovelty.image}
                    onChange={this.changeImage}
                />
            </CustomModal>

            {
                deletableNovelty != null &&
                <MyConfirm
                    title={`Вы уверены, что хотите удалить новость ${deletableNovelty.title}?`}
                    onAccept={this.remove}
                    onClose={this.unmarkToDeleteNovelty}
                />
            }
        </>
    }
}
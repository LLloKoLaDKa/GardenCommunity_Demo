import React from "react";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { PhotoBlank } from "../../../domain/gardens/photos/photoBlank";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { FileInput } from "../../../shared/inputs/fileInput/fileInput";
import { CustomModal } from "../../../shared/mymodal/customModal";
import { ModalButton } from "../../../shared/mymodal/modalButton";
import { ModalErrorStorage } from "../../../shared/mymodal/modalErrorStorages/modalErrorStorage";
import { id } from "../../../tools/id/id";
import { addSuccessNotification } from "../../../tools/notifications";

interface IProps {
    photo: PhotoBlank;
    onClose: (isAdded: boolean) => void
}

interface IState {
    photo: PhotoBlank
}

export class AddPhotoModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            photo: props.photo
        }
    }

    changeImage = (newImage: string | null) => {
        const { photo } = this.state;
        photo.image = newImage

        this.setState({ photo });
    }

    save = async () => {
        const { photo } = this.state;
        await BlockUi.blockAsync(async () => {
            const result = await GardensProvider.Photos.savePhoto(photo);
            if (!result.isSuccess) return ModalErrorStorage.setError(result.getErrorsString());

            this.props.onClose(true);
            ModalErrorStorage.setNullError();
            addSuccessNotification("Фотография успешно сохранена");
        });
    }

    render() {
        const { onClose } = this.props;
        const { photo } = this.state;

        return <>
            <CustomModal
                size={500}
                headerText='Добавление фотографии'
                onClose={() => onClose(false)}
                buttons={[
                    new ModalButton("Сохранить", "primary", this.save)
                ]}
            >
                <FileInput
                    id={id()}
                    file={photo.image}
                    onChange={this.changeImage}
                />
            </CustomModal>
        </>
    }
}
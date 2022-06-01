import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from "react";
import { SimpleImg } from 'react-simple-img';
import { GardensProvider } from '../../../domain/gardens/gardensProvider';
import { Photo } from '../../../domain/gardens/photos/photo';
import { PhotoBlank } from '../../../domain/gardens/photos/photoBlank';
import { BlockUi } from '../../../shared/blockUi/blockUi';
import { MyConfirm } from '../../../shared/myConfirm/myConfirm';
import { id } from '../../../tools/id/id';
import { addErrorNotification, addSuccessNotification } from '../../../tools/notifications';
import { Header } from "../../root/header";
import styles from "../content/photos.module.scss";
import { AddPhotoModal } from './addPhotoModal';

interface IProps { }

interface IState {
    photos: Photo[],
    addablePhoto: PhotoBlank | null,
    deletablePhoto: Photo | null
}

export class Photos extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            photos: [],
            addablePhoto: null,
            deletablePhoto: null
        }
    }

    componentDidMount = async () => {
        await this.loadPhotos();
    }

    loadPhotos = async () => {
        await BlockUi.blockAsync(async () => {
            const photos = await GardensProvider.Photos.getAllPhotos();
            this.setState({ photos });
        });
    }

    markToAddPhoto = () => this.setState({ addablePhoto: PhotoBlank.empty() });
    unmarkToAddPhoto = (isAdded: boolean) => {
        if (isAdded) this.loadPhotos();
        this.setState({ addablePhoto: null });
    }

    markToDeletePhoto = (deletablePhoto: Photo) => this.setState({ deletablePhoto });
    unmarkToDeletePhoto = () => this.setState({ deletablePhoto: null });

    deletePhoto = async () => {
        const { deletablePhoto } = this.state;
        if (deletablePhoto == null) return;

        await BlockUi.blockAsync(async () => {
            const result = await GardensProvider.Photos.delete(deletablePhoto);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            await this.loadPhotos();
            addSuccessNotification("Фотография успешно удалена");
        });
    }

    renderPhoto = (photo: Photo) => {
        return <React.Fragment key={id()}>
            <div className={styles.photo}>
                <SimpleImg src={`${window.location.origin}/${photo.path}`} animationDuration={1} placeholder="gray" style={{
                    objectFit: 'cover',
                    height: '200px',
                    width: 'calc(100% - 10px)',
                    margin: '5px',
                    borderRadius: '10px'
                }} />
                <div className={styles.control} onClick={() => this.markToDeletePhoto(photo)}>
                    <i className="fa fa-trash"></i>
                </div>
            </div>
        </React.Fragment>
    }

    render() {
        const { addablePhoto, deletablePhoto, photos } = this.state;

        return <>
            <Header
                headerTitle="Фотографии"
                buttonContent='Добавить'
                buttonIcon={<AddCircleIcon />}
                buttonOnClick={this.markToAddPhoto}
            />

            <div className={styles.container}>
                {
                    photos.length == 0
                        ?
                        <div className={styles.noData}>
                            Нет фотографий
                        </div>
                        :
                        photos.map(this.renderPhoto)
                }
            </div>

            {
                addablePhoto != null &&
                <AddPhotoModal
                    photo={addablePhoto}
                    onClose={this.unmarkToAddPhoto}
                />
            }

            {
                deletablePhoto != null &&
                <MyConfirm
                    title={`Вы уверены, что хотите удалить фотографию? После удаления вернуть её будет невозможно!`}
                    onAccept={this.deletePhoto}
                    onClose={this.unmarkToDeletePhoto}
                />
            }
        </>
    }
}
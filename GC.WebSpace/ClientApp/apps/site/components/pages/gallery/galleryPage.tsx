import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import ImageViewer from "react-simple-image-viewer";
import { SimpleImg } from 'react-simple-img';
import { Photo } from "../../../../../domain/gardens/photos/photo";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { id } from "../../../../../tools/id/id";
import styles from "./galleryPage.module.scss";

interface IProps { }

interface IState {
    photos: Photo[],
    viewableImageIndex: number | null
}

export class GalleryPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            photos: [],
            viewableImageIndex: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.Gallery));

        const photos = await SiteProvider.Gallery.getAll();
        this.setState({ photos });
    }

    markToViewPhoto = (viewableImageIndex: number) => this.setState({ viewableImageIndex })
    unmarkToViewPhoto = () => this.setState({ viewableImageIndex: null });

    renderPhoto = (photo: Photo, index: number) => {
        return <React.Fragment key={id()}>
            <div className={styles.photo} onClick={() => this.markToViewPhoto(index)}>
                <SimpleImg src={photo.path} animationDuration={1} placeholder="gray" style={{
                    objectFit: 'cover',
                    height: '200px',
                    width: 'calc(100% - 10px)',
                    margin: '5px'
                }} />
            </div>
        </React.Fragment>
    }

    render() {
        const { photos, viewableImageIndex } = this.state;

        return <>
            <Helmet>
                <title>Галерея — СНТ «Полесье»</title>
                <meta name="description" content={"Галерея с фотографиями владений СНТ – просмотр всех фотографий"} />
            </Helmet>

            <div className={styles.container}>
                {
                    photos.length == 0
                        ?
                        <>
                            <Skeleton variant='rectangular' className={styles.fakePhoto} height='170px' />
                            <Skeleton variant='rectangular' className={styles.fakePhoto} height='170px' />
                            <Skeleton variant='rectangular' className={styles.fakePhoto} height='170px' />
                            <Skeleton variant='rectangular' className={styles.fakePhoto} height='170px' />
                        </>
                        :
                        photos.map(this.renderPhoto)
                }
            </div>

            {
                viewableImageIndex != null &&
                <ImageViewer
                    src={photos.map(p => p.path)}
                    currentIndex={viewableImageIndex ?? undefined}
                    onClose={this.unmarkToViewPhoto}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            }
        </>
    }
}
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import { Ad } from "../../../../../domain/records/ads/ad";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { id } from "../../../../../tools/id/id";
import { imageOrDefault } from "../../../../../tools/imageOrDefault";
import styles from './adPage.module.scss';

interface IProps {
    adId: string,
}

interface IState {
    ad: Ad | null
}

export class AdPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            ad: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.CurrentAd));

        const ad = await SiteProvider.Ads.getById(this.props.adId);
        this.setState({ ad });
    }

    render() {
        const { ad } = this.state;
        if (ad == null) return <>
            <div className={styles.ad} key={id()}>
                <div className={styles.fakeImage}>
                    <Skeleton variant="rectangular" height='270px' width='100%' />
                </div>
                <div className={styles.body}>
                    <Skeleton variant="text" width="50%" height="30px" />
                    <Skeleton variant="rectangular" width="100%" height="100px" />
                    <Skeleton variant="text" width="25%" height="30px" />
                </div>
            </div>
        </>

        return <>
            <Helmet>
                <title>{ad.title.length > 28 ? `${ad.title.slice(0, 25)}...` : ad.title} — СНТ «Полесье»</title>
                <meta name="description" content={ad.description} />
            </Helmet>
            <div className={styles.ad}>
                <img src={imageOrDefault(ad.image)} alt='Изображение объявления' />

                <div className={styles.body}>
                    <div className={styles.title}>{ad.title}</div>
                    <div className={styles.text}>{ad.description}</div>
                    <div className={styles.date}>Опубликовано: {ad.publishDate?.toLocaleDateString()}</div>
                    <div className={styles.back} onClick={() => history.back()}>Назад</div>
                </div>
            </div>
        </>
    }
}
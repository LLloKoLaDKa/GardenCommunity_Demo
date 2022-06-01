import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import { Novelty } from "../../../../../domain/records/novelties/novelty";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { id } from "../../../../../tools/id/id";
import { imageOrDefault } from "../../../../../tools/imageOrDefault";
import styles from "./noveltyPage.module.scss";

interface IProps {
    noveltyId: string
}

interface IState {
    novelty: Novelty | null;
}

export class NoveltyPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            novelty: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.CurrentNovelty));

        const novelty = await SiteProvider.Novelties.getById(this.props.noveltyId);
        this.setState({ novelty });
    }

    render() {
        const { novelty } = this.state;
        if (novelty == null) return <>
            <div className={styles.novelty} key={id()}>
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
                <title>{novelty.title.length > 28 ? `${novelty.title.slice(0, 25)}...` : novelty.title} — СНТ «Полесье»</title>
                <meta name="description" content={novelty.description} />
            </Helmet>

            <div className={styles.novelty}>
                <img src={imageOrDefault(novelty.image)} alt='Изображение новости' />

                <div className={styles.body}>
                    <div className={styles.title}>{novelty.title}</div>
                    <div className={styles.text}>{novelty.description}</div>
                    <div className={styles.date}>Опубликовано: {novelty.publishDate?.toLocaleDateString()}</div>
                    <div className={styles.back} onClick={() => history.back()}>Назад</div>
                </div>
            </div>
        </>
    }
}
import { Pagination, Skeleton } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { Ad } from "../../../../../domain/records/ads/ad";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import history from "../../../../../tools/history";
import { id } from "../../../../../tools/id/id";
import { imageOrDefault } from "../../../../../tools/imageOrDefault";
import { SiteLinks } from "../../../../../tools/links";
import styles from './adsPage.module.scss';

interface IProps {

}

interface IState {
    page: number,
    pageSize: number,
    totalRows: number,
    ads: Ad[]
}

export class AdsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 9,
            totalRows: 0,
            ads: []
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.Ads));
        await this.getAds({});
    }

    getAds = async ({
        page = this.state.page,
        pageSize = this.state.pageSize
    }) => {
        const { totalRows, values: ads } = await SiteProvider.Ads.getPaged(page, pageSize);
        this.setState({ totalRows, ads });
    }

    seeAd = (id: string) => history.push(SiteLinks.adsPage + `/${id}`)

    renderAd = (ad: Ad) => {
        return <React.Fragment key={id()}>
            <div className={styles.ad} onClick={() => this.seeAd(ad.id)}>
                <img src={imageOrDefault(ad.image)} alt='Изображение отсутствует' />
                <div className={styles.ad_title}>{ad.title}</div>
                <div className={styles.ad_text}>{ad.shortDescription}</div>
                <div className={styles.ad_date}>{ad.publishDate!.toLocaleDateString()}</div>
            </div>
        </React.Fragment>
    }

    render() {
        const { page, pageSize, totalRows, ads } = this.state;
        const pagination = <>
            <div className={styles.pagination}>
                <Pagination
                    page={page}
                    onChange={(e, page) => this.getAds({ page })}
                    count={Math.ceil(totalRows / pageSize)}
                    color={'primary'}
                />
            </div>
        </>

        return <>
            <Helmet>
                <title>Объявления — СНТ «Полесье»</title>
                <meta name="description" content="Объявления СНТ «Полесье, которые могут быть выложены не только правлением, но и пользователями сайта.»" />
            </Helmet>
            {pagination}
            <div className={styles.news}>
                {
                    ads.length == 0
                        ?
                        [1, 2, 3].map(item =>
                            <div className={styles.ad} key={id()}>
                                <Skeleton variant="rectangular" height='150px' width='100%' />
                                <Skeleton variant="text" width="50%" height="30px" />
                                <Skeleton variant="rectangular" width="100%" height="50px" />
                                <Skeleton variant="text" width="25%" height="30px" />
                            </div>
                        )
                        :
                        ads.map(this.renderAd)}
            </div>
            {pagination}
        </>
    }
}
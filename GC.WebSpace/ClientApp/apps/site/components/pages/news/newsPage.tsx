import { Pagination, Skeleton } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { Novelty } from "../../../../../domain/records/novelties/novelty";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { id } from "../../../../../tools/id/id";
import styles from './newsPage.module.scss';

interface IProps {
    renderNovelty: (novelty: Novelty) => JSX.Element
}

interface IState {
    page: number,
    pageSize: number,
    totalRows: number,
    novelties: Novelty[]
}

export class NewsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 9,
            totalRows: 0,
            novelties: []
        }
    }

    componentDidMount = async () => {
        await this.getNews({});
    }

    getNews = async ({
        page = this.state.page,
        pageSize = this.state.pageSize
    }) => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.News));

        const { totalRows, values: novelties } = await SiteProvider.Novelties.getPaged(page, pageSize);
        this.setState({ novelties, page, pageSize, totalRows });
    }

    render() {
        const { renderNovelty } = this.props;
        const { novelties, page, totalRows, pageSize } = this.state;
        const pagination = <>
            <div className={styles.pagination}>
                <Pagination
                    page={page}
                    onChange={(e, page) => this.getNews({ page })}
                    count={Math.ceil(totalRows / pageSize)}
                    color={'primary'}
                />
            </div>
        </>

        return <>
            <Helmet>
                <title>Новости — СНТ «Полесье»</title>
                <meta name="description" content={`Свежие новости СНТ «Полесье» на сегодня (${new Date().toLocaleDateString('ru-RU')})`} />
            </Helmet>

            {pagination}
            <div className={styles.news}>
                {
                    novelties.length == 0
                        ?
                        [1, 2, 3].map(item =>
                            <div className={styles.fake_novelty} key={id()}>
                                <Skeleton variant="rectangular" height='150px' width='100%' />
                                <Skeleton variant="text" width="50%" height="30px" />
                                <Skeleton variant="rectangular" width="100%" height="50px" />
                                <Skeleton variant="text" width="25%" height="30px" />
                            </div>
                        )
                        :
                        novelties.map(renderNovelty)
                }
            </div>
            {pagination}
        </>
    }
}
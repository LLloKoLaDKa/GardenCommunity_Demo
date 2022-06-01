import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import { SectorCredit } from "../../../../../domain/gardens/sectorCredits/sectorCredit";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { id } from "../../../../../tools/id/id";
import styles from "./creditsPage.module.scss";

interface IProps {

}

interface IState {
    credits: SectorCredit[],
    lastDate: Date | null
}

export class CreditsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            credits: [],
            lastDate: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.SectorCredits));

        const credits = await SiteProvider.Credits.getNonZero()
        const lastDate = await SiteProvider.Credits.getLastModifiedDateTime();

        this.setState({ credits, lastDate });
    }

    renderFakeRow = () => {
        return <tr key={id()}>
            <td><Skeleton variant='text' height='25px' width='50px' style={{ margin: '0 auto' }} /></td>
            <td><Skeleton variant='text' height='25px' width='150px' style={{ margin: '0 auto' }} /></td>
            <td><Skeleton variant='text' height='25px' width='80px' style={{ margin: '0 auto' }} /></td>
        </tr>
    }

    render() {
        const { credits, lastDate } = this.state;

        return <>
            <Helmet>
                <title>Задолженности — СНТ «Полесье»</title>
                <meta name="description" content={`Задолженность садоводов на ${lastDate ?? new Date().toLocaleDateString('ru-RU')}`} />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.info}>
                    Последняя корректировка задолжностей садоводов была произведена:
                    <div className={styles.date}>
                        {lastDate?.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" }) ??
                            <Skeleton variant='text' height='38px' width='200px' style={{ margin: '0 auto' }} />
                        }
                    </div>
                </div>

                <div className={'overflow-auto'}>
                    <table>
                        <thead>
                            <tr>
                                <th>Участок</th>
                                <th>Владелец</th>
                                <th>Задолженность</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                credits.length == 0
                                    ?
                                    <>
                                        {this.renderFakeRow()}
                                        {this.renderFakeRow()}
                                        {this.renderFakeRow()}
                                    </>
                                    :
                                    credits.sort(c => c.credit).map(c =>
                                        <tr key={c.id}>
                                            <td>{c.sector.sectorNumber}</td>
                                            <td>{c.gardener.initials()}</td>
                                            <td>{c.credit ?? "Не найдено"} руб.</td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    }
}
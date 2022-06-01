import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import { Ad } from "../../../../../domain/records/ads/ad";
import { AdBlank } from "../../../../../domain/records/ads/adBlank";
import { Novelty } from "../../../../../domain/records/novelties/novelty";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { MyMainButton } from "../../../../../shared/myButton/myMainButton";
import history from '../../../../../tools/history';
import { id } from "../../../../../tools/id/id";
import { imageOrDefault } from "../../../../../tools/imageOrDefault";
import { SiteLinks } from "../../../../../tools/links";
import { AddAdModal } from "./addAdModal";
import styles from "./homePage.module.scss";

interface IProps {
    renderNovelty: (novelty: Novelty) => JSX.Element;
}

interface IState {
    news: Novelty[]
    lastAd: Ad | null,
    addedAd: AdBlank | null
}

export class HomePage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            news: [],
            lastAd: null,
            addedAd: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.Home));

        const news = await SiteProvider.Novelties.getThreeLastNovelties();
        const lastAd = await SiteProvider.Ads.getLast();

        this.setState({ news, lastAd });
    }

    markAdToAdd = () => this.setState({ addedAd: AdBlank.empty() });
    unmarkAdToAdd = () => this.setState({ addedAd: null });

    renderSection = (name: string, content: JSX.Element) => {
        return <>
            <div className={styles.section}>
                <div className={styles.section_name}>{name}</div>
                {content}
            </div>
        </>
    }

    render() {
        const { renderNovelty } = this.props;
        const { news, lastAd, addedAd } = this.state;

        return <>
            <Helmet>
                <title>СНТ «Полесье»</title>
                <meta name="description" content={"СНТ «Полесье» находится в Московской области, вблизи деревни Липитино, которая располагается в Озёрском районе. Чтобы увидеть схему расположения участков перейдите в раздел Информация."} />
            </Helmet>

            {
                this.renderSection("Что нового?", <>
                    <div className={styles.news}>

                        {
                            news.length == 0
                                ?
                                <>
                                    {
                                        [1, 2, 3].map(item =>
                                            <div className={styles.fake_novelty} key={id()}>
                                                <Skeleton variant="rectangular" height='150px' width='100%' />
                                                <Skeleton variant="text" width="50%" height="30px" />
                                                <Skeleton variant="rectangular" width="100%" height="50px" />
                                                <Skeleton variant="text" width="25%" height="30px" />
                                            </div>
                                        )
                                    }
                                </>
                                :
                                news.map(renderNovelty)
                        }
                    </div>

                    <div className={styles.showAll} onClick={() => history.push(SiteLinks.newsPage)}>
                        Смотреть все новости...
                    </div>
                </>)
            }

            {
                this.renderSection("Где мы находимся?", <>
                    <div className={styles.section_text}>
                        СНТ «Полесье» находится в Московской области, вблизи деревни Липитино, которая располагается в Озёрском районе. Чтобы увидеть схему расположения участков перейдите в раздел Информация.
                    </div>

                    <div className={styles.map}>
                        <a href="https://yandex.ru/maps?utm_medium=mapframe&utm_source=maps" className={styles.link}>Яндекс Карты</a>
                        <a href="https://yandex.ru/maps/?l=sat&ll=38.550896%2C54.984039&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=38.551368%2C54.986797&whatshere%5Bzoom%5D=16&z=16" className={styles.link2}>СНТ Полесье — Яндекс Карты</a>
                        <iframe src="https://yandex.ru/map-widget/v1/-/CCUFq0g69A" frameBorder={1} allowFullScreen={true} className={styles.frame} loading="lazy"></iframe>
                    </div>

                </>)
            }

            {
                this.renderSection("Есть что предложить?", <>
                    <div className={styles.ads_box}>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                Объявления
                            </div>

                            <div className={styles.description}>
                                На нашем сайте любой желающий может предложить своё объявление, которое будет проверено админитратором сайта
                                по следующим критериям:
                                <ul>
                                    <li>
                                        ваше объявление не несёт оскорбительный характер, по отношению к участникам садоводства;
                                    </li>
                                    <li>
                                        ваше объявление имеет конкретную цель (продажа удобрений, услуг и т.д.);
                                    </li>
                                    <li>
                                        в случае, когда ваше объявление имеет изображение, оно должно быть хорошего качества - не быть размытым,
                                        иметь правильные пропорции (не нарушенные соотношения сторон).
                                    </li>
                                </ul>

                                Если вы садовод и хотите подать объявление на продажу участка, то вам стоит обратиться к председателю.
                            </div>

                            <MyMainButton text="Подать объявление" fullWidth onClick={this.markAdToAdd} />
                        </div>
                        <div className={styles.ads}>
                            {
                                lastAd == null
                                    ?
                                    <Skeleton variant='rectangular' width='80%' height='300px' />
                                    :
                                    <div className={styles.ad} onClick={() => history.push(`${SiteLinks.adsPage}/${lastAd.id}`)}>
                                        <div className={styles.title}>Последнее объявление</div>

                                        <div className={styles.image}>
                                            <img src={imageOrDefault(lastAd.image)} alt="Изображение обьявления" />
                                        </div>

                                        <div className={styles.description}>
                                            {lastAd.shortDescription}
                                        </div>
                                    </div>
                            }

                            <div className={styles.showAll} onClick={() => history.push(SiteLinks.adsPage)}>
                                Смотреть все объявления...
                            </div>
                        </div>
                    </div>
                </>)
            }
            {
                addedAd != null &&
                <AddAdModal
                    ad={addedAd}
                    onClose={this.unmarkAdToAdd}
                />
            }
        </>
    }
}
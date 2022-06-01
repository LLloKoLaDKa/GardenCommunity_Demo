import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SimpleImg } from 'react-simple-img';
import Banner from "../../../../wwwroot/img/main_banner.png";
import { Novelty } from "../../../domain/records/novelties/novelty";
import history from '../../../tools/history';
import { id } from "../../../tools/id/id";
import { imageOrDefault } from "../../../tools/imageOrDefault";
import { SiteLinks } from "../../../tools/links";
import { Never } from "../../../tools/never";
import styles from '../content/site.module.scss';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { AdPage } from "./pages/ads/adPage";
import { AdsPage } from "./pages/ads/adsPage";
import { ContactsPage } from "./pages/contacts/contactsPage";
import { CreditsPage } from "./pages/credits/creditsPage";
import { GalleryPage } from "./pages/gallery/galleryPage";
import { HomePage } from "./pages/home/homePage";
import { InformationPage } from "./pages/information/information";
import { NewsPage } from "./pages/news/newsPage";
import { NoveltyPage } from "./pages/news/noveltyPage";
import { SectorSales as SectorSalesPage } from "./pages/sectorSales/sectorSales";

export enum SitePage {
    Home = 1,
    News = 2,
    NoveltyPage = 3,
    Ads = 4,
    AdPage = 5,
    Contacts = 6,
    SectorSales = 7,
    Information = 8,
    Gallery = 9,
    Credits = 10,
}

interface IProps {
    page: SitePage,
    windowProps?: RouteComponentProps<{ [x: string]: string | undefined; }>
}

export class Site extends React.Component<IProps> {

    renderPage = () => {
        const { page, windowProps } = this.props;
        switch (page) {
            case SitePage.Home: return <HomePage renderNovelty={this.renderNovelty} />
            case SitePage.News: return <NewsPage renderNovelty={this.renderNovelty} />
            case SitePage.NoveltyPage: return <NoveltyPage noveltyId={windowProps!.match.params.noveltyId!} />
            case SitePage.Ads: return <AdsPage />
            case SitePage.AdPage: return <AdPage adId={windowProps!.match.params.adId!} />
            case SitePage.Contacts: return <ContactsPage />
            case SitePage.SectorSales: return <SectorSalesPage />
            case SitePage.Information: return <InformationPage />
            case SitePage.Gallery: return <GalleryPage />
            case SitePage.Credits: return <CreditsPage />

            default: throw new Never(page);
        }
    }

    renderPageTitle = () => {
        const { page } = this.props;
        switch (page) {
            case SitePage.Home: return "Садовое некоммерческое товарищество «Полесье»";
            case SitePage.News: return "Новостная лента";
            case SitePage.NoveltyPage: return "Новость";
            case SitePage.Ads: return "Объявления";
            case SitePage.AdPage: return "Объявление";
            case SitePage.Contacts: return "Контактная информация";
            case SitePage.SectorSales: return "Продажа участков";
            case SitePage.Information: return "Информация";
            case SitePage.Gallery: return "Галерея";
            case SitePage.Credits: return "Задолженности";

            default: throw new Never(page);
        }
    }

    renderNovelty = (novelty: Novelty) => {
        return <React.Fragment key={id()}>
            <div className={styles.novelty} onClick={() => this.seeNovelty(novelty.id)}>
                <SimpleImg src={imageOrDefault(novelty.image)} style={{
                    height: '150px',
                    width: '100%',
                    objectFit: 'cover'
                }} />
                <div className={styles.novelty_title}>{novelty.title}</div>
                <div className={styles.novelty_text}>{novelty.shortDescription}</div>
                <div className={styles.novelty_date}>{novelty.publishDate!.toLocaleDateString()}</div>
            </div>
        </React.Fragment>
    }

    seeNovelty = (noveltyId: string) => history.push(SiteLinks.newsPage + `/${noveltyId}`);

    render() {
        return <>
            <div className={styles.container}>
                <Header />
                <div className={styles.banner}>
                    <div className={`${styles.title} ${this.props.page == SitePage.Home ? styles.mainPage : ''}`}>
                        {this.renderPageTitle()}
                    </div>

                    <img src={Banner} alt="" className={styles.image} />
                </div>

                <div className={styles.content}>


                    {this.renderPage()}
                </div>

                <Footer />
            </div>
        </>
    }
}
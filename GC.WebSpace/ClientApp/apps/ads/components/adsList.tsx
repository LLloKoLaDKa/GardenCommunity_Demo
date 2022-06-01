import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from "react";
import { Ad } from "../../../domain/records/ads/ad";
import { AdBlank } from "../../../domain/records/ads/adBlank";
import { AdType } from "../../../domain/records/ads/adType";
import { RecordsProvider } from "../../../domain/records/recordsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyConfirm } from "../../../shared/myConfirm/myConfirm";
import NewSelectBox from '../../../shared/myinputs/selectBox/newSelectBox';
import { Option } from '../../../shared/myinputs/selectBox/option';
import { TextBox } from '../../../shared/myinputs/textBox/textBox';
import { Pagination } from "../../../shared/pagination/pagination";
import { TabPane } from "../../../shared/tabs/tabPane";
import { Tabs } from "../../../shared/tabs/tabs";
import { enumToOptions } from '../../../tools/enum';
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import styles from "../content/adsList.module.scss";
import { AdEditorModal } from "./adEditorModal";
import { AdViewModal } from "./adViewModal";

interface IProps { }

interface IState {
    ads: Ad[],
    page: number,
    pageSize: number,
    totalRows: number,
    offeredCount: number,

    adTypeOptions: Option<AdType>[],
    selectedAdType: Option<AdType> | null,

    editingAd: AdBlank | null,
    watchedAd: Ad | null,
    removedAd: Ad | null,
    archivedAd: Ad | null
}

let timer: NodeJS.Timeout;
let offeredCountTimeout: NodeJS.Timeout;

export class AdsList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            ads: [],
            page: 1,
            pageSize: 10,
            totalRows: 0,
            offeredCount: 0,

            adTypeOptions: enumToOptions(AdType, AdType.getDisplayName),
            selectedAdType: null,

            editingAd: null,
            watchedAd: null,
            removedAd: null,
            archivedAd: null
        }
    }

    componentDidMount = () => {
        this.loadAds({});

        offeredCountTimeout = setTimeout(this.loadOfferedAdsCount, 10_000);
    }

    componentWillUnmount = () => window.clearInterval(offeredCountTimeout);

    loadAds = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        selectedAdType = this.state.selectedAdType,
        search = '',
        withBlockUi = true
    }) => {
        const operation = async () => {
            const { values: ads, totalRows } = await RecordsProvider.ads.getPaged(page, pageSize, selectedAdType?.value ?? null, search);
            this.setState({ totalRows, ads, selectedAdType: selectedAdType });
        }

        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
        this.loadOfferedAdsCount();
    }

    loadOfferedAds = async () => {
        await BlockUi.blockAsync(async () => {
            const ads = await RecordsProvider.ads.getOffereds();
            this.setState({ ads, offeredCount: ads.length });
        });
    }

    loadOfferedAdsCount = async () => {
        const offeredCount = await RecordsProvider.ads.getOfferedsCount();
        this.setState({ offeredCount });
    }

    loadArchiveAds = async () => {
        await BlockUi.blockAsync(async () => {
            const ads = await RecordsProvider.ads.getArchives();
            this.setState({ ads });
        });
    }

    markToAddAd = () => this.setState({ editingAd: AdBlank.empty() });
    markToEditAd = (ad: Ad) => this.setState({ editingAd: AdBlank.create(ad) });
    unmarkToEditAd = async () => this.setState({ editingAd: null });

    beforeEdit = async () => {
        const { editingAd } = this.state;

        if (editingAd?.type == AdType.SelfWritten && editingAd.publishDate == null) await this.loadArchiveAds();
        if (editingAd?.type == AdType.SelfWritten && editingAd.publishDate != null) await this.loadAds({});
        if (editingAd?.type == AdType.Offered) await this.loadOfferedAds();
    }

    markToRemoveAd = (deletedAd: Ad) => this.setState({ removedAd: deletedAd });
    unmarkToRemoveAd = () => this.setState({ removedAd: null });

    markToTakeOffAd = (archivedAd: Ad) => this.setState({ archivedAd });
    unmarkToTakeOffAd = () => this.setState({ archivedAd: null });

    markToWatchAd = (watchedAd: Ad) => this.setState({ watchedAd })
    unmarkToWatchAd = () => this.setState({ watchedAd: null })

    changePageSize = (pageSize: number) => this.loadAds({ pageSize, page: 1 });
    changePage = (page: number) => this.loadAds({ page });

    changeAdType = async (selectedAdType: Option<AdType> | null) => await this.loadAds({ selectedAdType, withBlockUi: false });

    changeSearch = async (inputValue: string) => {
        window.clearTimeout(timer);
        timer = setTimeout(async () => {
            await this.loadAds({ page: 1, withBlockUi: false, search: inputValue });
        }, 1000);
    }

    changeTab = async (selectedTab: number): Promise<void> => {
        switch (selectedTab) {
            case 0: await this.loadAds({}); return Promise.resolve();
            case 1: await this.loadArchiveAds(); return Promise.resolve();
            case 2: await this.loadOfferedAds(); return Promise.resolve();
        }
    }

    removeAd = async (adId: string) => {
        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.ads.remove(adId);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            await this.loadAds({ page: 1 });
            addSuccessNotification("Обьявление удалено!");
        });
    }

    takeOff = async (adId: string) => {
        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.ads.takeOff(adId);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            await this.loadAds({});
            addSuccessNotification('Объявление снято с публикации!');
        });
    }

    render() {
        const {
            ads,
            page,
            pageSize,
            totalRows,
            adTypeOptions,
            offeredCount,
            selectedAdType: selectedAdType,
            editingAd,
            watchedAd,
            removedAd,
            archivedAd
        } = this.state;

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize} />

        return <>
            <Header
                headerTitle="Объявления"
                buttonContent='Добавить'
                buttonIcon={<AddCircleIcon />}
                buttonOnClick={this.markToAddAd}
            />

            <Tabs onChangeTab={this.changeTab}>
                <TabPane label="Справочник">
                    <div className={styles.filters}>
                        <fieldset>
                            <legend>Фильтр</legend>
                            <NewSelectBox
                                label='Тип объявления'
                                value={selectedAdType}
                                options={adTypeOptions}
                                onChange={this.changeAdType}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Поиск</legend>

                            <TextBox
                                label='Название обьявления'
                                onChange={this.changeSearch}
                            />
                        </fieldset>
                    </div>

                    {pages}

                    <div className={'overflow-auto'}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата публикации</th>
                                    <th>Податель обьявления</th>
                                    <th>Название</th>
                                    <th>Тип</th>
                                    <th>Управление</th>
                                </tr>
                            </thead>

                            <tbody className="transition">
                                {
                                    ads.length == 0
                                        ?
                                        <tr>
                                            <td colSpan={5}>Нет данных для отображения</td>
                                        </tr>
                                        :
                                        ads.map(a =>
                                            <tr key={a.id}>
                                                <td>{a.publishDate?.toLocaleDateString('ru')}</td>
                                                <td>{a.initials}</td>
                                                <td>{a.title}</td>
                                                <td>{AdType.getDisplayName(a.type)}</td>

                                                <td className="nowrap w-25">
                                                    <i className="fa fa-eye pointer hover mr-2" aria-hidden="true" onClick={() => this.markToWatchAd(a)}></i>
                                                    <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditAd(a)}></i>
                                                    <i className="fa fa-trash pointer hover mr-2" aria-hidden="true" onClick={() => this.markToRemoveAd(a)}></i>
                                                    <i className="fa fa-ban pointer hover" aria-hidden="true" onClick={() => this.markToTakeOffAd(a)}></i>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        editingAd != null &&
                        <AdEditorModal editingAd={editingAd} onClose={this.unmarkToEditAd} beforeClose={this.beforeEdit} />
                    }

                    {
                        watchedAd != null &&
                        <AdViewModal ad={watchedAd} onClose={this.unmarkToWatchAd} />
                    }

                    {
                        removedAd != null &&
                        <MyConfirm
                            title={`Вы уверены, что хотите удалить обьявление «${removedAd.title}»?`}
                            onClose={this.unmarkToRemoveAd}
                            onAccept={() => this.removeAd(removedAd.id!)}
                        />
                    }

                    {
                        archivedAd != null &&
                        <MyConfirm
                            title={`Вы уверены, что хотите снять с публикации обьявление «${archivedAd.title}»?`}
                            onClose={this.unmarkToTakeOffAd}
                            onAccept={() => this.takeOff(archivedAd.id!)}
                        />
                    }
                </TabPane>

                <TabPane label='Архив'>
                    <h4>Объявлений в архиве: {ads.length}</h4>
                    <div className={styles.container}>

                        {
                            ads.length == 0
                                ?
                                'Нет даных для отображения'
                                :
                                ads.map(a =>
                                    <div className={styles.item} onClick={() => this.markToEditAd(a)} key={a.id}>
                                        <h5> {a.title} </h5>
                                        <div>{a.initials}</div>
                                    </div>
                                )
                        }
                    </div>

                    {
                        editingAd != null &&
                        <AdEditorModal
                            isOffered
                            editingAd={editingAd}
                            onClose={this.unmarkToEditAd}
                            beforeClose={this.beforeEdit}
                        />
                    }
                </TabPane>

                <TabPane label={`Предложенные объявления (${offeredCount == null ? 0 : offeredCount})`}
                >
                    <h4 className="m-2">Предложено объявлений: {ads.length}</h4>
                    <div className={styles.container}>

                        {
                            ads.length == 0
                                ?
                                'Нет даных для отображения'
                                :
                                ads.map(a =>
                                    <div className={styles.item} onClick={() => this.markToEditAd(a)} key={a.id}>
                                        <h5> {a.title} </h5>
                                        <div>{a.initials}</div>
                                        <div>{a.phoneNumber}</div>
                                    </div>
                                )
                        }
                    </div>

                    {
                        editingAd != null &&
                        <AdEditorModal
                            isOffered
                            editingAd={editingAd}
                            onClose={this.unmarkToEditAd}
                            beforeClose={this.beforeEdit}
                        />
                    }
                </TabPane>
            </Tabs>

        </>
    }
}
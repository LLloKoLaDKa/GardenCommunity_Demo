import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { Component } from "react";
import { AccessPolicy } from '../../../domain/accesspolicies/accessPolicy';
import { SectorSaleSort } from '../../../domain/gardens/enums/sectorSalesSort';
import { GardenSector } from "../../../domain/gardens/gardenSectors/gardenSector";
import { GardenSectorBlank } from "../../../domain/gardens/gardenSectors/gardenSectorBlank";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { GardenStreet } from '../../../domain/gardens/gardenStreet';
import { SectorSale } from '../../../domain/gardens/sectorSales/sectorSale';
import { SectorSaleBlank } from '../../../domain/gardens/sectorSales/sectorSaleBlank';
import SystemUser from '../../../domain/users/systemUser';
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyConfirm } from '../../../shared/myConfirm/myConfirm';
import NumberBox from '../../../shared/myinputs/numberBox/numberBox';
import NewSelectBox from '../../../shared/myinputs/selectBox/newSelectBox';
import { Option } from '../../../shared/myinputs/selectBox/option';
import { Pagination } from "../../../shared/pagination/pagination";
import { TabPane } from '../../../shared/tabs/tabPane';
import { Tabs } from '../../../shared/tabs/tabs';
import { enumToOptions } from '../../../tools/enum';
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import styles from '../content/sectors.module.scss';
import { SectorEditorModal } from "./sectorEditorModal";
import { SectorSaleEditorModal } from './sectorSaleEditorModal';

interface LoadParameters {
    page?: number,
    pageSize?: number,
    selectedStreet?: Option<GardenStreet> | null,
    sectorNumber?: number | null,
    withBlockUi?: boolean
}

interface LoadSalesParameters {
    page?: number,
    pageSize?: number,
    selectedStreet?: Option<GardenStreet> | null,
    selectedSort?: Option<SectorSaleSort> | null,
    withBlockUi?: boolean
}

interface IProps {

}

interface IState {
    page: number,
    pageSize: number,
    totalRows: number,
    sectors: GardenSector[],
    editingSector: GardenSectorBlank | null,
    deletableSector: GardenSector | null,

    streetOptions: Option<GardenStreet>[],
    selectedStreet: Option<GardenStreet> | null,

    sortOptions: Option<SectorSaleSort>[],
    selectedSort: Option<SectorSaleSort> | null

    sales: SectorSale[],
    editingSale: SectorSaleBlank | null,
    deletableSale: SectorSale | null,

    sectorsAccess: boolean,
    salesAccess: boolean
}

let timer: NodeJS.Timeout;
let currentTab: number;

export class Sectors extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const sectorsAccess = SystemUser.availableAccessPolicies.some(ap => ap == AccessPolicy.GardenSectors_Catalog);
        const salesAccess = SystemUser.availableAccessPolicies.some(ap => ap == AccessPolicy.SectorSales_Catalog);
        if (!sectorsAccess && salesAccess) currentTab = 1;
        else currentTab = 0;

        this.state = {
            page: 1,
            pageSize: 10,
            totalRows: 0,
            sectors: [],
            editingSector: null,
            deletableSector: null,

            streetOptions: enumToOptions(GardenStreet, GardenStreet.getDisplayName),
            selectedStreet: null,

            sortOptions: enumToOptions(SectorSaleSort, SectorSaleSort.getDisplayName),
            selectedSort: null,

            sales: [],
            editingSale: null,
            deletableSale: null,

            sectorsAccess,
            salesAccess
        }
    }

    componentDidMount = async () => {
        await this.loadSectors({});
    }

    loadSectors = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        selectedStreet = null,
        sectorNumber = null,
        withBlockUi = true
    }: LoadParameters) => {
        const operation = async () => {
            sectorNumber = sectorNumber == 0 ? null : sectorNumber;
            const { values: sectors, totalRows } =
                await GardensProvider.GardenSectors.getGardenSectorsPaged(page, pageSize, selectedStreet?.value ?? null, sectorNumber);

            this.setState({ sectors, totalRows, selectedStreet, page, pageSize });
        }

        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
    }

    loadSectorSales = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        selectedStreet = null,
        selectedSort = null,
        withBlockUi = true
    }: LoadSalesParameters) => {
        const operation = async () => {
            const { values: sales, totalRows } =
                await GardensProvider.SectorSales.getSectorSalesPaged(page, pageSize, selectedStreet?.value ?? null, selectedSort?.value ?? null);

            this.setState({ sales, totalRows, selectedStreet, selectedSort, page, pageSize });
        }

        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
    }

    changeStreet = async (selectedStreet: Option<GardenStreet> | null) => {
        console.log(selectedStreet);
        switch (currentTab) {
            case 0: await this.loadSectors({ selectedStreet, withBlockUi: false }); break;
            case 1: await this.loadSectorSales({ selectedStreet, withBlockUi: false }); break;
        }
    }

    changeSort = async (selectedSort: Option<SectorSaleSort> | null) => await this.loadSectorSales({ selectedSort, withBlockUi: false });

    changePageSize = (pageSize: number) => this.loadSectors({ pageSize, page: 1 });
    changePage = (page: number) => this.loadSectors({ page });

    changeSearch = async (inputValue: number | null) => {
        window.clearTimeout(timer);
        timer = setTimeout(async () => {
            await this.loadSectors({ page: 1, withBlockUi: false, sectorNumber: inputValue });
        }, 1000);
    }

    changeTab = async (selectedTab: number): Promise<void> => {
        currentTab = selectedTab;

        switch (selectedTab) {
            case 0: await this.loadSectors({ page: 1 }); return Promise.resolve();
            case 1: await this.loadSectorSales({ page: 1 }); return Promise.resolve();
        }
    }

    markToAddGardenSector = () => this.setState({ editingSector: GardenSectorBlank.empty() });
    markToEditGardener = (sector: GardenSector) => this.setState({ editingSector: GardenSectorBlank.create(sector) });
    unmarkToEditGardener = async (isEdited: boolean) => {
        if (isEdited) this.loadSectors({});

        this.setState({ editingSector: null });
    }

    markToAddSectorSale = () => this.setState({ editingSale: SectorSaleBlank.empty() });
    markToEditSectorSale = (sale: SectorSale) => this.setState({ editingSale: SectorSaleBlank.create(sale) });
    unmarkToEditSectorSale = (isEdited: boolean) => {
        if (isEdited) this.loadSectorSales({});

        this.setState({ editingSale: null });
    }

    markToDeleteGardenSector = (deletableSector: GardenSector) => this.setState({ deletableSector });
    unmarkToDeleteGardenerSector = () => this.setState({ deletableSector: null });

    markToDeleteSectorSale = (deletableSale: SectorSale) => this.setState({ deletableSale });
    unmarkToDeleteSectorSale = () => this.setState({ deletableSale: null });

    removeGarden = async () => {
        const { deletableSector } = this.state;
        if (deletableSector == null) return;

        BlockUi.blockAsync(async () => {
            const result = await GardensProvider.GardenSectors.removeGardenSector(deletableSector.id);
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            await this.loadSectors({ page: 1 });
            addSuccessNotification("Участок успешно удалён!", "Удаление");
        });
    }

    removeSale = async () => {
        const { deletableSale } = this.state;
        if (deletableSale == null) return;

        BlockUi.blockAsync(async () => {
            const result = await GardensProvider.SectorSales.removeSale(deletableSale.id);
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            await this.loadSectorSales({ page: 1 });
            addSuccessNotification("Продажа участка успешно удалена!", "Удаление");
        });
    }

    render() {
        const { sectors, page, pageSize, editingSale, deletableSale,
            editingSector, totalRows, deletableSector, selectedStreet: selectedStreetId,
            streetOptions, sales, sortOptions, selectedSort, sectorsAccess, salesAccess } = this.state;

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize} />;

        return <>
            <Header
                headerTitle='Участки'
                buttonContent='Добавить'
                buttonIcon={<AddCircleIcon />}
                buttonOnClick={currentTab == 0 ? this.markToAddGardenSector : this.markToAddSectorSale}
            />
            <Tabs onChangeTab={this.changeTab}>
                <TabPane label='Справочник' disabled={!sectorsAccess}>
                    <div className={styles.filters}>
                        <fieldset>
                            <legend>Фильтр</legend>
                            <NewSelectBox
                                label='Улица участков'
                                value={selectedStreetId}
                                options={streetOptions}
                                onChange={this.changeStreet}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Поиск</legend>

                            <NumberBox
                                label='Номер участка'
                                onChange={this.changeSearch}

                            />
                        </fieldset>
                    </div>

                    {pages}

                    <div className={'overflow-auto'}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Номер участка</th>
                                    <th>Улица</th>
                                    <th>Управление</th>
                                </tr>
                            </thead>

                            <tbody className="transition">
                                {
                                    sectors.length == 0
                                        ?
                                        <tr>
                                            <td colSpan={3}>Данные об участках отсутствуют</td>
                                        </tr>
                                        :
                                        sectors.map(g =>
                                            <tr key={g.id}>
                                                <td className="w-25">{g.sectorNumber}</td>
                                                <td className="w-25">{GardenStreet.getDisplayName(GardenStreet.findStreetBySectroNumber(g.sectorNumber)!)}</td>

                                                <td className="nowrap w-25">
                                                    <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditGardener(g)}></i>
                                                    <i className="fa fa-trash pointer hover" aria-hidden="true" onClick={() => this.markToDeleteGardenSector(g)}></i>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        editingSector != null &&
                        <SectorEditorModal editingGardenSector={editingSector} onClose={this.unmarkToEditGardener} />
                    }

                    {
                        deletableSector != null &&
                        <MyConfirm
                            title={`Вы уверены, что хотите удалить участок ${deletableSector.sectorNumber}?`}
                            onAccept={this.removeGarden}
                            onClose={this.unmarkToDeleteGardenerSector}
                        />
                    }
                </TabPane>

                <TabPane label='Продажи участков' disabled={!salesAccess}>
                    <div className={styles.filters}>
                        <fieldset>
                            <legend>Фильтр</legend>
                            <NewSelectBox
                                label='Улица участков'
                                value={selectedStreetId}
                                options={streetOptions}
                                onChange={this.changeStreet}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Сортировка</legend>

                            <NewSelectBox
                                label='Цена'
                                value={selectedSort}
                                options={sortOptions}
                                onChange={this.changeSort}
                            />
                        </fieldset>
                    </div>
                    {pages}

                    <div className={styles.container}>
                        {
                            sales.length == 0
                                ?
                                <div className={styles.dataholder}>
                                    Нет данных для отображения
                                </div>
                                :
                                sales.map(s =>
                                    <div className={styles.sale}>
                                        <div
                                            className={styles.content}
                                            key={s.id}
                                            onClick={() => this.markToEditSectorSale(s)}
                                        >
                                            <div className={styles.title}>
                                                {`Участок ${s.sector.sectorNumber}`}
                                            </div>

                                            <div className={styles.date}>
                                                {s.publishDate.toLocaleDateString('ru')}
                                            </div>

                                            <div className={styles.name}>
                                                {s.fullName}
                                            </div>
                                        </div>

                                        <div className={styles.delete} onClick={() => this.markToDeleteSectorSale(s)}>
                                            Удалить
                                        </div>
                                    </div>
                                )
                        }
                    </div>

                    {
                        editingSale != null &&
                        <SectorSaleEditorModal
                            editingSale={editingSale}
                            onClose={this.unmarkToEditSectorSale}
                        />
                    }
                    {
                        deletableSale != null &&
                        <MyConfirm
                            title={`Вы уверены, что хотите удалить продажу участка ${deletableSale.sector.sectorNumber}?`}
                            onAccept={this.removeSale}
                            onClose={this.unmarkToDeleteGardenerSector}
                        />
                    }
                </TabPane>
            </Tabs>
        </>
    }
}
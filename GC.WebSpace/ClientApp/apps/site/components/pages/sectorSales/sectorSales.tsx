import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import { SectorSale } from "../../../../../domain/gardens/sectorSales/sectorSale";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import styles from './sectorSales.module.scss';
import { SectorSaleViewModal } from "./sectorSaleViewModal";

interface IProps {

}

interface IState {
    page: number,
    totalRows: number,
    pageSize: number,
    sales: SectorSale[],
    viewableSale: SectorSale | null
}

export class SectorSales extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 9,
            totalRows: 0,
            sales: [],
            viewableSale: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.SectorSales));

        await this.getSales({});
    }

    getSales = async ({
        page = this.state.page,
        pageSize = this.state.pageSize
    }) => {
        const { totalRows, values: sales } = await SiteProvider.SectorSales.GetPaged(page, pageSize, null, null);
        this.setState({ sales, totalRows, page, pageSize });
    }

    markSaleToView = (viewableSale: SectorSale) => this.setState({ viewableSale });
    unmarkSaleToView = () => this.setState({ viewableSale: null });

    renderSale = (sale: SectorSale) => {
        return <div className={styles.sale} onClick={() => this.markSaleToView(sale)}>
            <div className={styles.title}>
                {`Продажа участка ${sale.sector.sectorNumber}`}
            </div>

            <div className={styles.price}>
                {sale.price.toLocaleString('ru-RU')} руб.
            </div>

            <div>Подробнее...</div>
        </div>
    }

    renderFakeSale = () => {
        return <Skeleton variant='rectangular' height='140px' className={styles.fakeSale} />
    }

    render() {
        const { page, pageSize, totalRows, sales, viewableSale } = this.state;

        const pagination = <>
            <div className={styles.pagination}>
                <Pagination
                    page={page}
                    onChange={(e, page) => this.getSales({ page })}
                    count={Math.ceil(totalRows / pageSize)}
                    color={'primary'}
                />
            </div>
        </>

        return <>
            <Helmet>
                <title>Продажи участков — СНТ «Полесье»</title>
                <meta name="description" content={'На странице вы найдёте варианты участков, которые выставлены на продажу. Смотреть все >>>'} />
            </Helmet>

            {pagination}

            <div className={styles.container}>
                {
                    sales.length == 0
                        ?
                        <>
                            {this.renderFakeSale()}
                            {this.renderFakeSale()}
                            {this.renderFakeSale()}
                            {this.renderFakeSale()}
                        </>
                        :
                        sales.map(this.renderSale)
                }
            </div>

            {pagination}

            {
                viewableSale != null &&
                <SectorSaleViewModal
                    sale={viewableSale}
                    onClose={this.unmarkSaleToView}
                />
            }
        </>
    }
}
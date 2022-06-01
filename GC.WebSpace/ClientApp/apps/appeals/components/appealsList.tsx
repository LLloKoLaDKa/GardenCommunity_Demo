import CachedIcon from '@mui/icons-material/Cached';
import React, { Component } from "react";
import { Appeal } from "../../../domain/gardens/appeals/appeal";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import CustomDatePicker from '../../../shared/myinputs/customDatePicker/customDatePicker';
import { TextBox } from '../../../shared/myinputs/textBox/textBox';
import { Pagination } from '../../../shared/pagination/pagination';
import { Header } from "../../root/header";
import styles from '../content/appealsList.module.scss';
import { AppealViewerModal } from './appealViewerModal';

interface IProps { }

interface IState {
    page: number,
    pageSize: number,
    totalRows: number,

    appeals: Appeal[],
    vieweableAppeal: Appeal | null,

    startDateFilter: Date | null
    endDateFilter: Date | null,
}

let timer: NodeJS.Timeout;

export class AppealsList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 12,
            totalRows: 0,

            appeals: [],
            vieweableAppeal: null,

            startDateFilter: null,
            endDateFilter: null
        }
    }

    componentDidMount = async () => await this.loadAppeals({})

    changePageSize = (pageSize: number) => this.loadAppeals({ pageSize, page: 1 });
    changePage = (page: number) => this.loadAppeals({ page });

    changeStartDate = async (startDateFilter: Date | null) => await this.loadAppeals({ startDateFilter, page: 1 });
    changeEndDate = async (endDateFilter: Date | null) => await this.loadAppeals({ endDateFilter, page: 1 });

    changeSearch = async (inputValue: string) => {
        window.clearTimeout(timer);
        timer = setTimeout(async () => {
            await this.loadAppeals({ page: 1, withBlockUi: false, search: inputValue });
        }, 1000);
    }

    markAppealToView = (vieweableAppeal: Appeal) => {
        if (!vieweableAppeal.isViewed) {
            GardensProvider.Appeals.setViewed(vieweableAppeal.id)
            this.loadAppeals({});
        }

        this.setState({ vieweableAppeal });
    }
    unmarkAppealToView = () => this.setState({ vieweableAppeal: null }, () => this.loadAppeals({}));

    loadAppeals = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        startDateFilter = this.state.startDateFilter,
        endDateFilter = this.state.endDateFilter,
        search = '',
        withBlockUi = true
    }) => {

        const operation = async () => {
            const paged = await GardensProvider.Appeals.getAppealsPaged(page, pageSize, startDateFilter, endDateFilter, search);
            this.setState({ appeals: paged.values, totalRows: paged.totalRows, page, pageSize, startDateFilter, endDateFilter });
        }
        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
    }

    render() {
        const { page, pageSize, totalRows, appeals, vieweableAppeal, startDateFilter, endDateFilter } = this.state;

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize} />

        return <>
            <Header
                headerTitle='Обращения'
                buttonContent='Обновить'
                buttonIcon={<CachedIcon />}
                buttonOnClick={() => this.loadAppeals({})}
            />

            <div className={styles.controls}>
                <fieldset className={styles.filters}>
                    <legend>Фильтрация</legend>

                    <CustomDatePicker
                        label='Дата начала'
                        value={startDateFilter}
                        onChange={this.changeStartDate}
                    />

                    <CustomDatePicker
                        label='Дата окончания'
                        value={endDateFilter}
                        onChange={this.changeEndDate}
                    />
                </fieldset>

                <fieldset className={styles.search}>
                    <legend>Поиск</legend>

                    <TextBox
                        label='Имя и(или) фамилия'
                        onChange={this.changeSearch}
                    />
                </fieldset>
            </div>

            {pages}

            <div className={styles.container}>
                {
                    appeals.length == 0
                        ?
                        <div className={styles.dataholder}>
                            Нет данных для отображения
                        </div>
                        :
                        appeals.map(a =>
                            <div
                                className={`${styles.appeal} ${a.isViewed ? styles.viewed : ''}`}
                                key={a.id}
                                onClick={() => this.markAppealToView(a)}
                            >
                                <div className={styles.title}>
                                    {a.title.length > 13 ? `${a.title.slice(0, 10)}...` : a.title}
                                </div>

                                <div className={styles.date}>
                                    {a.date.toLocaleDateString('ru')}
                                </div>

                                <div className={styles.name}>
                                    {a.fullName}
                                </div>
                            </div>
                        )
                }
            </div>

            {
                vieweableAppeal != null &&
                <AppealViewerModal
                    appeal={vieweableAppeal}
                    onClose={this.unmarkAppealToView}
                />
            }
        </>
    }
}
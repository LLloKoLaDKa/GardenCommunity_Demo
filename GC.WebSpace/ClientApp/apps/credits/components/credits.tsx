import UploadFileIcon from '@mui/icons-material/UploadFile';
import React from "react";
import { SectorCreditSort } from '../../../domain/gardens/enums/sectorCreditSort';
import { GardensProvider } from '../../../domain/gardens/gardensProvider';
import { SectorCredit } from '../../../domain/gardens/sectorCredits/sectorCredit';
import { BlockUi } from '../../../shared/blockUi/blockUi';
import NumberBox from '../../../shared/myinputs/numberBox/numberBox';
import NewSelectBox from '../../../shared/myinputs/selectBox/newSelectBox';
import { Option } from '../../../shared/myinputs/selectBox/option';
import { Pagination } from '../../../shared/pagination/pagination';
import { enumToOptions } from '../../../tools/enum';
import { addErrorNotification, addSuccessNotification } from '../../../tools/notifications';
import { Header } from "../../root/header";
import styles from '../content/credits.module.scss';
import { EditCreditModal } from './editCreditModal';

interface LoadParameters {
    page?: number,
    pageSize?: number,
    sectorNumber?: number | null,
    selectedSort?: Option<SectorCreditSort> | null,
    withBlockUi?: boolean
}

interface IProps { }

interface IState {
    page: number,
    pageSize: number,
    totalRows: number,
    sectorNumber: number | null,
    credits: SectorCredit[],
    editableCredit: SectorCredit | null

    sortOptions: Option<SectorCreditSort>[],
    selectedSort: Option<SectorCreditSort> | null
}

let timer: NodeJS.Timeout;

export class Credits extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            page: 1,
            pageSize: 10,
            totalRows: 0,
            sectorNumber: null,
            credits: [],
            editableCredit: null,

            sortOptions: enumToOptions(SectorCreditSort, SectorCreditSort.getDisplayName),
            selectedSort: null
        }
    }

    componentDidMount = async () => {
        await this.loadCredits({});
    }

    changePage = (page: number) => this.loadCredits({ page });
    changePageSize = (pageSize: number) => this.loadCredits({ pageSize });

    changeSearch = async (inputValue: number | null) => {
        window.clearTimeout(timer);
        timer = setTimeout(async () => {
            await this.loadCredits({ page: 1, withBlockUi: false, sectorNumber: inputValue });
        }, 1000);
    }

    changeSort = async (selectedSort: Option<SectorCreditSort> | null) => await this.loadCredits({ selectedSort, withBlockUi: false });

    loadCredits = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        sectorNumber = this.state.sectorNumber,
        selectedSort = this.state.selectedSort,
        withBlockUi = true
    }: LoadParameters) => {
        const operation = async () => {
            const { totalRows, values: credits } = await GardensProvider.Credits.getPaged(page, pageSize, sectorNumber, selectedSort?.value ?? null);
            this.setState({ page, pageSize, sectorNumber, selectedSort, credits, totalRows });
        }

        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
    }

    markToEditCredit = (editableCredit: SectorCredit) => this.setState({ editableCredit });
    unmarkToEditCredit = (isEdited: boolean) => {
        if (isEdited) this.loadCredits({});
        this.setState({ editableCredit: null });
    }

    uploadReport = async () => {
        await BlockUi.blockAsync(async () => {
            const reportResult = await GardensProvider.Credits.tryRenderReport();
            if (!reportResult.isSuccess) return addErrorNotification(reportResult.getErrorsString());

            var link = document.createElement('a');
            link.setAttribute('href', `${window.location.origin}/docs/report.xlsx`);
            link.setAttribute('download', 'download');

            link.click();

            link.remove()
            addSuccessNotification("Файл отправлен на скачивание");
        });
    }

    render() {
        const { credits, page, pageSize, sectorNumber, totalRows, editableCredit,
            selectedSort, sortOptions
        } = this.state;

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize} />

        return <>
            <Header
                headerTitle="Задолженности"
                buttonContent="Импорт (Excel)"
                buttonOnClick={this.uploadReport}
                buttonIcon={<UploadFileIcon />}
            />
            <div className={styles.filters}>
                <fieldset>
                    <legend>Поиск</legend>

                    <NumberBox
                        label='Номер участка'
                        onChange={this.changeSearch}

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

            <div className={'overflow-auto'}>
                <table>
                    <thead>
                        <tr>
                            <th>Участок</th>
                            <th>Владелец</th>
                            <th>Долг</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            credits.length == 0
                                ?
                                <tr>
                                    <td colSpan={4}>Нет данных для отображения</td>
                                </tr>
                                :
                                credits.map(c =>
                                    <tr key={c.id}>
                                        <td>{c.sector.sectorNumber}</td>
                                        <td>{c.gardener.initials()}</td>
                                        <td>{c.credit.toLocaleString('ru-RU')}</td>
                                        <td>
                                            <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditCredit(c)}></i>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

            {
                editableCredit != null &&
                <EditCreditModal
                    currentCredit={editableCredit}
                    onClose={this.unmarkToEditCredit}
                />
            }
        </>
    }
}
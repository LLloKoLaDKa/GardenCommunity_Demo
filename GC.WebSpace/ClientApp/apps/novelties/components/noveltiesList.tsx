import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from "react";
import { Novelty } from "../../../domain/records/novelties/novelty";
import { NoveltyBlank } from "../../../domain/records/novelties/noveltyBlank";
import { RecordsProvider } from "../../../domain/records/recordsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyConfirm } from "../../../shared/myConfirm/myConfirm";
import { TextBox } from '../../../shared/myinputs/textBox/textBox';
import { Pagination } from "../../../shared/pagination/pagination";
import { TabPane } from "../../../shared/tabs/tabPane";
import { Tabs } from "../../../shared/tabs/tabs";
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import styles from '../content/noveltiesList.module.scss';
import { NoveltyEditorModal } from "./noveltyEditorModal";
import { NoveltyViewModal } from "./noveltyViewModal";

interface IProps { }

interface IState {
    novelties: Novelty[],
    page: number,
    pageSize: number,
    totalRows: number,
    editingNovelty: NoveltyBlank | null,
    watchingNovelty: Novelty | null,
    tabNumber: number,
    deletableNovelty: Novelty | null,
    archivedNovelty: Novelty | null
}

let timer: NodeJS.Timeout;

export class NoveltiesList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            novelties: [],
            page: 1,
            pageSize: 10,
            totalRows: 0,
            editingNovelty: null,
            watchingNovelty: null,
            tabNumber: 1,
            deletableNovelty: null,
            archivedNovelty: null
        }
    }

    componentDidMount = async () => {
        await this.loadNovelties({});
    }

    loadNovelties = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        search = '',
        withBlockUi = true
    }) => {
        const operation = async () => {
            const { values: novelties, totalRows } = await RecordsProvider.Novelties.getPaged(page, pageSize, search);
            this.setState({ totalRows, novelties, tabNumber: 1, page, pageSize });
        }

        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
    }

    loadArchives = async () => {
        await BlockUi.blockAsync(async () => {
            const novelties = await RecordsProvider.Novelties.getArchives();
            this.setState({ novelties, tabNumber: 2, totalRows: 0, page: 1 });
        });
    }

    markToAddNovelty = () => this.setState({ editingNovelty: NoveltyBlank.empty() });
    markToEditNovelty = (novelty: Novelty) => this.setState({ editingNovelty: NoveltyBlank.create(novelty) });
    unmarkToEditNovelty = async (isEdited: boolean) => {
        const { editingNovelty, tabNumber } = this.state;

        if (isEdited) {
            if (tabNumber == 1) await this.loadNovelties({});
            if (tabNumber == 2) await this.loadArchives();
        }

        this.setState({ editingNovelty: null });
    }

    markToArchiveNovelty = (archivedNovelty: Novelty) => this.setState({ archivedNovelty });
    unmarkToArchiveNovelty = () => this.setState({ archivedNovelty: null });

    markToRemoveNovelty = (deletableNovelty: Novelty) => this.setState({ deletableNovelty });
    unmarkToRemoveNovelty = () => this.setState({ deletableNovelty: null });

    markToWatchNovelty = (watchedNovelty: Novelty) => this.setState({ watchingNovelty: watchedNovelty })
    unmarkToWatchNovelty = () => this.setState({ watchingNovelty: null })

    changePageSize = async (pageSize: number) => await this.loadNovelties({ pageSize, page: 1 });
    changePage = async (page: number) => await this.loadNovelties({ page });

    changeTab = async (selectedTab: number): Promise<void> => {
        switch (selectedTab) {
            case 0: await this.loadNovelties({}); return Promise.resolve();
            case 1: await this.loadArchives(); return Promise.resolve();
        }
    }

    changeSearch = async (inputValue: string) => {
        window.clearTimeout(timer);
        timer = setTimeout(async () => {
            await this.loadNovelties({ page: 1, withBlockUi: false, search: inputValue });
        }, 1000);
    }

    removeNovelty = async () => {
        const { deletableNovelty } = this.state;

        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.Novelties.remove(deletableNovelty!.id);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            await this.loadNovelties({ page: 1 });
            addSuccessNotification("Новость удалена!");
        });
    }

    takeOff = async () => {
        const { archivedNovelty } = this.state;

        await BlockUi.blockAsync(async () => {
            const result = await RecordsProvider.Novelties.takeOff(archivedNovelty!.id);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            await this.loadNovelties({});
            addSuccessNotification('Новость снята с публикации!');
        });
    }

    render() {
        const {
            novelties,
            page,
            pageSize,
            totalRows,
            editingNovelty,
            watchingNovelty,
            deletableNovelty,
            archivedNovelty
        } = this.state;

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            changePage={this.changePage}
            changePageSize={this.changePageSize}
            total={totalRows} />

        return <>
            <Header
                headerTitle="Новости"
                buttonContent='Добавить'
                buttonIcon={<AddCircleIcon />}
                buttonOnClick={this.markToAddNovelty}
            />

            <Tabs onChangeTab={this.changeTab}>
                <TabPane label="Справочник">
                    <fieldset>
                        <legend>Поиск</legend>

                        <TextBox
                            label='Название обьявления'
                            onChange={this.changeSearch}
                        />
                    </fieldset>

                    {pages}

                    <div className={'overflow-auto'}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата публикации</th>
                                    <th>Название</th>
                                    <th>Управление</th>
                                </tr>
                            </thead>

                            <tbody className="transition">
                                {
                                    novelties.length == 0
                                        ?
                                        <tr>
                                            <td colSpan={3}>Нет данных для отображения</td>
                                        </tr>
                                        :
                                        novelties.map(n =>
                                            <tr key={n.id}>
                                                <td>{n.publishDate?.toLocaleDateString('ru')}</td>
                                                <td>{n.title}</td>

                                                <td className="nowrap w-25">
                                                    <i className="fa fa-eye pointer hover mr-2" aria-hidden="true" onClick={() => this.markToWatchNovelty(n)} title="Просмотр"></i>
                                                    <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditNovelty(n)} title="Редактирование"></i>
                                                    <i className="fa fa-trash pointer hover mr-2" aria-hidden="true" onClick={() => this.markToRemoveNovelty(n)} title="Удаление"></i>
                                                    <i className="fa fa-ban pointer hover" aria-hidden="true" onClick={() => this.markToArchiveNovelty(n)} title="Убрать в архив"></i>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        editingNovelty != null &&
                        <NoveltyEditorModal editingNovelty={editingNovelty} onClose={this.unmarkToEditNovelty} />
                    }

                    {
                        watchingNovelty != null &&
                        <NoveltyViewModal novelty={watchingNovelty} onClose={this.unmarkToWatchNovelty} />
                    }

                    {
                        deletableNovelty != null &&
                        <MyConfirm
                            title={`Вы уверены, что хотите удалить новость ${deletableNovelty.title}?`}
                            onClose={this.unmarkToRemoveNovelty}
                            onAccept={this.removeNovelty}
                        />
                    }

                    {
                        archivedNovelty != null &&
                        <MyConfirm
                            title={`Вы уверены, что хотите снять с публикации новость ${archivedNovelty.title}?`}
                            onClose={this.unmarkToArchiveNovelty}
                            onAccept={this.takeOff}
                        />
                    }
                </TabPane>

                <TabPane label="Архив">
                    <h4>Объявлений в архиве: {novelties.length}</h4>
                    <div className={styles.container}>

                        {
                            novelties.length == 0
                                ?
                                'Нет даных для отображения'
                                :
                                novelties.map(n =>
                                    <div className={styles.item} onClick={() => this.markToEditNovelty(n)} key={n.id}>
                                        <h5> {n.title} </h5>
                                    </div>
                                )
                        }
                    </div>

                    {
                        editingNovelty != null &&
                        <NoveltyEditorModal
                            editingNovelty={editingNovelty}
                            onClose={this.unmarkToEditNovelty}
                        />
                    }
                </TabPane>
            </Tabs>
        </>
    }

}
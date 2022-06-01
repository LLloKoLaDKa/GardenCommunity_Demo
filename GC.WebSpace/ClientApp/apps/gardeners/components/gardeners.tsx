import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { Component } from "react";
import { Gardener } from "../../../domain/gardens/gardeners/gardener";
import { GardenerBlank } from "../../../domain/gardens/gardeners/gardenerBlank";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyConfirm } from "../../../shared/myConfirm/myConfirm";
import { TextBox } from '../../../shared/myinputs/textBox/textBox';
import { Pagination } from "../../../shared/pagination/pagination";
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import { GardenerEditorModal } from "./gardenerEditorModal";

interface IProps { }

interface IState {
    gardeners: Gardener[],
    page: number,
    pageSize: number,
    totalRows: number,
    editingGardener: GardenerBlank | null,
    deletableGardener: Gardener | null

}

let timer: NodeJS.Timeout;

export class Gardeners extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            gardeners: [],
            page: 1,
            pageSize: 10,
            totalRows: 0,
            editingGardener: null,
            deletableGardener: null
        }
    }

    componentDidMount = async () => {
        await this.loadGardener({});
    }

    loadGardener = async ({
        page = this.state.page,
        pageSize = this.state.pageSize,
        search = '',
        withBlockUi = true
    }) => {
        const operation = async () => {
            const { values: gardeners, totalRows } = await GardensProvider.Gardeners.getGardenersPaged(page, pageSize, search);
            this.setState({ gardeners, totalRows, page, pageSize });
        }

        withBlockUi ? await BlockUi.blockAsync(operation) : await operation();
    }

    changePageSize = async (pageSize: number) => await this.loadGardener({ pageSize, page: 1 });
    changePage = async (page: number) => await this.loadGardener({ page });

    changeSearch = async (inputValue: string) => {
        window.clearTimeout(timer);
        timer = setTimeout(async () => {
            await this.loadGardener({ page: 1, withBlockUi: false, search: inputValue });
        }, 1000);
    }

    markToAddGardener = () => this.setState({ editingGardener: GardenerBlank.empty() });
    markToEditGardener = (gardener: Gardener) => this.setState({ editingGardener: GardenerBlank.create(gardener) });
    unmarkToEditGardener = async (isEdited: boolean) => {
        if (isEdited) this.loadGardener({});

        this.setState({ editingGardener: null });
    }

    markToRemoveGardener = (deletableGardener: Gardener) => this.setState({ deletableGardener });
    unmarkToRemoveGardener = () => this.setState({ deletableGardener: null });

    removeGarden = async () => {
        const { deletableGardener } = this.state;

        BlockUi.blockAsync(async () => {
            const result = await GardensProvider.Gardeners.removeGardener(deletableGardener!.id);
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            await this.loadGardener({ page: 1 });
            addSuccessNotification("Пользователь успешно удалён!", "Удаление");
        });
    }

    render() {
        const { gardeners, page, pageSize, editingGardener, totalRows, deletableGardener } = this.state;

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize} />;

        return <>
            <Header
                headerTitle="Садоводы"
                buttonContent='Добавить'
                buttonIcon={<AddCircleIcon />}
                buttonOnClick={this.markToAddGardener}
            />

            <fieldset>
                <legend>Поиск</legend>

                <TextBox
                    label='Имя \ Фамилия \ Отчество'
                    onChange={this.changeSearch}
                />
            </fieldset>


            {pages}

            <div className={'overflow-auto'}>
                <table>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                            <th>Управление</th>
                        </tr>
                    </thead>

                    <tbody className="transition">
                        {
                            gardeners.length == 0
                                ?
                                <tr>
                                    <td colSpan={4}>Нет данных для отображения</td>
                                </tr>
                                :
                                gardeners.map(g =>
                                    <tr key={g.id}>
                                        <td className="w-25">{g.firstName}</td>
                                        <td className="w-25">{g.lastName}</td>
                                        <td className="w-25">{g.middleName}</td>

                                        <td className="nowrap w-25">
                                            <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditGardener(g)}></i>
                                            <i className="fa fa-trash pointer hover" aria-hidden="true" onClick={() => this.markToRemoveGardener(g)}></i>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

            {
                editingGardener != null &&
                <GardenerEditorModal editingGardenerBlank={editingGardener} onClose={this.unmarkToEditGardener} />
            }

            {
                deletableGardener != null &&
                <MyConfirm
                    title={`Вы уверены, что хотите удалить садовода ${deletableGardener.firstName} ${deletableGardener.lastName}?`}
                    onClose={this.unmarkToRemoveGardener}
                    onAccept={this.removeGarden}
                />
            }
        </>;
    }
}
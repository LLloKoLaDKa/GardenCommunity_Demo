import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { Component } from "react";
import { ConfigurationItem } from "../../../domain/configurations/configurationItem";
import { ConfigurationItemBlank } from "../../../domain/configurations/configurationItemBlank";
import { ConfigurationsProvider } from "../../../domain/configurations/configurationsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { MyConfirm } from "../../../shared/myConfirm/myConfirm";
import { Pagination } from "../../../shared/pagination/pagination";
import { PaginationParameters } from "../../../shared/pagination/paginationParameters";
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import { ConfigurationEditorModal } from "./configurationsEditorModal";

interface IProps { }

interface IState {
    configs: ConfigurationItem[]
    editingConfig: ConfigurationItemBlank | null,
    page: number,
    pageSize: number,
    totalRows: number,
    deletableConfig: ConfigurationItem | null
}

export class Configurations extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            configs: [],
            editingConfig: null,
            page: 1,
            pageSize: 10,
            totalRows: 0,
            deletableConfig: null
        }
    }

    componentDidMount = async () => this.loadConfigurationsPaged({});

    async loadConfigurationsPaged({
        page = this.state.page,
        pageSize = this.state.pageSize
    }: PaginationParameters) {
        await BlockUi.blockAsync(async () => {
            const { values: configs, totalRows } = await ConfigurationsProvider.getConfigurationsPaged(page ?? this.state.page, pageSize ?? this.state.pageSize);

            this.setState({ configs, totalRows, page, pageSize });
        });
    }

    removeConfig = async () => {
        const { deletableConfig } = this.state;

        BlockUi.blockAsync(async () => {
            if (deletableConfig == null) return;

            const result = await ConfigurationsProvider.removeConfiguration(deletableConfig.key);
            if (!result.isSuccess) {
                addErrorNotification(result.errors[0].message);
                return;
            }

            this.loadConfigurationsPaged({ page: 1 });
            addSuccessNotification("Пользователь успешно удалён!", "Удаление");
        });
    }

    changePageSize = (pageSize: number) => this.loadConfigurationsPaged({ pageSize, page: 1 });
    changePage = (page: number) => this.loadConfigurationsPaged({ page });

    markToAddConfig = () => this.setState({ editingConfig: ConfigurationItemBlank.empty });
    markToEditConfig = (configurationItem: ConfigurationItem) => this.setState({ editingConfig: ConfigurationItemBlank.create(configurationItem) });
    unmarkEditingConfiguration = async (isEdited: boolean) => {
        if (isEdited) await this.loadConfigurationsPaged({ page: 1 });
        this.setState({ editingConfig: null });
    }

    markToRemoveConfig = (deletableConfig: ConfigurationItem) => this.setState({ deletableConfig });
    unmarkToRemoveConfig = () => this.setState({ deletableConfig: null });

    render() {
        const {
            configs,
            editingConfig,
            page,
            pageSize,
            totalRows,
            deletableConfig
        } = this.state

        const pages = <Pagination
            page={page}
            pageSize={pageSize}
            total={totalRows}
            changePage={this.changePage}
            changePageSize={this.changePageSize}
        />

        return (
            <>
                <Header
                    headerTitle="Конфигурации"
                    buttonContent='Добавить'
                    buttonIcon={<AddCircleIcon />}
                    buttonOnClick={this.markToAddConfig}
                />

                {pages}

                <div className={'overflow-auto'}>
                    <table>
                        <thead>
                            <tr>
                                <th>Ключ</th>
                                <th>Значение</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                configs.length == 0
                                    ?
                                    <tr>
                                        <td colSpan={5}>Нет данных для отображения</td>
                                    </tr>
                                    :
                                    configs.map(config =>
                                        <tr key={config.key}>
                                            <td>{config.key}</td>
                                            <td>{config.value}</td>
                                            <td className="nowrap">
                                                <i className="fa fa-pencil-alt pointer hover mr-2" aria-hidden="true" onClick={() => this.markToEditConfig(config)}></i>
                                                <i className="fa fa-trash pointer hover" aria-hidden="true" onClick={() => this.markToRemoveConfig(config)}></i>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>

                {
                    editingConfig != null &&
                    <ConfigurationEditorModal
                        defaultConfiguration={editingConfig}
                        onClose={this.unmarkEditingConfiguration}
                    />
                }

                {
                    deletableConfig != null &&
                    <MyConfirm
                        title={`Вы уверены, что хотите удалить конфигурацию '${deletableConfig.key}'?`}
                        onAccept={this.removeConfig}
                        onClose={this.unmarkToRemoveConfig}
                    />
                }
            </>
        );
    }
}

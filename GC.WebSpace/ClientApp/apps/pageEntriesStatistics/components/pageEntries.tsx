import CachedIcon from '@mui/icons-material/Cached';
import { ResponsivePie } from '@nivo/pie';
import React from "react";
import { PageEntry } from "../../../domain/statistics/pageEntries/pageEntry";
import { PageEntryChartModel } from "../../../domain/statistics/pageEntries/pageEntryChartModel";
import { PageEntryType } from "../../../domain/statistics/pageEntries/pageEntryType";
import { StatisticsProvider } from "../../../domain/statistics/StatisticsProvider";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import CustomDatePicker from '../../../shared/myinputs/customDatePicker/customDatePicker';
import { Header } from "../../root/header";
import styles from '../content/pageEntries.module.scss';

interface LoadParameters {
    startDate?: Date | null,
    endDate?: Date | null
}

interface IProps { }

interface IState {
    startDate: Date | null,
    endDate: Date | null,
    pageEntries: PageEntry[]
}

export class PageEntries extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            pageEntries: []
        }
    }

    componentDidMount = () => {
        this.loadPageEntries({});
    }

    changeStartDate = async (startDate: Date | null) => await this.loadPageEntries({ startDate });
    changeEndDate = async (endDate: Date | null) => await this.loadPageEntries({ endDate });

    loadPageEntries = async ({
        startDate = this.state.startDate,
        endDate = this.state.endDate
    }: LoadParameters) => {
        await BlockUi.blockAsync(async () => {
            const pageEntries = await StatisticsProvider.PageEntries.getPageEntries(startDate, endDate);
            this.setState({ pageEntries, startDate, endDate });
        });
    }

    getDataFromArray = () => {
        const { pageEntries } = this.state;
        const result: PageEntry[] = [];
        pageEntries.map(pe => {
            const existType = result.find(r => r.type == pe.type);
            if (existType != undefined) return;

            result.push(pe);
        });

        return result.map(r => {
            const typeString = PageEntryType.getDisplayName(r.type);
            const count = pageEntries.filter(p => p.type == r.type).length;

            return new PageEntryChartModel(typeString, count);
        })

    }

    render() {
        const { endDate, startDate } = this.state;
        const data = this.getDataFromArray();

        return <>
            <Header
                headerTitle="Статистика страниц"
                buttonContent="Обновить"
                buttonOnClick={() => this.loadPageEntries({})}
                buttonIcon={<CachedIcon />}
            />

            <fieldset className={styles.filters}>
                <legend>Фильтрация</legend>

                <CustomDatePicker
                    label='Дата начала'
                    value={startDate}
                    onChange={this.changeStartDate}
                />

                <CustomDatePicker
                    label='Дата окончания'
                    value={endDate}
                    onChange={this.changeEndDate}
                />
            </fieldset>

            <div className={styles.container}>
                {
                    this.state.pageEntries.length == 0
                        ? <span>Данные не найдены</span>
                        :

                        <ResponsivePie
                            data={data}

                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{
                                from: 'color',
                                modifiers: [
                                    [
                                        'darker',
                                        0.2
                                    ]
                                ]
                            }}

                            enableArcLinkLabels={false}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [
                                    [
                                        'darker',
                                        2
                                    ]
                                ]
                            }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 1,
                                    translateY: 46,
                                    itemsSpacing: 48,
                                    itemWidth: 68,
                                    itemHeight: 13,
                                    itemTextColor: '#999',
                                    itemDirection: 'top-to-bottom',
                                    itemOpacity: 1,
                                    symbolSize: 17,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                }
            </div>
        </>
    }
}
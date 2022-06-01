import React, { ChangeEvent } from 'react';
import styles from './pagination.module.scss';

interface IProps {
    page: number;
    pageSize: number;
    total: number;

    changePage: (page: number) => void;
    changePageSize?: (pageSize: number) => void;
}

interface IState { }

export class Pagination extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidUpdate = () => {
        const pageInput = document.getElementById('pageInput');
        if (pageInput) pageInput.style.width = (`${this.props.page}`.length + 1) * 8 + 'px';
    }

    toPrev = () => {
        const newPage = Math.max(1, this.props.page - 1);
        if (newPage == this.props.page) return;

        this.props.changePage(newPage);
    }

    toNext = () => {
        const newPage = this.props.page + 1;
        if (newPage * this.props.pageSize - this.props.total - this.props.pageSize >= 0) return;

        this.props.changePage(this.props.page + 1);
    }

    selectPageField = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        (event.target as HTMLInputElement).select();
    }

    onChangePage = (event: ChangeEvent<HTMLInputElement>) => {
        const page = +event.target.value;
        if (Number.isNaN(page)) return;
        if (page < 1 || page >= Number.MAX_VALUE) return;
        this.props.changePage(page);
    }

    onChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
        if (this.props.changePageSize)
            this.props.changePageSize(+event.target.value);
    }

    get pageSizeOptions() {
        var options = [10, 50, 100];
        if (this.props.pageSize != undefined && !options.some(o => o == this.props.pageSize))
            options.push(this.props.pageSize);

        return options;
    }

    render() {
        return (
            <div className={styles.pagination}>
                {
                    this.props.total != undefined &&
                    <h4 className={styles.total}>
                        Всего записей: {this.props.total}
                    </h4>
                }
                <div className={styles.pages}>
                    {/* {
                        this.props.changePageSize != undefined && this.props.pageSize != undefined &&
                        <select
                            className={styles.page_size}
                            value={this.props.pageSize}
                            onChange={this.onChangePageSize}>
                            {
                                this.pageSizeOptions.map(pageSize => (
                                    <option key={pageSize} value={pageSize}>&nbsp;{pageSize}</option>
                                ))
                            }
                        </select>
                    } */}

                    <button id="previous" className={styles.prev_button} onClick={this.toPrev}><i className="fas fa-minus"></i></button>
                    <label id="pageInput" className={styles.page}>{this.props.page} из {Math.max(Math.ceil(this.props.total/this.props.pageSize), 1)}</label>
                    <button id="next" className={styles.next_button} onClick={this.toNext}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        )
    }
}

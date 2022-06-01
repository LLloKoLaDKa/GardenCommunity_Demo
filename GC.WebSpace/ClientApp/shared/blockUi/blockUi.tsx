import { faCircleNotch, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './blockUi.scss';
import keeper from './blockUiKeeper';

interface IProps { }

interface IState {
    locks: number;
}

export class BlockUi extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        keeper.register(this.show, this.hide);

        this.state = {
            locks: 0
        }
    }

    static blockAsync = (operation: () => void): void | Promise<void> => keeper.blockAsync(operation);

    show = async () => this.setState(prevState => ({ locks: prevState.locks + 1 }));
    hide = async () => this.setState(prevState => ({ locks: Math.max(prevState.locks - 1, 0) }));

    render() {
        return (
            <div className={`block-ui ${this.state.locks > 0 ? 'blocking' : ''}`}>
                <div className="block">
                    <div className="overlay"></div>
                    <div className="content animate__animated animate__fadeIn">
                        <FontAwesomeIcon icon={faCircleNotch} spin size='2x' className='icon' />
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

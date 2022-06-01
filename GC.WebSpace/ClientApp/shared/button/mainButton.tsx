import React, { Component } from 'react';
import './mainButton.scss';


interface MainButtonProps {
    disabled?: boolean;
    className?: string;
    id?: string;
    centered?: boolean

    onClick?: () => void;
}

export class MainButton extends Component<MainButtonProps> {
    render() {
        const className = `btn btn-outline-success button transition ${this.props.centered ? "button-center" : ""}`;
        return (
            <button
                id={this.props.id}
                type="button"
                className={this.props.className != undefined ? className + ' ' + this.props.className : className}
                disabled={this.props.disabled}
                onClick={this.props.onClick}

            >
                {this.props.children}
            </button>
        );
    }
}

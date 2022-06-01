import React, { Component } from "react";

interface IProps {
    label: string | JSX.Element,
    className?: string;
    disabled?: boolean;
}

export class TabPane extends Component<IProps> {
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

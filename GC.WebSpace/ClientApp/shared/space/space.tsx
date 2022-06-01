import React, { Component, Fragment } from 'react';
import { arrayRange } from '../../tools/array/array';
import { id } from '../../tools/id/id';

interface IProps {
    count?: number;
}

export class Space extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return arrayRange(1, this.props.count ?? 1).map((_) => <Fragment key={id()}>&nbsp;</Fragment>);
    }
}

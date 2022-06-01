import React, { ChangeEvent, Component } from 'react';
import { readFile } from '../../../tools/fileUtils';
import { addErrorNotification } from '../../../tools/notifications';
import { BlockUi } from '../../blockUi/blockUi';
import './fileInput.scss';

interface IProps {
    id: string;
    file: string | null;
    accept?: string;
    hidden?: boolean;
    placeholder?: string;
    onChange: (base64Files: string | null) => void;
}

export class FileInput extends Component<IProps> {
    onChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { id, onChange } = this.props;
        const file = event.target.files![0];
        event.target.value = "";
        const result = await this.loadFile(file);

        onChange(result);
    }

    loadFile = async (file: File): Promise<string> => {
        const { file: existFile } = this.props;
        let result: string = "";
        await BlockUi.blockAsync(async () => {
            let fileBase64 = "";
            fileBase64 = await readFile(file) as string;

            if (result.includes(fileBase64) || (existFile == undefined ? false : existFile == fileBase64))
                addErrorNotification(`Изображение уже загружено, попробуйте выбрать другой файл`);
            else result = fileBase64;
        });

        return result;
    }

    render() {
        return <>
            <div className={'image_title'}>Выбор изображения</div>
            <div className={`file_input`}>
                <input
                    accept={this.props.accept}
                    hidden
                    id={this.props.id}
                    onChange={this.onChange}
                    type="file" />

                {
                    this.props.file != undefined || this.props.file != null ?
                        <div className='image_row'>
                            <img
                                src={this.props.file}
                                width={220}
                            />

                            <div className='controls'>
                                <label htmlFor={this.props.id}>
                                    Выбрать другое...
                                </label>

                                <label onClick={() => this.props.onChange(null)}>
                                    Удалить
                                </label>
                            </div>
                        </div>
                        :
                        <label htmlFor={this.props.id} className='image_loader'>
                            +
                        </label>
                }
            </div>
        </>
    }
}

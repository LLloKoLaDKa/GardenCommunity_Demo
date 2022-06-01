import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import React from "react";
import { id } from "../../tools/id/id";
import { MyMainButton } from "../myButton/myMainButton";
import styles from './customModal.module.scss';
import { ModalButton } from "./modalButton";
import { ModalErrorStorage } from "./modalErrorStorages/modalErrorStorage";

interface IProps {
    headerText?: string,
    buttons: ModalButton[],
    size: 400 | 500 | 600,
    isOpen?: boolean,
    onClose: () => Promise<void> | void,
}

interface IState {
    open: boolean
}

export class CustomModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: props.isOpen ?? true
        }
    }

    style = {
        width: {
            xs: '90%', // theme.breakpoints.up('sm')
            sm: `${this.props.size}px`, // theme.breakpoints.up('md')y
        },
        position: { xs: 'absolute' },
        top: '20px',
        left: '50%',
        transform: 'translate(-50%)',
        borderRadius: '25px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
    };

    hide = () => {
        this.setState({ open: false }, () => setTimeout(() => this.props.onClose(), 500))
    }

    triggering = async (action: () => void) => {
        await action();
        if (!ModalErrorStorage.hasError()) this.hide();
    }

    render() {
        const { open } = this.state;
        const { headerText, children, buttons, } = this.props;

        return <>
            <Modal
                className={styles.modal}
                open={open}
                onClose={this.hide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <Box sx={this.style}>
                        {
                            headerText &&
                            <div className={styles.modal_header}>
                                <Typography variant='h5' sx={{ mb: '10px' }}>{headerText}</Typography>
                            </div>
                        }

                        {children}

                        <div className={styles.modal_footer}>
                            {
                                buttons.filter(b => !b.hidden).map(b =>
                                    <MyMainButton key={id()} fullWidth color={b.color} text={b.content} onClick={() => this.triggering(b.onClick)} />
                                )
                            }
                        </div>
                    </Box>
                </Fade>

            </Modal>
        </>
    }
}
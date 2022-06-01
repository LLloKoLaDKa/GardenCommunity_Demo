import { store } from 'react-notifications-component';


export const addWarningNotification = (message: string, title: string = "Предупреждение", duration: number = 5000) => {
    store.addNotification({
        type: 'warning',
        container: 'top-right',
        title: title,
        message: message,
        dismiss: {
            duration: duration,
            showIcon: true
        },
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut']
    });
};

export const addErrorNotification = (message: string, title: string = "Ошибка", duration: number = 5000) => {
    store.addNotification({
        type: 'danger',
        container: 'top-right',
        title: title,
        message: message,
        dismiss: {
            duration: duration,
            showIcon: true
        },
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut']
    });
};

export const addSuccessNotification = (message: string, title: string = "Успех", duration: number = 5000) => {
    store.addNotification({
        type: 'success',
        container: 'top-right',
        title: title,
        message: message,
        dismiss: {
            duration: duration,
            showIcon: true
        },
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut']
    });
};
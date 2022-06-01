interface Localization {
    errors: {
        errors: string,
        date: string,
        message: string,
        application: string,
        otherParameters: string,
        project: string,
        todayErrors: string,
    }
    logs: {
        logs: string,
        date: string,
        message: string,
        application: string,
        otherParameters: string,
        project: string,
        todayLogs: string,
    }
    projects: {
        id: string,
        name: string,
        projects: string,
        editProject: string,
        addProject: string,
        telegramUsers: string,
        telegramUsersDescription: string,
        vkUsers: string,
        vkUsersDescription: string,
        urlsForVerifyCertificate: string,
        urlsForVerifyCertificateDescription: string
    }
    shared: {
        add: string,
        back: string,
        cancel: string,
        delete: string,
        edit: string,
        confirm: string,
        exit: string,
        save: string,
        logIn: string,
        select: string,
        defaultLoadingMessage: string,
        notFound: string,
        beginDate: string,
        endDate: string,
        fromDate: string,
        toDate: string,
        dateFiltration: string,
        ok: string,
        close: string
    }
    users: {
        users: string,
        login: string,
        password: string,
        rePassword: string,
        editUser: string,
        addUser: string,
        incorrectId: string,
        userNotFound: string,
    }
}

export default (window as any).localization as Localization

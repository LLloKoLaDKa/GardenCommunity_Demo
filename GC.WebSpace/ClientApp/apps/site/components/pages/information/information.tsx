import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Helmet } from "react-helmet";
import Zakon from '../../../../../../wwwroot/img/zakon.png';
import { GardenContact } from "../../../../../domain/contacts/gardenContacts/gardenContact";
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from "../../../../../domain/statistics/pageEntries/pageEntryBlank";
import { PageEntryType } from "../../../../../domain/statistics/pageEntries/pageEntryType";
import { id } from "../../../../../tools/id/id";
import styles from './information.module.scss';

interface IProps {

}

interface IState {
    memberContribution: number | null,
    targetContribution: number | null,
    bankName: string | null,
    bik: number | null,
    checkingAccount: string | null,
    coresspondentAccount: string | null,
    address: string | null,
    inn: number | null,
    kpp: number | null,
    ogrn: number | null,
    okpo: number | null,
    oktmo: number | null,
    chairman: GardenContact | null
}

export class InformationPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            memberContribution: null,
            targetContribution: null,
            bankName: null,
            bik: null,
            checkingAccount: null,
            coresspondentAccount: null,
            address: null,
            inn: null,
            kpp: null,
            ogrn: null,
            okpo: null,
            oktmo: null,
            chairman: null
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.Information));

        const {
            memberContribution, targetContribution, bankName, bik, checkingAccount,
            coresspondentAccount, inn, kpp, ogrn, okpo, oktmo, address, chairman
        } = await SiteProvider.Information.getContributions();
        console.log(chairman);
        this.setState({
            memberContribution, targetContribution, bankName, bik, checkingAccount,
            coresspondentAccount, inn, kpp, ogrn, okpo, oktmo, address, chairman
        });
    }

    renderRequisite = (header: string, data: any) => {
        return <tr key={id()}>
            <th>
                <div className={styles.header}>{header}</div>
            </th>
            <td>
                <div className={styles.data}>{data ?? <Skeleton variant='text' style={{ margin: '0 auto' }} height='24px' width='150px' />}</div>
            </td>
        </tr>
    }

    render() {
        const { memberContribution, targetContribution, bankName, bik, checkingAccount, inn,
            coresspondentAccount, kpp, ogrn, okpo, oktmo, chairman, address } = this.state;
        return <>
            <Helmet>
                <title>Информация — СНТ «Полесье»</title>
                <meta name="description" content={"На странице вы найдёте основную информацию: реквизиты, тарифы оплаты элетроэнергии и уставные документы"} />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.title}>
                        Тарифы оплаты
                    </div>

                    <div className={styles.payments}>
                        <div className={styles.tarif}>
                            <div className={styles.header}>
                                Членские взносы
                            </div>

                            <div className={styles.price}>
                                {memberContribution ?? <Skeleton variant='text' height='25px' width='60px' />} руб. за соткy
                            </div>
                        </div>

                        <div className={styles.tarif}>
                            <div className={styles.header}>
                                Целевые взносы
                            </div>

                            <div className={styles.price}>
                                {targetContribution ?? <Skeleton variant='text' height='25px' width='60px' />} руб. за участок
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.title}>
                        Информация об СНТ «Полесье»
                    </div>

                    <div className={styles.wrapper}>
                        <div className={`${styles.requisites} overflow-auto`}>
                            <table>
                                <tbody>
                                    {this.renderRequisite("Председатель", chairman?.gardener.fullName())}
                                    {this.renderRequisite("ОГРН", ogrn)}
                                    {this.renderRequisite("ИНН", inn)}
                                    {this.renderRequisite("КПП", kpp)}
                                    {this.renderRequisite("ОКПО", okpo)}
                                    {this.renderRequisite("Расчётный счёт", checkingAccount)}
                                    {this.renderRequisite("ОКТМО", oktmo)}
                                    {this.renderRequisite("Банк", bankName)}
                                    {this.renderRequisite("Корреспондентский счёт ", coresspondentAccount)}
                                    {this.renderRequisite("БИК", bik)}
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.infos}>
                            <div className={styles.info}>
                                <div className={styles.subject}> Адрес </div>
                                <div className={styles.data}>
                                    {address ?? <Skeleton variant='text' height='24px' width='80%' style={{ margin: '0 auto' }} />}
                                </div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.subject}> Реквизиты </div>
                                <div className={styles.data}>
                                    Все реквизиты СНТ «Полесье» указаны в таблице, но вы можете скачать их по кнопке ниже.

                                    <a className={styles.link} href="/dist/Requizites.pdf" download>
                                        Скачать реквизиты СНТ
                                    </a>
                                </div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.subject}> Устав СНТ </div>

                                <a className={styles.link} href="/dist/Regulations.pdf" target="_blank">
                                    Посмотреть устав...
                                </a>
                                <a className={styles.link} href="/dist/Regulations.pdf" download>
                                    Скачать устав
                                </a>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.subject}> Схема СНТ </div>
                                <div className={styles.data}>

                                    <a className={styles.link} href="/dist/scheme.jpg" target="_blank">
                                        Открыть схему...
                                    </a>
                                </div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.subject}> Публичная кадастровая карта </div>
                                <div className={styles.data}>
                                    {"Чтобы найти свой участок на карте, вам необходимо перейти по ссылке и ввести свой кадастроый номер в поле поиска 'Найти обьекты...'"}
                                    <a className={styles.link} href="https://pkk.rosreestr.ru/#/search/54.985472243917734,38.556786603477995/16/@2y1wvgtxv" target="_blank">
                                        Открыть карту...
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.title}>
                        Законы и постановления
                    </div>

                    <img src={Zakon} className={styles.image} />

                    <a href="http://www.consultant.ru/document/cons_doc_LAW_221173/" target={"_blank"} className={styles.link}>
                        Федеральный закон о ведении гражданами садоводства и огородничества для собственых нужд
                        и о внесении изменений в отдельные законодательные акты Российской Федерации...
                    </a>
                </div>
            </div>
        </>
    }
}
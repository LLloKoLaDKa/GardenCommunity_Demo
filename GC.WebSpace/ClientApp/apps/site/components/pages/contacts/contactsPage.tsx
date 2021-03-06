import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import React from "react";
import { Helmet } from "react-helmet";
import { EmergencyContact } from "../../../../../domain/contacts/emergencyContacts/emergencyContact";
import { EmergencyContactType } from "../../../../../domain/contacts/emergencyContacts/emergencyContactType";
import { ForeignContact } from "../../../../../domain/contacts/foreignContacts/foreignContact";
import { ForeignContactType } from "../../../../../domain/contacts/foreignContacts/foreignContactType";
import { GardenContact } from "../../../../../domain/contacts/gardenContacts/gardenContact";
import { GardenContactType } from "../../../../../domain/contacts/gardenContacts/gardenContactType";
import { AppealBlank } from "../../../../../domain/gardens/appeals/appealBlank";
import { GardenSector } from '../../../../../domain/gardens/gardenSectors/gardenSector';
import { GardenStreet } from '../../../../../domain/gardens/gardenStreet';
import { SiteProvider } from "../../../../../domain/site/siteProvider";
import { PageEntryBlank } from '../../../../../domain/statistics/pageEntries/pageEntryBlank';
import { PageEntryType } from '../../../../../domain/statistics/pageEntries/pageEntryType';
import { MyMainButton } from '../../../../../shared/myButton/myMainButton';
import { MaskedTextBox } from "../../../../../shared/myinputs/maskedTextBox/maskedTextBox";
import { TextBox } from "../../../../../shared/myinputs/textBox/textBox";
import { id } from '../../../../../tools/id/id';
import { isNullOrWhiteSpace } from '../../../../../tools/stringUtils';
import styles from './contactsPage.module.scss';
import { ViewAllContacts } from './viewAllContacts/viewAllContacts';

interface IProps {

}

interface IState {
    emergencyContacts: EmergencyContact[],
    foreignContacts: ForeignContact[],
    gardenContacts: GardenContact[],
    appealBlank: AppealBlank,
    sendError: string | null,
    appealSended: boolean,
    sectors: GardenSector[],

    viewedStreet: GardenStreet | null,
    viewedContacts: GardenContact[]
}

export class ContactsPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            emergencyContacts: [],
            foreignContacts: [],
            gardenContacts: [],
            appealBlank: AppealBlank.empty(),
            sendError: null,
            appealSended: false,
            sectors: [],

            viewedStreet: null,
            viewedContacts: []
        }
    }

    componentDidMount = async () => {
        SiteProvider.Statistics.savePageEntry(PageEntryBlank.create(PageEntryType.Contacts));

        const { emergencyContacts, foreignContacts, gardenContacts } = await SiteProvider.Contacts.getAllContacts();
        const sectorIds = gardenContacts.map(gc => gc.gardener.sectorId);
        const sectors = await SiteProvider.Sectors.getByIds(sectorIds);

        this.setState({ emergencyContacts, foreignContacts, gardenContacts, sectors });
    }

    markToViewContacts = (viewedStreet: GardenStreet, viewedContacts: GardenContact[]) => {
        this.setState({ viewedStreet, viewedContacts });
    }

    unmarkViewContacts = () => {
        this.setState({ viewedContacts: [], viewedStreet: null });
    }

    changeFirstName = async (name: string) => {
        const { appealBlank } = this.state;
        appealBlank.firstName = name == "" ? null : name;

        this.setState({ appealBlank });
    }

    changeLastName = async (name: string) => {
        const { appealBlank } = this.state;
        appealBlank.lastName = name == "" ? null : name;

        this.setState({ appealBlank });
    }

    changePhoneNumber = (phoneNumber: string | null) => {
        const { appealBlank } = this.state;
        appealBlank.phoneNumber = phoneNumber;

        this.setState({ appealBlank });
    }

    changeEmail = (email: string | null) => {
        const { appealBlank } = this.state;
        appealBlank.email = email;

        this.setState({ appealBlank });
    }

    changeTitle = (title: string | null) => {
        const { appealBlank } = this.state;
        appealBlank.title = title;

        this.setState({ appealBlank });
    }

    changeMessage = (message: string | null) => {
        const { appealBlank } = this.state;
        appealBlank.message = message;

        this.setState({ appealBlank });
    }

    inProcessOfSending: boolean = false;
    sendAppeal = async () => {
        if (this.inProcessOfSending) return;
        this.inProcessOfSending = true;
        try {
            const { appealBlank } = this.state;
            if (isNullOrWhiteSpace(appealBlank.firstName)) return this.setState({ sendError: "???? ?????????????? ?????? ??????????????????????" });
            if (isNullOrWhiteSpace(appealBlank.lastName)) return this.setState({ sendError: "???? ?????????????? ?????????????? ??????????????????????" });
            if (isNullOrWhiteSpace(appealBlank.phoneNumber)) return this.setState({ sendError: "???? ???????????? ?????????? ??????????????????????" });
            if (isNullOrWhiteSpace(appealBlank.title)) return this.setState({ sendError: "???? ?????????????? ???????? ??????????????????" });
            if (isNullOrWhiteSpace(appealBlank.message)) return this.setState({ sendError: "???? ?????????????? ?????????????????? ??????????????????" });
            if (appealBlank.email != null && (isNullOrWhiteSpace(appealBlank.email) || !appealBlank.email.includes('@'))) {
                console.log(isNullOrWhiteSpace(appealBlank.email) || !appealBlank.email.includes('@'));
                return this.setState({ sendError: "???????????????? ???????????? ??????????" });
            }

            const result = await SiteProvider.Appeals.saveAppeal(appealBlank);
            if (!result.isSuccess) return this.setState({ sendError: result.getErrorsString() });

            this.setState({ appealSended: true, sendError: null });
        }
        finally {
            this.inProcessOfSending = false;
        }
    }

    setSendError = (message: string) => {
        this.setState({ sendError: message, appealSended: false });
    }

    renderInfo = (icon: JSX.Element, data: JSX.Element) => {
        return <>
            <div className={styles.info}>
                <div className={styles.icon}>
                    {icon}
                </div>

                <div className={styles.data}>
                    {data}
                </div>
            </div>
        </>
    }

    renderStreetSenior = (street: GardenStreet) => {
        const { gardenContacts, sectors } = this.state;

        const gardenSectors = sectors.filter(s => GardenStreet.getNumbersForStreet(street).includes(s.sectorNumber));
        const contact = gardenContacts.find(gc => gc.type == GardenContactType.SeniorOnStreet
            && gardenSectors.some(gs => gs.id == gc.gardener.sectorId));
        const sector = gardenSectors.find(s => s.id == contact?.gardener.sectorId);

        const streetContacts = gardenContacts.filter(gc => gc.type == GardenContactType.SeniorOnStreet
            && gardenSectors.some(gs => gs.id == gc.gardener.sectorId));
        const seniorsCount = streetContacts.length;

        return <div className={styles.street_contact} key={id()}>
            <div className={styles.title}>
                {GardenStreet.getDisplayName(street)}
            </div>

            {
                gardenContacts.length == 0 ? <Skeleton variant='rectangular' height='150px' width='286px' style={{ margin: '0 auto' }} />
                    :
                    contact == undefined
                        ?
                        <div className={styles.empty_senior}>
                            ?????????????? ?????????? ???? ????????????
                        </div>
                        :
                        <div className={styles.senior}>
                            {
                                this.renderInfo(<AccountCircleOutlinedIcon />, <>
                                    <div className={styles.names}>
                                        {contact?.gardener.fullName() ?? '???? ??????????????'}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<LocalPhoneIcon />, <>
                                    <div className={styles.name}>
                                        {contact?.phoneNumber ?? '???? ????????????'}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<SignpostOutlinedIcon />, <>
                                    <div className={styles.name}>
                                        {`??????????: ${GardenStreet.getDisplayNameBySectorNumber(sector?.sectorNumber) ?? '???? ??????????????'}`}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<HomeOutlinedIcon />, <>
                                    <div className={styles.name}>
                                        {`??????????????: ${sector?.sectorNumber ?? '???? ????????????'}`}
                                    </div>
                                </>)
                            }
                        </div>
            }

            {
                seniorsCount > 1 &&
                <div className={styles.showButton} onClick={() => this.markToViewContacts(street, streetContacts)}>
                    ???????????????? ?????? ???????????????? ??????????
                </div>
            }
        </div>
    }

    renderForeign = (type: ForeignContactType) => {
        const contact = this.state.foreignContacts.find(fc => fc.type == type);
        if (type == ForeignContactType.Electric && contact == undefined) return <></>;

        return <div className={styles.contact}>
            <div className={styles.title}>{ForeignContactType.getDisplayName(type)}</div>
            {
                this.state.foreignContacts.length == 0 ? <Skeleton variant='rectangular' height='60px' width='252px' style={{ margin: '0 auto' }} />
                    :
                    contact == undefined
                        ?
                        <div className={styles.empty_contact}>
                            ???????????? ???? ??????????????
                        </div>
                        :
                        <div className={styles.infos}>
                            {
                                this.renderInfo(<AccountCircleOutlinedIcon />, <>
                                    <div className={styles.names}>
                                        {contact?.fullName ?? '???? ??????????????'}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<LocalPhoneIcon />, <>
                                    <div className={styles.name}>
                                        {contact?.phoneNumber ?? '???? ????????????'}
                                    </div>
                                </>)
                            }
                        </div>
            }
        </div>
    }

    renderEmergencyContact = (type: EmergencyContactType) => {
        const contact = this.state.emergencyContacts.find(ec => ec.type == type);

        return <div className={styles.contact}>
            <div className={styles.title}>{EmergencyContactType.getDisplayName(type)}</div>
            {
                this.state.emergencyContacts.length == 0 ? <Skeleton variant='rectangular' height='65px' width='177px' style={{ margin: '0 auto' }} />
                    :
                    contact == undefined
                        ?
                        <div className={styles.empty_contact}>
                            ???????????? ???? ??????????????
                        </div>
                        :
                        <div className={styles.infos}>
                            {
                                this.renderInfo(<LocalPhoneIcon />, <>
                                    <div className={styles.names}>
                                        {contact?.mobilePhone ?? '???? ??????????????'}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<ApartmentIcon />, <>
                                    <div className={styles.name}>
                                        {contact?.cityPhone ?? '???? ????????????'}
                                    </div>
                                </>)
                            }
                        </div>
            }
        </div>
    }

    renderDivider = (label: string) => {
        return <div>
            <Divider>
                <Chip sx={{ fontSize: '18px' }} label={label} />
            </Divider>
        </div>
    }

    render() {
        const { emergencyContacts, foreignContacts, gardenContacts, appealBlank, sendError,
            appealSended, sectors, viewedStreet, viewedContacts } = this.state;

        const chairman = gardenContacts.find(g => g.type == GardenContactType.Chairman);
        const chairmanSector = sectors.find(gs => gs.id == chairman?.gardener.sectorId);

        const accountant = gardenContacts.find(g => g.type == GardenContactType.Accountant);
        const accountantSector = sectors.find(gs => gs.id == accountant?.gardener.sectorId);

        return <>
            <Helmet>
                <title>???????????????? ??? ?????? ??????????????????</title>
                <meta name="description" content={`???????????? ?? ???????????????????????????? ?????????? ?????? ?????????????????? ??? ????????????????????????: ${chairman?.gardener.fullName()}`} />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.chairman}>
                    <div className={styles.contact}>
                        <div className={styles.title}>
                            ???????????? ????????????????????????
                        </div>

                        <div className={styles.infos}>

                            {
                                this.renderInfo(<AccountCircleOutlinedIcon />, <>
                                    <div className={styles.names}>
                                        {chairman?.gardener.fullName() ?? <Skeleton variant='text' height='24px' width='200px' />}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<LocalPhoneIcon />, <>
                                    <div className={styles.name}>
                                        {chairman?.phoneNumber ?? <Skeleton variant='text' height='24px' width='200px' />}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<SignpostOutlinedIcon />, <>
                                    <div className={styles.name}>
                                        {chairman != null ? `??????????: ${GardenStreet.getDisplayNameBySectorNumber(chairmanSector?.sectorNumber)}` : <Skeleton variant='text' height='24px' width='200px' />}
                                    </div>
                                </>)
                            }

                            {
                                this.renderInfo(<HomeOutlinedIcon />, <>
                                    <div className={styles.name}>
                                        {chairman != null ? `??????????????: ${chairmanSector?.sectorNumber}` : <Skeleton variant='text' height='24px' width='200px' />}
                                    </div>
                                </>)
                            }
                        </div>
                    </div>

                    <div className={styles.sendBlock}>
                        <div className={styles.title}>
                            ?????????????????? ?? ????????????????????????
                        </div>

                        <div className={styles.combo}>
                            <TextBox
                                required
                                label="???????? ??????"
                                value={appealBlank.firstName ?? ""}
                                onChange={this.changeFirstName}
                            />

                            <TextBox
                                required
                                label="???????? ??????????????"
                                value={appealBlank.lastName ?? ""}
                                onChange={this.changeLastName}
                            />
                        </div>

                        <div className={styles.combo}>
                            <MaskedTextBox
                                label='?????????? ????????????????'
                                value={appealBlank.phoneNumber}
                                onChange={this.changePhoneNumber}
                                mask='+7(999) 999-99-99'
                            />

                            <TextBox
                                label="???????? ??????????"
                                value={appealBlank.email ?? ""}
                                onChange={this.changeEmail}
                            />
                        </div>


                        <TextBox
                            required
                            label="???????? ??????????????????"
                            value={appealBlank.title ?? ""}
                            onChange={this.changeTitle}
                        />

                        <TextBox
                            required
                            multiline
                            label="?????????? ??????????????????"
                            value={appealBlank.message ?? ""}
                            onChange={this.changeMessage}
                        />

                        <MyMainButton text={'?????????????????? ??????????????????'} fullWidth onClick={this.sendAppeal} />

                        {
                            sendError != null &&
                            <div className={styles.error}>
                                {sendError}
                            </div>
                        }

                        {
                            appealSended &&
                            <div className={styles.success}>
                                ????????????????????
                            </div>
                        }
                    </div>
                </div>

                {this.renderDivider('?????????????????? ??????')}

                <div className={styles.accountant}>
                    {
                        accountant == null
                            ?
                            <Skeleton variant='rectangular' className={styles.fakeAccountant} />
                            :
                            <>
                                {
                                    this.renderInfo(<AccountCircleOutlinedIcon />, <>
                                        <div className={styles.names}>
                                            {accountant?.gardener.fullName()}
                                        </div>
                                    </>)
                                }

                                {
                                    this.renderInfo(<LocalPhoneIcon />, <>
                                        <div className={styles.name}>
                                            {accountant?.phoneNumber ?? '???? ????????????'}
                                        </div>
                                    </>)
                                }

                                {
                                    this.renderInfo(<SignpostOutlinedIcon />, <>
                                        <div className={styles.name}>
                                            {`??????????: ${GardenStreet.getDisplayNameBySectorNumber(accountantSector?.sectorNumber) ?? '???? ??????????????'}`}
                                        </div>
                                    </>)
                                }

                                {
                                    this.renderInfo(<HomeOutlinedIcon />, <>
                                        <div className={styles.name}>
                                            {`??????????????: ${accountantSector?.sectorNumber ?? '???? ????????????'}`}
                                        </div>
                                    </>)
                                }
                            </>
                    }
                </div>

                {this.renderDivider('?????????????? ????????')}

                <div className={styles.street_seniors}>
                    {GardenStreet.getAll().map(this.renderStreetSenior)}
                </div>

                {this.renderDivider('?????????????? ????????????????')}

                <div className={styles.foreign_contacts}>
                    {this.renderForeign(ForeignContactType.Electric)}
                    {this.renderForeign(ForeignContactType.Forester)}
                    {this.renderForeign(ForeignContactType.LocalPoliceman)}
                </div>

                {this.renderDivider('???????????????????? ????????????')}

                <div className={styles.emergency_contacts}>
                    {this.renderEmergencyContact(EmergencyContactType.Police)}
                    {this.renderEmergencyContact(EmergencyContactType.Ambulance)}
                    {this.renderEmergencyContact(EmergencyContactType.FireDepartment)}
                    {this.renderEmergencyContact(EmergencyContactType.LandCommittee)}
                    {this.renderEmergencyContact(EmergencyContactType.MinistryOfEmergencySituations)}
                </div>
            </div>
            {
                viewedStreet != null &&
                <ViewAllContacts
                    sectors={sectors}
                    street={viewedStreet}
                    contacts={viewedContacts}
                    onClose={this.unmarkViewContacts}
                />
            }
        </>
    }
}
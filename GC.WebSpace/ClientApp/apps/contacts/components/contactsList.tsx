import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import { AllContactsBlank } from "../../../domain/contacts/allContactsBlank";
import { ContactsProvider } from "../../../domain/contacts/contactsProvider";
import { EmergencyContactBlank } from "../../../domain/contacts/emergencyContacts/emergencyContactBlank";
import { EmergencyContactType } from "../../../domain/contacts/emergencyContacts/emergencyContactType";
import { ForeignContactBlank } from "../../../domain/contacts/foreignContacts/foreignContactBlank";
import { ForeignContactType } from "../../../domain/contacts/foreignContacts/foreignContactType";
import { GardenContactBlank } from "../../../domain/contacts/gardenContacts/gardenContactBlank";
import { GardenContactType } from "../../../domain/contacts/gardenContacts/gardenContactType";
import { Gardener } from '../../../domain/gardens/gardeners/gardener';
import { GardenSector } from "../../../domain/gardens/gardenSectors/gardenSector";
import { GardensProvider } from "../../../domain/gardens/gardensProvider";
import { GardenStreet } from "../../../domain/gardens/gardenStreet";
import { BlockUi } from "../../../shared/blockUi/blockUi";
import { id } from "../../../tools/id/id";
import { addErrorNotification, addSuccessNotification } from "../../../tools/notifications";
import { Header } from "../../root/header";
import styles from '../content/contactsList.module.scss';
import { EmergencyContactEditorModal } from "./emergencyContactEditorModal";
import { ForeignContactEditorModal } from "./foreignContactEditorModal";
import { GardenContactEditorModal } from "./gardenContactEditorModal";

interface IProps { }

interface IState {
    emergencyBlanks: EmergencyContactBlank[],
    foreignBlanks: ForeignContactBlank[],
    gardenBlanks: GardenContactBlank[],
    gardeners: Gardener[],
    gardenSectors: GardenSector[],
    gardenStreets: GardenStreet[],
    editingEmergencyBlank: EmergencyContactBlank | null,
    editingForeignBlank: ForeignContactBlank | null,
    editingGardenBlank: GardenContactBlank | null
}

export class ContactsList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            emergencyBlanks: [],
            foreignBlanks: [],
            gardenBlanks: [],
            gardenSectors: [],
            gardeners: [],
            gardenStreets: GardenStreet.getAll(),
            editingEmergencyBlank: null,
            editingForeignBlank: null,
            editingGardenBlank: null
        }
    }

    componentDidMount = async () => {
        await BlockUi.blockAsync(async () => {
            const { emergencyContacts, foreignContacts, gardenContacts } = await ContactsProvider.getAllContacts();
            const gardenSectors = await GardensProvider.GardenSectors.getAll();
            const gardeners = await GardensProvider.Gardeners.getAll();

            this.setState({
                emergencyBlanks: emergencyContacts.map(EmergencyContactBlank.create),
                foreignBlanks: foreignContacts.map(ForeignContactBlank.create),
                gardenBlanks: gardenContacts.map(GardenContactBlank.create),
                gardenSectors,
                gardeners
            });
        });
    }

    markToEditChairman = (chairmanContact: GardenContactBlank | undefined) =>
        this.setState({ editingGardenBlank: chairmanContact ?? GardenContactBlank.emptyWithType(GardenContactType.Chairman) });

    markToEditAccountant = (accountant: GardenContactBlank | undefined) =>
        this.setState({ editingGardenBlank: accountant ?? GardenContactBlank.emptyWithType(GardenContactType.Accountant) });

    markToAddStreetContact = (street: GardenStreet) =>
        this.setState({ editingGardenBlank: GardenContactBlank.emptyWithType(GardenContactType.SeniorOnStreet, street) });

    markToEditFireDepartment = (fireDepartment: EmergencyContactBlank | undefined) =>
        this.setState({ editingEmergencyBlank: fireDepartment ?? EmergencyContactBlank.emptyWithType(EmergencyContactType.FireDepartment) });

    markToEditPolice = (police: EmergencyContactBlank | undefined) =>
        this.setState({ editingEmergencyBlank: police ?? EmergencyContactBlank.emptyWithType(EmergencyContactType.Police) });

    markToEditAmbulance = (ambulance: EmergencyContactBlank | undefined) =>
        this.setState({ editingEmergencyBlank: ambulance ?? EmergencyContactBlank.emptyWithType(EmergencyContactType.Ambulance) });

    markToEditMinistryOfES = (ministry: EmergencyContactBlank | undefined) =>
        this.setState({ editingEmergencyBlank: ministry ?? EmergencyContactBlank.emptyWithType(EmergencyContactType.MinistryOfEmergencySituations) });

    markToEditLandCommitte = (landCommitte: EmergencyContactBlank | undefined) =>
        this.setState({ editingEmergencyBlank: landCommitte ?? EmergencyContactBlank.emptyWithType(EmergencyContactType.LandCommittee) });

    markToEditElectric = (electric: ForeignContactBlank | undefined) =>
        this.setState({ editingForeignBlank: electric ?? ForeignContactBlank.emptyWithType(ForeignContactType.Electric) });

    markToEditLocalPoliceman = (localPoliceman: ForeignContactBlank | undefined) =>
        this.setState({ editingForeignBlank: localPoliceman ?? ForeignContactBlank.emptyWithType(ForeignContactType.LocalPoliceman) });

    markToEditForester = (forester: ForeignContactBlank | undefined) =>
        this.setState({ editingForeignBlank: forester ?? ForeignContactBlank.emptyWithType(ForeignContactType.Forester) });

    markToEditStreetContact = (editingGardenBlank: GardenContactBlank) => this.setState({ editingGardenBlank })
    unmarkEditingGardenContact = () => this.setState({ editingGardenBlank: null });
    unmarkToEditEmergencyContact = () => this.setState({ editingEmergencyBlank: null });
    unmarkToEditForeignContact = () => this.setState({ editingForeignBlank: null });

    addGardenContact = (gardenContact: GardenContactBlank) => {
        let { gardenBlanks } = this.state;

        const existContact = gardenBlanks.find(d => d.id == gardenContact.id)
        if (existContact != undefined) gardenBlanks = gardenBlanks.filter(g => g.id != existContact.id)

        gardenBlanks.push(gardenContact)
        this.setState({ gardenBlanks });
    }

    addEmergencyContact = (emergencyContact: EmergencyContactBlank) => {
        let { emergencyBlanks } = this.state;

        const existContact = emergencyBlanks.find(e => e.id == emergencyContact.id);
        if (existContact != undefined) emergencyBlanks = emergencyBlanks.filter(e => e.id != existContact.id);

        emergencyBlanks.push(emergencyContact);
        this.setState({ emergencyBlanks });
    }

    addForeignContact = (foreignContact: ForeignContactBlank) => {
        let { foreignBlanks } = this.state;

        const existContact = foreignBlanks.find(f => f.id == foreignContact.id);
        if (existContact != undefined) foreignBlanks = foreignBlanks.filter(f => f.id != existContact.id);

        foreignBlanks.push(foreignContact);
        this.setState({ foreignBlanks });
    }

    deleteGardenContact = (contactId: string) => {
        let { gardenBlanks } = this.state;
        gardenBlanks = gardenBlanks.filter(g => g.id != contactId);

        this.setState({ gardenBlanks });
    }

    deleteEmergencyContact = (contactId: string) => {
        let { emergencyBlanks } = this.state;
        emergencyBlanks = emergencyBlanks.filter(e => e.id != contactId);

        this.setState({ emergencyBlanks });
    }

    deleteForeignContact = (contactId: string) => {
        let { foreignBlanks } = this.state;
        foreignBlanks = foreignBlanks.filter(f => f.id != contactId);

        this.setState({ foreignBlanks });
    }

    save = async () => {
        await BlockUi.blockAsync(async () => {
            const { gardenBlanks, emergencyBlanks, foreignBlanks } = this.state;

            const allContacts = new AllContactsBlank(emergencyBlanks, foreignBlanks, gardenBlanks);
            const result = await ContactsProvider.saveContacts(allContacts);
            if (!result.isSuccess) return addErrorNotification(result.getErrorsString());

            addSuccessNotification("Контакты сохранены!");
        });
    }

    renderChairman = () => {
        const { gardeners, gardenSectors, gardenBlanks } = this.state;
        const chairman = gardenBlanks.find(g => g.type == GardenContactType.Chairman);
        if (chairman == undefined) return 'Не выбран';

        const gardener = gardeners.find(g => g.id == chairman.gardenerId)
        if (gardener == undefined) return 'Не выбран';

        const sector = gardenSectors.find(gs => gs.id == gardener.sectorId);
        if (sector == undefined) return 'Не выбран';

        return <>
            <div className={styles.name}>
                {`(${sector.sectorNumber}) ${gardener.fullName()}`}
            </div>
            <div className={styles.phone}>
                {chairman.phoneNumber}
            </div>
        </>
    }

    renderAccountant = () => {
        const { gardeners, gardenSectors, gardenBlanks } = this.state;
        const accountant = gardenBlanks.find(g => g.type == GardenContactType.Accountant);
        if (accountant == undefined) return 'Не выбран';

        const gardener = gardeners.find(g => g.id == accountant.gardenerId)
        if (gardener == undefined) return 'Не выбран';

        const sector = gardenSectors.find(gs => gs.id == gardener.sectorId);
        if (sector == undefined) return 'Не выбран';

        return <>
            <div className={styles.name}>
                {`(${sector.sectorNumber}) ${gardener.fullName()}`}
            </div>
            <div className={styles.phone}>
                {accountant.phoneNumber}
            </div>
        </>
    }

    renderGardenStreetContacts = (street: GardenStreet) => {
        const { gardenBlanks, gardenSectors, gardeners } = this.state;
        const streetSectors = gardenSectors.filter(gs => GardenStreet.findStreetBySectroNumber(gs.sectorNumber) == street);
        const streetGardeners = gardeners.filter(g => streetSectors.some(gs => g.sectorId == gs.id));
        const streetContacts = gardenBlanks.filter(g =>
            streetGardeners.some(gardener => gardener.id == g.gardenerId && g.type == GardenContactType.SeniorOnStreet));

        return (
            <div className={styles.street} key={id()}>
                <h5>{GardenStreet.getDisplayName(street)}</h5>

                {
                    streetContacts.map(sc => this.renderContact(sc, () => this.markToEditStreetContact(sc)))
                }

                <div className={styles.contactAdding} onClick={() => this.markToAddStreetContact(street)}>
                    <AddCircleOutlineIcon />
                </div>
            </div>
        );
    }

    renderContact = (contact: GardenContactBlank, click: () => void) => {
        const { gardenSectors, gardeners } = this.state;
        const gardener = gardeners.find(g => g.id == contact.gardenerId);
        if (gardener == undefined) return;

        const sector = gardenSectors.find(gs => gs.id == gardener.sectorId);
        if (sector == undefined) return;

        return <div className={styles.contact} onClick={click} key={contact.id}>
            <div className={styles.name}>
                {`(${sector.sectorNumber}) ${gardener.fullName()}`}
            </div>
            <div className={styles.phone}>
                {contact.phoneNumber}
            </div>
        </div>
    }

    renderEmergencyContact = (emergencyContact: EmergencyContactBlank | undefined) => {
        return <>
            {
                emergencyContact != undefined
                    ?
                    <>
                        <div className={styles.mobile_phone}>
                            {`Мобильный телефон: ${emergencyContact.mobilePhone == null ? 'не введён' : emergencyContact.mobilePhone}`}
                        </div>

                        <div className={styles.city_phone}>
                            {`Городской телефон: ${emergencyContact.cityPhone == null ? 'не введён' : emergencyContact.cityPhone}`}
                        </div>
                    </>
                    :
                    'Не ведено'
            }
        </>
    }

    renderForeignContact = (foreignContact: ForeignContactBlank | undefined, click: (contact: ForeignContactBlank | undefined) => void) => {
        return <>
            <div className={styles.contact} onClick={() => click(foreignContact)} key={id()}>
                {
                    foreignContact != undefined
                        ?
                        <>
                            <div className={styles.name}>
                                {`${foreignContact.lastName} ${foreignContact.firstName} ${foreignContact.middleName == null ? '' : foreignContact.middleName}`}
                            </div>
                            <div className={styles.phone}>
                                {foreignContact.phoneNumber}
                            </div>
                        </>
                        :
                        'Не выбран'
                }
            </div>
        </>
    }

    render() {
        const {
            emergencyBlanks,
            foreignBlanks,
            gardenBlanks,
            gardenSectors,
            gardeners,
            gardenStreets,
            editingEmergencyBlank,
            editingForeignBlank,
            editingGardenBlank
        } = this.state;

        const chairman = gardenBlanks.find(g => g.type == GardenContactType.Chairman);
        const accountant = gardenBlanks.find(g => g.type == GardenContactType.Accountant);

        const fireDepartment = emergencyBlanks.find(e => e.type == EmergencyContactType.FireDepartment);
        const policeContact = emergencyBlanks.find(e => e.type == EmergencyContactType.Police);
        const ambulance = emergencyBlanks.find(e => e.type == EmergencyContactType.Ambulance);
        const ministryOfES = emergencyBlanks.find(e => e.type == EmergencyContactType.MinistryOfEmergencySituations);
        const landCommittee = emergencyBlanks.find(e => e.type == EmergencyContactType.LandCommittee);

        const electric = foreignBlanks.find(f => f.type == ForeignContactType.Electric);
        const localPoliceman = foreignBlanks.find(f => f.type == ForeignContactType.LocalPoliceman);
        const forester = foreignBlanks.find(f => f.type == ForeignContactType.Forester);

        return <>
            <Header
                headerTitle="Контакты"
                buttonContent='Сохранить'
                buttonIcon={<SaveIcon />}
                buttonOnClick={this.save}
            />

            <div className={styles.wrapper}>
                <fieldset className={styles.gardenContacts}>
                    <legend>Уполномоченные лица</legend>
                    <div className={styles.contacts}>
                        <div className={styles.header}> Председатель СНТ </div>

                        <div className={`${styles.contact}`} onClick={() => this.markToEditChairman(chairman)}>
                            {this.renderChairman()}
                        </div>

                        <div className={styles.header}> Бухгалтер СНТ </div>

                        <div className={styles.contact} onClick={() => this.markToEditAccountant(accountant)}>
                            {this.renderAccountant()}
                        </div>

                        <div className={styles.header}> Старшие улиц </div>
                        {gardenStreets.map(this.renderGardenStreetContacts)}
                    </div>
                </fieldset>

                <div className={styles.second_column}>

                    <fieldset className={styles.gardeners}>
                        <legend>Экстренные службы</legend>

                        <div className={styles.header}>Пожарная часть</div>
                        <div className={styles.contact} onClick={() => this.markToEditFireDepartment(fireDepartment)}>
                            {this.renderEmergencyContact(fireDepartment)}
                        </div>

                        <div className={styles.header}>Полиция</div>
                        <div className={styles.contact} onClick={() => this.markToEditPolice(policeContact)}>
                            {this.renderEmergencyContact(policeContact)}
                        </div>

                        <div className={styles.header}>Скорая помощь</div>
                        <div className={styles.contact} onClick={() => this.markToEditAmbulance(ambulance)}>
                            {this.renderEmergencyContact(ambulance)}
                        </div>

                        <div className={styles.header}>МЧС</div>
                        <div className={styles.contact} onClick={() => this.markToEditMinistryOfES(ministryOfES)}>
                            {this.renderEmergencyContact(ministryOfES)}
                        </div>

                        <div className={styles.header}>Земельный комитет</div>
                        <div className={styles.contact} onClick={() => this.markToEditLandCommitte(landCommittee)}>
                            {this.renderEmergencyContact(landCommittee)}
                        </div>
                    </fieldset>


                    <fieldset className={styles.gardeners}>
                        <legend>Внешние контакты</legend>

                        <div className={styles.header}>Электрик</div>
                        {this.renderForeignContact(electric, this.markToEditElectric)}

                        <div className={styles.header}>Участковый</div>
                        {this.renderForeignContact(localPoliceman, this.markToEditLocalPoliceman)}

                        <div className={styles.header}>Старший Лесничий</div>
                        {this.renderForeignContact(forester, this.markToEditForester)}

                    </fieldset>
                </div>
            </div>

            {
                editingGardenBlank &&
                <GardenContactEditorModal
                    isDeletable={gardenBlanks.some(g => g.id == editingGardenBlank.id)}
                    contactBlank={editingGardenBlank}
                    gardenSectors={gardenSectors}
                    gardeners={gardeners}
                    toSave={this.addGardenContact}
                    toDelete={this.deleteGardenContact}
                    onClose={this.unmarkEditingGardenContact}
                />
            }

            {
                editingEmergencyBlank &&
                <EmergencyContactEditorModal
                    isDeletable={emergencyBlanks.some(e => e.id == editingEmergencyBlank.id)}
                    contactBlank={editingEmergencyBlank}
                    onClose={this.unmarkToEditEmergencyContact}
                    toSave={this.addEmergencyContact}
                    toDelete={this.deleteEmergencyContact}
                />
            }

            {
                editingForeignBlank &&
                <ForeignContactEditorModal
                    contactBlank={editingForeignBlank}
                    isDeletable={foreignBlanks.some(f => f.id == editingForeignBlank.id)}
                    onClose={this.unmarkToEditForeignContact}
                    toSave={this.addForeignContact}
                    toDelete={this.deleteForeignContact}
                />
            }
        </>
    }
}
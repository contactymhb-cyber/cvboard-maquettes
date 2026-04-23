"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bell,
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  ClipboardList,
  Download,
  FileSpreadsheet,
  Filter,
  FolderKanban,
  HomeIcon,
  Leaf,
  Menu,
  Search,
  Settings,
  Smartphone,
  SunMedium,
  UserCog,
  Users
} from "lucide-react";

type ActivityType = "GMS" | "Solaire";
type PageKey =
  | "home"
  | "clients"
  | "users"
  | "planning"
  | "reports"
  | "settings"
  | "exports"
  | "application";
type VisualVariant = "V1" | "V2" | "V3";

type Client = {
  id: string;
  activity: ActivityType;
  name: string;
  brand: string;
  brandShort: string;
  city: string;
  lastCleaning: string;
  revenue: string;
  status: string;
  contractType: string;
  chantierName: string;
  chantierCode: string;
  address: string;
  contact: string;
  billing: { label: string; value: string }[];
  chantierInfo: { label: string; value: string }[];
  interventions: { label: string; value: string }[];
};

type PlanningView = "Jour" | "Semaine" | "Mois" | "Annee";
type PlanningStatus = "done_reported" | "done_missing_report" | "scheduled";
type PlanningTeam = "G1" | "G2" | "G3" | "S1" | "S2" | "S3";

type PlanningEntry = {
  id: string;
  activity: ActivityType;
  team: PlanningTeam;
  client: string;
  date: string;
  start: string;
  title: string;
  status: PlanningStatus;
};

const navItems: { id: PageKey; label: string; icon: typeof HomeIcon }[] = [
  { id: "home", label: "Accueil", icon: HomeIcon },
  { id: "clients", label: "Fiches clients", icon: FolderKanban },
  { id: "users", label: "Utilisateurs", icon: UserCog },
  { id: "planning", label: "Planning", icon: CalendarClock },
  { id: "reports", label: "Rapports d'intervention", icon: ClipboardList },
  { id: "settings", label: "Parametres", icon: Settings },
  { id: "exports", label: "Export", icon: Download },
  { id: "application", label: "Application", icon: Smartphone }
];

const pageTitles: Record<PageKey, string> = {
  home: "Accueil",
  clients: "Portefeuille clients",
  users: "Utilisateurs",
  planning: "Planning",
  reports: "Rapports d'intervention",
  settings: "Parametres",
  exports: "Export",
  application: "Application"
};

const clients: Client[] = [
  {
    id: "gms-001",
    activity: "GMS",
    name: "Intermarche Plateau",
    brand: "Intermarche",
    brandShort: "IN",
    city: "Praia",
    lastCleaning: "22 avr. 2026",
    revenue: "18 400 EUR",
    status: "Actif",
    contractType: "Entretien magasin",
    chantierName: "Intermarche Plateau - Surface commerciale",
    chantierCode: "GMS-CV-0184",
    address: "Avenida Cidade de Lisboa, Praia",
    contact: "Rui Monteiro - Directeur magasin",
    billing: [
      { label: "Mode de facturation", value: "Mensuelle" },
      { label: "Montant mensuel", value: "18 400 EUR HT" },
      { label: "Date de facturation", value: "Chaque 30 du mois" },
      { label: "Centre de cout", value: "Retail / GMS" }
    ],
    chantierInfo: [
      { label: "Type de chantier", value: "Grande surface alimentaire" },
      { label: "Surface couverte", value: "3 850 m2" },
      { label: "Horaires d'acces", value: "06:00 - 08:00 / 20:30 - 23:00" },
      { label: "Ville", value: "Praia" }
    ],
    interventions: [
      { label: "Cadence", value: "3 passages / semaine" },
      { label: "Derniere intervention", value: "22 avr. 2026 - 21:10" },
      { label: "Equipe affectee", value: "Equipe Retail 02" },
      { label: "Prochaine intervention", value: "24 avr. 2026 - 20:45" }
    ]
  },
  {
    id: "gms-002",
    activity: "GMS",
    name: "Carrefour Market Palmarejo",
    brand: "Carrefour",
    brandShort: "CF",
    city: "Praia",
    lastCleaning: "23 avr. 2026",
    revenue: "24 900 EUR",
    status: "Prioritaire",
    contractType: "Entretien premium",
    chantierName: "Carrefour Palmarejo - Magasin principal",
    chantierCode: "GMS-CV-0217",
    address: "Palmarejo Grande, Praia",
    contact: "Marta Silva - Responsable exploitation",
    billing: [
      { label: "Mode de facturation", value: "Mensuelle + extras" },
      { label: "Montant mensuel", value: "24 900 EUR HT" },
      { label: "Date de facturation", value: "Le 28 du mois" },
      { label: "Centre de cout", value: "Retail / Premium" }
    ],
    chantierInfo: [
      { label: "Type de chantier", value: "Supermarche premium" },
      { label: "Surface couverte", value: "5 120 m2" },
      { label: "Horaires d'acces", value: "05:30 - 08:30 / 21:00 - 00:00" },
      { label: "Ville", value: "Praia" }
    ],
    interventions: [
      { label: "Cadence", value: "Quotidienne" },
      { label: "Derniere intervention", value: "23 avr. 2026 - 06:45" },
      { label: "Equipe affectee", value: "Equipe Retail 05" },
      { label: "Prochaine intervention", value: "23 avr. 2026 - 21:15" }
    ]
  },
  {
    id: "gms-003",
    activity: "GMS",
    name: "Auchan Express Mindelo",
    brand: "Auchan",
    brandShort: "AU",
    city: "Mindelo",
    lastCleaning: "21 avr. 2026",
    revenue: "14 700 EUR",
    status: "Actif",
    contractType: "Entretien magasin",
    chantierName: "Auchan Express Mindelo - Point de vente centre",
    chantierCode: "GMS-CV-0152",
    address: "Rua Libertad, Mindelo",
    contact: "Helena Duarte - Gerante",
    billing: [
      { label: "Mode de facturation", value: "Mensuelle" },
      { label: "Montant mensuel", value: "14 700 EUR HT" },
      { label: "Date de facturation", value: "Le 25 du mois" },
      { label: "Centre de cout", value: "Retail / GMS" }
    ],
    chantierInfo: [
      { label: "Type de chantier", value: "Magasin urbain" },
      { label: "Surface couverte", value: "2 240 m2" },
      { label: "Horaires d'acces", value: "06:00 - 08:00 / 20:00 - 22:00" },
      { label: "Ville", value: "Mindelo" }
    ],
    interventions: [
      { label: "Cadence", value: "4 passages / semaine" },
      { label: "Derniere intervention", value: "21 avr. 2026 - 20:20" },
      { label: "Equipe affectee", value: "Equipe Retail 01" },
      { label: "Prochaine intervention", value: "24 avr. 2026 - 06:15" }
    ]
  },
  {
    id: "sol-001",
    activity: "Solaire",
    name: "Hotel Atlantico Resort",
    brand: "Atlantico",
    brandShort: "AT",
    city: "Boa Vista",
    lastCleaning: "19 avr. 2026",
    revenue: "27 300 EUR",
    status: "Actif",
    contractType: "Maintenance solaire premium",
    chantierName: "Atlantico Resort - Centrale solaire hoteliere",
    chantierCode: "SOL-CV-0420",
    address: "Zona Hoteleira, Boa Vista",
    contact: "Nelson Pires - Directeur technique",
    billing: [
      { label: "Mode de facturation", value: "Mensuelle + SLA" },
      { label: "Montant mensuel", value: "27 300 EUR HT" },
      { label: "Date de facturation", value: "Le 05 de chaque mois" },
      { label: "Centre de cout", value: "Energy / Hospitality" }
    ],
    chantierInfo: [
      { label: "Type de chantier", value: "Installation solaire hoteliere" },
      { label: "Puissance", value: "420 kWc" },
      { label: "Acces", value: "Coordination securite hotel" },
      { label: "Ville", value: "Boa Vista" }
    ],
    interventions: [
      { label: "Cadence", value: "2 maintenances / mois" },
      { label: "Derniere intervention", value: "19 avr. 2026 - 09:30" },
      { label: "Equipe affectee", value: "Equipe Solaire 03" },
      { label: "Prochaine intervention", value: "30 avr. 2026 - 08:00" }
    ]
  },
  {
    id: "sol-002",
    activity: "Solaire",
    name: "Residences Salinas",
    brand: "Salinas",
    brandShort: "SA",
    city: "Sal",
    lastCleaning: "17 avr. 2026",
    revenue: "9 600 EUR",
    status: "A surveiller",
    contractType: "Maintenance preventive",
    chantierName: "Residences Salinas - Toitures mutualisees",
    chantierCode: "SOL-CV-0182",
    address: "Santa Maria, Ile de Sal",
    contact: "Miriam Lopes - Syndic",
    billing: [
      { label: "Mode de facturation", value: "Mensuelle" },
      { label: "Montant mensuel", value: "9 600 EUR HT" },
      { label: "Date de facturation", value: "Le 12 du mois" },
      { label: "Centre de cout", value: "Energy / Residential" }
    ],
    chantierInfo: [
      { label: "Type de chantier", value: "Toitures residentielles" },
      { label: "Puissance", value: "182 kWc" },
      { label: "Acces", value: "Preavis syndic 48h" },
      { label: "Ville", value: "Sal" }
    ],
    interventions: [
      { label: "Cadence", value: "1 maintenance / mois" },
      { label: "Derniere intervention", value: "17 avr. 2026 - 11:05" },
      { label: "Equipe affectee", value: "Equipe Solaire 01" },
      { label: "Prochaine intervention", value: "14 mai 2026 - 08:30" }
    ]
  }
];

const cityFilters = ["Toutes les villes", "Praia", "Mindelo", "Boa Vista", "Sal"];
const brandFilters = ["Toutes franchises", "Intermarche", "Carrefour", "Auchan", "Atlantico", "Salinas"];
const statusFilters = ["Tous statuts", "Actif", "Prioritaire", "A surveiller"];
const contractFilters = ["Tous contrats", "Entretien", "Maintenance", "Premium"];
const planningReferenceDate = new Date("2026-04-23T10:00:00");
const teamOptions: Record<ActivityType, PlanningTeam[]> = {
  GMS: ["G1", "G2", "G3"],
  Solaire: ["S1", "S2", "S3"]
};
const teamLabels: Record<PlanningTeam, string> = {
  G1: "G1",
  G2: "G2",
  G3: "G3",
  S1: "S1",
  S2: "S2",
  S3: "S3"
};
const teamColors: Record<PlanningTeam, string> = {
  G1: "#77ad40",
  G2: "#319bdb",
  G3: "#f4a340",
  S1: "#5b8def",
  S2: "#28b3a3",
  S3: "#9b6df0"
};
const teamOrder: PlanningTeam[] = ["G1", "G2", "G3", "S1", "S2", "S3"];
const planningEntries: PlanningEntry[] = [
  { id: "p1", activity: "GMS", team: "G1", client: "Intermarche Plateau", date: "2026-04-23", start: "06:00", title: "Ouverture magasin", status: "scheduled" },
  { id: "p2", activity: "GMS", team: "G2", client: "Carrefour Palmarejo", date: "2026-04-23", start: "06:30", title: "Nettoyage premium", status: "scheduled" },
  { id: "p3", activity: "GMS", team: "G3", client: "Auchan Express Mindelo", date: "2026-04-23", start: "07:00", title: "Controle reserve", status: "scheduled" },
  { id: "p4", activity: "GMS", team: "G1", client: "Intermarche Plateau", date: "2026-04-23", start: "20:30", title: "Fermeture", status: "done_missing_report" },
  { id: "p5", activity: "GMS", team: "G2", client: "Carrefour Palmarejo", date: "2026-04-23", start: "21:15", title: "Passage soir", status: "done_reported" },
  { id: "p6", activity: "GMS", team: "G3", client: "Mini Prix Assomada", date: "2026-04-23", start: "21:30", title: "Controle facade", status: "scheduled" },
  { id: "p7", activity: "GMS", team: "G1", client: "Intermarche Plateau", date: "2026-04-23", start: "22:00", title: "Vitrerie", status: "scheduled" },
  { id: "p8", activity: "GMS", team: "G2", client: "Carrefour Palmarejo", date: "2026-04-24", start: "05:45", title: "Ouverture", status: "scheduled" },
  { id: "p9", activity: "GMS", team: "G1", client: "Intermarche Plateau", date: "2026-04-24", start: "20:45", title: "Fermeture", status: "scheduled" },
  { id: "p10", activity: "GMS", team: "G3", client: "Auchan Express Mindelo", date: "2026-04-25", start: "06:15", title: "Mise en propre", status: "scheduled" },
  { id: "p11", activity: "GMS", team: "G2", client: "Carrefour Palmarejo", date: "2026-04-26", start: "21:00", title: "Renfort samedi", status: "scheduled" },
  { id: "p12", activity: "GMS", team: "G1", client: "Intermarche Plateau", date: "2026-04-20", start: "21:00", title: "Cloture semaine", status: "done_reported" },
  { id: "p13", activity: "GMS", team: "G2", client: "Carrefour Palmarejo", date: "2026-04-21", start: "06:15", title: "Ouverture", status: "done_missing_report" },
  { id: "p14", activity: "Solaire", team: "S1", client: "Hotel Atlantico Resort", date: "2026-04-23", start: "09:30", title: "Maintenance preventive", status: "scheduled" },
  { id: "p15", activity: "Solaire", team: "S2", client: "Residences Salinas", date: "2026-04-23", start: "10:30", title: "Nettoyage panneaux", status: "scheduled" },
  { id: "p16", activity: "Solaire", team: "S3", client: "Atlantico Resort", date: "2026-04-24", start: "08:00", title: "Inspection onduleur", status: "scheduled" },
  { id: "p17", activity: "Solaire", team: "S1", client: "Residences Salinas", date: "2026-04-18", start: "11:00", title: "Controle production", status: "done_reported" },
  { id: "p18", activity: "Solaire", team: "S2", client: "Hotel Atlantico Resort", date: "2026-04-19", start: "08:30", title: "Verification EMS", status: "done_missing_report" },
  { id: "p19", activity: "Solaire", team: "S3", client: "Salinas", date: "2026-04-29", start: "09:00", title: "Monitoring", status: "scheduled" }
];

export default function Home() {
  const [activePage, setActivePage] = useState<PageKey>("clients");
  const [clientVariant, setClientVariant] = useState<VisualVariant>("V1");
  const [planningVariant, setPlanningVariant] = useState<VisualVariant>("V1");
  const [activity, setActivity] = useState<ActivityType>("GMS");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("Toutes les villes");
  const [brandFilter, setBrandFilter] = useState("Toutes franchises");
  const [statusFilter, setStatusFilter] = useState("Tous statuts");
  const [contractFilter, setContractFilter] = useState("Tous contrats");

  const filteredClients = useMemo(() => {
    const search = query.trim().toLowerCase();

    return clients.filter((client) => {
      if (client.activity !== activity) return false;
      if (cityFilter !== "Toutes les villes" && client.city !== cityFilter) return false;
      if (brandFilter !== "Toutes franchises" && client.brand !== brandFilter) return false;
      if (statusFilter !== "Tous statuts" && client.status !== statusFilter) return false;
      if (
        contractFilter !== "Tous contrats" &&
        !client.contractType.toLowerCase().includes(contractFilter.toLowerCase())
      ) {
        return false;
      }
      if (
        search &&
        ![client.name, client.brand, client.city, client.contractType, client.chantierCode]
          .join(" ")
          .toLowerCase()
          .includes(search)
      ) {
        return false;
      }
      return true;
    });
  }, [activity, brandFilter, cityFilter, contractFilter, query, statusFilter]);

  const [selectedClientId, setSelectedClientId] = useState("gms-001");

  const selectedClient =
    filteredClients.find((client) => client.id === selectedClientId) ?? filteredClients[0];

  const selectActivity = (nextActivity: ActivityType) => {
    setActivity(nextActivity);
    setQuery("");
    setCityFilter("Toutes les villes");
    setBrandFilter("Toutes franchises");
    setStatusFilter("Tous statuts");
    setContractFilter("Tous contrats");
    setSelectedClientId(
      clients.find((client) => client.activity === nextActivity)?.id ?? selectedClientId
    );
  };

  const totalCount = activity === "GMS" ? 428 : 196;
  const totalRevenue = activity === "GMS" ? "6,8 M EUR" : "3,1 M EUR";

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Image src="/logo.png" alt="Cap Vert" width={46} height={46} priority />
          <div>
            <strong>Cap Vert</strong>
            <span>Operations</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              className={activePage === item.id ? "nav-item active" : "nav-item"}
              key={item.label}
              onClick={() => setActivePage(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-status">
          <div className="status-orbit">
            <Leaf size={22} />
          </div>
          <strong>{activity === "GMS" ? "Base clients GMS" : "Base clients solaire"}</strong>
          <span>
            {activity === "GMS"
              ? "Portefeuille dense, franchises, villes et dernieres interventions."
              : "Installations, maintenance, facturation et suivi chantier centralises."}
          </span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Ouvrir le menu">
            <Menu size={20} />
          </button>
          <div className="page-title">
            <h1>{pageTitles[activePage]}</h1>
          </div>
          {(activePage === "clients" || activePage === "planning") && (
            <div className="view-switch variant-switch">
              {(["V1", "V2", "V3"] as VisualVariant[]).map((variant) => (
                <button
                  className={
                    (activePage === "clients" ? clientVariant : planningVariant) === variant
                      ? "team-pill active"
                      : "team-pill"
                  }
                  key={variant}
                  onClick={() =>
                    activePage === "clients"
                      ? setClientVariant(variant)
                      : setPlanningVariant(variant)
                  }
                >
                  {variant}
                </button>
              ))}
            </div>
          )}
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <button className="profile">
              <span>MV</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {activePage === "clients" && (
          <ClientsPage
            variant={clientVariant}
            activity={activity}
            query={query}
            setQuery={setQuery}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            cityFilter={cityFilter}
            setCityFilter={setCityFilter}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            contractFilter={contractFilter}
            setContractFilter={setContractFilter}
            filteredClients={filteredClients}
            selectedClient={selectedClient}
            selectedClientId={selectedClientId}
            setSelectedClientId={setSelectedClientId}
            selectActivity={selectActivity}
            totalCount={totalCount}
            totalRevenue={totalRevenue}
          />
        )}

        {activePage === "planning" && <PlanningPage variant={planningVariant} />}

        {activePage === "home" && <HomePage />}
        {activePage === "users" && <UsersPage />}
        {activePage === "reports" && <ReportsPage />}
        {activePage === "settings" && <SettingsPage />}
        {activePage === "exports" && <ExportsPage />}
        {activePage === "application" && <ApplicationPage />}
      </section>
    </main>
  );
}

function ClientsPage({
  variant,
  activity,
  query,
  setQuery,
  filtersOpen,
  setFiltersOpen,
  cityFilter,
  setCityFilter,
  brandFilter,
  setBrandFilter,
  statusFilter,
  setStatusFilter,
  contractFilter,
  setContractFilter,
  filteredClients,
  selectedClient,
  selectedClientId,
  setSelectedClientId,
  selectActivity,
  totalCount,
  totalRevenue
}: {
  variant: VisualVariant;
  activity: ActivityType;
  query: string;
  setQuery: (value: string) => void;
  filtersOpen: boolean;
  setFiltersOpen: (updater: (value: boolean) => boolean) => void;
  cityFilter: string;
  setCityFilter: (value: string) => void;
  brandFilter: string;
  setBrandFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  contractFilter: string;
  setContractFilter: (value: string) => void;
  filteredClients: Client[];
  selectedClient?: Client;
  selectedClientId: string;
  setSelectedClientId: (value: string) => void;
  selectActivity: (activity: ActivityType) => void;
  totalCount: number;
  totalRevenue: string;
}) {
  return (
    <section className={`clients-variant clients-${variant.toLowerCase()}`}>
      <section className="client-controls">
        <label className="search-box portfolio-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un client, une franchise, une ville..."
          />
        </label>
        <div className="activity-switch" role="tablist" aria-label="Choix activite">
          <button
            className={activity === "GMS" ? "activity-pill active" : "activity-pill"}
            onClick={() => selectActivity("GMS")}
          >
            <Building2 size={18} />
            GMS
          </button>
          <button
            className={activity === "Solaire" ? "activity-pill active" : "activity-pill"}
            onClick={() => selectActivity("Solaire")}
          >
            <SunMedium size={18} />
            Solaire
          </button>
        </div>
        <button
          className={filtersOpen ? "filter-toggle active" : "filter-toggle"}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <Filter size={17} />
          Filtres
          <span>
            {[cityFilter, brandFilter, statusFilter, contractFilter].filter(
              (value) => !value.startsWith("Toutes") && !value.startsWith("Tous")
            ).length}
          </span>
        </button>
      </section>

      {filtersOpen && (
        <section className="filter-drawer">
          <label className="select-filter">
            <span>Ville</span>
            <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
              {cityFilters.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>
          <label className="select-filter">
            <span>Franchise</span>
            <select value={brandFilter} onChange={(event) => setBrandFilter(event.target.value)}>
              {brandFilters.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </label>
          <label className="select-filter">
            <span>Statut</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {statusFilters.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="select-filter">
            <span>Contrat</span>
            <select value={contractFilter} onChange={(event) => setContractFilter(event.target.value)}>
              {contractFilters.map((contract) => (
                <option key={contract}>{contract}</option>
              ))}
            </select>
          </label>
        </section>
      )}

      <section className="portfolio-summary">
        <article className="summary-box">
          <span>Clients actifs</span>
          <strong>{totalCount}</strong>
        </article>
        <article className="summary-box">
          <span>Fiches affichees</span>
          <strong>{filteredClients.length}</strong>
        </article>
        <article className="summary-box">
          <span>CA portefeuille</span>
          <strong>{totalRevenue}</strong>
        </article>
        <article className="summary-box">
          <span>Dernieres mises a jour</span>
          <strong>34 aujourd'hui</strong>
        </article>
      </section>

      <section className="client-layout wide">
        <aside className="client-list-panel dense">
          <div className="section-heading">
            <div>
              <span>{totalCount} dossiers</span>
              <h3>Catalogue clients {activity}</h3>
            </div>
          </div>
          <div className="client-list-header">
            <span>Client</span>
            <span>Ville</span>
            <span>Dernier nettoyage</span>
            <span>CA</span>
          </div>
          <div className="client-list scrollable">
            {filteredClients.map((client) => (
              <button
                className={client.id === selectedClientId ? "client-row active" : "client-row"}
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
              >
                <div className="client-main">
                  <div className="brand-badge">{client.brandShort}</div>
                  <div>
                    <strong>{client.name}</strong>
                    <span>
                      {client.brand} · {client.contractType}
                    </span>
                  </div>
                </div>
                <span>{client.city}</span>
                <span>{client.lastCleaning}</span>
                <strong>{client.revenue}</strong>
              </button>
            ))}
          </div>
        </aside>
        {selectedClient && <ClientDetailCard client={selectedClient} compact={variant === "V1"} />}
      </section>
    </section>
  );
}

function ClientDetailCard({
  client,
  compact,
  wide
}: {
  client: Client;
  compact?: boolean;
  wide?: boolean;
}) {
  return (
    <section className={wide ? "client-detail-panel detail-wide" : "client-detail-panel"}>
      <div className="client-detail-header">
        <div className="client-title-wrap">
          <div className="brand-badge large">{client.brandShort}</div>
          <div>
            <span className="eyebrow">Fiche client</span>
            <h3>{client.name}</h3>
            <p>
              {client.brand} · {client.city} · Dernier nettoyage {client.lastCleaning}
            </p>
          </div>
        </div>
        {!compact && (
          <button className="primary-action">
            <FileSpreadsheet size={18} />
            Exporter la fiche
          </button>
        )}
      </div>

      <div className="detail-metrics compact">
        <article className="detail-metric">
          <span>Statut</span>
          <strong>{client.status}</strong>
        </article>
        <article className="detail-metric">
          <span>Ville</span>
          <strong>{client.city}</strong>
        </article>
        <article className="detail-metric accent">
          <span>CA client</span>
          <strong>{client.revenue}</strong>
        </article>
      </div>

      <div className="detail-stack">
        <article className="detail-panel">
          <div className="section-heading compact">
            <div>
              <span>01</span>
              <h3>Identite chantier</h3>
            </div>
          </div>
          <div className="definition-list two-cols">
            <div className="definition-row">
              <span>Nom du chantier</span>
              <strong>{client.chantierName}</strong>
            </div>
            <div className="definition-row">
              <span>Code chantier</span>
              <strong>{client.chantierCode}</strong>
            </div>
            <div className="definition-row">
              <span>Adresse</span>
              <strong>{client.address}</strong>
            </div>
            <div className="definition-row">
              <span>Contact principal</span>
              <strong>{client.contact}</strong>
            </div>
          </div>
        </article>

        <article className="detail-panel">
          <div className="section-heading compact">
            <div>
              <span>02</span>
              <h3>Detail facturation</h3>
            </div>
          </div>
          <div className="definition-list two-cols">
            {client.billing.map((item) => (
              <div className="definition-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <div className="section-heading compact">
            <div>
              <span>03</span>
              <h3>Information generale du chantier</h3>
            </div>
          </div>
          <div className="definition-list two-cols">
            {client.chantierInfo.map((item) => (
              <div className="definition-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <div className="section-heading compact">
            <div>
              <span>04</span>
              <h3>Detail intervention</h3>
            </div>
          </div>
          <div className="definition-list two-cols">
            {client.interventions.map((item) => (
              <div className="definition-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function PlanningPage({ variant }: { variant: VisualVariant }) {
  const [activity, setActivity] = useState<ActivityType>("GMS");
  const [selectedTeam, setSelectedTeam] = useState<"ALL" | PlanningTeam>("ALL");
  const [view, setView] = useState<PlanningView>("Mois");
  const [showMode, setShowMode] = useState<"limited" | "all">("limited");
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [monthDate, setMonthDate] = useState(new Date("2026-04-01T00:00:00"));

  const filteredEntries = useMemo(() => {
    return planningEntries
      .filter((entry) => {
        if (entry.activity !== activity) return false;
        if (selectedTeam !== "ALL" && entry.team !== selectedTeam) return false;
        return true;
      })
      .sort((a, b) => {
        const teamDelta = teamOrder.indexOf(a.team) - teamOrder.indexOf(b.team);
        if (teamDelta !== 0) return teamDelta;
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.start.localeCompare(b.start);
      });
  }, [activity, selectedTeam]);

  const monthLabel = monthDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric"
  });

  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const gridStart = new Date(monthStart);
  const weekdayOffset = (monthStart.getDay() + 6) % 7;
  gridStart.setDate(monthStart.getDate() - weekdayOffset);

  const monthCells = Array.from({ length: 42 }, (_, index) => {
    const cellDate = new Date(gridStart);
    cellDate.setDate(gridStart.getDate() + index);
    const iso = toIsoDate(cellDate);
    return {
      iso,
      date: cellDate,
      inMonth: cellDate.getMonth() === monthDate.getMonth(),
      entries: filteredEntries
        .filter((entry) => entry.date === iso)
        .sort((a, b) => {
          const teamDelta = teamOrder.indexOf(a.team) - teamOrder.indexOf(b.team);
          if (teamDelta !== 0) return teamDelta;
          return a.start.localeCompare(b.start);
        })
    };
  });

  const currentWeek = getWeekDates(planningReferenceDate);
  const weekEntries = currentWeek.map((date) => ({
    date,
    entries: filteredEntries.filter((entry) => entry.date === toIsoDate(date))
  }));

  const dayEntries = filteredEntries
    .filter((entry) => entry.date === "2026-04-23")
    .sort((a, b) => {
      const teamDelta = teamOrder.indexOf(a.team) - teamOrder.indexOf(b.team);
      if (teamDelta !== 0) return teamDelta;
      return a.start.localeCompare(b.start);
    });

  const yearMonths = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(monthDate.getFullYear(), index, 1);
    const count = filteredEntries.filter((entry) => {
      const entryDate = new Date(`${entry.date}T00:00:00`);
      return (
        entryDate.getFullYear() === date.getFullYear() && entryDate.getMonth() === date.getMonth()
      );
    }).length;
    return { date, count };
  });

  const lateReports = filteredEntries.filter((entry) => entry.status === "done_missing_report").length;
  const completed = filteredEntries.filter((entry) => entry.status === "done_reported").length;
  const upcoming = filteredEntries.filter((entry) => entry.status === "scheduled").length;

  return (
    <section className={`planning-page planning-${variant.toLowerCase()}`}>
      <section className="planning-toolbar">
        <div className="activity-switch">
          <button
            className={activity === "GMS" ? "activity-pill active" : "activity-pill"}
            onClick={() => {
              setActivity("GMS");
              setSelectedTeam("ALL");
            }}
          >
            GMS
          </button>
          <button
            className={activity === "Solaire" ? "activity-pill active" : "activity-pill"}
            onClick={() => {
              setActivity("Solaire");
              setSelectedTeam("ALL");
            }}
          >
            Solaire
          </button>
        </div>

        <div className="team-switch">
          <button
            className={selectedTeam === "ALL" ? "team-pill active" : "team-pill"}
            onClick={() => setSelectedTeam("ALL")}
          >
            Tout {activity}
          </button>
          {teamOptions[activity].map((team) => (
            <button
              className={selectedTeam === team ? "team-pill active" : "team-pill"}
              key={team}
              onClick={() => setSelectedTeam(team)}
            >
              {teamLabels[team]}
            </button>
          ))}
        </div>

        <div className="view-switch">
          {(["Jour", "Semaine", "Mois", "Annee"] as PlanningView[]).map((item) => (
            <button
              className={view === item ? "team-pill active" : "team-pill"}
              key={item}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="planning-summary">
        <article className="summary-box">
          <span>Interventions</span>
          <strong>{filteredEntries.length}</strong>
        </article>
        <article className="summary-box">
          <span>Rapports en retard</span>
          <strong>{lateReports}</strong>
        </article>
        <article className="summary-box">
          <span>Interventions cloturees</span>
          <strong>{completed}</strong>
        </article>
        <article className="summary-box">
          <span>A faire</span>
          <strong>{upcoming}</strong>
        </article>
      </section>

      <section className="planning-board">
        <div className="planning-topbar">
          <div className="planning-nav">
            <button className="icon-button" onClick={() => setMonthDate(shiftMonth(monthDate, -1))}>
              <ChevronLeft size={18} />
            </button>
            <strong>{capitalize(monthLabel)}</strong>
            <button className="icon-button" onClick={() => setMonthDate(shiftMonth(monthDate, 1))}>
              <ChevronRight size={18} />
            </button>
            <button className="ghost-action subtle" onClick={() => setMonthDate(new Date("2026-04-01T00:00:00"))}>
              Aujourd'hui
            </button>
          </div>

          <div className="planning-options">
            <button
              className={showMode === "limited" ? "team-pill active" : "team-pill"}
              onClick={() => setShowMode("limited")}
            >
              4 max / jour
            </button>
            <button
              className={showMode === "all" ? "team-pill active" : "team-pill"}
              onClick={() => setShowMode("all")}
            >
              Tout afficher
            </button>
          </div>
        </div>

        {view === "Mois" && (
          <article className="month-calendar">
            <div className="month-weekdays">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="month-grid">
              {monthCells.map((cell) => {
                const limit = showMode === "all" || expandedDays.includes(cell.iso) ? cell.entries.length : 4;
                const visibleEntries = cell.entries.slice(0, limit);
                const hiddenCount = Math.max(cell.entries.length - visibleEntries.length, 0);
                const isToday = cell.iso === "2026-04-23";

                return (
                  <article
                    className={
                      cell.inMonth
                        ? isToday
                          ? "month-cell today"
                          : "month-cell"
                        : "month-cell muted"
                    }
                    key={cell.iso}
                  >
                    <header>
                      <strong>{cell.date.getDate()}</strong>
                    </header>
                    <div className="month-events">
                      {visibleEntries.map((entry) => (
                        <button className={`planning-chip ${entry.status}`} key={entry.id}>
                          <div className="planning-chip-head">
                            <span>{entry.start}</span>
                            <i
                              className="team-dot"
                              style={{ background: teamColors[entry.team] }}
                            >
                              {entry.team}
                            </i>
                          </div>
                          <strong>{entry.client}</strong>
                        </button>
                      ))}
                      {hiddenCount > 0 && (
                        <button
                          className="more-chip"
                          onClick={() =>
                            setExpandedDays((days) =>
                              days.includes(cell.iso) ? days.filter((day) => day !== cell.iso) : [...days, cell.iso]
                            )
                          }
                        >
                          +{hiddenCount}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </article>
        )}

        {view === "Semaine" && (
          <article className="week-board">
            {weekEntries.map(({ date, entries }) => (
              <div className="week-column" key={toIsoDate(date)}>
                <header>
                  <span>{date.toLocaleDateString("fr-FR", { weekday: "short" })}</span>
                  <strong>{date.getDate()}</strong>
                </header>
                <div className="week-column-body">
                  {entries.length === 0 && <div className="empty-slot">Aucune intervention</div>}
                  {entries.map((entry) => (
                    <button className={`planning-chip block ${entry.status}`} key={entry.id}>
                      <div className="planning-chip-head">
                        <span>{entry.start}</span>
                        <i className="team-dot" style={{ background: teamColors[entry.team] }}>
                          {entry.team}
                        </i>
                      </div>
                      <strong>{entry.client}</strong>
                      <em>{entry.title}</em>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </article>
        )}

        {view === "Jour" && (
          <article className="day-board">
            <div className="section-heading compact">
              <div>
                <span>Jeudi 23 avril 2026</span>
                <h3>Interventions du jour</h3>
              </div>
            </div>
            <div className="planning-list">
              {dayEntries.map((entry) => (
                <div className={`planning-row status-row ${entry.status}`} key={entry.id}>
                  <em>{entry.start}</em>
                  <div>
                    <strong>{entry.client}</strong>
                    <span>
                      {entry.title} · {entry.team}
                    </span>
                  </div>
                  <i className="team-dot inline" style={{ background: teamColors[entry.team] }}>
                    {entry.team}
                  </i>
                </div>
              ))}
            </div>
          </article>
        )}

        {view === "Annee" && (
          <article className="year-board">
            {yearMonths.map((month) => (
              <div className="year-card" key={month.date.toISOString()}>
                <span>
                  {capitalize(
                    month.date.toLocaleDateString("fr-FR", {
                      month: "long"
                    })
                  )}
                </span>
                <strong>{month.count}</strong>
                <em>interventions</em>
              </div>
            ))}
          </article>
        )}

      </section>
    </section>
  );
}

/* ─── PAGE ACCUEIL ─── */
function HomePage() {
  return (
    <section>
      <div className="overview">
        <div>
          <div className="hero-panel">
            <div className="hero-copy">
              <span>Cap Vert Operations</span>
              <h2>Tableau de bord</h2>
              <p>Synthese en temps reel de l'activite GMS et Solaire, des equipes terrain et des indicateurs cles.</p>
              <div className="hero-actions">
                <button className="primary-action"><CalendarClock size={16} /> Voir le planning</button>
                <button className="ghost-action"><ClipboardList size={16} /> Rapports du jour</button>
              </div>
            </div>
            <div className="signal-board">
              <div className="signal-header">
                <span>Interventions ce mois</span>
                <strong>184</strong>
              </div>
              <div className="signal-chart">
                {[60,80,45,90,70,55,85].map((h,i) => (
                  <span key={i} style={{height:`${h}%`}} />
                ))}
              </div>
              <div className="signal-footer">
                <span><span className="green-dot" style={{display:"inline-block",width:8,height:8,borderRadius:999,background:"var(--green)",marginRight:6}} />GMS</span>
                <span style={{marginLeft:16}}><span className="blue-dot" style={{display:"inline-block",width:8,height:8,borderRadius:999,background:"var(--blue)",marginRight:6}} />Solaire</span>
              </div>
            </div>
          </div>

          <div className="kpi-grid" style={{marginTop:18}}>
            <div className="kpi blue">
              <div className="kpi-icon"><Building2 size={18} /></div>
              <span>Chantiers GMS actifs</span>
              <strong>428</strong>
              <em>+12 ce mois</em>
            </div>
            <div className="kpi green">
              <div className="kpi-icon"><SunMedium size={18} /></div>
              <span>Installations solaires</span>
              <strong>196</strong>
              <em>+4 ce mois</em>
            </div>
            <div className="kpi blue">
              <div className="kpi-icon"><Users size={18} /></div>
              <span>Equipes actives</span>
              <strong>6</strong>
              <em>3 GMS · 3 Solaire</em>
            </div>
            <div className="kpi amber">
              <div className="kpi-icon"><ClipboardList size={18} /></div>
              <span>Rapports en retard</span>
              <strong>3</strong>
              <em>A regulariser</em>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="map-panel">
            <div className="section-heading compact">
              <div><span>Geographie</span><h3>Carte des sites</h3></div>
            </div>
            <div className="map-canvas">
              <div className="island island-a" />
              <div className="island island-b" />
              <div className="island island-c" />
              <button className="map-marker marker-a"><span /></button>
              <button className="map-marker warning marker-b"><span /></button>
              <button className="map-marker marker-c"><span /></button>
              <div className="map-readout">
                <div><strong>6 equipes</strong><span>terrain actif</span></div>
              </div>
            </div>
            <div className="zone-list">
              {[
                {label:"Praia",count:"3 sites GMS",pct:72,color:"var(--blue)"},
                {label:"Boa Vista",count:"1 site Solaire",pct:45,color:"var(--green)"},
                {label:"Mindelo",count:"1 site GMS",pct:28,color:"var(--blue)"},
                {label:"Sal",count:"1 site Solaire",pct:18,color:"var(--green)"},
              ].map(z => (
                <div className="zone-row" key={z.label}>
                  <div><i style={{background:z.color}} />{z.label}</div>
                  <strong>{z.count}</strong>
                  <progress value={z.pct} max={100} />
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="section-heading compact">
              <div><span>Activite recente</span><h3>Dernieres actions</h3></div>
            </div>
            <div className="timeline">
              {[
                {time:"09:30",label:"Maintenance preventive",sub:"Hotel Atlantico Resort · S1",tag:"Solaire"},
                {time:"07:00",label:"Controle reserve",sub:"Auchan Express Mindelo · G3",tag:"GMS"},
                {time:"06:30",label:"Nettoyage premium",sub:"Carrefour Palmarejo · G2",tag:"GMS"},
                {time:"06:00",label:"Ouverture magasin",sub:"Intermarche Plateau · G1",tag:"GMS"},
              ].map((item,i) => (
                <div className="timeline-item" key={i}>
                  <time>{item.time}</time>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.sub}</span>
                    <em>{item.tag}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="wide-panel panel">
          <div className="section-heading compact">
            <div><span>Tendance</span><h3>Interventions sur 7 jours</h3></div>
          </div>
          <div className="line-chart">
            <svg viewBox="0 0 560 170" preserveAspectRatio="none">
              <polyline fill="none" stroke="var(--blue)" strokeWidth="2.5" points="0,120 80,90 160,105 240,60 320,75 400,40 480,55 560,30" />
              <polyline fill="none" stroke="var(--green)" strokeWidth="2.5" points="0,140 80,130 160,125 240,115 320,120 400,100 480,110 560,90" />
            </svg>
            <div className="chart-legend">
              <span><span className="blue-dot" />GMS</span>
              <span><span className="green-dot" />Solaire</span>
            </div>
          </div>
        </div>
        <div className="weather-panel panel">
          <div className="weather-icon"><SunMedium size={22} /></div>
          <span>Conditions terrain</span>
          <strong>28°C</strong>
          <p>Ensoleille — Ile de Santiago. Conditions favorables pour les interventions exterieures.</p>
        </div>
        <div className="activity-panel panel">
          <span>Prochaine intervention</span>
          <strong>14:00</strong>
          <p>Inspection onduleur · Atlantico Resort · Equipe S3</p>
          <div><CalendarClock size={14} /> Aujourd'hui, 23 avril 2026</div>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE UTILISATEURS ─── */
function UsersPage() {
  const [selected, setSelected] = useState("u1");
  const users = [
    {id:"u1",initials:"MV",name:"Manuel Varela",role:"Administrateur",team:"Direction",email:"m.varela@capvert.cv",phone:"+238 991 23 45",activity:"GMS + Solaire",lastLogin:"Aujourd'hui 09:12",status:"Actif"},
    {id:"u2",initials:"RA",name:"Rosa Andrade",role:"Responsable terrain",team:"Equipe GMS",email:"r.andrade@capvert.cv",phone:"+238 992 34 56",activity:"GMS",lastLogin:"Aujourd'hui 07:45",status:"Actif"},
    {id:"u3",initials:"JF",name:"Jorge Ferreira",role:"Technicien",team:"Equipe G1",email:"j.ferreira@capvert.cv",phone:"+238 993 45 67",activity:"GMS",lastLogin:"Hier 21:30",status:"Actif"},
    {id:"u4",initials:"AL",name:"Ana Lima",role:"Technicienne",team:"Equipe G2",email:"a.lima@capvert.cv",phone:"+238 994 56 78",activity:"GMS",lastLogin:"Hier 22:10",status:"Actif"},
    {id:"u5",initials:"CP",name:"Carlos Pinto",role:"Technicien solaire",team:"Equipe S1",email:"c.pinto@capvert.cv",phone:"+238 995 67 89",activity:"Solaire",lastLogin:"Aujourd'hui 08:30",status:"Actif"},
    {id:"u6",initials:"FM",name:"Filipa Moreira",role:"Technicienne solaire",team:"Equipe S2",email:"f.moreira@capvert.cv",phone:"+238 996 78 90",activity:"Solaire",lastLogin:"Aujourd'hui 09:00",status:"Actif"},
    {id:"u7",initials:"NS",name:"Nuno Silva",role:"Superviseur",team:"Equipe G3",email:"n.silva@capvert.cv",phone:"+238 997 89 01",activity:"GMS",lastLogin:"22 avr. 2026",status:"Inactif"},
  ];
  const sel = users.find(u => u.id === selected) ?? users[0];
  return (
    <section className="client-layout" style={{gap:18}}>
      <aside className="client-list-panel dense">
        <div className="section-heading">
          <div><span>{users.length} comptes</span><h3>Utilisateurs</h3></div>
          <button className="primary-action" style={{fontSize:13,padding:"0 14px",minHeight:38}}>
            <Users size={15} /> Nouveau
          </button>
        </div>
        <div className="client-list-header">
          <span>Nom</span><span>Equipe</span><span>Statut</span>
        </div>
        <div className="client-list scrollable">
          {users.map(u => (
            <button key={u.id} className={u.id === selected ? "client-row active" : "client-row"} onClick={() => setSelected(u.id)}>
              <div className="client-main">
                <div className="brand-badge">{u.initials}</div>
                <div><strong>{u.name}</strong><span>{u.role}</span></div>
              </div>
              <span>{u.team}</span>
              <strong style={{color: u.status === "Actif" ? "var(--green)" : "var(--muted)"}}>{u.status}</strong>
            </button>
          ))}
        </div>
      </aside>
      <section className="client-detail-panel">
        <div className="client-detail-header">
          <div className="client-title-wrap">
            <div className="brand-badge large">{sel.initials}</div>
            <div>
              <span className="eyebrow">Fiche utilisateur</span>
              <h3>{sel.name}</h3>
              <p>{sel.role} · {sel.team}</p>
            </div>
          </div>
        </div>
        <div className="detail-metrics compact">
          <article className="detail-metric"><span>Statut</span><strong style={{color: sel.status==="Actif"?"var(--green)":"var(--muted)"}}>{sel.status}</strong></article>
          <article className="detail-metric"><span>Activite</span><strong>{sel.activity}</strong></article>
          <article className="detail-metric"><span>Derniere connexion</span><strong>{sel.lastLogin}</strong></article>
        </div>
        <div className="detail-stack">
          <article className="detail-panel">
            <div className="section-heading compact"><div><span>01</span><h3>Coordonnees</h3></div></div>
            <div className="definition-list two-cols">
              <div className="definition-row"><span>Email</span><strong>{sel.email}</strong></div>
              <div className="definition-row"><span>Telephone</span><strong>{sel.phone}</strong></div>
              <div className="definition-row"><span>Equipe</span><strong>{sel.team}</strong></div>
              <div className="definition-row"><span>Activite</span><strong>{sel.activity}</strong></div>
            </div>
          </article>
          <article className="detail-panel">
            <div className="section-heading compact"><div><span>02</span><h3>Droits et acces</h3></div></div>
            <div className="definition-list two-cols">
              <div className="definition-row"><span>Role</span><strong>{sel.role}</strong></div>
              <div className="definition-row"><span>Acces planning</span><strong>Oui</strong></div>
              <div className="definition-row"><span>Acces rapports</span><strong>Oui</strong></div>
              <div className="definition-row"><span>Acces exports</span><strong>{sel.role === "Administrateur" ? "Oui" : "Non"}</strong></div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}

/* ─── PAGE RAPPORTS ─── */
function ReportsPage() {
  const [activity, setActivity] = useState<ActivityType>("GMS");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const reports = [
    {id:"r1",activity:"GMS" as ActivityType,client:"Carrefour Palmarejo",team:"G2",date:"23 avr. 2026",heure:"21:15",status:"Valide",agent:"Rosa Andrade"},
    {id:"r2",activity:"GMS" as ActivityType,client:"Intermarche Plateau",team:"G1",date:"23 avr. 2026",heure:"20:30",status:"Manquant",agent:"Jorge Ferreira"},
    {id:"r3",activity:"GMS" as ActivityType,client:"Auchan Express Mindelo",team:"G3",date:"22 avr. 2026",heure:"06:00",status:"Valide",agent:"Nuno Silva"},
    {id:"r4",activity:"Solaire" as ActivityType,client:"Hotel Atlantico Resort",team:"S2",date:"19 avr. 2026",heure:"08:30",status:"Manquant",agent:"Filipa Moreira"},
    {id:"r5",activity:"Solaire" as ActivityType,client:"Residences Salinas",team:"S1",date:"17 avr. 2026",heure:"11:05",status:"Valide",agent:"Carlos Pinto"},
    {id:"r6",activity:"GMS" as ActivityType,client:"Intermarche Plateau",team:"G1",date:"20 avr. 2026",heure:"21:00",status:"Valide",agent:"Jorge Ferreira"},
  ].filter(r => r.activity === activity && (statusFilter === "Tous" || r.status === statusFilter));

  const total = reports.length;
  const valides = reports.filter(r => r.status === "Valide").length;
  const manquants = reports.filter(r => r.status === "Manquant").length;

  return (
    <section>
      <div className="portfolio-summary" style={{marginBottom:18}}>
        <article className="summary-box"><span>Total rapports</span><strong>{total}</strong></article>
        <article className="summary-box"><span>Valides</span><strong style={{color:"var(--green)"}}>{valides}</strong></article>
        <article className="summary-box"><span>Manquants</span><strong style={{color:"#dc2626"}}>{manquants}</strong></article>
        <article className="summary-box"><span>Taux completion</span><strong>{total > 0 ? Math.round(valides/total*100) : 0}%</strong></article>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        <div className="activity-switch">
          {(["GMS","Solaire"] as ActivityType[]).map(a => (
            <button key={a} className={activity===a?"activity-pill active":"activity-pill"} onClick={() => setActivity(a)}>{a}</button>
          ))}
        </div>
        <div className="activity-switch">
          {["Tous","Valide","Manquant"].map(s => (
            <button key={s} className={statusFilter===s?"activity-pill active":"activity-pill"} onClick={() => setStatusFilter(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="panel" style={{padding:0,overflow:"hidden"}}>
        <div className="client-list-header" style={{padding:"10px 18px"}}>
          <span>Client</span><span>Equipe</span><span>Date</span><span>Heure</span><span>Agent</span><span>Statut</span>
        </div>
        {reports.length === 0 && <div style={{padding:"24px 18px",color:"var(--muted)",textAlign:"center"}}>Aucun rapport pour ce filtre</div>}
        {reports.map(r => (
          <div key={r.id} className="client-row" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.2fr 0.8fr 1.5fr 1fr",gap:12,padding:"12px 18px",borderBottom:"1px solid var(--line)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="brand-badge">{r.client.slice(0,2).toUpperCase()}</div>
              <strong style={{fontSize:13}}>{r.client}</strong>
            </div>
            <span style={{alignSelf:"center",fontSize:13}}>{r.team}</span>
            <span style={{alignSelf:"center",fontSize:13}}>{r.date}</span>
            <span style={{alignSelf:"center",fontSize:13}}>{r.heure}</span>
            <span style={{alignSelf:"center",fontSize:13}}>{r.agent}</span>
            <span style={{alignSelf:"center"}}>
              <em style={{
                borderRadius:999,padding:"4px 10px",fontSize:11,fontWeight:800,fontStyle:"normal",
                background: r.status==="Valide" ? "#dcfce7" : "#fee2e2",
                color: r.status==="Valide" ? "#15803d" : "#b91c1c"
              }}>{r.status}</em>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── PAGE PARAMETRES ─── */
function SettingsPage() {
  const sections = [
    {
      num:"01", title:"Informations generales",
      fields:[
        {label:"Nom de la societe",value:"Cap Vert Operations"},
        {label:"Pays d'exercice",value:"Republique du Cap-Vert"},
        {label:"Devise",value:"EUR"},
        {label:"Fuseau horaire",value:"Atlantic/Cape_Verde (UTC-1)"},
      ]
    },
    {
      num:"02", title:"Activites",
      fields:[
        {label:"Activite principale",value:"Nettoyage GMS"},
        {label:"Activite secondaire",value:"Maintenance solaire"},
        {label:"Nombre d'equipes GMS",value:"3 equipes (G1, G2, G3)"},
        {label:"Nombre d'equipes Solaire",value:"3 equipes (S1, S2, S3)"},
      ]
    },
    {
      num:"03", title:"Notifications",
      fields:[
        {label:"Rappel rapport manquant",value:"Actif — apres 2h"},
        {label:"Alerte retard planning",value:"Actif — apres 30 min"},
        {label:"Email responsable",value:"direction@capvert.cv"},
        {label:"Frequence recap",value:"Quotidien — 07:00"},
      ]
    },
    {
      num:"04", title:"Application mobile",
      fields:[
        {label:"Version APK courante",value:"2.4.1"},
        {label:"Mise a jour automatique",value:"Activee"},
        {label:"Acces hors-ligne",value:"Actif"},
        {label:"Sync intervalle",value:"5 minutes"},
      ]
    },
  ];
  return (
    <section>
      <div className="detail-stack" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
        {sections.map(s => (
          <article className="detail-panel" key={s.num}>
            <div className="section-heading compact">
              <div><span>{s.num}</span><h3>{s.title}</h3></div>
              <button className="ghost-action subtle" style={{fontSize:12,padding:"0 14px",minHeight:34}}>
                <Settings size={13} /> Modifier
              </button>
            </div>
            <div className="definition-list two-cols">
              {s.fields.map(field => (
                <div className="definition-row" key={field.label}>
                  <span>{field.label}</span>
                  <strong>{field.value}</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── PAGE EXPORTS ─── */
function ExportsPage() {
  const exports = [
    {icon:<FolderKanban size={18}/>,title:"Fiches clients GMS",desc:"Export complet du portefeuille GMS avec coordonnees, contrats et historique.",format:"Excel / CSV",lastExport:"22 avr. 2026"},
    {icon:<FolderKanban size={18}/>,title:"Fiches clients Solaire",desc:"Export complet du portefeuille Solaire avec puissances, acces et facturation.",format:"Excel / CSV",lastExport:"20 avr. 2026"},
    {icon:<CalendarClock size={18}/>,title:"Planning GMS — Avril 2026",desc:"Toutes les interventions planifiees et realisees sur le mois.",format:"PDF / Excel",lastExport:"23 avr. 2026"},
    {icon:<CalendarClock size={18}/>,title:"Planning Solaire — Avril 2026",desc:"Maintenances et inspections solaires du mois.",format:"PDF / Excel",lastExport:"19 avr. 2026"},
    {icon:<ClipboardList size={18}/>,title:"Rapports d'intervention",desc:"Comptes-rendus terrain avec statuts et agents pour la periode selectionnee.",format:"PDF",lastExport:"23 avr. 2026"},
    {icon:<CircleGauge size={18}/>,title:"Indicateurs de performance",desc:"KPIs, taux de completion, CA et synthese par activite.",format:"PDF / Excel",lastExport:"21 avr. 2026"},
  ];
  return (
    <section>
      <div className="portfolio-summary" style={{marginBottom:22}}>
        <article className="summary-box"><span>Exports disponibles</span><strong>6</strong></article>
        <article className="summary-box"><span>Dernier export</span><strong>Aujourd'hui</strong></article>
        <article className="summary-box"><span>Formats</span><strong>PDF · Excel · CSV</strong></article>
        <article className="summary-box"><span>Periode courante</span><strong>Avril 2026</strong></article>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14}}>
        {exports.map((ex,i) => (
          <div key={i} className="panel" style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div className="kpi-icon" style={{background:"rgba(49,155,219,0.1)",color:"var(--blue)",marginBottom:0}}>{ex.icon}</div>
                <div>
                  <strong style={{fontSize:14,display:"block"}}>{ex.title}</strong>
                  <span style={{color:"var(--muted)",fontSize:12}}>{ex.format}</span>
                </div>
              </div>
              <button className="primary-action" style={{fontSize:12,padding:"0 14px",minHeight:36,flexShrink:0}}>
                <Download size={14} /> Exporter
              </button>
            </div>
            <p style={{margin:0,color:"var(--muted)",fontSize:13,lineHeight:1.55}}>{ex.desc}</p>
            <span style={{fontSize:12,color:"var(--muted)"}}>Dernier export : {ex.lastExport}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── PAGE APPLICATION ─── */
function ApplicationPage() {
  const versions = [
    {version:"2.4.1",date:"23 avr. 2026",status:"Production",note:"Correctif synchronisation planning hors-ligne",size:"18.4 Mo"},
    {version:"2.4.0",date:"15 avr. 2026",status:"Archive",note:"Ajout module rapports photo, amelioration GPS",size:"18.1 Mo"},
    {version:"2.3.2",date:"02 avr. 2026",status:"Archive",note:"Fix crash sur Android 12, optimisation batterie",size:"17.9 Mo"},
    {version:"2.3.1",date:"18 mar. 2026",status:"Archive",note:"Nouvelle interface planning semaine",size:"17.6 Mo"},
  ];
  return (
    <section>
      <div className="portfolio-summary" style={{marginBottom:22}}>
        <article className="summary-box"><span>Version courante</span><strong>2.4.1</strong></article>
        <article className="summary-box"><span>Appareils actifs</span><strong>12</strong></article>
        <article className="summary-box"><span>Derniere mise a jour</span><strong>Aujourd'hui</strong></article>
        <article className="summary-box"><span>Plateforme</span><strong>Android</strong></article>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:18}}>
        <div className="panel" style={{padding:0,overflow:"hidden"}}>
          <div className="section-heading compact" style={{padding:"16px 18px 12px"}}>
            <div><span>Historique</span><h3>Versions APK</h3></div>
            <button className="primary-action" style={{fontSize:12,padding:"0 14px",minHeight:36}}>
              <Smartphone size={14} /> Deposer APK
            </button>
          </div>
          <div className="client-list-header" style={{padding:"8px 18px"}}>
            <span>Version</span><span>Date</span><span>Taille</span><span>Statut</span>
          </div>
          {versions.map((v,i) => (
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1.2fr 0.8fr 1fr 1fr",gap:12,padding:"12px 18px",borderBottom:"1px solid var(--line)",alignItems:"center"}}>
              <strong style={{fontSize:14}}>{v.version}</strong>
              <span style={{color:"var(--muted)",fontSize:13}}>{v.date}</span>
              <span style={{color:"var(--muted)",fontSize:13}}>{v.size}</span>
              <em style={{
                borderRadius:999,padding:"3px 10px",fontSize:11,fontWeight:800,fontStyle:"normal",display:"inline-block",
                background: v.status==="Production" ? "#dcfce7" : "var(--soft)",
                color: v.status==="Production" ? "#15803d" : "var(--muted)"
              }}>{v.status}</em>
              <button className="ghost-action subtle" style={{fontSize:12,padding:"0 12px",minHeight:32}}>
                <Download size={13} /> APK
              </button>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gap:14,alignContent:"start"}}>
          <div className="panel">
            <div className="section-heading compact" style={{marginBottom:12}}>
              <div><span>Deploiement</span><h3>Diffusion</h3></div>
            </div>
            <div className="definition-list">
              {[
                {label:"Equipes equipees",value:"6 / 6"},
                {label:"Appareils sur v2.4.1",value:"10 / 12"},
                {label:"Mise a jour auto",value:"Activee"},
                {label:"Prochaine MAJ",value:"Mai 2026"},
              ].map(row => (
                <div className="definition-row" key={row.label} style={{marginBottom:10}}>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="panel" style={{background:"#10212a",color:"#fff"}}>
            <span style={{color:"rgba(255,255,255,0.58)",fontSize:12,fontWeight:700,textTransform:"uppercase"}}>Alerte</span>
            <strong style={{display:"block",marginTop:8,fontSize:18}}>2 appareils</strong>
            <p style={{color:"rgba(255,255,255,0.68)",fontSize:13,lineHeight:1.55,marginTop:6}}>Toujours sur v2.3.2. Relancer la mise a jour depuis l'interface admin.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function shiftMonth(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function getWeekDates(reference: Date) {
  const start = new Date(reference);
  const offset = (reference.getDay() + 6) % 7;
  start.setDate(reference.getDate() - offset);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

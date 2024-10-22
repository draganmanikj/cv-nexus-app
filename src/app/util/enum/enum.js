import { translate } from "../lang/translate-wrapper";

export const statusReadMessages = [
  { value: 0, label: translate('app.poraki.neprocitanaPoraka') },
  { value: 1, label: translate('app.poraki.procitanaPoraka') },
];

export const statusImportantMessages = [
  { value: 0, label: translate('app.poraki.nevaznaPoraka') },
  { value: 1, label: translate('app.poraki.vaznaPoraka') },
];

export const sittingDescTypeEnum = [
  { value: "JAVNA", label: translate('app.announcements.publicDebate') },
  { value: "KOMISISKA", label: translate('app.announcements.committeeSitting') },
  { value: "NADZORNA", label: translate('app.announcements.supervisoryHearing') }
]

export const typeTitleEnum = [
  {value: 1, label: translate('app.announcements.plenarySitting')},
  {value: 2, label: translate('app.announcements.committeeSitting')},
]

export const announcementsSittingStatusEnum = [
  // {value: 1, label: translate('app.announcements.sittingStatusTitleEnum.scheduled')},
  {value: translate('app.announcements.sittingStatusTitleEnum.scheduled'), label: translate('app.announcements.sittingStatusTitleEnum.scheduled')},
  {value: 2, label: translate('app.announcements.sittingStatusTitleEnum.continued')},
  {value: 3, label: translate('app.announcements.sittingStatusTitleEnum.incomplete')},
  {value: 4, label: translate('app.announcements.sittingStatusTitleEnum.rescheduled')},
  {value: 5, label: translate('app.announcements.sittingStatusTitleEnum.postponed')},
  {value: 6, label: translate('app.announcements.sittingStatusTitleEnum.postponedRescheduled')},
  {value: 7, label: translate('app.announcements.sittingStatusTitleEnum.complete')},
]

export const sittingLocationEnum = [
  {value: 1, label: translate("app.announcements.sittingLocations.hall4")},
  {value: 2, label: translate("app.announcements.sittingLocations.hall6")},
  {value: 3, label: translate("app.announcements.sittingLocations.hall10")},
  {value: 4, label: translate("app.announcements.sittingLocations.borisTrajkovskiHall")},
  {value: 5, label: translate("app.announcements.sittingLocations.constComitteeHall")},
  {value: 6, label: translate("app.announcements.sittingLocations.largeHall")},
  {value: 7, label: translate("app.announcements.sittingLocations.crystalHall")},
]
export const sittingStatusEnum = [
  {value: "ZAKAZANA", label: translate('app.eParlament.scheduled')},
  {value: "ZAPOCNATA", label: translate('app.eParlament.started')},
  {value: "ZAVRSENA", label: translate('app.eParlament.completed')},
  {value: "NEZAVRSENA", label: translate('app.eParlament.incomplete')},
  {value: "ZATVORENA", label: translate('app.eParlament.closed')},
  {value: "ODLOZENA", label: translate('app.eParlament.postponed')}
]

export const RGOstatusEnum = [
  {value: "ZAKAZANA", label: translate('app.eParlament.scheduled')},
  {value: "PRODOLZENIE", label: translate('app.eParlament.continuation')},
  {value: "PRODOLZENIE_PREZAKAZANA", label: translate('app.eParlament.incomplete')},
  {value: "PREZAKAZANA", label: translate('app.eParlament.rescheduled')},
  {value: "ODLOZENA", label: translate('app.eParlament.postponed')},
  {value: "ODLOZENA_PREZAKAZANA", label: translate('app.eParlament.postponedRescheduled')},
  {value: "ZATVORENA", label: translate('app.eParlament.closed')}

]

export const invitationStatusEnum = [
  { value: "NACRT", label: translate('app.announcements.draft') },
  { value: "PODNESENA", label: translate('app.announcements.submitted') }
]

export const requestStatusEnum = [
  {value:0, label: translate("app.registar.requestStatus.submitted")}, 
  {value:1, label: translate("app.registar.requestStatus.approved")},
  {value:2, label: translate("app.registar.requestStatus.rejected")}
]

export const verifikuvanEnum = [
  {value:0, label: translate("app.generic.no")},
  {value:1, label: translate("app.generic.yes")}
]
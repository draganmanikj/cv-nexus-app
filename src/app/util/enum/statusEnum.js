import { translate } from "../lang/translate-wrapper";

let genderOptions = [];
let familyOptions = [];
let statusOptions = [];
let statusOptionsRequestOptions = [];
let statusChangeOptions = [];
let approveOptionsEnum = [];
let locationOptions = [];
let realizationStatusOptions = [];
let maritalStatusEnum = [];
let languageLevelsOption = [];
let isprakacPrimacEnum = [];
let statusRequest = [];
let typeHolidayOption = [];
let typeEnum = [];
let wfMailEnum = [];

    genderOptions = [
      { value: 0, label: translate("app.dosie.man") },
      { value: 1, label: translate("app.dosie.woman") },
    ];
  
    familyOptions = [
      { value: 1, label: translate("app.family.members.spouse") },
      { value: 2, label: translate("app.family.members.child") },
    ];
  
    statusOptions = [
      { value: 0, label: translate("app.generic.passive") },
      { value: 1, label: translate("app.generic.active") },
    ];
  
    statusOptionsRequestOptions = [
      { value: 0, label: translate("app.generic.novo") }, // pri kreiranje na novo baranje / plan
      { value: 1, label: translate("app.generic.active") }, // vo procedura
      { value: 2, label: translate("app.generic.passive") }, // pasiviziran zaradi odbieno od kolega ili menadjer
    ];
  
    statusChangeOptions = [
      { value: 0, label: translate("app.generic.novo") }, // novo kreirano baranje vo negoviot osnoven oblik (status neaktiven)
      { value: 1, label: translate("app.generic.odbienokolega") }, // odbieno od kolega vrateno na novo
      { value: 2, label: translate("app.generic.kolega") }, // izvesti zamenski, posle aktivacija
      { value: 3, label: translate("app.generic.odbienomenadzer") },
      { value: 4, label: translate("app.generic.menadzer") }, // izvesti menadzer
      { value: 5, label: translate("app.generic.archivaSent") }, // izvesti hr
      { value: 6, label: translate("app.generic.requestCompleted") }, // kraj
    ];
  
    approveOptionsEnum = [
      { value: 0, label: translate("app.generic.no") },
      { value: 1, label: translate("app.generic.yes") },
    ];

    locationOptions = [ 
      {value: "COUNTRY", label:  translate("app.dosie.other.trainingsForm.locationCountry") },
      {value: "ABROAD", label:  translate("app.dosie.other.trainingsForm.locationAbroad") }
  
  ]
  
    realizationStatusOptions = [ 
      {value: "PLANED", label:  translate("app.dosie.other.trainingsForm.planed") },
      {value: "REALIZED", label:  translate("app.dosie.other.trainingsForm.realized") },
      {value: "CANCELED", label:  translate("app.dosie.other.trainingsForm.canceled") },
  
  ]

    maritalStatusEnum = [
      { value: "Vo brak", label: translate("app.dosie.maritalStatusEnumObj.married")},
      { value: "Ne vo brak", label: translate("app.dosie.maritalStatusEnumObj.unmarried")},
      { value: "3", label: translate("app.dosie.maritalStatusEnumObj.widowed")},
      { value: "4", label: translate("app.dosie.maritalStatusEnumObj.divorced")},
    ]

      languageLevelsOption = [ 
        {value: "A1", label:  "A1" },
        {value: "A2", label:  "A2" },
        {value: "B1", label:  "B1"},
        {value: "B2", label:  "B2" },
        {value: "C1", label:  "C1" },
        {value: "C2", label:  "C2" },
    
    ]

      isprakacPrimacEnum = [
        {value: "PODNOSITEL", label: translate("app.roles.workFlow.isprakacPrimac.podnositel")},
        {value: "ZAMENSKI", label: translate("app.roles.workFlow.isprakacPrimac.zamenski")},
        {value: "MENADZER",label: translate("app.roles.workFlow.isprakacPrimac.menadjer")},
        {value: "HR", label: translate("app.roles.workFlow.isprakacPrimac.hr")}
    ]

    statusRequest = [
      { value: 0, label: translate("app.generic.denied")  },
      { value: 1, label: translate("app.generic.accepted") } ,
  ];
  typeHolidayOption = [
    { value: 1, label: translate("app.cbHoliday.drzaven") },
    { value: 2, label: translate("app.cbHoliday.verski") },
    { value: 3, label: translate("app.cbHoliday.nacionalnost") },
  ];

  typeEnum = [
    { value: "NEW_REQUEST_ZAMENA", label: translate("app.roles.workFlow.newRequestZamena") },
    { value: "RESPOND_ZAMENA_DECLAIN", label: translate("app.roles.workFlow.respondZamenaDeclained") },
    { value: "RESPOND_ZAMENA_APPROVED", label: translate("app.roles.workFlow.respondZamenaApproved") },
    { value: "NEW_REQUEST_MANAGER", label: translate("app.roles.workFlow.newRequestManager") },
    { value: "RESPOND_MANAGER_DECLAIN", label: translate("app.roles.workFlow.respondManagerDelained") },
    { value: "RESPOND_MANAGER_APPROVED", label: translate("app.roles.workFlow.respondManagerApproved") },
    { value: "NEW_REQUEST_HR", label: translate("app.roles.workFlow.newRequestHr") },
  ];

  wfMailEnum = [
    { value: "BARANJE_ZA_ZAMENA", label: translate("app.roles.workFlow.newRequestZamena") },
    { value: "ODBIENO_OD_KOLEGA", label: translate("app.roles.workFlow.respondZamenaDeclained") },
    { value: "ODOBRENO_OD_KOLEGA", label: translate("app.roles.workFlow.respondZamenaApproved") },
    { value: "BARANJE_ZA_ODOBRUVANJE", label: translate("app.roles.workFlow.newRequestManager") },
    { value: "ODBIENO_OD_MENADZER", label: translate("app.roles.workFlow.respondManagerDelained") },
    { value: "ODOBRENO_OD_MENADZER", label: translate("app.roles.workFlow.respondManagerApproved") },
    { value: "BARANJE_DO_HR", label: translate("app.roles.workFlow.newRequestHr") },
  ];


export {
  genderOptions,
  familyOptions,
  statusOptions,
  statusOptionsRequestOptions,
  statusChangeOptions,
  approveOptionsEnum,
  locationOptions,
  realizationStatusOptions,
  maritalStatusEnum,
  languageLevelsOption,
  isprakacPrimacEnum,
  statusRequest,
  typeHolidayOption,
  typeEnum,
  wfMailEnum,
};

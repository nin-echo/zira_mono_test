export const BlockType = {
  STORE: "sto",
  EMPLOYEE: "emp",
  SHIFT: "sf",
  CUSTOMBLOCK: "cb",
  CUSTOMFIELD: "cbf",
  SCHEMA: "sch",
  FIELDOPTION: "fdo",
  CUSTOMDATAGROUP: "cdg",
  OPTIONVALUE: "opv",
} as const;

export enum UserType {
  ADMIN,
  MANAGER,
  EMPLOYEE,
}

/** requres more on this */
export enum CustomFieldType {
  TEXT,
  NUMBER,
  MULTISELECTION,
  SINGLESELECTION,
  DATE,
}

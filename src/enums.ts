export const BlockType = {
  STORE: "sto",
  EMPLOYEE: "emp",
  SHIFT: "sf",
  CUSTOMBLOCK: "cb",
  CUSTOMFIELD: "cbf",
  SCHEMA: "sch",
  FIELDOPTION: "fdo",
  CUSTOMDATAGROUP: "cdg",
} as const;

export const enum UserType {
  ADMIN,
  MANAGER,
  EMPLOYEE,
}

/** requres more on this */
export const enum CustomFieldType {
  TEXT,
  NUMBER,
  MULTISELECTION,
  SINGLESELECTION,
  DATE,
}

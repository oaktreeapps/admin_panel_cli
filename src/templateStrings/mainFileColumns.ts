import { capitalize } from "src/commands/strings";

export const TextColumn = (fieldName: string) => `<Column
  field="${fieldName}"
  header="${capitalize(fieldName)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${fieldName}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;

export const ImageColumn = (fieldName: string) =>
  `<Column header="${capitalize(
    fieldName
  )}" body={(rowData) => imageBodyTemplate(rowData, "${fieldName}")}></Column>`;

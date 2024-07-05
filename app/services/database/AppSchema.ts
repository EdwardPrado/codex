import { Column, ColumnType, Index, IndexedColumn, Schema, Table } from "@powersync/react-native"

export const AppSchema = new Schema([
  new Table({
    name: "decklists",
    columns: [],
    // Index to allow efficient lookup within a list
    indexes: [new Index({ name: "list", columns: [new IndexedColumn({ name: "list_id" })] })],
  }),
])

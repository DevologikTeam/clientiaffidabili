import type { ReactNode } from 'react';

export type DataTableColumn<Row> = {
  key: string;
  label: string;
  render: (row: Row) => ReactNode;
};

type LegacyDataTableColumn = string;

type DataTableProps<Row> = {
  caption?: string;
  columns: ReadonlyArray<DataTableColumn<Row> | LegacyDataTableColumn>;
  rows: ReadonlyArray<Row>;
  emptyMessage?: string;
};

function isObjectColumn<Row>(column: DataTableColumn<Row> | LegacyDataTableColumn): column is DataTableColumn<Row> {
  return typeof column !== 'string';
}

function renderLegacyCell<Row>(row: Row, columnIndex: number): ReactNode {
  if (Array.isArray(row)) return row[columnIndex] as ReactNode;
  return null;
}

export function DataTable<Row>({ caption, columns, rows, emptyMessage = 'Nessun elemento disponibile.' }: DataTableProps<Row>) {
  if (rows.length === 0) {
    return <div className="ca-table-empty">{emptyMessage}</div>;
  }

  const normalizedColumns = columns.map((column, index) => {
    if (isObjectColumn<Row>(column)) return column;
    return {
      key: `${index}-${column}`,
      label: column,
      render: (row: Row) => renderLegacyCell(row, index),
    } satisfies DataTableColumn<Row>;
  });

  return (
    <div className="ca-table-wrap">
      <table className="ca-data-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {normalizedColumns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {normalizedColumns.map((column) => <td key={column.key}>{column.render(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

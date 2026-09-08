import React from "react";
import styles from "./Table.module.scss";

export interface TableProps {
    title?: string;
    description?: string;
    caption?: string;
    columns: string[];
    rows: string[][];
    /** Footnote rendered under the table, e.g. where a lifetime is provider-controlled. */
    note?: string;
}

/**
 * A plain data table for policy pages. It scrolls inside its own container so a
 * wide table never forces the page body to scroll sideways on a phone, and each
 * cell repeats its column name as a data-label for the stacked mobile layout.
 */
const Table: React.FC<TableProps> = ({ title, description, caption, columns, rows, note }) => (
    <div className={styles.block}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.scroll}>
            <table className={styles.table}>
                {caption && <caption className={styles.caption}>{caption}</caption>}
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column} scope="col">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} data-label={columns[cellIndex]}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {note && <p className={styles.note}>{note}</p>}
    </div>
);

export default Table;

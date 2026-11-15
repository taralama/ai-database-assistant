import { AppDataSource } from "../AppDataSource";

export const getDatabaseSchema = (): string => {
    const entities = AppDataSource.entityMetadatas;

    return entities
        .map((entity) => {
            const columns = entity.columns.map((column) => {
                return `    ${column.databaseName} ${column.type}${
                    column.isPrimary ? " PRIMARY KEY" : ""
                }${column.isNullable ? " NULL" : " NOT NULL"}`;
            });

            const foreignKeys = entity.foreignKeys.map((fk) => {
                return `    FOREIGN KEY (${fk.columnNames.join(", ")})
        REFERENCES ${fk.referencedEntityMetadata.tableName}
        (${fk.referencedColumnNames.join(", ")})`;
            });

            return `
TABLE: ${entity.tableName}

COLUMNS:
${columns.join("\n")}

FOREIGN KEYS:
${foreignKeys.join("\n") || "    None"}
`;
        })
        .join("\n");
};

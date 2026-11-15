import { parse } from "pgsql-ast-parser";

interface ValidationResult {
    valid: boolean;
    sql: string;
    error?: string;
}

export const validateSQL = (sql: string): ValidationResult => {
    try {
        const statements = parse(sql);

        // Reject empty SQL
        if (statements.length === 0) {
            return {
                valid: false,
                sql,
                error: "SQL query cannot be empty",
            };
        }

        // Allow only one statement
        if (statements.length !== 1) {
            return {
                valid: false,
                sql,
                error: "Only one SQL statement is allowed",
            };
        }

        // Check statement type
        const statement = statements[0];

        if (statement.type !== "select") {
            return {
                valid: false,
                sql,
                error: "Only SELECT queries are allowed",
            };
        }

        return {
            valid: true,
            sql,
        };
    } catch (error) {
        return {
            valid: false,
            sql,
            error:
                error instanceof Error ? error.message : "Invalid SQL syntax",
        };
    }
};

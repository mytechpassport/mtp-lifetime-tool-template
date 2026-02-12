/* eslint-disable @typescript-eslint/no-explicit-any */
// QUERY BUILDER TYPES - Production-ready structured query system
export interface TableReference {
  table: string;
  alias?: string;
}

export interface ColumnReference {
  column: string;
  table?: string;
  alias?: string;
}

export interface JoinCondition {
  left: ColumnReference;
  operator: "=" | "!=" | "<" | "<=" | ">" | ">=" | "LIKE" | "NOT LIKE";
  right: ColumnReference | string | number;
}

export interface JoinClause {
  type: "INNER" | "LEFT" | "RIGHT" | "FULL OUTER";
  table: TableReference;
  on: JoinCondition[];
}

export interface WhereCondition {
  column?: ColumnReference;
  operator?:
    | "="
    | "!="
    | "<"
    | "<="
    | ">"
    | ">="
    | "LIKE"
    | "NOT LIKE"
    | "IN"
    | "NOT IN"
    | "IS NULL"
    | "IS NOT NULL"
    | "EXISTS"
    | "NOT EXISTS";
  value?: any;
  values?: any[]; // for IN operations
  subquery?: QueryBuilder; // for EXISTS operations
  and?: WhereCondition[];
  or?: WhereCondition[];
}

export interface WindowFunction {
  function:
    | "ROW_NUMBER"
    | "RANK"
    | "DENSE_RANK"
    | "LAG"
    | "LEAD"
    | "FIRST_VALUE"
    | "LAST_VALUE"
    | "SUM"
    | "COUNT"
    | "AVG"
    | "MAX"
    | "MIN";
  partitionBy?: ColumnReference[];
  orderBy?: OrderByClause[];
  args?: (ColumnReference | string | number)[];
}

export interface CaseWhen {
  when: WhereCondition;
  then: ColumnReference | string | number;
}

export interface CaseExpression {
  cases: CaseWhen[];
  else?: ColumnReference | string | number;
  alias?: string;
}

export interface AggregateFunction {
  function:
    | "COUNT"
    | "SUM"
    | "AVG"
    | "MAX"
    | "MIN"
    | "GROUP_CONCAT"
    | "JSON_ARRAYAGG"
    | "JSON_OBJECTAGG";
  column?: ColumnReference;
  distinct?: boolean;
  separator?: string; // for GROUP_CONCAT
  orderBy?: OrderByClause[]; // for aggregate functions that support ordering
  alias?: string;
}

export interface DateFunction {
  function:
    | "DATEDIFF"
    | "DATE_ADD"
    | "DATE_SUB"
    | "NOW"
    | "CURDATE"
    | "YEAR"
    | "MONTH"
    | "DAY";
  args: (ColumnReference | string | number)[];
  alias?: string;
}

export interface SelectExpression {
  type: "column" | "aggregate" | "window" | "case" | "date" | "raw";
  column?: ColumnReference;
  aggregate?: AggregateFunction;
  window?: { func: WindowFunction; alias: string };
  case?: CaseExpression;
  date?: DateFunction;
  raw?: { expression: string; alias?: string }; // for complex expressions
}

export interface OrderByClause {
  column: ColumnReference;
  direction?: "ASC" | "DESC";
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HavingCondition extends WhereCondition {}

export interface CTEDefinition {
  name: string;
  query: QueryBuilder;
}

export interface QueryBuilder {
  // Core clauses
  ctes?: CTEDefinition[];
  select: SelectExpression[];
  from: TableReference;
  joins?: JoinClause[];
  where?: WhereCondition;
  groupBy?: ColumnReference[];
  having?: HavingCondition;
  orderBy?: OrderByClause[];
  limit?: number;
  offset?: number;

  // Union operations
  union?: {
    type: "UNION" | "UNION ALL";
    query: QueryBuilder;
  };

  // Distinct
  distinct?: boolean;

  // User ID field configuration
  userIdField?: string;
  skipUserFilter?: boolean;
  userFilterTable?: string;
}

export interface QueryExecutionOptions {
  timeout?: number;
  maxRows?: number;
  validateOnly?: boolean; // Only validate, don't execute
}

export interface QueryExecutionResult<T = any> {
  data: T[];
  metadata: {
    rowCount: number;
    executionTime: number;
    columns: string[];
  };
}

export interface QueryValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  estimatedComplexity: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
}

// QUERY BUILDER HELPER FUNCTIONS

/**
 * Helper functions to make query building more ergonomic
 */
export const QueryBuilders = {
  /**
   * Create a simple table reference
   */
  table: (name: string, alias?: string): TableReference => ({
    table: name,
    alias,
  }),

  /**
   * Create a column reference
   */
  column: (
    column: string,
    table?: string,
    alias?: string
  ): ColumnReference => ({
    column,
    table,
    alias,
  }),

  /**
   * Create a simple SELECT expression
   */
  select: (
    column: string,
    table?: string,
    alias?: string
  ): SelectExpression => ({
    type: "column",
    column: { column, table, alias },
  }),

  /**
   * Create an aggregate function
   */
  aggregate: (
    func: AggregateFunction["function"],
    column?: string,
    table?: string,
    alias?: string
  ): SelectExpression => ({
    type: "aggregate",
    aggregate: {
      function: func,
      column: column ? { column, table } : undefined,
      alias,
    },
  }),

  /**
   * Create a window function
   */
  window: (
    func: WindowFunction["function"],
    alias: string,
    options: Partial<WindowFunction> = {}
  ): SelectExpression => ({
    type: "window",
    window: {
      func: { function: func, ...options },
      alias,
    },
  }),

  /**
   * Create a CASE expression
   */
  case: (
    cases: CaseWhen[],
    elseValue?: any,
    alias?: string
  ): SelectExpression => ({
    type: "case",
    case: { cases, else: elseValue, alias },
  }),

  /**
   * Create a JOIN clause
   */
  join: (
    type: JoinClause["type"],
    table: string,
    alias: string,
    conditions: Array<{
      left: ColumnReference;
      right: ColumnReference | string | number;
      operator?: JoinCondition["operator"];
    }>
  ): JoinClause => ({
    type,
    table: { table, alias },
    on: conditions.map((c) => ({ ...c, operator: c.operator || "=" })),
  }),

  /**
   * Create WHERE conditions
   */
  where: {
    eq: (column: string, value: any, table?: string): WhereCondition => ({
      column: { column, table },
      operator: "=",
      value,
    }),

    in: (column: string, values: any[], table?: string): WhereCondition => ({
      column: { column, table },
      operator: "IN",
      values,
    }),

    like: (column: string, value: string, table?: string): WhereCondition => ({
      column: { column, table },
      operator: "LIKE",
      value,
    }),

    isNull: (column: string, table?: string): WhereCondition => ({
      column: { column, table },
      operator: "IS NULL",
    }),

    exists: (subquery: QueryBuilder): WhereCondition => ({
      operator: "EXISTS",
      subquery,
    }),

    and: (...conditions: WhereCondition[]): WhereCondition => ({
      and: conditions,
    }),

    or: (...conditions: WhereCondition[]): WhereCondition => ({
      or: conditions,
    }),
  },
};

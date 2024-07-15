import { DATA } from "./data";
interface TableSchema {
  tableName: string;
  primaryKey: string;
}

export type TableData = Record<string, any>;

export class Database {
  private tables: Map<string, TableData[]> = new Map();

  constructor(private dbName: string) {
    this.loadDatabase();
  }

  private loadDatabase(): void {
    const savedDatabase = localStorage.getItem(this.dbName);
    if (savedDatabase) {
      try {
        const parsedDatabase = JSON.parse(savedDatabase) as Map<
          string,
          TableData[]
        >;
        this.tables = new Map(parsedDatabase);
      } catch (error) {
        console.error("Error loading database:", error);
      }
    }
  }

  private saveDatabase(): void {
    const serializedDatabase = JSON.stringify([...this.tables]);
    localStorage.setItem(this.dbName, serializedDatabase);
  }

  createTable(schema: TableSchema): void {
    const { tableName } = schema;
    if (!this.tables.has(tableName)) {
      this.tables.set(tableName, []);
      this.saveDatabase();
    } else {
      throw new Error(`Table '${tableName}' already exists.`);
    }
  }

  dropTable(tableName: string): void {
    if (this.tables.has(tableName)) {
      this.tables.delete(tableName);
      this.saveDatabase();
    } else {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
  }

  insert(tableName: string, data: TableData): void {
    const table = this.tables.get(tableName);
    if (table) {
      const primaryKey = this.getPrimaryKey(tableName);
      const lastRow = table[table.length - 1];
      const nextId = lastRow ? lastRow[primaryKey] + 1 : 1;
      const newRow = { [primaryKey]: nextId, ...data };
      table.push(newRow);
      this.saveDatabase();
    } else {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
  }

  select(
    tableName: string,
    condition?: (row: TableData) => boolean
  ): TableData[] {
    const table = this.tables.get(tableName);
    if (table) {
      if (condition) {
        return table.filter(condition);
      } else {
        return table;
      }
    } else {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
  }

  update(
    tableName: string,
    primaryKeyValue: any,
    newData: Partial<TableData>
  ): void {
    const table = this.tables.get(tableName);
    if (table) {
      const primaryKey = this.getPrimaryKey(tableName);
      const row = table.find((row) => row[primaryKey] === primaryKeyValue);
      if (row) {
        Object.assign(row, newData);
        this.saveDatabase();
      } else {
        throw new Error(
          `Row with primary key '${primaryKeyValue}' not found in table '${tableName}'.`
        );
      }
    } else {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
  }

  delete(tableName: string, primaryKeyValue: any): void {
    const table = this.tables.get(tableName);
    if (table) {
      const primaryKey = this.getPrimaryKey(tableName);
      const index = table.findIndex(
        (row) => row[primaryKey] === primaryKeyValue
      );
      if (index !== -1) {
        table.splice(index, 1);
        this.saveDatabase();
      } else {
        throw new Error(
          `Row with primary key '${primaryKeyValue}' not found in table '${tableName}'.`
        );
      }
    } else {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
  }

  listTables(): string[] {
    return Array.from(this.tables.keys());
  }

  private getPrimaryKey(tableName: string): string {
    const tableSchema = this.getTableSchema(tableName);
    if (tableSchema) {
      return tableSchema.primaryKey;
    } else {
      throw new Error(`Table '${tableName}' does not exist.`);
    }
  }

  private getTableSchema(tableName: string): TableSchema | undefined {
    const tableNames = Array.from(this.tables.keys());
    const foundTable = tableNames.find((name) => name === tableName);
    if (foundTable) {
      // Simulated table schema retrieval; in a real scenario, this would come from a schema definition
      return { tableName: foundTable, primaryKey: "id" }; // Replace with actual schema retrieval logic
    }
    return undefined;
  }
}

export const ProblemsDB = new Database("Problems");
export const LearningDB = new Database("Learning");
export const Initialized = localStorage.getItem("Initalized");
if (!Initialized) {
  localStorage.setItem("Initalized", "true");
  for (let item in DATA) {
    ProblemsDB.createTable({ tableName: item, primaryKey: "id" });
    DATA[item].map((newitem: object) => {
      ProblemsDB.insert(item, { ...newitem, status: false });
    });
  }
}
// // Create tables
// db.createTable({ tableName: "users", primaryKey: "id" });
// db.createTable({ tableName: "products", primaryKey: "productId" });

// // Insert rows
// db.insert("users", { name: "Alice", age: 30 });
// db.insert("users", { name: "Bob", age: 25 });

// db.insert("products", { name: "Laptop", price: 1000 });
// db.insert("products", { name: "Keyboard", price: 50 });

// // Select rows
// const allUsers = db.select("users");
// console.log("All users:", allUsers);

// const allProducts = db.select("products");
// console.log("All products:", allProducts);

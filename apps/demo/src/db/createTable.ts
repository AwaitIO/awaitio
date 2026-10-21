import { matchesWhere } from './matchesWhere';
import { sortRows } from './sortRows';
import { waitForDb } from './waitForDb';

export type CreateTableArgs<TRow> = {
  name: string;
  rows: TRow[];
};

// A stand-in for one Prisma model over made-up rows. Every call waits a moment like a real query. Writes return what
// a database would but store nothing, so every visitor of the public demo sees the same data.
export const createTable = <TRow extends { id: string }>({ name, rows }: CreateTableArgs<TRow>) => {
  return {
    findMany: async ({ where, orderBy, take }: { where?: Partial<TRow>; orderBy?: Partial<Record<keyof TRow, 'asc' | 'desc'>>; take?: number } = {}) => {
      await waitForDb();

      return sortRows({ rows: rows.filter((row) => matchesWhere({ row, where })), orderBy }).slice(0, take);
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      await waitForDb();

      return rows.find((row) => row.id === where.id) ?? null;
    },
    findUniqueOrThrow: async ({ where }: { where: { id: string } }) => {
      await waitForDb();
      const row = rows.find((candidate) => candidate.id === where.id);

      if (!row) {
        throw new Error(`No ${name} with id ${where.id}.`);
      }

      return row;
    },
    count: async ({ where }: { where?: Partial<TRow> } = {}) => {
      await waitForDb();

      return rows.filter((row) => matchesWhere({ row, where })).length;
    },
    create: async ({ data }: { data: Omit<TRow, 'id'> }) => {
      await waitForDb();

      return { ...data, id: `${name}_${Math.random().toString(36).slice(2, 10)}` } as TRow;
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<Omit<TRow, 'id'>> }) => {
      await waitForDb();
      const row = rows.find((candidate) => candidate.id === where.id);

      if (!row) {
        throw new Error(`No ${name} with id ${where.id}.`);
      }

      return { ...row, ...data };
    },
    delete: async ({ where }: { where: { id: string } }) => {
      await waitForDb();
      const row = rows.find((candidate) => candidate.id === where.id);

      if (!row) {
        throw new Error(`No ${name} with id ${where.id}.`);
      }

      return row;
    },
  };
};

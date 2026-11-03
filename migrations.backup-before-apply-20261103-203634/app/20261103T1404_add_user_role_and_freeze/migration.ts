#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/b35a3ac274949af3d11409510c73304380430ec6eaa311464b216665fb6c596d/contract';
import endContract from '../../snapshots/b35a3ac274949af3d11409510c73304380430ec6eaa311464b216665fb6c596d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e82a6c0d4f1d0d22e225c18f9340679363e53617ab334cf08f6714982577f704/contract';
import startContract from '../../snapshots/e82a6c0d4f1d0d22e225c18f9340679363e53617ab334cf08f6714982577f704/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'UserRole',
        members: ['USER', 'ADMIN'],
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('isFrozen', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('role', '"UserRole"', {
          notNull: true,
          default: lit('USER'),
          codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'UserRole' } },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

# API TypeORM/Postgres Static Guards

Il gate `scripts/qa-api-typeorm-postgres-static-guards.js` previene una famiglia di errori runtime TypeORM/Postgres:

```text
DataTypeNotSupportedError: Data type "Object" in "SupportTicket.category" is not supported by "postgres" database.
```

La causa è l'inferenza `reflect-metadata`: quando una property entity usa union type, literal type, type alias o indexed-access type, TypeScript può esporre `design:type` come `Object`. TypeORM non può trasformarlo automaticamente in tipo Postgres.

Regola obbligatoria: le colonne TypeORM non primitive devono dichiarare esplicitamente il tipo database, ad esempio:

```ts
@Column({ type: 'varchar', default: 'open' })
status!: SomeUnionType;
```

Il gate scansiona `apps/api/src/**/*.entity.ts` e blocca ogni `@Column` rischioso senza `type` esplicito.

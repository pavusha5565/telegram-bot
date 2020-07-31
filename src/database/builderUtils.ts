import { SelectQueryBuilder } from 'typeorm';

export function hasJoinAlias<T>(
  query: SelectQueryBuilder<T>,
  aliasName: string,
) {
  return query.expressionMap.aliases.some(
    queryAlias => queryAlias.type === 'join' && queryAlias.name === aliasName,
  );
}

export function innerJoinIfNotYet<T>(
  query: SelectQueryBuilder<T>,
  property: string,
  aliasName?: string,
) {
  aliasName = aliasName || property.split('.')[1];
  if (!hasJoinAlias(query, aliasName)) {
    return query.innerJoin(property, aliasName);
  }
  return query;
}

export function extractPropertyAlias(propertyDef: string) {
  const matches = propertyDef.match(/^\((.+)\s+as\s+(.+)\)$/);
  if (!matches) {
    return [propertyDef, propertyDef];
  }
  return [matches[1], matches[2]];
}

export function splitPropertyPath(
  property: string | string[],
): [string[], string, string] {
  const propertyPath =
    typeof property === 'string' ? property.split('.') : property;
  const pathSize = propertyPath.length;
  if (pathSize < 2) {
    return [[], null, null];
  }
  const tables = propertyPath.slice(0, pathSize - 1);
  const [, alias] = extractPropertyAlias(propertyPath[pathSize - 2]);
  const [fieldName, fieldAlias] = extractPropertyAlias(
    propertyPath[pathSize - 1],
  );
  const field = alias + '.' + fieldName;
  return [tables, field, fieldAlias];
}

export function innerJoinIfNotYetDeep<T>(
  query: SelectQueryBuilder<T>,
  property: string | string[],
) {
  const propertyPath =
    typeof property === 'string' ? property.split('.') : property;
  const pathSize = propertyPath.length;
  if (pathSize < 2) {
    return;
  }
  let lastField = extractPropertyAlias(propertyPath[0]);
  for (let i = 0; i < pathSize - 1; i++) {
    const [, table] = lastField;
    const newField = extractPropertyAlias(propertyPath[i + 1]);
    const [field, alias] = newField;
    const joinProperty = table + '.' + field;
    innerJoinIfNotYet(query, joinProperty, alias);
    lastField = newField;
  }
  return query;
}

export function addSimpleWhereIn<T>(
  query: SelectQueryBuilder<T>,
  property: string | string[],
  parameter: { [name: string]: any },
) {
  const parameterName = Object.keys(parameter)[0];
  const value = parameter[parameterName];
  if (value === undefined) {
    return;
  }

  const [tables, filterProperty] = splitPropertyPath(property);
  if (!filterProperty) {
    return;
  }

  innerJoinIfNotYetDeep(query, tables);
  if (value.length > 0) {
    query.andWhere(`${filterProperty} in (:...${parameterName})`, {
      [parameterName]: value,
    });
  } else {
    query.andWhere('false');
  }
  return query;
}

export function addSimpleWhereIns<T>(
  query: SelectQueryBuilder<T>,
  properties: {
    [property: string]: {
      [parameterName: string]: any;
    };
  },
) {
  for (const property of Object.keys(properties)) {
    const parameter = properties[property];
    addSimpleWhereIn(query, property, parameter);
  }
  return query;
}

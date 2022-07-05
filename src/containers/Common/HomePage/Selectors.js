export const getEntitiesByID = state => state?.general?.entities?.reduce((acc, ent) => (
  { ...acc, [ent.id]: ent }), {}) || {};

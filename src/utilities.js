export const collectionIdsAndDocs = (doc) => {
  return { id: doc.id, ...doc.data() };
};

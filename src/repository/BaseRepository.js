export default class BaseRepository {
  constructor(constants, mongoClient, collectionName) {

    this.constants = constants;
    this.mongoClient = mongoClient;
    this.collectionName = collectionName;
  }

  _insert(object) {

    return this.mongoClient.getDB()
      .collection(this.collectionName)
      .insertOne(object)
      .then(result => result);

  }

  _find(query) {
    return this.mongoClient.getDB()
      .collection(this.collectionName)
      .findOne(query)
      .then(result => result);
  }

  _findAll(query) {
    return this.mongoClient.getDB()
      .collection(this.collectionName)
      .find(query)
      .sort({ _id: -1 })
      .project({ _id: 0 })
      .toArray()
      .then(result => result);

  }

  _remove(query) {
    return this.mongoClient.getDB()
      .collection(this.collectionName)
      .deleteOne(query)
      .then(result => result);

  }

  _update(query, updateDoc) {
    return this.mongoClient.getDB()
      .collection(this.collectionName)
      .replaceOne(query, updateDoc)
      .then(result => result);
  }

  _bulkInsert(docs, schema) {
    return this.mongoClient.getDB()
      .db(this.constants.dbname)
      .collection(this.collectionName)
      .inserAll(object)
      .then(result => result);
  }
}

export default class BaseRepository {
  constructor(constants, mongoClient, collectionName) {

    this.constants = constants;
    this.mongoClient = mongoClient;
    this.collectionName = collectionName;
  }

  _insert(object) {
    return this.mongoClient
      .connect(this.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(this.constants.dbname)
          .collection(this.collectionName)
          .insertOne(object)
          .then(result => result);
      });
  }

  _find(query) {
    return this.mongoClient
      .connect(this.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(this.constants.dbname)
          .collection(this.collectionName)
          .findOne(query)
          .then(result => result);
      });
  }

  _remove(query) {
    return this.mongoClient
      .connect(this.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(this.constants.dbname)
          .collection(this.collectionName)
          .remove(object)
          .then(result => result);
      });
  }

  _update(query, updateDoc) {
    return this.mongoClient
      .connect(this.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(this.constants.dbname)
          .collection(this.collectionName)
          .replaceOne(query, updateDoc)
          .then(result => result);
      });
  }

  _bulkInsert(docs, schema) {
    return this.mongoClient
      .connect(this.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(this.constants.dbname)
          .collection(this.collectionName)
          .inserAll(object)
          .then(result => result);
      });
  }
}

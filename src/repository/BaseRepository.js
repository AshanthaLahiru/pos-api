let self;
export default class BaseRepository {
  constructor(constants, mongoClient, collectionName) {
    self = this;
    self.constants = constants;
    self.mongoClient = mongoClient;
    self.collectionName = collectionName;
  }

  _insert(object) {
    return self.mongoClient
      .connect(self.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(self.constants.dbname)
          .collection(self.collectionName)
          .insertOne(object)
          .then(result => result);
      });
  }

  _find(query) {
    return self.mongoClient
      .connect(self.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(self.constants.dbname)
          .collection(self.collectionName)
          .findOne(query)
          .then(result => result);
      });
  }

  _remove(query) {
    return self.mongoClient
      .connect(self.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(self.constants.dbname)
          .collection(self.collectionName)
          .remove(object)
          .then(result => result);
      });
  }

  _update(query, updateDoc) {
    return self.mongoClient
      .connect(self.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(self.constants.dbname)
          .collection(self.collectionName)
          .replaceOne(query, updateDoc)
          .then(result => result);
      });
  }

  _bulkInsert(docs, schema) {
    return self.mongoClient
      .connect(self.constants.dburl, { useNewUrlParser: true })
      .then(client => {
        return client
          .db(self.constants.dbname)
          .collection(self.collectionName)
          .inserAll(object)
          .then(result => result);
      });
  }
}

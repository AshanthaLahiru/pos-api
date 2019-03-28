let self;
import mongodb from "mongodb";

export default class MongoClient {
    constructor(constants) {
        self = this;
        self.constants = constants;

        mongodb.MongoClient.connect(self.constants.dburl, { useNewUrlParser: true })
            .then(client => {
                self.db = client.db(this.constants.dbname);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getDB() {
        return self.db;
    }
}

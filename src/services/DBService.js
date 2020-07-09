import * as idb from "idb";

const FIT_DATABASE_NAME = "POS";
const FIT_DATABASE_VERSION = 2;
const db = idb.default;

/**
 * Initialize the IndexedDB.
 * see https://developers.google.com/web/ilt/pwa/lab-indexeddb
 * for information as to why we use switch w/o breaks for migrations.
 * add do the database version and add a switch case each time you need to
 * change migrations
 */
const dbPromise = db.open(FIT_DATABASE_NAME, FIT_DATABASE_VERSION, function (
  upgradeDb
) {
  /* tslint:disable */
  switch (upgradeDb.oldVersion) {
    case 0:
    // a placeholder case so that the switch block will
    // execute when the database is first created
    // (oldVersion is 0)
    case 1:
    // upgradeDb.createObjectStore("ServiceOrders", { keyPath: "id" });
    // const tx = upgradeDb.transaction.objectStore(
    //   "ServiceOrders",
    //   "readwrite"
    // );
    // tx.createIndex("Bucket", "bucket");
    // tx.createIndex("businessUnit", "businessUnit");
    // tx.createIndex("status", "status");
    // tx.createIndex("BucketBusinessUnitStatus", [
    //   "bucket",
    //   "businessUnit",
    //   "status",
    // ]);
    // for (let i = 0; i < 10; i++) {
    //   tx.put({
    //     id: i,
    //     bucket: BUCKETS[Math.floor(Math.random() * BUCKETS.length)],
    //     businessUnit:
    //       BUSINESS_UNITS[Math.floor(Math.random() * BUSINESS_UNITS.length)],
    //     status: STATUS[Math.floor(Math.random() * STATUS.length)],
    //   });
    // }
  }
});

export class DBService {
  get(tablespace, key) {
    return dbPromise
      .then((db) => {
        return db.transaction(tablespace).objectStore(tablespace).get(key);
      })
      .catch((error) => {
        // Do something?
      });
  }

  getAll(tablespace, indexName, index = []) {
    return dbPromise
      .then((db) => {
        return db
          .transaction(tablespace)
          .objectStore(tablespace)
          .index(indexName)
          .getAll(index);
      })
      .catch((error) => {
        // Do something?
      });
  }

  put(tablespace, object, key = null) {
    return dbPromise
      .then((db) => {
        if (key) {
          return db
            .transaction(tablespace, "readwrite")
            .objectStore(tablespace)
            .put(object, key);
        }
        return db
          .transaction(tablespace, "readwrite")
          .objectStore(tablespace)
          .put(object);
      })
      .catch((error) => {
        // Do something?
      });
  }

  delete(tablespace, key) {
    return dbPromise
      .then((db) => {
        return db
          .transaction(tablespace, "readwrite")
          .objectStore(tablespace)
          .delete(key);
      })
      .catch((error) => {
        // Do something?
      });
  }

  deleteAll(tablespace) {
    return dbPromise
      .then((db) => {
        return db
          .transaction(tablespace, "readwrite")
          .objectStore(tablespace)
          .clear();
      })
      .catch((error) => {
        // Do something?
      });
  }
}

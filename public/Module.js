const productdb = (dbname, table) => {
    //create an indexDB with name dbname
    const db = new Dexie(dbname);

    //define a table (table param)
    db.version(1).stores(table);

    //define a table (friends) with fields in it (name, age)
    // db.version(1).stores({
    //     //name field will be a keypath to age
    //     friends: 'name, age'
    // });

    db.open();
    return db;
}
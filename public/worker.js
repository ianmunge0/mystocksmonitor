//import productdb from './Module.js';

var CACHE_NAME = "pwa-task-manager";
var urlsToCache = ["/", "/completed", "/login/admin"];
var ifonline;

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener( "fetch", function ( event ) {
  if(event.request.url.indexOf('remotepaywallet.com') !== -1){
    event.respondWith(
  
      fetch(event.request)
      // .then(console.log("fetch made"))
      .then((res) =>{
        console.log("fetch made", res);
        ifonline = true;
        let db1;
        let dbReq1 = indexedDB.open('Newstockdb', 1);
        dbReq1.onupgradeneeded = function(event) {
          // Set the db variable to our database so we can use it!  
          db1 = event.target.result;
  
          // Create an object store named notes. Object stores
          // in databases are where data are stored.
          let notes = db1.createObjectStore('notes', {autoIncrement: true});
          
          let notes1;
          if (!db1.objectStoreNames.contains('notes')) {
            notes1 = db1.createObjectStore('notes', {autoIncrement: true});
          } else {
            notes1 = dbReq1.transaction.objectStore('notes');
          }
          
        }
        dbReq1.onsuccess = function(event) {
          db1 = event.target.result;
          updateentry(db1);
          getAndDisplayNotes(db1);
          
  
        }
        dbReq1.onerror = function(event) {
          console.log("error opening indexdb when online",event.target.errorCode);
        }
      })
      .catch(err => {
        //this catch block handles all requests made when offline
        console.log("fetch error", err);
        ifonline = false;
        let db;
        let dbReq = indexedDB.open('Newstockdb', 1);
        dbReq.onupgradeneeded = function(event) {
          // Set the db variable to our database so we can use it!  
          db = event.target.result;
  
          // Create an object store named notes. Object stores
          // in databases are where data are stored.
          let notes = db.createObjectStore('notes', {autoIncrement: true});
          let friends = db.createObjectStore('friends', {
            //name field will be a keypath to age
            friends: '++id, name, age'
          });
  
          let notes1;
          if (!db.objectStoreNames.contains('notes')) {
            notes1 = db.createObjectStore('notes', {autoIncrement: true});
          } else {
            notes1 = dbReq.transaction.objectStore('notes');
          }
          // If there isn't already a timestamp index, make one so we
          // can query notes by their timestamps
          if (!notes1.indexNames.contains('timestamp')) {
            notes1.createIndex('timestamp', 'timestampkeypath');
          }
        }
        dbReq.onsuccess = function(event) {
          db = event.target.result;
  
            // Add some sticky notes
            addStickyNote(db, 'Sloths are awesome!');
            addStickyNote(db, 'Order more hibiscus tea');
            addStickyNote(db, 'And Green Sheen shampoo, the best for sloth fur algae grooming!');
            //read the added sticky notes
            //getAndDisplayNotes(db);
  
        }
        dbReq.onerror = function(event) {
          console.log("error opening database",event.target);
        }
  
        //assume offline as everything else should be handled
        // return caches.match( doc_fallback, {
        //     ignoreSearch: true
        // } );
  
      })
    
    );
  }


  } );

// Update a service worker
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["pwa-task-manager"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("online", (event) => {
  console.log("You are now back online.");
});

function addStickyNote(db, message) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['notes'], 'readwrite');
  let store = tx.objectStore('notes');
  // Put the sticky note into the object store
  let note = {text: message, timestamp: Date.now()};
  store.add(note);
  // Wait for the database transaction to complete
  tx.oncomplete = function() { 
    console.log('stored note!');
    //read the added sticky notes
    //getAndDisplayNotes(db);
  }
  tx.onerror = function(event) {
    alert('error storing note ' + event.target.errorCode);
  }
}

function getAndDisplayNotes(db) {
  let tx = db.transaction(['notes'], 'readonly');
  let store = tx.objectStore('notes');
  // Create a cursor request to get all items in the store, which 
  // we collect in the allNotes array
  let req = store.openCursor();
  let allNotes = [];

  req.onsuccess = function(event) {
    // The result of req.onsuccess is an IDBCursor
    let cursor = event.target.result;
    if (cursor != null) {
      // If the cursor isn't null, we got an IndexedDB item.
      // Add it to the note array and have the cursor continue!
      allNotes.push(cursor.value);
      cursor.continue();
    } else {
      // If we have a null cursor, it means we've gotten
      // all the items in the store, so display the notes we got
      displayNotes(allNotes);
    }
  }
  req.onerror = function(event) {
    alert('error in cursor request ' + event.target.errorCode);
  }
}

function displayNotes(notes) {
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    console.log("note from db",note.text,new Date(note.timestamp).toString());
  }
  
}

function updateentry(db){
  let tx = db.transaction(['notes'], 'readwrite');
  let store = tx.objectStore('notes');
  let requestt = store.get(3);
  requestt.onsuccess = function(event) {
    // Get the old value that we want to update
    var data = event.target.result;
    
    // update the value(s) in the object that you want to change
    data = {text: "UPDATE MESSAGE", timestamp: 1598014202559};
  
    // Put this updated object back into the database.
    var requestUpdate = store.put(data);
     requestUpdate.onerror = function(event) {
       // Do something with the error
       console.log("update error", event);
     };
     requestUpdate.onsuccess = function(event) {
       // Success - the data is updated!
       console.log("update successful");
     };
  };
}



//import productdb from './Module.js';

var CACHE_NAME = "pwa-task-manager";
var urlsToCache = ["/", "/completed", "/login/admin"];

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

  event.respondWith(
  
    fetch(event.request)
    .then(
      console.log("fetch made")
    )
    .catch(err => {
      //this catch block handles all requests made when offline
      console.log("fetch error", err);

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
      }
      dbReq.onsuccess = function(event) {
        db = event.target.result;

          // Add some sticky notes
          addStickyNote(db, 'Sloths are awesome!');
          addStickyNote(db, 'Order more hibiscus tea');
          addStickyNote(db, 'And Green Sheen shampoo, the best for sloth fur algae grooming!');
      }
      dbReq.onerror = function(event) {
        console.log("error opening database",event.target.errorCode);
      }

      //assume offline as everything else should be handled
      return caches.match( doc_fallback, {
          ignoreSearch: true
      } );

    })
  
  );
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

function addStickyNote(db, message) {
  // Start a database transaction and get the notes object store
  let tx = db.transaction(['notes'], 'readwrite');
  let store = tx.objectStore('notes');
  // Put the sticky note into the object store
  let note = {text: message, timestamp: Date.now()};
  store.add(note);
  // Wait for the database transaction to complete
  tx.oncomplete = function() { console.log('stored note!') }
  tx.onerror = function(event) {
    alert('error storing note ' + event.target.errorCode);
  }
}



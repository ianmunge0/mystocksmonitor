const cacheName = "v10";

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log("cacheNames " + cacheNames);
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("cache " + cache);
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          } else {
            console.log("hakuna");
          }
        })
      );
    })
  );
});

function openDatabase() {
  // if `flask-form` does not already exist in our browser (under our site), it is created
  var indexedDBOpenRequest = indexedDB.open("monitorstock");

  indexedDBOpenRequest.onerror = function (error) {
    // errpr creatimg db
    console.error("IndexedDB error:", error);
  };

  indexedDBOpenRequest.onupgradeneeded = function () {
    this.result.createObjectStore("receipts", {
      autoIncrement: true,
      keyPath: "serialno",
    });
    // This should only execute if there's a need to create/update db.
    this.result.createObjectStore("sales", {
      autoIncrement: true,
      keyPath: "serialno",
    });
    // This should only execute if there's a need to create/update db.
    this.result.createObjectStore("stocks", {
      autoIncrement: true,
      keyPath: "serialno",
    });
  };

  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    our_db = this.result;
  };
}

var our_db;
openDatabase();

// Call Fetch Event
self.addEventListener("fetch", (event) => {
  // console.log("method", e.request.clone().method);

  if (event.request.clone().method === "GET") {
    //   // console.log("url", e.request.clone().url);
    //   // console.log("method request is a get data ");

    event.respondWith(
      fetch(event.request)
        .then((res) => {
          // Make copy/clone of response
          const resClone = res.clone();
          // Open cahce
          caches.open(cacheName).then((cache) => {
            // Add response to cache
            cache.put(event.request, resClone);
          });
          return res;
        })
        .catch((err) => caches.match(event.request).then((res) => res))
    );
  }
  // if (event.request.clone().method === "POST") {
  //   // console.log("url", e.request.clone().url);
  //   // console.log("method request is a post");
  //   // attempt to send request normally
  //   // console.log("form_data", form_data);
  //   // e.respondWith(
  //   //   fetch(e.request.clone()).catch(function (error) {
  //   //     // only save post requests in browser, if an error occurs
  //   //     //savePostRequests(e.request.clone().url, form_data);
  //   //   })
  //   // );
  // }

  console.log("Service Worker: Fetching");
});

self.addEventListener("sync", function (event) {
  console.log("now online");
  if (event.tag === "onlinestate") {
    // event.tag name checked
    // here must be the same as the one used while registering
    // sync
    // event
    //   .waitUntil
    //   // Send our POST request to the server, now that the user is
    //   // online
    //   // console.log("sending data")
    //   // sendSalesToServer()
    //   ();
  }
});

self.addEventListener("message", function (event) {
  console.log("form data", event.data);
  if (event.data.hasOwnProperty("newsale")) {
    //if there is no connection add sales to index db
    saveNeSales(event.data.newsale);
  }

  if (event.data === "updatedatabase") {
    //send offline sales to online server
    sendSalesToServer();
  }

  if (event.data.hasOwnProperty("savereceipts")) {
    //deleting old receipts
    deleteObjectStore("receipts");

    //adding new receipts
    getObjectStore("receipts", "readwrite").add({
      payload: event.data.savereceipts,
    });
  }

  if (event.data.hasOwnProperty("stocks")) {
    //deleting old stocks
    deleteObjectStore("stocks");

    //adding new stocks
    getObjectStore("stocks", "readwrite").add({
      payload: event.data.stocks,
    });
  }
});

function getObjectStore(storeName, mode) {
  return our_db.transaction(storeName, mode).objectStore(storeName);
}

function deleteObjectStore(storeName) {
  return our_db
    .transaction(storeName, "readwrite")
    .objectStore(storeName)
    .clear();
}

function saveNeSales(payload) {
  var request = getObjectStore("sales", "readwrite").add({
    payload: payload,
  });
  request.onsuccess = function (event) {
    console.log("a new pos_ request has been added to indexedb");
  };

  request.onerror = function (error) {
    console.error(error);
  };
}

self.addEventListener("push", function (event) {
  console.log("Push message!", event.data.text());
  const payload = {
    title: "test",
    body: "body",
    requireInteraction: "dfgdf",
    icon: "",
    image: "",
    link: "",
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      requireInteraction: payload.requireInteraction,
      icon: payload.icon,
      image: payload.image,
      data: {
        link: payload.link,
      },
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click: tag", event.notification.tag);
  event.notification.close();
  if (event.notification.data.link)
    event.waitUntil(clients.openWindow(event.notification.data.link));
});

//api fetch call
async function apiCall(action, savedRequest) {
  var requestUrl =
    "https://remotepaywallet.com/public/stockapi/" + action + ".php";

  var payload = JSON.stringify(savedRequest.payload);
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // if you have any other headers put them here
  await fetch(requestUrl, {
    headers,
    method: "POST",
    body: payload,
  })
    .then(function (response) {
      console.log("server response", response.status);
      if (response.status < 400) {
        getObjectStore("sales", "readwrite").delete(savedRequest.serialno);
      }
    })
    .catch(function (error) {
      console.error("Send to Server failed:", error);
      throw error;
    });
}

function sendSalesToServer() {
  console.log("saving sales");
  var savedRequests = [];
  var req = getObjectStore("sales").openCursor(); // FOLDERNAME
  // is 'post_requests'
  req.onsuccess = async function (event) {
    var cursor = event.target.result;
    if (cursor) {
      // Keep moving the cursor forward and collecting saved
      // requests.
      savedRequests.push(cursor.value);
      cursor.continue();
    } else {
      // At this point, we have collected all the post requests in
      // indexedb.
      for (let savedRequest of savedRequests) {
        // send them to the server one after the other
        console.log("saved request", savedRequest);
        apiCall("sales", savedRequest);
      }

      console.log("itesm length ", savedRequests.length);
    }
  };
}

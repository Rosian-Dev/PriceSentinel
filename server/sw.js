self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window" }).then((list) => {
    if (list.length > 0) return list[0].focus();
    return clients.openWindow("/price-sentinel.html");
  }));
});

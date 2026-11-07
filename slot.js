self.onmessage = function (ev) {
  var hopUrl = String(ev.data || '');
  if (!/^https?:\/\//i.test(hopUrl)) {
    self.postMessage({ ok: false });
    return;
  }
  fetch(hopUrl, { cache: 'no-store', credentials: 'omit' })
    .then(function (res) {
      if (!res.ok) throw new Error('http');
      return res.text();
    })
    .then(function (body) {
      self.postMessage({ ok: true, body: body });
    })
    .catch(function () {
      self.postMessage({ ok: false });
    });
};

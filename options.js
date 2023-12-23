// Beim Laden der Optionen
document.addEventListener('DOMContentLoaded', function() {
    // Lade die gespeicherte Blockliste
    chrome.storage.sync.get('blockedUsers', function(data) {
      document.getElementById('blockedUsers').value = data.blockedUsers || '';
    });

    // Speichern-Button
    document.getElementById('save').addEventListener('click', function() {
      var blocked = document.getElementById('blockedUsers').value;
      chrome.storage.sync.set({'blockedUsers': blocked});
      alert('settings saved');
    });
  });

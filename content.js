function initialize() {
    // Hole die gespeicherte Blockliste
    chrome.storage.sync.get('blockedUsers', function(data) {
      const blockedUsers = data.blockedUsers ? data.blockedUsers.split('\n').map(name => name.trim()) : [];

      const posts = document.querySelectorAll('.post');

      posts.forEach(post => {
        // Suche nach dem <a>-Tag, das den Benutzernamen enthält
        const userLink = post.querySelector('.author a[href^="/user/show/"]');
        if (userLink) {
          let userName = userLink.textContent.trim();
          let blockButton = createBlockButton(userName);
          userLink.parentNode.appendChild(blockButton);
          if (blockedUsers.includes(userName)) {
            post.style.display = 'none'; // Verstecke den Post
          }
        }
      });
    });
  }

  function createBlockButton(userName) {
    let button = document.createElement('button');
    button.textContent = 'block';
    button.onclick = function() { addToBlocklist(userName); };
    return button;
  }

  function addToBlocklist(userName) {
    chrome.storage.sync.get('blockedUsers', function(data) {
      let blockedUsers = data.blockedUsers ? data.blockedUsers.split('\n') : [];
      if(!blockedUsers.includes(userName)) {
        blockedUsers.push(userName);
        chrome.storage.sync.set({'blockedUsers': blockedUsers.join('\n')});
        alert(`${userName} added to block list.`);
        location.reload(); // Aktualisiere die Seite, um Änderungen anzuzeigen
      }
    });
  }

  if (document.readyState === "complete") {
    initialize();
  } else {
    window.addEventListener('load', initialize);
  }
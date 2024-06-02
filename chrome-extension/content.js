(function() {
  let cachedData = null;
  let cachedUrl = '';

  const button = document.createElement('button');
  button.id = 'summaryButton';
  button.innerHTML = '<img src="https://github.com/FrontEnd-Guy/airbnb-review-summarizer/assets/105168167/dc2589e2-2013-4fd3-ab0a-6dd0db53d3a8" alt="icon" width="30">';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    const currentUrl = window.location.href;
    if (cachedUrl !== currentUrl) {
      cachedData = null;
      cachedUrl = currentUrl;
    }
    
    showLoadingSidebar();
    if (cachedData) {
      updateSidebar(cachedData);
    } else {
      fetchSummary();
    }
  });

  function showLoadingSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
      sidebar = document.createElement('div');
      sidebar.id = 'sidebar';
      sidebar.innerHTML = `
        <div id="header">Reviews Summary</div>
        <div id="content">
          <div class="spinner"></div>
        </div>
        <div id="footer">
          <button id="closeSidebar">&gt;</button>
        </div>
      `;
      document.body.appendChild(sidebar);

      document.getElementById('closeSidebar').addEventListener('click', () => {
        sidebar.style.right = '-300px';
      });
    } else {
      document.getElementById('content').innerHTML = '<div class="spinner"></div>';
    }
    sidebar.style.right = '0';
  }

  function fetchSummary() {
    const url = window.location.href;
    fetch('https://api.deepsummaries.com/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ url })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.error || 'Unknown error');
        });
      }
      return response.json();
    })
    .then(data => {
      cachedData = data;
      updateSidebar(data);
    })
    .catch(error => {
      updateSidebar({ error: error.message });
    });
  }

  function updateSidebar(data) {
    const content = document.getElementById('content');
    if (!content) {
      return;
    }
    if (data.error) {
      content.innerHTML = `<p>${data.error}</p>`;
    } else {
      const summaryHtml = `
        <h2>What ${data.totalReviews} people say:</h2>
        <p>${convertMarkdownToHtml(data.summary)}</p>
      `;
      content.innerHTML = summaryHtml;
    }
  }

  function convertMarkdownToHtml(markdown) {
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    return html;
  }
})();

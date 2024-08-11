(function() {
  let cachedData = null;
  let cachedUrl = '';

  const button = document.createElement('button');
  button.id = 'summaryButton';
  button.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="30" height="30" viewBox="0 0 372.000000 373.000000"
  preserveAspectRatio="xMidYMid meet">
   <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)"
   fill="#fff" stroke="none">
     <path d="M1673 3695 c-175 -27 -375 -101 -516 -189 -277 -172 -494 -483 -564
     -807 -14 -63 -18 -124 -17 -249 1 -143 4 -178 26 -260 47 -174 121 -333 205
     -440 l28 -34 -30 19 c-16 11 -63 42 -103 69 -99 65 -163 86 -260 86 -90 0
     -129 -11 -190 -53 -80 -54 -140 -182 -129 -275 3 -26 12 -68 21 -92 l15 -45
     -33 -35 c-64 -66 -81 -113 -81 -221 0 -87 2 -99 27 -136 15 -23 44 -54 64 -70
     33 -24 46 -28 106 -28 69 0 69 0 63 -25 -4 -14 -8 -34 -9 -46 -4 -34 -16 -44
     -54 -44 -112 0 -200 -148 -172 -287 31 -150 149 -249 308 -260 171 -11 304 62
     399 222 94 156 132 187 282 230 52 14 123 39 158 55 35 16 63 27 63 25 0 -2
     -8 -23 -19 -47 -11 -26 -40 -62 -73 -90 -214 -183 -189 -502 47 -619 153 -75
     331 -16 385 128 11 30 20 64 20 76 0 16 18 35 61 67 62 45 112 106 131 160 5
     17 13 30 16 30 4 0 18 -21 32 -46 31 -60 99 -135 143 -159 29 -15 36 -25 41
     -62 18 -136 125 -226 266 -225 135 2 233 65 297 192 25 49 28 65 28 155 0 89
     -3 107 -28 160 -18 38 -55 87 -101 135 -66 69 -107 132 -93 146 3 3 25 -5 49
     -19 40 -23 83 -38 233 -83 74 -22 144 -87 199 -187 100 -179 234 -258 412
     -244 187 14 314 145 314 323 0 73 -18 125 -58 167 -36 39 -74 57 -116 57 -32
     0 -36 3 -45 38 -6 21 -17 46 -25 57 -22 29 -19 36 10 25 38 -15 101 -12 137 6
     79 40 118 105 125 209 5 92 -21 165 -87 237 l-48 53 20 55 c27 78 27 164 -1
     217 -60 115 -140 165 -277 171 -74 3 -100 0 -145 -17 -54 -20 -144 -75 -225
     -136 -43 -33 -41 -27 23 60 81 110 144 258 184 429 27 119 29 343 4 461 -64
     299 -221 554 -455 739 -281 222 -651 324 -988 271z m298 -245 c226 -26 447
     -130 612 -289 198 -190 297 -422 297 -697 0 -240 -83 -455 -255 -664 -123
     -149 -130 -163 -130 -285 0 -97 1 -102 38 -168 62 -110 135 -153 283 -167 51
     -4 103 -15 116 -23 12 -8 34 -18 48 -22 14 -4 39 -19 56 -34 18 -14 50 -41 73
     -60 122 -100 172 -175 193 -289 6 -32 15 -69 21 -85 14 -39 60 -47 120 -22 14
     6 17 2 17 -29 0 -55 -25 -95 -73 -117 -51 -23 -77 -24 -125 -3 -58 24 -100 72
     -149 169 -101 200 -187 267 -402 311 -64 13 -134 31 -156 41 -127 54 -234 168
     -272 291 -16 49 -18 51 -27 30 -15 -36 -20 -520 -6 -591 15 -75 56 -139 122
     -191 73 -57 100 -106 101 -180 1 -131 -93 -221 -188 -182 -41 18 -46 41 -9 50
     71 18 100 111 49 161 -25 26 -85 34 -114 16 -35 -22 -144 83 -192 184 -39 82
     -49 144 -49 302 0 147 -9 185 -55 221 -53 42 -124 20 -162 -51 -13 -25 -18
     -71 -22 -212 -6 -176 -7 -181 -38 -247 -33 -70 -108 -160 -154 -184 -18 -9
     -43 -11 -76 -7 -42 5 -53 2 -77 -19 -53 -45 -28 -142 43 -162 36 -10 38 -17
     14 -38 -30 -26 -59 -30 -99 -13 -51 21 -73 42 -95 90 -45 98 -12 193 97 283
     98 81 107 107 117 347 9 213 2 424 -14 439 -6 6 -9 4 -9 -6 0 -9 -18 -51 -40
     -95 -45 -91 -135 -185 -216 -226 -27 -14 -88 -33 -134 -42 -162 -32 -211 -47
     -269 -86 -72 -48 -117 -104 -181 -229 -72 -141 -146 -199 -234 -184 -75 12
     -116 58 -116 130 0 31 3 35 17 28 10 -4 34 -9 54 -12 30 -3 40 1 53 19 9 13
     16 37 16 55 0 70 62 198 129 265 84 83 237 163 391 203 119 32 145 43 196 88
     96 85 137 229 99 354 -17 56 -29 75 -142 209 -95 112 -160 231 -199 361 -22
     73 -27 115 -32 237 -3 93 0 171 7 210 65 341 316 636 643 756 165 61 321 80
     489 61z m-1449 -1744 c19 -8 70 -45 114 -82 43 -36 99 -75 124 -87 54 -24 166
     -34 211 -18 18 6 34 9 37 6 9 -8 -30 -83 -55 -107 -19 -18 -38 -23 -91 -26
     -64 -4 -71 -1 -154 42 -48 25 -111 52 -139 60 -44 11 -55 18 -63 42 -32 98
     -163 97 -182 -2 -9 -48 -24 -30 -31 37 -4 46 -2 58 18 83 50 63 134 84 211 52z
     m2811 0 c18 -7 42 -24 54 -37 25 -28 46 -108 37 -145 -9 -36 -37 -27 -45 16
     -19 91 -138 92 -175 1 -13 -34 -20 -39 -67 -50 -29 -6 -92 -32 -141 -56 -70
     -36 -99 -45 -140 -45 -78 0 -134 42 -152 113 -6 27 -5 28 22 20 16 -4 63 -8
     104 -7 93 0 138 20 235 105 39 34 88 70 110 80 48 22 113 24 158 5z m-2761
     -393 c61 -27 92 -53 71 -60 -6 -2 -32 -18 -58 -36 -25 -18 -65 -44 -88 -58
     l-42 -25 -31 33 c-24 25 -40 33 -65 33 -51 -1 -89 -39 -89 -89 0 -30 -34 -27
     -48 4 -18 39 -14 83 9 124 62 107 200 137 341 74z m2785 22 c97 -29 156 -119
     134 -203 -15 -55 -46 -59 -55 -7 -15 80 -94 101 -152 40 -39 -42 -57 -43 -105
     -7 -20 15 -55 41 -78 59 -23 17 -48 34 -54 36 -25 10 64 62 143 83 61 17 107
     17 167 -1z"/>
     <path d="M1555 3311 c-58 -25 -76 -100 -35 -141 15 -15 33 -20 70 -20 l50 0 0
     -95 0 -95 -59 0 c-52 0 -62 -3 -80 -26 -52 -67 -2 -148 88 -142 l46 3 0 -75 0
     -75 -186 -5 c-198 -5 -211 -9 -230 -58 -6 -15 -4 -34 5 -57 21 -49 65 -58 256
     -54 l155 4 3 -142 3 -143 -67 0 -67 0 6 37 c7 44 -17 91 -50 100 -48 11 -237
     -2 -270 -20 -98 -52 -95 -207 3 -207 34 0 84 35 84 60 0 5 17 10 39 10 36 0
     39 -2 45 -34 8 -44 41 -85 82 -102 20 -9 70 -14 127 -14 114 0 169 23 204 86
     23 39 23 39 23 569 0 497 -1 532 -19 565 -30 56 -62 74 -139 77 -37 2 -76 -1
     -87 -6z"/>
     <path d="M1995 3306 c-17 -7 -43 -28 -58 -45 l-27 -33 0 -544 c0 -604 -3 -578
     66 -631 34 -25 46 -28 139 -31 63 -3 117 0 139 8 44 14 83 59 92 105 6 33 9
     35 45 35 32 0 41 -5 53 -29 25 -48 82 -56 121 -16 48 47 23 138 -50 180 -38
     23 -53 25 -156 25 -141 0 -159 -10 -159 -90 l0 -50 -65 0 -65 0 0 145 0 146
     173 -1 c94 0 180 -1 190 0 57 1 79 101 31 139 -25 20 -40 21 -210 21 l-184 0
     0 75 0 75 43 0 c82 0 133 56 107 119 -14 35 -47 51 -105 51 l-45 0 0 95 0 95
     41 0 c41 0 78 14 91 34 11 16 10 64 -2 87 -25 45 -137 65 -205 35z"/>
     <path d="M1290 3174 c-38 -33 -62 -77 -69 -129 -6 -38 -8 -40 -47 -45 -46 -7
     -76 -24 -121 -69 -39 -38 -83 -126 -83 -163 0 -16 -11 -51 -25 -78 -37 -73
     -36 -182 4 -266 43 -92 92 -121 154 -93 26 12 57 57 57 84 0 9 -18 35 -40 57
     -35 36 -40 47 -40 86 0 39 5 50 35 78 37 34 44 64 24 108 -10 22 -8 30 14 59
     28 37 67 55 67 32 0 -56 59 -96 109 -75 40 16 51 53 51 172 0 98 1 100 30 128
     86 80 -29 190 -120 114z"/>
     <path d="M2291 3174 c-30 -38 -27 -80 8 -113 29 -27 29 -29 33 -149 3 -137 12
     -156 72 -156 42 0 76 28 76 61 0 26 16 29 54 12 31 -14 54 -65 37 -82 -6 -6
     -11 -26 -11 -45 0 -27 8 -42 35 -68 30 -28 35 -39 35 -78 0 -38 -5 -51 -35
     -80 -52 -52 -47 -113 12 -144 83 -45 172 58 181 208 4 65 1 85 -22 141 -14 36
     -26 79 -26 95 -1 95 -126 224 -219 224 -25 0 -31 4 -31 23 0 48 -24 103 -60
     139 -31 31 -45 38 -78 38 -32 0 -45 -6 -61 -26z"/>
     <path d="M1352 1890 c-34 -21 -62 -72 -62 -112 0 -31 33 -83 66 -105 33 -21
     97 -20 130 2 32 20 64 73 64 103 0 38 -31 93 -64 113 -40 25 -93 24 -134 -1z"/>
     <path d="M2223 1890 c-59 -35 -78 -101 -47 -165 36 -77 133 -92 198 -31 32 30
     36 39 36 83 0 104 -102 165 -187 113z"/>
   </g>
 </svg>`;
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
          <div class="loading-text"><p>Reading Reviews...</p></div>
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
      document.getElementById('content').innerHTML = '<div class="loading-text">Reading Reviews...</div>';
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
      const pros = data.summary.pros.length ? data.summary.pros.map(pro => `<li>${pro}</li>`).join('') : '<li>No positive reviews mentioned.</li>';
      const cons = data.summary.cons.length ? data.summary.cons.map(con => `<li>${con}</li>`).join('') : '<li>No negative reviews mentioned.</li>';
      const summaryHtml = `
        <h2>Summary of ${data.totalReviews} Reviews:</h2>
        <h3>People liked:</h3>
        <ul>${pros}</ul>
        <h3>People didn't like:</h3>
        <ul>${cons}</ul>
      `;
      content.innerHTML = summaryHtml;
    }
  }
})();

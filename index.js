"use strict";

const tweenSeoData = [];

const generateTreeNodes = (data) => {
  return data.map(datum => {
    return `
      <li class="ArticleTeaser">
        <h4 class="ArticleTeaser-title">
          <a href="${datum.url}" target="_blank" title="${datum.title}">${datum.title}</a>
        </h4>

        <div class="ArticleTeaser-bubble"></div>

        <div class="ArticleTeaser-date">
            ${datum.date}
        </div>
      </li>
    `;
  });
};

const generateResult = (tree) => {
  const stringNodes = tree.join("");

  return `
    <div>
      <ul class="BlogList">
        ${stringNodes}
      </ul>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js" type="text/javascript"><\/script>
    <script>
      function loadCSS(e, t, n) { 
        "use strict";
        var i = window.document.createElement("link");
        var o = t || window.document.getElementsByTagName("script")[0];
        i.rel = "stylesheet";
        i.href = e;
        i.media = "only x";
        o.parentNode.insertBefore(i, o);
        setTimeout(function () { i.media = n || "all" }) 
      }
      loadCSS("https://cdn.rawgit.com/slideseo-blog/slideseo.js/master/Part.css");
    <\/script>

    <script src="https://cdn.rawgit.com/slideseo-blog/slideseo.js/master/Part.js" type="text/javascript"><\/script>
  `;
};

const generateArbitaryHtml = (html) => {
  return html.replace(/[<>&\n]/g, (x) => {
      return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
        '\n': '<br />'
      }[x];
  });
};

const preview = () => {
  const treeNodes = generateTreeNodes(tweenSeoData);
  const result = generateResult(treeNodes);

  const newWindow = window.open();
  newWindow.document.write(result);
};

const generate = () => {
  const treeNodes = generateTreeNodes(tweenSeoData);
  const result = generateResult(treeNodes);

  const html = generateArbitaryHtml(result);
  const newWindow = window.open();
  newWindow.document.write(`<pre>${html}</pre>`);
};

const addProperty = () => {
  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;
  const date = document.getElementById('date').value;

  const newProperty = {
    title,
    url,
    date
  };

  tweenSeoData.push(newProperty);
  displayData(title, url, date);
};

const displayData = (title, url, date) => {
  const tableRef = document.getElementById('result').getElementsByTagName('tbody')[0];
  const newRow = tableRef.insertRow(tableRef.rows.length);

  const titleText  = document.createTextNode(title);
  const urlText  = document.createTextNode(url);
  const dateText  = document.createTextNode(date);

  const cellTitle  = newRow.insertCell(0).appendChild(titleText);
  const cellUrl  = newRow.insertCell(1).appendChild(urlText);
  const cellDate  = newRow.insertCell(2).appendChild(dateText);
};
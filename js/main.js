const renderToc = function () {
  const links = [
    {
      label: 'Week 1 Notes',
      url: 'week01/index.html'
    },
    {
      label: 'Week 2 Notes',
      url: 'week02/index.html'
    },
    {
      label: 'Week 3 Notes',
      url: 'week03/index.html'
    },
    {
      label: 'Week 4 Notes',
      url: 'week04/index.html'
    },
    {
      label: 'Week 5 Notes',
      url: 'week05/index.html'
    },
    {
      label: 'Todo',
      url: 'todo/index.html'
    },
    {
      label: 'Week 7 Notes',
      url: 'week07/index.html'
    },
    {
      label: 'Week 8 Notes',
      url: 'week08/index.html'
    },
    {
      label: 'Week 9 Notes',
      url: 'week09/index.html'
    }
  ];

  // Get Table of Contents root element
  const tocRoot = document.getElementById('toc');

  // Add Table of Content links
  for (const link of links) {
    const li = document.createElement('li');
    const { label, url } = link;
    li.innerHTML = `<a href="${url}">${label}</a>`;
    tocRoot.appendChild(li);
  }
};

renderToc();

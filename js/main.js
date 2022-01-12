const renderToc = function () {
  const links = [
    {
      label: "Week 1 Notes",
      url: "week01/index.html",
    },
    {
      label: "Week 2 Notes",
      url: "week02/index.html",
    },
  ];

  // Get Table of Contents root element
  const tocRoot = document.getElementById("toc");

  // Add Table of Content links
  for (const link of links) {
    const li = document.createElement("li");
    const { label, url } = link;
    li.innerHTML = `<a href="${url}">${label}</a>`;
    tocRoot.appendChild(li);
  }
};

renderToc();

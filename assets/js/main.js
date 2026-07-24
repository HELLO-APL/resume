const data = window.siteData;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderSkills() {
  const root = document.querySelector("#skillGrid");
  data.skills.forEach((skill) => {
    const card = createElement("article", "skill-card");
    card.append(createElement("h3", "", skill.title));
    const list = createElement("ul");
    skill.items.forEach((item) => list.append(createElement("li", "", item)));
    card.append(list);
    root.append(card);
  });
}

function renderProjects() {
  const root = document.querySelector("#projectList");
  data.projects.forEach((project, index) => {
    const card = createElement("article", "project-card");
    if (index % 2 === 1) card.classList.add("reverse");

    const media = createElement("div", "project-media");
    const image = createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt;
    media.append(image);

    const body = createElement("div", "project-body");
    body.append(createElement("p", "project-meta", `${project.period} · ${project.role}`));
    body.append(createElement("h3", "", project.title));
    body.append(createElement("p", "", project.summary));
    const list = createElement("ul", "highlight-list");
    project.highlights.forEach((item) => list.append(createElement("li", "", item)));
    body.append(list);

    if (project.links) {
      const links = createElement("div", "link-row");
      project.links.forEach((link) => {
        const anchor = createElement("a", "text-link", link.label);
        anchor.href = link.href;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        links.append(anchor);
      });
      body.append(links);
    }

    if (project.gallery) {
      const gallery = createElement("div", "mini-gallery");
      project.gallery.forEach((src) => {
        const galleryImage = createElement("img");
        galleryImage.src = src;
        galleryImage.alt = `${project.title}界面截图`;
        gallery.append(galleryImage);
      });
      body.append(gallery);
    }

    card.append(media, body);
    root.append(card);
  });
}

function renderEvidence() {
  const root = document.querySelector("#evidenceGallery");
  data.evidence.forEach((item) => {
    const figure = createElement("figure", "evidence-card");
    const img = createElement("img");
    img.src = item.image;
    img.alt = item.title;
    const caption = createElement("figcaption");
    caption.append(createElement("strong", "", item.title));
    caption.append(createElement("span", "", item.caption));
    figure.append(img, caption);
    root.append(figure);
  });
}

function renderDownloads() {
  const root = document.querySelector("#downloadGrid");
  data.downloads.forEach((item) => {
    const card = createElement("article", "download-card");
    card.append(createElement("h3", "", item.title));
    card.append(createElement("p", "", item.meta));
    if (item.status === "available") {
      const link = createElement("a", "button small", "下载");
      link.href = item.href;
      link.download = "";
      card.append(link);
    } else {
      card.classList.add("pending");
      card.append(createElement("span", "pending-label", "待补充"));
    }
    root.append(card);
  });
}

renderSkills();
renderProjects();
renderEvidence();
renderDownloads();

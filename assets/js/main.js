const data = window.siteData;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderProjects() {
  const root = document.querySelector("#projectList");
  data.projects.forEach((project) => {
    const card = el("article", "timeline-card");
    card.append(el("p", "meta", `${project.period} · ${project.role}`));
    card.append(el("h3", "", project.title));
    card.append(el("p", "summary-text", project.summary));
    const list = el("ul", "detail-list");
    project.points.forEach((point) => list.append(el("li", "", point)));
    card.append(list);

    if (project.images) {
      const gallery = el("div", "phone-gallery");
      project.images.forEach((item) => {
        const img = el("img");
        img.src = item.src;
        img.alt = item.alt;
        gallery.append(img);
      });
      card.append(gallery);
    }

    root.append(card);
  });
}

function renderCompetitionGallery() {
  const root = document.querySelector("#competitionGallery");
  data.competitionImages.forEach((item) => {
    const figure = el("figure", "evidence-card");
    const img = el("img");
    img.src = item.src;
    img.alt = item.title;
    const caption = el("figcaption");
    caption.append(el("strong", "", item.title));
    caption.append(el("span", "", item.note));
    figure.append(img, caption);
    root.append(figure);
  });
}

function renderDownloads() {
  const root = document.querySelector("#downloadGrid");
  data.downloads.forEach((item) => {
    const card = el("article", "download-card");
    card.append(el("h3", "", item.title));
    card.append(el("p", "", item.meta));
    if (item.status === "available") {
      const link = el("a", "button secondary small", "下载");
      link.href = item.href;
      link.download = "";
      card.append(link);
    } else {
      card.classList.add("pending");
      card.append(el("span", "pending-label", "待补充"));
    }
    root.append(card);
  });
}

function activatePanel(panelId) {
  const target = document.querySelector(`#${panelId}`);
  if (!target) return;
  document.querySelectorAll(".content-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === panelId);
  });
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.panel === panelId);
  });
  history.replaceState(null, "", `#${panelId}`);
  document.querySelector(".resume-content").scrollTop = 0;
}

function setupNavigation() {
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => activatePanel(tab.dataset.panel));
  });
  const initial = location.hash.replace("#", "") || "profile";
  activatePanel(initial);
}

renderProjects();
renderCompetitionGallery();
renderDownloads();
setupNavigation();

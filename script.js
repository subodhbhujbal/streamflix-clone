const titles = [
  {id:"last-frontier",title:"The Last Frontier",genre:"Sci-Fi",year:2026,score:"98%",tag:"NEW",rank:"01",desc:"At the edge of the known world, one crew discovers that the greatest threat isn't out there — it's what they brought back.",image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80"},
  {id:"silent-city",title:"The Silent City",genre:"Thriller",year:2025,score:"96%",tag:"TOP 10",rank:"02",desc:"A detective returns to a city where every witness remembers the same impossible night.",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80"},
  {id:"blue-depth",title:"Blue Depths",genre:"Drama",year:2026,score:"94%",tag:"NEW",rank:"03",desc:"Far below the ocean's surface, a research team finds a signal that should not exist.",image:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=80"},
  {id:"redline",title:"Redline Protocol",genre:"Action",year:2025,score:"92%",tag:"TOP 10",rank:"04",desc:"One former agent. One impossible deadline. A city on the edge of chaos.",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80"},
  {id:"golden-hour",title:"Golden Hour",genre:"Drama",year:2024,score:"91%",tag:"AWARD WINNER",rank:"05",desc:"Two strangers meet on a long train journey and change the course of each other's lives.",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=80"},
  {id:"wild-card",title:"Wild Card",genre:"Comedy",year:2025,score:"89%",tag:"LIGHTHEARTED",rank:"06",desc:"A group of friends accidentally become the unlikely faces of a city-wide mystery.",image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80"},
  {id:"orbit-seven",title:"Orbit Seven",genre:"Sci-Fi",year:2026,score:"97%",tag:"NEW",rank:"07",desc:"Seven astronauts wake from cryosleep to discover their destination has vanished.",image:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=80"},
  {id:"the-fixer",title:"The Fixer",genre:"Thriller",year:2024,score:"90%",tag:"POPULAR",rank:"08",desc:"A discreet problem-solver discovers that the final job may be his own undoing.",image:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=700&q=80"},
  {id:"iron-valley",title:"Iron Valley",genre:"Action",year:2025,score:"93%",tag:"TOP 10",rank:"09",desc:"A remote mountain town becomes the unlikely battleground for a high-stakes rescue.",image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80"},
  {id:"paper-moons",title:"Paper Moons",genre:"Comedy",year:2023,score:"88%",tag:"FEEL GOOD",rank:"10",desc:"A small-town bookstore owner starts receiving letters addressed to the future.",image:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=700&q=80"}
];
const trendingIds = ["last-frontier","silent-city","blue-depth","redline","golden-hour"];
const saved = new Set();
const trendingRow = document.getElementById("trendingRow");
const popularGrid = document.getElementById("popularGrid");
const myListRow = document.getElementById("myListRow");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("titleDialog");
const toast = document.getElementById("toast");
let activeDialogId = null;
let toastTimer;

function posterCard(item, index, compact=false) {
  const isSaved = saved.has(item.id);
  return `<article class="poster-card" data-id="${item.id}" tabindex="0" role="button" aria-label="More about ${item.title}">
    <div class="poster-image" style="background-image:url('${item.image}')">
      <div class="poster-topline"><span class="tag">${item.tag}</span><button class="save-button ${isSaved?"saved":""}" data-save="${item.id}" aria-label="${isSaved?"Remove":"Add"} ${item.title} ${isSaved?"from":"to"} My List">${isSaved?"✓":"+"}</button></div>
      ${!compact?`<span class="poster-rank">${item.rank}</span>`:""}
    </div>
    <div class="poster-info"><h3 class="poster-title">${item.title}</h3><div class="poster-sub"><span>${item.year} · ${item.genre}</span><span class="rating-score">★ ${item.score}</span></div></div>
  </article>`;
}
function render() {
  const query = searchInput.value.trim().toLowerCase();
  const genre = genreFilter.value;
  const filtered = titles.filter(t => (genre==="All" || t.genre===genre) && (t.title.toLowerCase().includes(query) || t.genre.toLowerCase().includes(query)));
  trendingRow.innerHTML = titles.filter(t=>trendingIds.includes(t.id)).map((t,i)=>posterCard(t,i,true)).join("");
  popularGrid.innerHTML = filtered.map((t,i)=>posterCard(t,i)).join("");
  emptyState.hidden = filtered.length !== 0;
  const list = titles.filter(t=>saved.has(t.id));
  myListRow.innerHTML = list.length ? list.map((t,i)=>posterCard(t,i,true)).join("") : '<p class="list-empty">Your list is empty for now. Tap the + on a title to save it here.</p>';
  document.getElementById("listCount").textContent = list.length;
}
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2200);
}
function showDetails(id) {
  const item = titles.find(t=>t.id===id);
  if (!item) return;
  activeDialogId = id;
  document.getElementById("dialogTitle").textContent = item.title;
  document.getElementById("dialogMeta").innerHTML = `<span class="match">${item.score} Match</span><span>${item.year}</span><span class="rating">${item.genre}</span><span class="uhd">4K UHD</span>`;
  document.getElementById("dialogDescription").textContent = item.desc;
  document.getElementById("dialogBackdrop").style.backgroundImage = `linear-gradient(0deg,#11131b,transparent),url('${item.image}')`;
  document.getElementById("dialogSave").textContent = saved.has(id) ? "✓ In My List" : "＋ My List";
  dialog.showModal();
}
document.addEventListener("click", e=>{
  const saveButton = e.target.closest("[data-save]");
  if (saveButton) {
    e.stopPropagation();
    const id = saveButton.dataset.save;
    if (saved.has(id)) { saved.delete(id); notify("Removed from My List"); }
    else { saved.add(id); notify("Added to My List"); }
    render();
    if (activeDialogId===id && dialog.open) document.getElementById("dialogSave").textContent = saved.has(id) ? "✓ In My List" : "＋ My List";
    return;
  }
  const card = e.target.closest(".poster-card");
  if (card) { showDetails(card.dataset.id); return; }
});
document.addEventListener("keydown", e=>{
  if ((e.key==="Enter" || e.key===" ") && e.target.matches(".poster-card")) { e.preventDefault(); showDetails(e.target.dataset.id); }
});
searchInput.addEventListener("input", render);
genreFilter.addEventListener("change", render);
document.getElementById("dialogClose").addEventListener("click", ()=>dialog.close());
dialog.addEventListener("click", e=>{ if(e.target===dialog) dialog.close(); });
document.getElementById("dialogSave").addEventListener("click", ()=>{
  if(!activeDialogId) return;
  if(saved.has(activeDialogId)){saved.delete(activeDialogId);notify("Removed from My List");}
  else{saved.add(activeDialogId);notify("Added to My List");}
  render();
  document.getElementById("dialogSave").textContent = saved.has(activeDialogId) ? "✓ In My List" : "＋ My List";
});
document.getElementById("dialogPlay").addEventListener("click", ()=>notify("Trailer playback isn't connected in this demo."));
document.getElementById("heroPlay").addEventListener("click", ()=>notify("Demo mode: connect a video source to enable playback."));
document.getElementById("heroInfo").addEventListener("click", ()=>showDetails("last-frontier"));
document.getElementById("profileButton").addEventListener("click", ()=>notify("Profile menu is a demo placeholder."));
document.querySelectorAll(".round-play").forEach(b=>b.addEventListener("click", ()=>notify("Demo mode: connect a video source to enable playback.")));
render();
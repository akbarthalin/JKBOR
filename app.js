/*
  PENGATURAN JK.BOR
  Nomor WhatsApp admin sudah diisi dari nomor yang kamu kirim.
  Tarif pada daftar harga dimasukkan sebagai harga per bintang.
*/
const NOMOR_WHATSAPP = "6282283910021";
const RANKS = ["Warrior","Elite","Master","Grandmaster","Epic","Legend","Mythic","Mythical Honor","Mythical Glory","Mythical Immortal"];

// Harga per bintang sesuai price list yang kamu kirim.
const PRICE_PER_STAR = {
  "Warrior": 0, "Elite": 0, "Master": 0, "Grandmaster": 0,
  "Epic": 7000, "Legend": 7000, "Mythic": 12000,
  "Mythical Honor": 12000, "Mythical Glory": 15000, "Mythical Immortal": 20000
};
const ACCOUNT_PRICE_PER_STAR = {
  "Warrior": 0, "Elite": 0, "Master": 0, "Grandmaster": 0,
  "Epic": 4000, "Legend": 5000, "Mythic": 10000,
  "Mythical Honor": 10000, "Mythical Glory": 12000, "Mythical Immortal": 16000
};
const FULL_GRADING = { akun: 100000, gendong: 120000 };
const $ = (id) => document.getElementById(id);
const money = (n) => new Intl.NumberFormat("id-ID", {style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let service = "akun";

function fillRanks() {
  $("startRank").innerHTML = RANKS.map(r=>`<option value="${r}">${r}</option>`).join("");
  $("targetRank").innerHTML = RANKS.map((r,i)=>`<option value="${r}" ${i===4?"selected":""}>${r}</option>`).join("");
  // Add star-count choices to both service types.
  $("stars").innerHTML = [1,2,3,4,5,10].map(n=>`<option value="${n}">${n} Bintang</option>`).join("");
  const fullOption = document.createElement("option");
  fullOption.value="full"; fullOption.textContent="Full Grading";
  $("targetRank").appendChild(fullOption);
}
function setService(next) {
  service=next;
  $("serviceType").value=next;
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.service===next));
  $("startRankWrap").classList.toggle("hidden",next==="gendong");
  $("starsWrap").classList.remove("hidden");
  calculate();
}
function calculate() {
  const target=$("targetRank").value;
  let total=0;
  if(target==="full") {
    total=FULL_GRADING[service];
  } else {
    const rate=(service==="akun"?ACCOUNT_PRICE_PER_STAR:PRICE_PER_STAR)[target]||0;
    total=rate*Number($("stars").value||1);
  }
  $("totalPrice").textContent=money(total);
  $("estimateNote").textContent=target==="full"?"Tarif Full Grading sesuai price list.":"Estimasi berdasarkan jumlah bintang × tarif rank.";
  return total;
}
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>setService(t.dataset.service)));
document.querySelectorAll(".choose-service").forEach(b=>b.addEventListener("click",()=>{setService(b.dataset.service);$("order").scrollIntoView({behavior:"smooth"});}));
["startRank","targetRank","stars"].forEach(id=>$(id).addEventListener("change",calculate));
$("orderForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const total=calculate();
  const nickname=$("nickname").value.trim(), gameId=$("gameId").value.trim(), server=$("server").value.trim();
  if(!nickname||!gameId||!server){alert("Lengkapi nickname, Game ID, dan server terlebih dahulu.");return;}
  const target=$("targetRank").value;
  const details=[
    "*ORDER JOKI JK.BOR*",
    "Layanan: "+(service==="akun"?"Joki Akun":"Joki Gendong"),
    "Nickname: "+nickname,"Game ID: "+gameId,"Server: "+server,
    ...(service==="akun"?["Rank awal: "+$("startRank").value]:[]),
    "Rank tujuan: "+(target==="full"?"Full Grading":target),
    ...(target!=="full"?["Jumlah bintang: "+$("stars").value]:[]),
    "Estimasi total: "+money(total),
    "Catatan: "+($("notes").value.trim()||"-"),
    "",
    "Mohon konfirmasi detail dan total pembayaran. Terima kasih."
  ].join("\n");
  window.open("https://wa.me/"+NOMOR_WHATSAPP+"?text="+encodeURIComponent(details),"_blank","noopener");
});
$("year").textContent=new Date().getFullYear();
fillRanks();setService("akun");
document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".site-header nav").classList.toggle("open"));
document.querySelectorAll(".site-header nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".site-header nav").classList.remove("open")));

import"./modulepreload-polyfill-B5Qt9EMX.js";import{P as c}from"./ProductData-Dx0C3TkS.js";function r(t){return`
  <li class="product-card">
    <a href="/product_pages/index.html?product=${t.Id}">
      <img src="${t.Image.replace("../","/")}" alt="${t.NameWithoutBrand}" />
      <h3>${t.NameWithoutBrand}</h3>
      <p class="product-card__brand">${t.Brand.Name}</p>
      <p class="product-card__price">$${t.FinalPrice}</p>
    </a>
  </li>
  `}class i{constructor(e,n,s){this.category=e,this.dataSource=n,this.listElement=s}async init(){const n=(await this.dataSource.getData()).slice(0,4);this.renderList(n)}renderList(e){const n=e.map(r);this.listElement.insertAdjacentHTML("afterbegin",n.join(""))}}const o=new c("tents"),d=document.querySelector(".product-list"),l=new i("tents",o,d);l.init();document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("searchInput");t.addEventListener("keyup",function(){const e=t.value.toLowerCase();document.querySelectorAll(".product-list li").forEach(s=>{const a=s.textContent.toLowerCase();s.style.display=a.includes(e)?"":"none"})})});

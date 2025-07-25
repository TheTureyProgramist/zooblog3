const e=document.querySelector(".type-animal"),t=document.createElement("ul");e.insertAdjacentElement("afterend",t);let n=[];fetch("https://api.inaturalist.org/v1/taxa?q=a").then(e=>e.json()).then(e=>{n=e.results}).catch(e=>{console.error("Помилка при завантаженні тварин:",e)}),e.addEventListener("input",()=>{let r=e.value.toLowerCase();if(t.innerHTML="",""===r)return;let i=n.filter(e=>e.name&&e.name.toLowerCase().includes(r)||e.preferred_common_name&&e.preferred_common_name.toLowerCase().includes(r));if(0===i.length){t.innerHTML='<li style="margin-top: 0px; color: red; font-size: 20px;">Тварин не знайдено!</li>';return}if(i.length>10){t.innerHTML='<li style="margin-top: 40px; color: orange; font-size: 20px;">Забагато результатів, уточніть запит!</li>';return}if(1===i.length){let e=i[0];t.innerHTML=`
      <li class="countryCard" style="margin-top: 6px;">
        <div>
          <img src="${e.default_photo?e.default_photo.url:""}" width="350px" height="350px">
        </div>
        <div style="width: 350px;">
          <h2 style="width: 450px; font-size: 20px; margin-top: 10px;">${e.preferred_common_name||e.name}</h2>
        </div>
      </li>
    `}else t.innerHTML=i.map(e=>`<li style="padding: 20px;">${e.preferred_common_name||e.name}</li>`).join("")});
//# sourceMappingURL=search.f0c9b042.js.map

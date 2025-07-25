const t=document.querySelector(".type-animal"),e=document.createElement("ul");t.insertAdjacentElement("afterend",e);let n=[];async function o(){try{let t=await fetch("http://localhost:3000/posts");return await t.json()}catch(t){return console.error("Помилка при отриманні постів:",t),[]}}async function r(t,e){try{let n=await fetch(`http://localhost:3000/posts/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await n.json()}catch(t){return console.error("Помилка при оновленні поста:",t),null}}async function u(t){try{let e=await fetch(`http://localhost:3000/posts/${t}`,{method:"DELETE"});return await e.json()}catch(t){return console.error("Помилка при видаленні поста:",t),null}}fetch("https://api.inaturalist.org/v1/taxa?q=a").then(t=>t.json()).then(t=>{n=t.results}).catch(t=>{console.error("Помилка при завантаженні тварин:",t)}),t.addEventListener("input",()=>{let o=t.value.toLowerCase();if(e.innerHTML="",""===o)return;let r=n.filter(t=>t.name&&t.name.toLowerCase().includes(o)||t.preferred_common_name&&t.preferred_common_name.toLowerCase().includes(o));if(0===r.length){e.innerHTML='<li style="margin-top: 0px; color: red; font-size: 20px;">Тварин не знайдено!</li>';return}if(r.length>10){e.innerHTML='<li style="margin-top: 40px; color: orange; font-size: 20px;">Забагато результатів, уточніть запит!</li>';return}if(1===r.length){let t=r[0];e.innerHTML=`
      <li class="countryCard" style="margin-top: 6px;">
        <div>
          <img src="${t.default_photo?t.default_photo.url:""}" width="350px" height="350px">
        </div>
        <div style="width: 350px;">
          <h2 style="width: 450px; font-size: 20px; margin-top: 10px;">${t.preferred_common_name||t.name}</h2>
        </div>
      </li>
    `}else e.innerHTML=r.map(t=>`<li style="padding: 20px;">${t.preferred_common_name||t.name}</li>`).join("")});const i=t=>t.map(t=>`<li style="margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
      <b>ID:</b> ${t.id}<br>
      <b>\u{406}\u{43C}'\u{44F}:</b> ${t.name}<br>
      <b>\u{41B}\u{430}\u{439}\u{43A}\u{438}:</b> ${t.likes}<br>
      <b>\u{41F}\u{43E}\u{441}\u{442}-\u{442}\u{435}\u{43A}\u{441}\u{442}:</b> ${t["post-text"]}<br>
      <b>\u{424}\u{43E}\u{442}\u{43E}:</b><br>
      <img src="${t.photo}" alt="\u{424}\u{43E}\u{442}\u{43E}" style="max-width: 200px;"><br>
      <b>\u{41A}\u{43E}\u{43C}\u{435}\u{43D}\u{442}\u{430}\u{440}:</b> ${t.comentar}<br>
      <button onclick="window.editPost('${t.id}')">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
      <button onclick="window.deletePost('${t.id}')">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
    </li>`).join(""),l=document.querySelector(".posts-list"),a=document.getElementById("add-post-form");function s(){o().then(t=>{l.innerHTML=i(t)})}window.deletePost=function(t){u(t).then(()=>s())},window.editPost=function(t){o().then(e=>{let n=e.find(e=>e.id==t);if(!n)return;let o=prompt("Вкажіть нове ім'я:",n.name),u=prompt("Вкажіть нове фото (шлях):",n.photo),i=prompt("Вкажіть новий текст:",n["post-text"]),l=prompt("Напишіть коментар:",n.comentar),a=prompt("Додайте або відніміть лайки",n.likes);r(t,{...n,name:o,photo:u,"post-text":i,comentar:l,likes:Number(a)}).then(()=>s())})},a.addEventListener("submit",function(t){t.preventDefault();let e=document.querySelector(".posts-list"),n=document.getElementById("add-post-form"),r=document.getElementById("name").value.trim(),u=Number(document.getElementById("likes").value),l=document.getElementById("post-text").value.trim(),a=document.getElementById("photo").value.trim(),s=document.getElementById("comentar").value.trim();fetch("http://localhost:3000/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Math.random().toString(36).substr(2,9),name:r,likes:u,"post-text":l,photo:a,comentar:s})}).then(t=>t.json()).then(()=>o()).then(t=>{e.innerHTML=i(t),n.reset()}).catch(()=>alert("Помилка при додаванні поста"))}),s();
//# sourceMappingURL=zooblog3.a821df89.js.map

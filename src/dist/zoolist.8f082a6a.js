const e=document.querySelector(".container"),t=document.querySelector(".btn");let a=1;const n=async e=>{let t=`https://pixabay.com/api/?key=50977795-feb18de71b048a02e0c824e54&q=animals&image_type=photo&page=${e}`,a=await fetch(t);return(await a.json()).hits},i=t=>{let a=t.map(e=>`
    <ul style="list-style-type: none; gap: 5px;">
        <li class="userBasa">
            <img src="${e.webformatURL}" alt="${e.tags}" width="290px" height="189px" style="padding-right: 5px; border-radius: 14px;"/>
        </li>
    </ul>`).join("");e.insertAdjacentHTML("beforeend",a)};n(1).then(i),t.addEventListener("click",async()=>{a++;let e=await n(a);i(e),e.length<12&&(t.style.display="none")});
//# sourceMappingURL=zoolist.8f082a6a.js.map

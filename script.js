//Toggle Spinner
const toggleSpinner=toggleType=>{
    document.getElementById('spinner').style.display=toggleType;
}

//Search Function

let searchKey; //Taking the value of the Searched Phone in a Global Variable
const searchButton=()=>{
    toggleSpinner('block');
    const catagory=document.getElementById('input').value;
    document.getElementById('input').value='';
    searchKey=catagory;
    const url=`https://openapi.programming-hero.com/api/phones?search=${catagory}`;

    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.data));
}
// Showing search result in the UI

const searchResult= data =>{
    const searchResult=document.getElementById('search-result');
    const noPhoneDetails=document.getElementById('noPhoneFound');
    const detailsSection=document.getElementById('details');
    searchResult.textContent='';
    noPhoneDetails.textContent='';
    detailsSection.textContent='';
    const length=data.length;

    //No Phone Found Text
    if(length===0){
        noPhoneDetails.innerHTML=`
        <h3 style="color:red">Sorry!! No Phone found in this catagory.</h3>
        `;
        toggleSpinner('none');
        return;
    }
    noPhoneDetails.innerText='';
    data.slice(0,20).forEach(element => {
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div  class="card p-2 cards d-flex align-items-center">
                <img src="${element.image}" class="img-fluid" alt="..." heigth="300" width="200">
                <div class="card-body">
                  <h4 class="card-title fw-bold">${element.phone_name}</h4>
                  <h5 class="fw-bold">${element.brand}</h5><br>
                  <button onclick="showDetails('${element.slug}')" class="btn button"><a id="details-link" href="#details-section">Details</a></button>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
    if(length!=null && length>20){
        const extraDiv=document.getElementById('extraSearch');
        const a=document.createElement('div');
        extraDiv.innerHTML=`
        <a class="navButton" onclick="showMore()" id="moreButton">Show More  <i class="fa-solid fa-arrow-right"></i></a><br><br>
        `;
        extraDiv.appendChild(a);
    }
    toggleSpinner('none');
} 


//Show more button
const showMore=()=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchKey}`;
    fetch(url)
    .then(res => res.json())
    .then(data => moreDisplay(data.data));
}

// Show More Display
const moreDisplay=data=>{
    const searchResult=document.getElementById('search-result');
    const length=data.length;
    data.slice(20,length-1).forEach(element=>{
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div  class="card p-2 cards d-flex align-items-center">
                <img src="${element.image}" class="img-fluid" alt="..." heigth="300" width="200">
                <div class="card-body">
                  <h4 class="card-title fw-bold">${element.phone_name}</h4>
                  <h5 class="fw-bold">${element.brand}</h5><br>
                  <button onclick="showDetails('${element.slug}')" class="btn button"><a id="details-link" href="#details-section">Details</a></button>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
    const extraDiv=document.getElementById('extraSearch'); //Removing the extra show more button
    const a=document.getElementById('moreButton');
    extraDiv.removeChild(a);
}


//Load Data Method
const showDetails=id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => loadData(data.data));
}

const loadData=data=>{
    const goToDetails=document.getElementById
    const detailsDiv=document.getElementById('details');
    const div=document.createElement('div');
    let rDate;
    if(data.releaseDate==""){
        rDate="No release date found!!";
    }
    else rDate=data.releaseDate;
    console.log(data);
    detailsDiv.textContent='';
    div.innerHTML=`
            <div class="p-2">
              <img class="p-3" src="${data.image}" alt="">
              <h3 style="font-weight: 600;">${data.name}</h3>
              <p style="font-weight: 600;">Release Date: ${rDate}</p>
            </div><br>
    `;
    detailsDiv.appendChild(div);
    for (const name in data.mainFeatures){
        const p=document.createElement('div');
        p.classList.add('text-start');
        p.classList.add('ms-2');
        p.innerHTML=`
        <p style="font-weight: 600;"><span style="color:rgb(17, 136, 216) ;">${name}:</span> ${data.mainFeatures[name]} .</p><hr>
        `;
        detailsDiv.appendChild(p);
    }
    for(const other in data.others){
        const p=document.createElement('div');
        p.classList.add('text-start');
        p.classList.add('ms-2');
        p.innerHTML=`
        <p style="font-weight: 600;"><span style="color:rgb(17, 136, 216) ;">${other}:</span> ${data.others[other]} .</p><hr>
        `;
        detailsDiv.appendChild(p);
    }
}
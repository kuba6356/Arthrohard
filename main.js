
//funkcja sprawdzająca jaki div jest po 1/4 ekranu    
const isElementVisible = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            return true
        }
    })
})

//dodaje klasę "current-section" do elementu który obecnie znajduję się po 1/4 ekranu
window.addEventListener("scroll", () =>{
    const info = document.getElementById("Info")
    const composition = document.getElementById("composition")
    const products = document.getElementById("products-content")
    const headerButtons = document.querySelector(".menu-element-pc")
    const promoContent = document.getElementById("promo-content")
    if(isElementVisible.observe(promoContent)){
        headerButtons.classList.remove("current-section")
    }
    else if(isElementVisible.observe(info)){
        headerButtons.classList.remove("current-section")
        headerButtons.classList.add("current-section")
        }
    else if(isElementVisible.observe(composition)){
        headerButtons.classList.remove("current-section")
        headerButtons.classList.add("current-section")
        }
    else if(isElementVisible.observe(products)){
        headerButtons.classList.remove("current-section")
        headerButtons.classList.add("current-section")
    }
})

function myFunction() {
    document.getElementById("dropdown").classList.toggle("show");
  }
  
  // zamyka dropdown po kliknięciu poza jego obszar
  
  window.onclick = function(event) {
    if (!event.target.matches('#products-selection')) {
      const dropdowns = document.querySelector(".dropdown-content");
        const openDropdown = dropdowns;
        if((event.target.matches('.option') && event.target.textContent != document.getElementById("products-selection").textContent)){
            document.getElementById("products-selection").textContent = event.target.textContent
            removeFromApi()
            renderFromApi(1, event.target.textContent)
        }
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
      }
    }
  }

const json = []
let newestData
async function renderFromApi(pageNumber, pageSize) {
    try{
    let data = await fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    data = await data.json()
    json.push(data)
    newestData = data

    const productContent = document.querySelector(".product-content")
    for(let x = 0; x < pageSize; x++){
        let apiIMG = document.createElement("img")
        apiIMG.setAttribute("src", json[[data.currentPage][0]-1].data[x].id)
        apiIMG.setAttribute("alt", `ID: ${json[[data.currentPage][0]-1].data[x].id}`)
        apiIMG.setAttribute("loading", "lazy")
        apiIMG.setAttribute("onclick","renderDetails(this)")
        apiIMG.setAttribute("data-ID", `${json[[data.currentPage][0]-1].data[x].id}`)
        apiIMG.setAttribute("data-Page", `${[[data.currentPage][0]-1]}`)
        apiIMG.classList.add("product-pic")
        if(x == json[[data.currentPage][0]-1].data.length-1){
        }
        productContent.appendChild(apiIMG)
    }
} catch(err){
    console.log(`Erorr: ${err}`)
}
}

renderFromApi(1,10)

function removeFromApi(){
    while(document.querySelector(".product-content").childElementCount != 0){
        document.querySelector(".product-content").children[0].remove()
    }
    json.length = 0
}
function renderDetails(element){
    const body = document.querySelector("body")
    const darkenDiv = document.createElement("div")
    darkenDiv.classList.add("darken-bg")
    body.classList.add("stop-scroll")
    body.appendChild(darkenDiv)
    const divDetailsContainer = document.createElement("div")
    divDetailsContainer.classList.add("details-container")
    darkenDiv.appendChild(divDetailsContainer)
    const divTopContainer = document.createElement("div")
    divTopContainer.classList.add("details-top-div")
    divDetailsContainer.appendChild(divTopContainer)
    const divID = document.createElement("div") 
    divID.textContent =  `ID: ${element.dataset.id}`
    divID.classList.add("details-text")
    divTopContainer.appendChild(divID)
    const exit = document.createElement("div")
    exit.setAttribute("onclick", "exitDetails()")
    exit.textContent = "x"
    exit.classList.add("exit-details")
    divTopContainer.appendChild(exit)
    let divName = document.createElement("div")
    divName.classList.add("details-text")
    divName.textContent = `Nazwa: ${json[element.dataset.page].data[(element.dataset.id-1)%document.getElementById("products-selection").textContent].text}`
    divDetailsContainer.appendChild(divName)
    let divValue = document.createElement("div")
    divValue.classList.add("details-text")
    //zmienić w przypadku api'a który zwraca wartość produktu.
    divValue.textContent = `Wartość: ${json[element.dataset.page].data[element.dataset.id-1]}`
    divDetailsContainer.appendChild(divValue)
}
function exitDetails(){
    document.querySelector("body").classList.remove("stop-scroll")
    document.querySelector(".darken-bg").remove()
}
let productContent = document.querySelector(".product-content")


//sprawdza czy użytkownik doszedł do końca strony i generuję dodatkowe "produkty" z api'a
document.addEventListener('scroll', () =>{
    if(productContent.childElementCount >= document.getElementById("products-selection").textContent){
        if((document.documentElement.scrollHeight -1) < Math.round(window.pageYOffset + window.innerHeight)){
            renderFromApi(newestData.currentPage+1, document.getElementById("products-selection").textContent)
        }
    }
})

//generuje menu po klinkieciu w przycisk w wersji mobilnej
const mobileButton = document.querySelector(".mobile-button")
const order = mobileButton.parentElement
order.addEventListener("click", () =>{
    if(!order.classList.contains("absolute")){
        document.querySelector(".selection-arrow").classList.add("static")
        const body = document.querySelector("body")
        const whitenDiv = document.createElement("div")
        whitenDiv.classList.add("whiten-bg")
        body.classList.add("stop-scroll")
        const header = body.childNodes[1]
        header.insertBefore(whitenDiv, header.childNodes[0])
        order.classList.add("absolute")
        const menuDiv = document.createElement("div")
        menuDiv.classList.add("menu-div")
        body.insertBefore(menuDiv, body.childNodes[3])
        divDzialanie = document.createElement("a")
        divDzialanie.textContent = "DZIAŁANIE PREPARATU"
        divDzialanie.classList.add("mobile-menu-option")
        divDzialanie.setAttribute("href", "#how-works")
        divZalecenia = document.createElement("a")
        divZalecenia.textContent = "ZALECENIA"
        divZalecenia.classList.add("mobile-menu-option")
        divZalecenia.setAttribute("href", "zalecenia.html")
        divSklad = document.createElement("a")
        divSklad.textContent = "SKŁAD"
        divSklad.classList.add("mobile-menu-option")
        divSklad.setAttribute("href", "#composition")
        divDawkowanie = document.createElement("a")
        divDawkowanie.textContent = "DAWKOWANIE"
        divDawkowanie.classList.add("mobile-menu-option")
        divDawkowanie.setAttribute("href", "dawkowanie.html")
        divOpinie = document.createElement("a")
        divOpinie.textContent = "OPINIE"
        divOpinie.classList.add("mobile-menu-option")
        divOpinie.setAttribute("href", "opinie.html")
        menuDiv.appendChild(divDzialanie)
        menuDiv.appendChild(divZalecenia)
        menuDiv.appendChild(divSklad)
        menuDiv.appendChild(divDawkowanie)
        menuDiv.appendChild(divOpinie)
        //wychodzenia z menu na wersji mobilnej
        window.addEventListener("click", (element) =>{
            if(element.target.classList.contains("mobile-menu-option" ) || element.target == whitenDiv){
                whitenDiv.remove()
                menuDiv.remove()
                body.classList.remove("stop-scroll")
                order.classList.remove("absolute")
                document.getElementsByClassName("selection-arrow")[0].classList.remove("static")
            }
        })
    }
    else{
        document.querySelector(".whiten-bg").remove()
        document.querySelector(".menu-div").remove()
        document.querySelector("body").classList.remove("stop-scroll")
        order.classList.remove("absolute")
        document.querySelector(".selection-arrow").classList.remove("static")
    }
})



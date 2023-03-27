const toggleTheme = document.getElementById('toggle-theme')
const rootStyle = document.documentElement.style;
const bodyElement = document.getElementById('body')
const sectionElement = document.getElementById('flags-container')
const selectElement = document.getElementById('select')
const inputElement = document.getElementById('input')
const formElement = document.getElementById('form')




const modalElement= document.getElementById('modal')
      toggleTheme.addEventListener('click', (e)=>{
    console.log(e.target)
    let icontTheme = document.getElementById('icono')
    if(icontTheme.classList.contains('fa-moon')){
        icontTheme.classList.remove('fa-moon')
        icontTheme.classList.add('fa-sun')
        toggleTheme.lastElementChild.textContent='Light Mode'
    }else{
        
        toggleTheme.lastElementChild.textContent='Dark Mode'
        icontTheme.classList.remove('fa-sun')
        icontTheme.classList.add('fa-moon')
    }
    bodyElement.classList.toggle('light')

})

const getFile = async ()=>{
    const requestFile =  await fetch('./data.json')
    const jsonObject = await requestFile.json()

    const getCountry = ()=>{
        let newObject = jsonObject;
        const fragment =  document.createDocumentFragment();
        for( let Country in newObject ){
            if(Country==19){
            break;
            }
            else{
                let requestData = document.createElement('div')
                requestData.classList.add('flag__card');
                requestData.innerHTML = `
                <img src="${newObject[Country].flags.svg}" alt="" class="flag__img">
                <div class="group__description">
                    <p class="text__bold">${newObject[Country].name}</p>
                </div>
                <div class="group__description">
                    <p class="text__normal--bold">population :</p>
                    <p class="text__normal">${newObject[Country].population}</p>
                </div>
                <div class="group__description">
                    <p class="text__normal--bold">region :</p>
                    <p class="text__normal">${newObject[Country].region}</p>
                </div>
                <div class="group__description">
                    <p class="text__normal--bold">capital :</p>
                    <p class="text__normal">${newObject[Country].capital}</p>
                </div>`
                fragment.appendChild(requestData)  
        
            }
        }
        
        sectionElement.appendChild(fragment)
    }
    
    getCountry();

    selectElement.addEventListener('change', (e)=>{
        sectionElement.innerHTML = "";
        let newObject = jsonObject;
        const fragmentCountry =  document.createDocumentFragment();
        for( let filterCountry of newObject ){
            if(filterCountry.region==`${selectElement.value}`){
                let requestCountry = document.createElement('div')
                requestCountry.classList.add('flag__card');
                requestCountry.innerHTML = `
                <img src="${filterCountry.flags.svg}" alt="" class="flag__img">
                <div class="group__description">
                    <p class="text__bold">${filterCountry.name}</p>
                </div>
                <div class="group__description">
                    <p class="text__normal--bold">population :</p>
                    <p class="text__normal">${filterCountry.population}</p>
                </div>
                <div class="group__description">
                    <p class="text__normal--bold">region :</p>
                    <p class="text__normal">${filterCountry.region}</p>
                </div>
                <div class="group__description">
                    <p class="text__normal--bold">capital :</p>
                    <p class="text__normal">${filterCountry.capital}</p>
                </div>`
                fragmentCountry.appendChild(requestCountry)  
            }
            else{ 
                continue;
            }
        }
            sectionElement.appendChild(fragmentCountry)

    })
    formElement.addEventListener('submit', (e)=>{
        e.preventDefault();
        let inputCountry = inputElement.value;
        const searchFuncton = ()=>{
             for( let filterCountry of jsonObject){ if(`${inputCountry.toUpperCase()}`==`${filterCountry.name.toUpperCase()}`){
                    console.log(filterCountry)
                   sectionElement.innerHTML = ` 
                <div class="flag__card">
                    <img src="${filterCountry.flags.svg}" alt="" class="flag__img">
                    <div class="group__description">
                        <p class="text__bold">${filterCountry.name}</p>
                    </div>
                    <div class="group__description">
                        <p class="text__normal--bold">population :</p>
                        <p class="text__normal">${filterCountry.population}</p>
                    </div>
                    <div class="group__description">
                        <p class="text__normal--bold">region :</p>
                        <p class="text__normal">${filterCountry.region}</p>
                    </div>
                    <div class="group__description">
                        <p class="text__normal--bold">capital :</p>
                        <p class="text__normal">${filterCountry.capital}</p>
                    </div>
                </div>

                    `
                    break;
                }
            }  
        }
       searchFuncton();
        console.log(searchFuncton())
    })
    
    
    sectionElement.addEventListener('click', (e)=>{
    if(e.target.parentElement.classList.contains('flag__card')){
        let clickElement = e.target.parentElement
        for( let modalcountry of jsonObject){
            if(modalcountry.name.toUpperCase()== clickElement.children[1].children[0].textContent.toUpperCase()){
                modalElement.innerHTML= ""
        modalElement.innerHTML = `<a href="#" id="btn" class="btn btn--link"><i class="fa-solid fa-arrow-left-long icono"></i>back</a>
            <div class="info-container">
                <picture class="flag">
                    <img src="${modalcountry.flags.svg}" alt="">
                </picture>
                <div class="info">
                    <div class="group__description">
                        <p class="text__bold text__big">${modalcountry.name}</p>
                    </div>  
                    <div class="group__info">
                       <div class="fs-description">                   
                        <div class="group__description">
                            <p class="text__normal--bold">Native Name:</p>
                            <p class="text__normal">${modalcountry.altSpellings[1]}</p>
                        </div>
                        <div class="group__description">
                            <p class="text__normal--bold">population:</p>
                            <p class="text__normal">${modalcountry.population}</p>
                        </div> 
                        <div class="group__description">
                            <p class="text__normal--bold">region :</p>
                            <p class="text__normal">${modalcountry.region}</p>
                        </div>
                        <div class="group__description">
                            <p class="text__normal--bold">sub region :</p>
                            <p class="text__normal">${modalcountry.subregion}</p>
                        </div>
                        <div class="group__description">
                            <p class="text__normal--bold">capital :</p>
                            <p class="text__normal">${modalcountry.capital}</p>
                        </div>
                   </div>
                       <div class="sc-description">
                        <div class="group__description">
                            <p class="text__normal--bold">top level domain :</p>
                            <p class="text__normal">${modalcountry.topLevelDomain} </p>
                        </div>
                        <div class="group__description">
                            <p class="text__normal--bold">currencies :</p>
                            <p class="text__normal">${modalcountry.currencies[0].code}</p>
                        </div>
                        <div class="group__description">
                            <p class="text__normal--bold">languages :</p>
                            <p class="text__normal">${modalcountry.languages[0].name}</p>
                        </div>
                   </div>
                    </div>      
                    <div class="footer-info">
                        <div class="group__description">
                                <p class="text__normal--bold">Border countries :</p>
                                <div id="buttons" class="buttons">
                                    

                                </div>
                               
                        </div>
                    </div>
                </div>
            </div>`
        
                    let buttons = document.getElementById('buttons');
                    const btnfragment = document.createDocumentFragment()
                    if(modalcountry.borders){
                     modalcountry.borders.length = 3
                        
                        for( let borders of modalcountry.borders){

                            let newbutton = document.createElement('a')
                            newbutton.classList.add('btn')
                            newbutton.classList.add('btn--small')
                            newbutton.textContent = `${borders}`;
                            btnfragment.appendChild(newbutton)
                        }
                        buttons.appendChild(btnfragment)
                    }
                    
            const modalButton = document.getElementById('btn')
                modalButton.addEventListener('click', (e)=>{
        console.log('hola')
        if(modalElement.classList.contains('modal-show')){
            modalElement.classList.remove('modal-show')
        }
            })
            
                            
            if(modalElement.classList.contains('modal-show')==false){
                modalElement.classList.add('modal-show')
            }

    }
            }

        }

    })

}

getFile();


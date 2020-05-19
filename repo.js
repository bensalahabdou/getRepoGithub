
const inputSearch = document.getElementById('search-bar');
const userInput = document.getElementById('input-user');
const getBtn = document.querySelector('.input-user button');
const divData = document.querySelector('.repos-data');
const btnTop = document.getElementById('topButton');


window.onscroll =function() {
    if (window.pageYOffset >= 300) {

       btnTop.style.display = 'block'
    
    }else {
        btnTop.style.display = 'none'
    }
    
}

btnTop.onclick =function() {
    window.scrollTo(0, 0)
}


getBtn.onclick = function() {
    if (userInput.value === '') {
      
        divData.innerHTML = "<span>" + "Please write a name of user" + "</span>"
    }   

    else if(userInput.value !== '' && divData.childNodes.length === 1 && divData.childNodes[0].nodeName === 'SPAN'){
        divData.innerHTML = "<span>" + "Enter an existing user name" + "</span>"
    }
    
    else {
        if(divData.childNodes.length !== 0){
            divData.removeChild(divData.childNodes[0])

            const containListe = document.createElement('ul')
            fetch(`https://api.github.com/users/${userInput.value}/repos`)
            .then(Response=> Response.json())
            .then(data => {
                
                const reposData = data.forEach(repo => { 
                    
                    const nameItem = document.createElement('li')
                    const linkItem = document.createElement('a')
                    linkItem.textContent = repo.name;
                    linkItem.href = `https://github.com/${userInput.value}/${repo.name}`
                    
                    nameItem.appendChild(linkItem)
                    containListe.appendChild(nameItem)
                    divData.appendChild(containListe)
                   
                });
                console.log(divData.childNodes[0].childNodes ) 
                const listLi = divData.childNodes[0].childNodes
                for (let i= 0; i < listLi.length; i++){
                    inputSearch.addEventListener('keyup', function(){
                        if(listLi[i].childNodes[0].firstChild.nodeValue.toLocaleLowerCase().startsWith(inputSearch.value.toLocaleLowerCase())){
                            listLi[i].childNodes[0].parentElement.style.display= 'block'
                        
                        }else{
                            listLi[i].childNodes[0].parentElement.style.display= 'none'
                        }
                    
                    }) 
                    
                }
            })

        }else {
            const containListe = document.createElement('ul')
            fetch(`https://api.github.com/users/${userInput.value}/repos`)
            .then(Response=> Response.json())
            .then(data => {
                
                const reposData = data.forEach(repo => { 
                    
                    const nameItem = document.createElement('li')
                    const linkItem = document.createElement('a')
                    linkItem.textContent = repo.name;
                    linkItem.href = `https://github.com/${userInput.value}/${repo.name}`
                    linkItem.target= "_blank"
                    nameItem.appendChild(linkItem)
                    containListe.appendChild(nameItem)
                    divData.appendChild(containListe)
                   
                });
                console.log(divData.childNodes[0].childNodes ) 
                const listLi = divData.childNodes[0].childNodes
                for (let i= 0; i < listLi.length; i++){
                    inputSearch.addEventListener('keyup', function(){
                        if(listLi[i].childNodes[0].firstChild.nodeValue.toLocaleLowerCase().startsWith(inputSearch.value.toLocaleLowerCase())){
                            listLi[i].childNodes[0].parentElement.style.display= 'block'
                        
                        }else{
                            listLi[i].childNodes[0].parentElement.style.display= 'none'
                        }
                    
                    }) 
                    
                }
            })
            
        }
           
    
       
            
        }
        
    }
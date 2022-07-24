let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem( "myLeads" ) )

if( leadsFromLocalStorage ){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(myLeads) {
    const l = myLeads.length
    let myList = ""
    for(let i = 0; i<l; i++){
        myList += `
        <li>
            <a href='${myLeads[i]}' target='_blank'>${myLeads[i]}</a>
        </li> 
        `
    }
    ulEl.innerHTML = myList
}

inputBtn.addEventListener("click", function () {
    myLeads.push( inputEl.value )
    inputEl.value = ""
    localStorage.setItem( "myLeads", JSON.stringify( myLeads ) )
    render(myLeads)    
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push( tabs[0].url )
        localStorage.setItem( "myLeads", JSON.stringify( myLeads ) )
        render(myLeads)   
    } )
})

deleteBtn.addEventListener("dblclick", function () {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

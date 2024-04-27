const inputEl=document.getElementById('takeInput');
const addListItemEl=document.querySelector('.listAddbutton');
// List items Show Section

const listItemsContainerDiv=document.querySelector('.displayListItemsDiv');
let removeItemEl=document.querySelectorAll('.listRemoveBtn');
// Footer
const listCountEl=document.getElementById('listCount');
const allListShowEl=document.getElementById('all')
const UncompleteListShowEl=document.getElementById('Uncomplete')
const CompletedListShowEl=document.getElementById('Completed')

// Data Sets
const allTasks=[ ];
// Add event Listner 

inputEl.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        if(inputEl.value==='') return;
        const listValue=inputEl.value ;
        addListIemsToContainer(listValue);
        allTasks.push({task:inputEl.value,isComplete:false});  
        inputEl.value='';  
    updateAllDetails();

    }
})
addListItemEl.addEventListener('click',()=>{
    if(inputEl.value==='') return;
    const listValue=inputEl.value ;
    addListIemsToContainer(listValue);
    allTasks.push({task:inputEl.value,isComplete:false});  
    inputEl.value='';  
    inputEl.focus();
    updateAllDetails();

});
function updateAllDetails(){
    let count=0;;
    for(let i of allTasks){
        if(!i.isComplete) count++;
    }

    listCountEl.textContent=count ;
}
updateAllDetails();

function addListIemsToContainer(listValue,isComplete=false){

    
    const divEl=document.createElement('div');
    divEl.classList.add('listItems');
    const element=` 
    <p>   <span class="circle"></span>
     ${listValue}</p>
     <span class="listRemoveBtn">X</span>
   `;
   divEl.innerHTML=element;
listItemsContainerDiv.appendChild(divEl);
    const removeBtn=divEl.lastElementChild;
    const checkboxEl=divEl.firstElementChild.firstElementChild;
    if(isComplete){
        checkboxEl.classList.add('completedListItem');
    }
    // Adding event Listner to remove Btn
    removeBtn.addEventListener('click',(e)=>{
        e.target.parentNode.remove();
        if(!checkboxEl.classList.contains('completedListItem')){
        }
        allTasks.map((item)=>{
            if(item.task===listValue){
                allTasks.pop(item);
            }
        })
        updateAllDetails();
        });
        // Adding Eveent listner to checkBox
    checkboxEl.addEventListener('click',(e)=>{
        if(checkboxEl.classList.contains('completedListItem')){
            checkboxEl.classList.remove('completedListItem');
            allTasks.map((item)=>{
                if(item.task===listValue){
                    item.isComplete=false;
                }
            })
            updateAllDetails();
        }else{
            checkboxEl.classList.add('completedListItem');
            allTasks.map((item)=>{
                if(item.task===listValue){
                    item.isComplete=true;
                }
            });
            updateAllDetails();
        }
    })
    }
 
 // Event Listners to Footer 3 components
allListShowEl.addEventListener('click',()=>{
    const activeProperty=document.querySelector('.active');
    if(activeProperty!=null)
    activeProperty.classList.remove('active');
allListShowEl.classList.add('active');
    listItemsContainerDiv.textContent='';
    allTasks.map((list)=>{
        addListIemsToContainer(list.task,list.isComplete);
    })
    updateAllDetails();
});
UncompleteListShowEl.addEventListener('click',()=>{
    const activeProperty=document.querySelector('.active');
    if(activeProperty!=null)
    activeProperty.classList.remove('active');
    UncompleteListShowEl.classList.add('active');
    listItemsContainerDiv.textContent='';
    allTasks.map((list)=>{
        if(!list.isComplete)
        addListIemsToContainer(list.task,list.isComplete);
    })
    updateAllDetails();

});
CompletedListShowEl.addEventListener('click',()=>{
    const activeProperty=document.querySelector('.active');
    if(activeProperty!=null)
    activeProperty.classList.remove('active');
    CompletedListShowEl.classList.add('active');
    listItemsContainerDiv.textContent='';
    allTasks.map((list)=>{
        if(list.isComplete)
        addListIemsToContainer(list.task,list.isComplete);
    })
    updateAllDetails();

});

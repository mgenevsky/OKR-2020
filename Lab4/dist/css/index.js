//1
let a = 1;
async function changeContentWithDelay(contentBlocksNames, delay = 0)
{
    let blocksHtml = [];
    contentBlocksNames.forEach(block => {
        blocksHtml.push(document.querySelector(block).innerHTML);
    });
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[2];
    document.querySelector(contentBlocksNames[1]).innerHTML = blocksHtml[0];
    document.querySelector(contentBlocksNames[2]).innerHTML = blocksHtml[1];
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[1];
    document.querySelector(contentBlocksNames[1]).innerHTML = blocksHtml[2];
    document.querySelector(contentBlocksNames[2]).innerHTML = blocksHtml[0];
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[0];
    document.querySelector(contentBlocksNames[1]).innerHTML = blocksHtml[1];
    document.querySelector(contentBlocksNames[2]).innerHTML = blocksHtml[2];
    setInterval(()=>{
    if(a == 1) 
    {document.querySelector('#section-4').style = 'font-weight: bold;'; a = 0;
    }
    else{document.querySelector('#section-4').style = 'font-weight: normal;'; a = 1;}
      }, delay);
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


//2
function addBoldChangeWithDelay(delay)
{
input.onblur = function() {
  if (!input.value.includes('@')) {
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};
input.onfocus = function()
{
    if (this.classList.contains('invalid')) {
        this.classList.remove('invalid');
        error.innerHTML = "";
    }
    document.querySelectorAll('#section-1,#section-6').forEach(block => 
    {
        setTimeout(()=>{ block.style = 'font-weight: bold;';}, delay);
    });
};
}


//3
function createCommitFormTo(blockName)
{
    let form = document.createElement("form");
    form.id='git-commits-form';
    form.style = 'display:flex; flex-direction:column;';

    let username = document.createElement("input");
    username.setAttribute('type',"text");
    username.setAttribute('name',"username");
    username.setAttribute('required',true);

    let repositoryName = document.createElement("input");
    repositoryName.setAttribute('type',"text");
    repositoryName.setAttribute('name',"repository-name");
    repositoryName.setAttribute('required',true);

    let submit = document.createElement("button");
    submit.setAttribute('type',"submit");
    submit.textContent = "Get commits";

    form.append(username);
    form.append(repositoryName);
    form.append(submit);

    document.querySelector(blockName).append(form);
}
async function addCommitsToBlock(blockName)
{
    let username = document.querySelector('#git-commits-form > input[name="username"]').value;
    let repositoryName = document.querySelector('#git-commits-form > input[name="repository-name"]').value;

    let response = await fetch(`https://api.github.com/repos/${username}/${repositoryName}/commits`);
    
    let div = document.createElement('div');
    div.id="commits-content";
    div.style.height = "20%";
    div.style.overflow = "auto";

    let ul = document.createElement('ul');
    if (response.ok) 
    {
        response.json().then(data => data.forEach(c => 
            {
                let li = document.createElement('li');
                li.textContent = `${c.commit.author.name} : ${c.commit.message}`;
                ul.append(li);
            }));
        div.append(ul);
    }
    else 
    {
        let p = document.createElement('p');
        p.textContent = `Error: ${response.status}(${response.statusText})`;
        p.style = 'display:border-box;';
        div.append(p);
    }
    document.querySelector(blockName).appendChild(div);
}


//4
function someFunc(){}
async function callFunc(...functions)
{
    for (let index = 0; index < functions.length; index++)
    {
        await functions[index]();
        console.log(`The ${index+1} function has finished its work`)
    }
}


//5
function createSortFormTo(blockName)
{
    let form = document.createElement("form");
    form.id='sort-form';
    form.style = 'display:flex; flex-direction:column;';

    let listOfValues = document.createElement("input");
    listOfValues.setAttribute('type',"text");
    listOfValues.setAttribute('name',"list-of-values");
    listOfValues.setAttribute('required',true);

    let submit = document.createElement("button");
    submit.setAttribute('type',"submit");
    submit.textContent = "Quick Sort";

    form.append(listOfValues);
    form.append(submit);

    document.querySelector(blockName).append(form);
}
function QuickSort(arr)
{ 
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
        
    for (let i = 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
          left.push(arr[i]);
        } 
        else {
          right.push(arr[i]);
        }
      }
    return QuickSort(left).concat(pivot, QuickSort(right));
}
function sortListOfValuesToBlock(blockName)
{
    let listOfValues = document.querySelector('#sort-form > input[name="list-of-values"]').value;

    let numberList = [];
    let tmpnum = '';
    let tmpint = 0;
    for (let index = 0; index <= listOfValues.length; index++)
    {
      if (listOfValues[index] >= '0' && listOfValues[index] <= '9'){
        tmpnum+=listOfValues[index];
      }
      if(listOfValues[index] == ' ')
      {
        numberList.push(parseInt(tmpnum));
        tmpnum = '';
      }
    }
    if(tmpnum != '')
      {
        numberList.push(parseInt(tmpnum));
    }
    if(numberList.length == 0)
        console.log('Error: no number is a list');
    else
    {
        console.log('Input list of numbers :');
        console.log(numberList.slice());
        console.log('Sorted list of numbers :')
        console.log(QuickSort(numberList));
    }
}



createCommitFormTo('#section-2');//3
createSortFormTo('#section-4');//5
changeContentWithDelay(['#section-2','#section-4','#section-5'],5000);//1
addBoldChangeWithDelay(5000);//2
callFunc(someFunc, function(){return sleep(5000)});//4
document.addEventListener('submit',function(event)
{
    if(event?.target.id == 'git-commits-form')
    {
        event.preventDefault();
        if(document.querySelector('#commits-content'))
        {
            document.querySelector('#commits-content').remove();
        }
        addCommitsToBlock('#' + document.querySelector('#git-commits-form').parentNode.id);
        document.querySelector('#git-commits-form').reset();
    }
    if(event?.target.id == 'sort-form')
    {
        event.preventDefault();
        if(document.querySelector('#sort-content'))
        {
            document.querySelector('#sort-content').remove();
        }
        sortListOfValuesToBlock('#' + document.querySelector('#sort-form').parentNode.id);
        document.querySelector('#sort-form').reset();
    }
});
function someFunc(){}
async function callFunc(...functions)
{
    for (let index = 0; index < functions.length; index++)
    {
        await functions[index]();
    }
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    submit.textContent = "Count";

    form.append(listOfValues);
    form.append(submit);

    document.querySelector(blockName).append(form);
}


function WordCount(arr)
{ 
    var count = 0;
    var words = arr.split(" ");
    for (i = 0; i < words.length; i++) {
    if (words[i] != "") count += 1;
    }
    setCookie('NumberOfWords', count, 2);
    return (count);
}
function sortListOfValuesToBlock(blockName)
{
    let listOfValues = document.querySelector('#sort-form > input[name="list-of-values"]').value;
    if(listOfValues.length == 0)
        console.log('Error: list is empty');
    else
    {
        console.log('Input text:');
        console.log(listOfValues.slice());
        console.log('Number of words in text:')
        console.log(WordCount(listOfValues));
    }
}
createSortFormTo('#section-4');
callFunc(someFunc, function(){return sleep(5000)});
document.addEventListener('submit',function(event)
{

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
const setCookie = (name, data, expDays) => {
 const d = new Date();
 d.setDate(d.getDate() + expDays);
 document.cookie = `${name}=${data};expires=${d.toUTCString()};path=/`;
}
const checkCookie = (name) => {
 return (document.cookie.includes(name) && !document.cookie.includes(`${name}=;`));
}
const getCookie = (name) => {
  return checkCookie(name) ? document.cookie.split(';').find((c) => c.includes(name)).split('=')[1] : 0;
}
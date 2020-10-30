document.addEventListener('DOMContentLoaded', () => {
if (performance.navigation.type == 1) {
  if(checkCookie('maxNumber')){
    if(window.confirm(`Some Cookies have been created on this page: \n${document.cookie} \n Do you want to save them?`)) 
    alert('Cookies were saved, now the page will be refreshed.');
    else{
    	setCookie('maxNumber', '');
    	setCookie('minNumber', '');
    } 
  }
}
setCookie('session', parseInt(getCookie('session')) + 1, 1);
swap('#name1', '#name2'); // complete task 1
countS(3,4, '#section-4'); // complete task 2
if(checkCookie('maxNumber')) document.querySelector('#numForm').remove(); // complete task 3

//complete task 6
makeEditableBlock('section-2');
makeEditableBlock('section-3');
makeEditableBlock('section-4');
makeEditableBlock('section-5');
initEditableBlocks();

})

const swap = (id1, id2) => { //task 1
	let tmp = document.querySelector(id1).innerHTML;
	document.querySelector(id1).innerHTML = document.querySelector(id2).innerHTML;
	document.querySelector(id2).innerHTML = tmp;
}


const countS = (a = 0, b=0 ,outputId) => { //task 2
	let thirdSect = document.querySelector(outputId);
	let s = a*b;
	thirdSect.append('S = ' + s);
}


document.querySelector('#numBtn').addEventListener('click', () => { //task 3
	let first = document.querySelector('#input1').value;
    let second = document.querySelector('#input2').value;
    let third = document.querySelector('#input3').value;
    let forth = document.querySelector('#input4').value;
    let fifth = document.querySelector('#input5').value;
    let sixth = document.querySelector('#input6').value;
    let seventh = document.querySelector('#input7').value;
    let eighth = document.querySelector('#input8').value;
    let nineth = document.querySelector('#input9').value;
    let tenth = document.querySelector('#input10').value;
    let mass = [first, second, third, forth, fifth, sixth, seventh, eighth, nineth, tenth];
    let max = Math.max(...mass);
    let min = Math.min(...mass);
    alert('The biggest number is ' + max+' \nThe smallest number is ' + min);
    setCookie('maxNumber', max,2);
    setCookie('minNumber', min,3);
})
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


if( window.localStorage ){ //task 4
 if(localStorage.getItem('check')==null){localStorage.setItem('check',0);}
else if(localStorage.getItem('check')==0){document.querySelector('#section-5').style.fontWeight = 'normal'}
	else {document.querySelector('#section-5').style.fontWeight = 'bold'}
}
else alert(" localStorage cant be used");
function clickMeBold() {
    if (document.querySelector('#medbold').checked === true){
        document.querySelector('#section-5').style.fontWeight = 'normal';
    }
    if (document.querySelector('#medbold').checked === false){
        document.querySelector('#section-5').style.fontWeight = 'bold';
    }
        if (document.querySelector('#bold').checked === false){
        localStorage.setItem('check',0);
        document.querySelector('#section-5').style.fontWeight = 'normal';
    }
    if (document.querySelector('#bold').checked === true){
    	localStorage.setItem('check',1);
        document.querySelector('#section-5').style.fontWeight = 'bold';
    }
}


input.onblur = function() { //task 5
  if (!input.value.includes('@')) {
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};
input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
//6
const initEditableBlocks = () => {
  Array.from(document.getElementsByClassName('editArea')).map((area) => {
    area.addEventListener('change', (event) => {
      const newContent = event.target.value;
      localStorage.setItem(`${event.target.parentNode.id}Content`, newContent);
      event.target.parentNode.children[0].innerHTML = newContent;
     })
  })
  Array.from(document.getElementsByClassName('editBtn')).map((btn) => {
    btn.addEventListener('click', (event) => {
      localStorage.removeItem(`${event.target.parentNode.id}Content`);
      document.location.reload();
    })
  })
}
const makeEditableBlock = (blockId) => {
	const content = localStorage.getItem(`${blockId}Content`) ? 
	localStorage.getItem(`${blockId}Content`) : 
	document.getElementById(blockId).innerHTML;
	document.getElementById(blockId).innerHTML = content;
	document.getElementById(blockId).insertAdjacentHTML('beforeend', 
	`<textarea class="editArea">${content}</textarea>
	<button type="submit" class="editBtn">Return default</button>`)
}
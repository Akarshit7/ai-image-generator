import './style.css'
const form= document.querySelector('form');
form.addEventListener('submit',async (e)=>{
  showSpinner();
  e.preventDefault();
  const data=new FormData(form);
  const respose=await fetch('http://localhost:8080/dream',{
    method:'POST',headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      prompt:data.get('prompt'),
    })
  
  });
  if(respose.ok){
  const { image }= await respose.json();

  const result=document.querySelector('#result');
  result.innerHTML=`<img src ="${image}" width="512"/>`;
  }else{
    const err=await respose.text();
    alert(err);
    console.error(err);
  }
  hideSpinner();
});

respose.ok

function showSpinner(){
  const button=document.querySelector('button');
  button.disabled=true;
  button.innerHTML=`Dreaming... <span class="spinner">🧠</span>`;
}

function hideSpinner(){
  const button=document.querySelector('button');
  button.disabled=false;
  button.innerHTML=`Dream`;
}
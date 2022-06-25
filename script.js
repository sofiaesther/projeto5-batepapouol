let user = prompt("Qual o seu user?");
let username ={
    name: String(user)
  };

let requireName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

requireName.then(nameSucess);

requireName.catch(nameError);

function nameError(){
    user = prompt("Nome em uso, insira outro user");
    username ={
        name: String(user)
      };
    requireName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);
}
function nameSucess(){
    console.log(username);
}
const statusVerify = setInterval( function (){const requireStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', username);}, 5000)

let messagesdata =[];
const messagesPromisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
messagesPromisse.then(messageSucess);

messagesPromisse.catch(messageError);

function messageError(){
    console.log('erro')
}
function messageSucess(message){
    messagesdata = message.data;
    console.log(messagesdata);
    renderMessages();
}
let messageitem;
function renderMessages(){
    for (let i=0; i<messagesdata.length ;i++){
        if (messagesdata[i].type=='status'){
            messageitem = `
            <li>
            <div class="${messagesdata[i].type}"> 
               <h3>(${messagesdata[i].time}) </h3><h4>-</h4><h1> ${messagesdata[i].from} </h1><h4>-</h4><p>  ${messagesdata[i].text}</p>
            </div>
            </li>
        `;
        } else{
            messageitem = `
            <li>
            <div class="${messagesdata[i].type}"> 
               <h3>(${messagesdata[i].time}) </h3> <h4>-</h4><h1> ${messagesdata[i].from} </h1> <h4>-</h4><p>  para  </p><h4>-</h4><h1> ${messagesdata[i].to} </h1><p>: ${messagesdata[i].text}</p>
            </div>
            </li>
        `;
        }

    document.querySelector("ul").innerHTML += messageitem;
    }
    const lastmessage = document.querySelector('ul li:last-child');
    lastmessage.scrollIntoView();
}
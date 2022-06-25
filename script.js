let user = prompt("Qual o seu user?");
let username ={
    name: String(user)
  };

let requireName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

requireName.then(nameSucess);

requireName.catch(nameError);

function nameError(){
    window.location.reload()
}
function nameSucess(){
    console.log(username);
}
const statusVerify = setInterval( function (){const requireStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', username);}, 5000)

const atualizemessages = setInterval(reloadMessages,5000)

let messagesdata =[];
reloadMessages();

function messageError(){
    console.log('erro')
}
function messageSucess(message){
    messagesdata = message.data;
    console.log(messagesdata);
    renderMessages();
}
function renderMessages(){
    for (let i=0; i<messagesdata.length ;i++){
        let messageitem;
        if (messagesdata[i].type=='status'){
            messageitem = `
            <li>
            <div class="${messagesdata[i].type}"> 
               <h3>(${messagesdata[i].time}) </h3><h4>-</h4><h1> ${messagesdata[i].from} </h1><h4>-</h4><p>  ${messagesdata[i].text}</p>
            </div>
            </li>
        `;
        } else if (messagesdata[i].type=='message'||messagesdata[i].to==user){
            messageitem = `
            <li>
            <div class="${messagesdata[i].type}"> 
               <h3>(${messagesdata[i].time})</h3><h4>-</h4><h1>${messagesdata[i].from} </h1> <h4>-</h4><p>  para  </p><h4>-</h4><h1> ${messagesdata[i].to} </h1><p>: ${messagesdata[i].text}</p>
            </div>
            </li>
        `;
        }

    document.querySelector("ul").innerHTML += messageitem;
    }
    const lastmessage = document.querySelector('ul li:last-child');
    lastmessage.scrollIntoView();
}
let messagecontent;
function sendMessage(){
    const messageText = document.querySelector("input").value;
    messagecontent ={
        from: String(user),
        to: "Todos",
        text: String(messageText),
        type: "message"
    }
    document.querySelector("input").placeholder = "Escreva aqui...";
    document.querySelector("input").value ='';
const requireMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messagecontent)

requireMessage.then(sendmessageSucess);

requireMessage.catch(sendmessageError);
}
function sendmessageError(){
    console.log('erro')
    window.location.reload()
}
function sendmessageSucess(){
    console.log(messagecontent);
    let messageConfirmed = document.querySelector(".send").innerHTML;
    let confirmation = `
    <p>Mensagem enviada com sucesso para ${messagecontent.to}</p>
    `;
    messageConfirmed += confirmation;
    reloadMessages();
}

function reloadMessages(){
    const messagesPromisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    messagesPromisse.then(messageSucess);
    messagesPromisse.catch(messageError);
}
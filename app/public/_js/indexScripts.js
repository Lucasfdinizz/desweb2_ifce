document.addEventListener("DOMContentLoaded", function(e) {
    if(!sessionStorage.getItem('token'))
        window.location = '/login';
});


async function calcular(){
    let nome = document.getElementById("nome").value.trim()
    let lado = document.getElementById("lado").value.trim()
    let estandeId = document.getElementById("estandeId").value.trim()
    let feedback = document.getElementById("feedback")
    if(nome.length == 0){
        alert("Insira um nome válido")
        return
    }
    if(lado.length == 0 || lado < 0){
        alert("Insira um número válido")
        return
    }
    if(!estandeId){
        await incluir({lado,nome}, feedback)
    }else{
        await atualizar({id: estandeId,lado,nome}, feedback)
    }
    clearForm()
    listar()
}

async function incluir(estande, feedbackDiv){
    const request =  new URLSearchParams(estande);
    let resposta = await fetch('estandes', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },   
        body: request
    });
    if (resposta.status == 200) {
        feedbackDiv.classList.add('sucesso');
        feedbackDiv.classList.remove('falha');
        feedbackDiv.innerText = "Estande cadastrado com sucesso!"
    }
    else {
        feedbackDiv.classList.add('falha');
        feedbackDiv.classList.remove('sucesso');
        feedbackDiv.innerText = "Erro ao cadastrar estande!"
    }
    
}
async function atualizar(estande, feedbackDiv){
        const request =  new URLSearchParams(estande);
    let resposta = await fetch('estandes/'+estande.id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },   
        body: request
    });
    if (resposta.status == 200) {
        feedbackDiv.classList.add('sucesso');
        feedbackDiv.classList.remove('falha');
        feedbackDiv.innerText = "Estande atualizado com sucesso!"
    }
    else {
        feedbackDiv.classList.add('falha');
        feedbackDiv.classList.remove('sucesso');
        feedbackDiv.innerText = "Erro ao atualizado estande!"
    }
    
}

async function listar(){
    let historicoDiv = document.getElementById("historico")
    historicoDiv.innerText = 'Carregando...'
    var resposta = await fetch('estandes', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    let estandes = await resposta.json();
    historicoDiv.innerHTML = '';
    for (let estande of estandes) {
        let text = textoEstande(estande)
        salvarHistorico(text)
    }
}
function salvarHistorico(text){
    let historico = document.getElementById("historico")
    historico.innerHTML = text + historico.innerHTML 
}
function calcularArea(lado) {
    let valor = (17 / 4) * lado * lado * (1 / Math.tan(Math.PI / 17))
    return valor.toFixed(2);
}
function isMedio(area) {
    return area >= 60 && area <= 80;
}
function textoEstande(estande){
    let className = estande.medio ? 'medio sucesso' : 'naoMedio falha'
    let strMedio = estande.medio ? '<p>É um estande médio.</p>' : '<p>É um estande que não segue o padrão.</p>'
    let text = `<tr class="${className} ">
                    <td>${estande.nome}</td>
                    <td>${estande.lado} m</td>
                    <td>${estande.area} m²</td>
                    <td>${strMedio}</td>
                    <td>
                        <button onclick="editar(${estande.id});">Editar</button>
                        <button onclick="apagar(${estande.id});">Apagar</button>
                    </td>
                </tr>`
    return text
}

async function apagar(id) {
    let feedback = document.getElementById("feedback");
    if (confirm('Quer apagar o registro de número ' + id + '?')) {
        let resposta = await fetch('estandes/' + id, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        if (resposta.status == 200) {
            feedback.classList.add('sucesso');
            feedback.classList.remove('falha');
            feedback.innerText = `Registro ${id} excluido com sucesso!`
        }
        else {
            feedback.classList.add('falha');
            feedback.classList.remove('sucesso');
            feedback.innerText = `Erro ao excluir o registro ${id}`
        }
        listar();
    }
}

async function editar(id) {
    let feedback = document.getElementById("feedback");
    var resposta = await fetch('estandes', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
    let estandes = await resposta.json();
    estande = estandes.find(p => p.id == id)
    document.getElementById("btnSubmit").innerText = "Atualizar"
    document.getElementById("nome").value = estande.nome
    document.getElementById("lado").value = estande.lado
    document.getElementById("estandeId").value = estande.id
}

function clearForm(){
    document.getElementById("nome").value = null
    document.getElementById("lado").value = null
    document.getElementById("estandeId").value = null
    document.getElementById("btnSubmit").innerText = "Calcular"
}
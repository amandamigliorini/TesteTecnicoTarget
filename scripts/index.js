let INDICE = 13;
let SOMA = 0;
let K = 0;

while (K < INDICE){
    K = K + 1;
    SOMA = SOMA + K;
    console.log(SOMA);
}

const res1 = document.getElementById("resposta1");
res1.textContent = `O valor de SOMA é ${SOMA}`;

const buttonFibonacci = document.getElementById("buttonFibonacci");
buttonFibonacci.addEventListener("click", (event) => {
    event.preventDefault();
    const numUsuario = document.getElementById("inputNumero").value;
    const resposta = verificarFibonacci(numUsuario);
    const res2 = document.getElementById("resposta2")
    res2.textContent = resposta;
})


function verificarFibonacci(numUsuario) {
    let numInicial = 0;
    let numFinal = 1;
    let numSeguinte = 0;

    if (numUsuario == 0 || numUsuario == 1) {
        return `${numUsuario} faz parte da sequência Fibonacci`;
    }

    while (numSeguinte < numUsuario) {
        numSeguinte = numInicial + numFinal;
        numInicial = numFinal;
        numFinal = numSeguinte;
    }

    if (numSeguinte == numUsuario) {
        return `${numUsuario} faz parte da sequência Fibonacci`;
    } else {
        return `${numUsuario} não faz parte da sequência Fibonacci`;
    }
}

calcularFaturamento().then(res3Html => {
    const res3 = document.getElementById("resposta3");
    res3.innerHTML = res3Html;
}).catch(error => {
    console.error("Erro ao calcular faturamento:", error);
});

async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
}

async function calcularFaturamento() {
    const data = await fetchData("faturamento.json")

    let maxDia = 0;
    let minDia = 0;
    let maxValor = 0;
    let minValor = Infinity;
    let valoresParaMedia = [];
    let diasAcimaDaMedia = [];

    data.forEach(info => {
        if (info.valor > 0) {
            valoresParaMedia.push(info.valor);
        }
    });

    let total = 0;
    valoresParaMedia.forEach(valor => {
        total += valor;
    });

    let media = 0;
    if (valoresParaMedia.length > 0) {
        media = total / valoresParaMedia.length;
    }

    data.forEach(info => {
        if (info.valor > maxValor) {
            maxValor = info.valor;
            maxDia = info.dia;
        }
        if (info.valor != 0 && info.valor < minValor) {
            minValor = info.valor;
            minDia = info.dia;
        }

        if (info.valor > media) {
            diasAcimaDaMedia.push(info.dia);
        }
    });

    const html = `
        <ul>
            <li>O dia com o maior faturamento no mês é o dia ${maxDia} com um faturamento de R$${maxValor.toFixed(2)}.</li>
            <li>O dia com o menor faturamento no mês é o dia ${minDia} com um faturamento de R$${minValor.toFixed(2)}.</li>
            <li>O total de dias com faturamento acima da média é ${diasAcimaDaMedia.length}.</li>
            <li>Os dias com faturamento acima da média são ${diasAcimaDaMedia.join(", ")}.</li>
        </ul>`;

    return html;
}

const calcularPercentual = () =>{
    const elementosValores = document.querySelectorAll(".valor");
    let total = 0;
    let dados = [];
    
    elementosValores.forEach(elemento =>{
        total += parseFloat(elemento.getAttribute("data-valor"));
    })

    elementosValores.forEach(elemento =>{
        let percentual = (parseFloat(elemento.getAttribute("data-valor"))/total)*100;
        let id = elemento.getAttribute("id");
        dados.push({ id: id, percentual: percentual });
    })

    let html = `<ul>`

    dados.forEach(dado => {
        html += `<li>LOCAL: ${dado.id} – PERCENTUAL: ${dado.percentual.toFixed(2)}%</li>`;
    })
    html += '</ul>';

    return html;
}

const dadosFaturamento = calcularPercentual();
const res4 = document.getElementById("resposta4");
res4.innerHTML = dadosFaturamento;


const buttonReverse = document.getElementById("buttonReverse");
buttonReverse.addEventListener("click", (event) => {
    event.preventDefault();
    const string = document.getElementById("inputString").value;
    const reverseString = reverterString(string);
    console.log(reverseString);
    const res4 = document.getElementById("resposta5");
    res4.textContent = `A string com os caracteres invertidos é: ${reverseString}`;
})

const reverterString = (string) =>{
    let reverseString = "";
    for (let i = string.length - 1; i >=0; i--)
        reverseString += string[i];
    return reverseString;
}


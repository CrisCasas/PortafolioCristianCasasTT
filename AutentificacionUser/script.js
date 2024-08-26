const contractAddress = "0xC253abf2Aac5B3C07cFa65E5A958f2EA75f4C83D";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_direccionGestorUsuarios",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "obtenerRegistros",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_dato",
                "type": "string"
            }
        ],
        "name": "registrarDato",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let provider;
let signer;
let contract;

async function connectMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            const address = await signer.getAddress();
            document.getElementById("userAddress").innerText = `Conectado: ${address}`;
        } catch (err) {
            console.error("Error al conectar Metamask", err);
        }
    } else {
        alert("Por favor, instala Metamask");
    }
}

async function obtenerRegistros() {
    try {
        const registros = await contract.obtenerRegistros();
        const dataList = document.getElementById("dataList");
        dataList.innerHTML = '';
        registros.forEach(dato => {
            const li = document.createElement("li");
            li.textContent = dato;
            dataList.appendChild(li);
        });
    } catch (err) {
        console.error("Error al obtener registros", err);
    }
}

async function registrarDato() {
    const inputData = document.getElementById("inputData").value;
    if (inputData.trim() === '') {
        alert("Por favor, ingresa un dato");
        return;
    }

    try {
        const tx = await contract.registrarDato(inputData);
        await tx.wait();
        alert("Dato registrado correctamente");
        document.getElementById("inputData").value = '';
    } catch (err) {
        console.error("Error al registrar dato", err);
    }
}

document.getElementById("connectButton").addEventListener("click", connectMetamask);
document.getElementById("getDataButton").addEventListener("click", obtenerRegistros);
document.getElementById("registerDataButton").addEventListener("click", registrarDato);

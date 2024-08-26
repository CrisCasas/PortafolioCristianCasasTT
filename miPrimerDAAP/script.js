// Conectar con la billetera Metamask
async function conectarBilletera() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert('Billetera conectada!');
        } catch (error) {
            console.error(error);
            alert('Error al conectar la billetera.');
        }
    } else {
        alert('Metamask no está instalado.');
    }
}

// Interactuar con el contrato inteligente
const contratoABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "nuevoTexto",
                "type": "string"
            }
        ],
        "name": "almacenarTexto",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "consultarTexto",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "propietario",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contratoDireccion = '0x0846E8B245b8e3E749FF52Ac614fCD73DF66f655';
let proveedor, contrato;

async function inicializarContrato() {
    if (window.ethereum) {
        proveedor = new ethers.providers.Web3Provider(window.ethereum);
        const signer = proveedor.getSigner();
        contrato = new ethers.Contract(contratoDireccion, contratoABI, signer);
    } else {
        alert('Metamask no está instalado.');
    }
}

document.getElementById('conectarBilletera').addEventListener('click', async () => {
    await conectarBilletera();
    await inicializarContrato();
});

document.getElementById('almacenarTexto').addEventListener('click', async () => {
    const texto = document.getElementById('nuevoTexto').value;
    if (texto) {
        try {
            const tx = await contrato.almacenarTexto(texto);
            await tx.wait();
            alert('Texto almacenado!');
        } catch (error) {
            console.error(error);
            alert('Error al almacenar el texto.');
        }
    } else {
        alert('Por favor, ingrese un texto.');
    }
});

document.getElementById('consultarTexto').addEventListener('click', async () => {
    try {
        const texto = await contrato.consultarTexto();
        document.getElementById('textoConsultado').textContent = texto;
    } catch (error) {
        console.error(error);
        alert('Error al consultar el texto.');
    }
});

document.getElementById('consultarPropietario').addEventListener('click', async () => {
    try {
        const propietario = await contrato.propietario();
        document.getElementById('propietario').textContent = propietario;
    } catch (error) {
        console.error(error);
        alert('Error al consultar el propietario.');
    }
});


//https://m_i_pri_mer_daap.playcode.io/
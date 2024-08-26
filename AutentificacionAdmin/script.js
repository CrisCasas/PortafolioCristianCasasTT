const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "0xB81826950AF87CF46D6B4072A9742EcF2238C669";
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "administrador",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            }
        ],
        "name": "eliminuarUsuario",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            }
        ],
        "name": "estaUsuarioRegistrado",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            }
        ],
        "name": "obtenerNombreRegistrado",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_nombre",
                "type": "string"
            }
        ],
        "name": "registrarUsuario",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, abi, provider);

document.getElementById('connectWallet').addEventListener('click', async () => {
    try {
        await provider.send("eth_requestAccounts", []);
        document.getElementById('userInfo').classList.remove('hidden');
    } catch (error) {
        console.error("Error conectando la billetera: ", error);
    }
});

document.getElementById('checkUser').addEventListener('click', async () => {
    const userAddress = document.getElementById('userAddress').value;
    try {
        const isRegistered = await contract.estaUsuarioRegistrado(userAddress);
        document.getElementById('userStatus').textContent = isRegistered ? "Usuario registrado" : "Usuario no registrado";
    } catch (error) {
        console.error("Error verificando usuario: ", error);
    }
});

document.getElementById('registerUser').addEventListener('click', async () => {
    const userAddress = document.getElementById('userAddress').value;
    const userName = document.getElementById('userName').value;
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    try {
        await contractWithSigner.registrarUsuario(userAddress, userName);
        alert("Usuario registrado correctamente");
    } catch (error) {
        console.error("Error registrando usuario: ", error);
    }
});

document.getElementById('removeUser').addEventListener('click', async () => {
    const userAddress = document.getElementById('userAddress').value;
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    try {
        await contractWithSigner.eliminuarUsuario(userAddress);
        alert("Usuario eliminado correctamente");
    } catch (error) {
        console.error("Error eliminando usuario: ", error);
    }
});

// Load administrator address
(async () => {
    try {
        const adminAddress = await contract.administrador();
        document.getElementById('adminAddress').textContent = `Administrador: ${adminAddress}`;
    } catch (error) {
        console.error("Error obteniendo administrador: ", error);
    }
})();

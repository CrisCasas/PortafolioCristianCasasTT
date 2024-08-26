const contractAddress = '0xd6Ea87045AdB698614d71DC15212EB015C0758c9';
const abi = [
  // ABI proporcionada
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_idCandidato',
        type: 'uint256',
      },
    ],
    name: 'votar',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'candidatos',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'nombre',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'conteoVotos',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cantidadCandidatos',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mostrarCandidatos',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'nombre',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'conteoVotos',
            type: 'uint256',
          },
        ],
        internalType: 'struct Votacion.Candidato[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_idCandidato',
        type: 'uint256',
      },
    ],
    name: 'obtenerCandidato',
    outputs: [
      {
        internalType: 'string',
        name: 'nombre',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'conteoVotos',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'obtenerTotalVotos',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalVotos',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'votantes',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

let isConnected = false; // Variable para controlar si ya estamos conectados

async function connectWallet() {
  if (window.ethereum) {
    try {
      // Solicita permiso para acceder a las cuentas
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const address = await signer.getAddress();

      document.getElementById(
        'walletAddress'
      ).innerText = `Conectado: ${address}`;
      return { provider, contract };
    } catch (error) {
      console.error('Error al conectar MetaMask', error);
      alert('Error al conectar MetaMask');
      throw error;
    }
  } else {
    alert('MetaMask no está instalado');
    throw new Error('MetaMask no está instalado');
  }
}

document.getElementById('connectButton').addEventListener('click', async () => {
  if (!isConnected) {
    // Sólo conectar si no estamos ya conectados
    await connectWallet();
  } else {
    alert('Ya estás conectado con MetaMask');
  }
});

document.getElementById('votarButton').addEventListener('click', async () => {
  const idCandidato = document.getElementById('idCandidato').value;
  if (!idCandidato) {
    alert('Por favor, ingrese un ID de candidato');
    return;
  }
  const { contract } = await connectWallet();
  try {
    const tx = await contract.votar(idCandidato);
    await tx.wait();
    alert('Voto realizado con éxito');
  } catch (err) {
    console.error(err);
    alert('Error al realizar el voto');
  }
});

document
  .getElementById('candidatosButton')
  .addEventListener('click', async () => {
    const { contract } = await connectWallet();
    try {
      const candidatos = await contract.mostrarCandidatos();
      const tableBody = document.querySelector('#candidatosTable tbody');
      tableBody.innerHTML = '';

      candidatos.forEach(candidato => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="border-b p-2">${candidato.id.toString()}</td>
                <td class="border-b p-2">${candidato.nombre}</td>
                <td class="border-b p-2">${candidato.conteoVotos.toString()}</td>
            `;
        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
      alert('Error al obtener candidatos');
    }
  });

document
  .getElementById('totalVotosButton')
  .addEventListener('click', async () => {
    const { contract } = await connectWallet();
    try {
      const totalVotos = await contract.obtenerTotalVotos();
      document.getElementById(
        'totalVotosInfo'
      ).innerText = `Total de votos: ${totalVotos.toString()}`;
    } catch (err) {
      console.error(err);
      alert('Error al obtener el total de votos');
    }
  });

document
  .getElementById('verificarVotoButton')
  .addEventListener('click', async () => {
    const idCandidato = document.getElementById('idCandidato').value;
    if (!idCandidato) {
      alert('Por favor, ingrese un ID de candidato');
      return;
    }
    const { contract } = await connectWallet();
    try {
      const candidato = await contract.obtenerCandidato(idCandidato);
      document.getElementById('verificarVotoInfo').innerText = `Nombre: ${
        candidato.nombre
      }, Votos: ${candidato.conteoVotos.toString()}`;
    } catch (err) {
      console.error(err);
      alert('Error al verificar el voto');
    }
  });

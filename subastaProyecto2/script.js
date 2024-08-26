const contractAddress = '0xb6705A5c4d2F93669c6414fd2e00fA61C23C998e';
const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'cancelarSubasta',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_bienDigital',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_precioMinimo',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_tiempoLimite',
        type: 'uint256',
      },
    ],
    name: 'crearSubasta',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'finalizarSubasta',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'ofertar',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'postor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oferta',
        type: 'uint256',
      },
    ],
    name: 'OfertaRealizada',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'SubastaCancelada',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creador',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'bienDigital',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'precioMinimo',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tiempoLimite',
        type: 'uint256',
      },
    ],
    name: 'SubastaCreada',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'ganador',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oferta',
        type: 'uint256',
      },
    ],
    name: 'SubastaFinalizada',
    type: 'event',
  },
  {
    inputs: [],
    name: 'idSubasta',
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
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'obtenerSubasta',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
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
    name: 'ofertasActivas',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'subastas',
    outputs: [
      {
        internalType: 'address',
        name: 'creador',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'bienDigital',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'precioMinimo',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tiempoLimite',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'mejorPostor',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'mejorOferta',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'activa',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'cancelada',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

let provider;
let signer;
let contract;

document.getElementById('connectWallet').addEventListener('click', async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    const address = await signer.getAddress();
    document.getElementById('walletInfo').innerText = `Conectado: ${address}`;
  } else {
    alert('MetaMask no está instalado');
  }
});

document.getElementById('crearSubasta').addEventListener('click', async () => {
  const bienDigital = document.getElementById('bienDigital').value;
  const precioMinimo = document.getElementById('precioMinimo').value;
  const tiempoLimite = document.getElementById('tiempoLimite').value;

  try {
    const tx = await contract.crearSubasta(
      bienDigital,
      precioMinimo,
      tiempoLimite
    );
    await tx.wait();
    alert('Subasta creada con éxito');
  } catch (error) {
    console.error('Error al crear la subasta:', error);
    alert('Error al crear la subasta');
  }
});

document.getElementById('ofertar').addEventListener('click', async () => {
  const subastaId = document.getElementById('subastaId').value;
  const oferta = ethers.utils.parseEther(
    document.getElementById('oferta').value
  );

  try {
    const tx = await contract.ofertar(subastaId, { value: oferta });
    await tx.wait();
    alert('Oferta realizada con éxito');
  } catch (error) {
    console.error('Error al hacer la oferta:', error);
    alert('Error al hacer la oferta');
  }
});

document
  .getElementById('mostrarDetalles')
  .addEventListener('click', async () => {
    const idSubasta = document.getElementById('idSubasta').value;

    try {
      const detalle = await contract.obtenerSubasta(idSubasta);
      const [
        creador,
        bienDigital,
        precioMinimo,
        tiempoLimite,
        mejorPostor,
        mejorOferta,
        activa,
        cancelada,
      ] = detalle;

      // Convertir tiempo límite a formato legible
      const fechaLimite = new Date(
        tiempoLimite.toNumber() * 1000
      ).toLocaleString();

      const formateado = {
        creador: creador,
        bienDigital: bienDigital,
        precioMinimo: ethers.utils.formatEther(precioMinimo), // Convertir de wei a ether
        tiempoLimite: fechaLimite,
        mejorPostor: mejorPostor,
        mejorOferta: ethers.utils.formatEther(mejorOferta), // Convertir de wei a ether
        activa: activa,
        cancelada: cancelada,
      };

      // Limpiar tabla antes de llenarla
      const detallesBody = document.getElementById('detallesSubastaBody');
      detallesBody.innerHTML = '';

      for (const [key, value] of Object.entries(formateado)) {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="px-4 py-2 border-b">${key}</td>
                <td class="px-4 py-2 border-b">${value}</td>
            `;
        detallesBody.appendChild(row);
      }
    } catch (error) {
      console.error('Error al obtener los detalles de la subasta:', error);
      document.getElementById('detallesSubastaBody').innerHTML =
        '<tr><td colspan="2" class="px-4 py-2 border-b text-red-500">Error al obtener los detalles de la subasta</td></tr>';
    }
  });

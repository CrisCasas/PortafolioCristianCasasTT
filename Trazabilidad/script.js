const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contractAddress = '0x120a4e98DF3Fa35B1a6F43cB10C55734C785eCC3';
const abi = [
  {
    inputs: [
      { internalType: 'uint256', name: '_idProducto', type: 'uint256' },
      { internalType: 'string', name: '_ubicacion', type: 'string' },
    ],
    name: 'actualizarEstado',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_nombre', type: 'string' }],
    name: 'registrarProducto',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contadorProductos',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_idProducto', type: 'uint256' }],
    name: 'obtenerHistorial',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'ubicacion', type: 'string' },
          { internalType: 'uint256', name: 'marcaTiempo', type: 'uint256' },
        ],
        internalType: 'struct TrazabilidadSimple.Estado[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'obtenerListaProdcutos',
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'productos',
    outputs: [{ internalType: 'string', name: 'nombre', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const contract = new ethers.Contract(contractAddress, abi, signer);

async function connectWallet() {
  await provider.send('eth_requestAccounts', []);
}

document.getElementById('registrarProductoBtn').onclick = async () => {
  const nombreProducto = document.getElementById('nombreProducto').value;
  const tx = await contract.registrarProducto(nombreProducto);
  await tx.wait();
  document.getElementById('output').textContent =
    'Producto registrado con éxito.';
};

document.getElementById('listarProductosBtn').onclick = async () => {
  const productos = await contract.obtenerListaProdcutos();
  document.getElementById('output').textContent = `Productos: ${productos.join(
    ', '
  )}`;
};

document.getElementById('actualizarEstadoBtn').onclick = async () => {
  const idProducto = document.getElementById('idProducto').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const tx = await contract.actualizarEstado(idProducto, ubicacion);
  await tx.wait();
  document.getElementById('output').textContent =
    'Estado actualizado con éxito.';
};

document.getElementById('obtenerHistorialBtn').onclick = async () => {
  const idProducto = document.getElementById('idProducto').value;

  try {
    const historial = await contract.obtenerHistorial(idProducto);

    if (historial.length === 0) {
      document.getElementById('output').textContent =
        'No se encontró historial para el ID de producto ingresado.';
    } else {
      let historialTexto = 'Historial del Producto:\n';
      historial.forEach((estado, index) => {
        const fecha = new Date(estado.marcaTiempo * 1000); // Convertir timestamp a fecha
        historialTexto += `Estado ${index + 1}:\n`;
        historialTexto += `Ubicación: ${estado.ubicacion}\n`;
        historialTexto += `Fecha: ${fecha.toLocaleString()}\n\n`;
      });
      document.getElementById('output').textContent = historialTexto;
    }
  } catch (error) {
    console.error(error);
    document.getElementById('output').textContent =
      'Error al obtener el historial. Verifica el ID del producto e inténtalo nuevamente.';
  }
};

connectWallet();

//Dirección https://t_raz_abi_li_dad.playcode.io/
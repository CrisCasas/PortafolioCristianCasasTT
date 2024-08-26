const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'hash',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'registrante',
          type: 'address',
        },
      ],
      name: 'DocumentoRegistrado',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_hash',
          type: 'bytes32',
        },
      ],
      name: 'registrarDocumento',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_hash',
          type: 'bytes32',
        },
      ],
      name: 'verificarDocumento',
      outputs: [
        {
          internalType: 'bool',
          name: 'registrado',
          type: 'bool',
        },
        {
          internalType: 'address',
          name: 'registrante',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  
  const direccionContrato = '0x7C65F5ff0aC14643c6D8E86cf3f27931661E6eC7';
  
  let web3;
  let contrato;
  let cuenta;
  
  async function conectarMetaMask() {
    if (window.ethereum) {
      try {
        // Solicitar acceso a MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        contrato = new web3.eth.Contract(abi, direccionContrato);
        cuenta = (await web3.eth.getAccounts())[0];
        document.getElementById(
          'connectWalletBtn'
        ).innerText = `Conectado: ${cuenta.substring(0, 6)}...${cuenta.substring(
          cuenta.length - 4
        )}`;
      } catch (error) {
        console.error('Error al conectar a MetaMask', error);
        alert('No se pudo conectar a MetaMask.');
      }
    } else {
      alert('MetaMask no está instalado.');
    }
  }
  
  document
    .getElementById('connectWalletBtn')
    .addEventListener('click', conectarMetaMask);
  
  document.getElementById('registrarBtn').addEventListener('click', async () => {
    if (!cuenta) {
      alert('Por favor, conecta tu billetera MetaMask.');
      return;
    }
  
    try {
      const hashOriginal = document.getElementById('hash').value;
      const hashBytes32 = web3.utils.sha3(hashOriginal); // Convierte a bytes32
  
      await contrato.methods
        .registrarDocumento(hashBytes32)
        .send({ from: cuenta });
      document.getElementById('resultado').innerText =
        'Hash registrado con éxito.';
    } catch (error) {
      document.getElementById('resultado').innerText =
        'Error al registrar el hash.';
      console.error(error);
    }
  });
  
  document.getElementById('verificarBtn').addEventListener('click', async () => {
    if (!cuenta) {
      alert('Por favor, conecta tu billetera MetaMask.');
      return;
    }
  
    try {
      const hashOriginal = document.getElementById('hash').value;
      const hashBytes32 = web3.utils.sha3(hashOriginal); // Convierte a bytes32
  
      const resultado = await contrato.methods
        .verificarDocumento(hashBytes32)
        .call();
      if (resultado.registrado) {
        document.getElementById(
          'resultado'
        ).innerText = `El hash ya está registrado por: ${resultado.registrante}`;
      } else {
        document.getElementById('resultado').innerText =
          'El hash no está registrado.';
      }
    } catch (error) {
      document.getElementById('resultado').innerText =
        'Error al verificar el hash.';
      console.error(error);
    }
  });
  
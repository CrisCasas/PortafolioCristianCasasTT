document.getElementById('connectButton').onclick = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const contractAddress = '0xAF8cB8cB13229F4f73f46E3DbCbDb114b3421aC6';
      const abi = [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        // ... otras entradas de la ABI ...
        {
          inputs: [],
          name: 'nombrePersonaje',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ultimoRequestId',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ];
  
      const contract = new ethers.Contract(contractAddress, abi, signer);
  
      // Leer datos del contrato
      const nombrePersonaje = await contract.nombrePersonaje();
      const ultimoRequestId = await contract.ultimoRequestId();
  
      document
        .getElementById('nombrePersonaje')
        .querySelector('span').textContent = nombrePersonaje;
      document
        .getElementById('ultimoRequestId')
        .querySelector('span').textContent = ultimoRequestId;
    } catch (error) {
      console.error('Error al conectar MetaMask o leer el contrato:', error);
    }
  };
  
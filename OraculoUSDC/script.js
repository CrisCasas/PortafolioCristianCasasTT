window.addEventListener('load', async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = '0x1c958fEfE238EB3fF58101aB296c8b43117AA908';
      const contractABI = [
        {
          inputs: [],
          name: 'obtenerDecimales',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'obtenerDescripcion',
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
          name: 'obtenerPrecio',
          outputs: [
            {
              internalType: 'int256',
              name: '',
              type: 'int256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'obtenerTimestamp',
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
          name: 'obtenerVersion',
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
      ];
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
  
      function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000); // Convertir segundos a milisegundos
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses son base 0
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
      }
  
      async function updateContractData() {
        try {
          // Leer datos del contrato
          const decimals = await contract.obtenerDecimales();
          const description = await contract.obtenerDescripcion();
          const latestAnswer = await contract.obtenerPrecio();
          const latestTimestamp = await contract.obtenerTimestamp();
          const version = await contract.obtenerVersion();
  
          // Mostrar datos del contrato
          document.getElementById('decimals').value = decimals.toString();
          document.getElementById('description').value = description;
          document.getElementById('latestAnswer').value = latestAnswer.toString();
          document.getElementById('latestTimestamp').value = formatTimestamp(
            latestTimestamp.toNumber()
          ); // Convertir a número
          document.getElementById('version').value = version.toString();
  
          // Mostrar mensaje de éxito
          document.getElementById('updateStatus').innerText =
            'Ya se ha actualizado';
        } catch (error) {
          console.error('Error al leer el contrato', error);
          document.getElementById('status').innerText =
            'Error al leer el contrato';
        }
      }
  
      // Manejar el clic en el botón de conexión
      document
        .getElementById('connectButton')
        .addEventListener('click', async () => {
          try {
            // Solicitar conexión con MetaMask
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
  
            // Mostrar dirección de la billetera
            document.getElementById(
              'walletAddress'
            ).innerText = `Billetera Conectada: ${address}`;
            document.getElementById('walletAddress').classList.remove('hidden');
  
            document.getElementById('status').innerText =
              'Conectado con MetaMask';
  
            // Mostrar el botón de actualizar
            document.getElementById('refreshButton').classList.remove('hidden');
  
            // Actualizar los datos del contrato
            await updateContractData();
          } catch (error) {
            console.error('Error al conectar con MetaMask', error);
            document.getElementById('status').innerText =
              'Error al conectar con MetaMask';
          }
        });
  
      // Manejar el clic en el botón de actualizar
      document
        .getElementById('refreshButton')
        .addEventListener('click', async () => {
          await updateContractData();
        });
    } else {
      document.getElementById('status').innerText = 'MetaMask no está instalado';
    }
  });
  
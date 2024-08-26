const contratoAbi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
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
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
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
      name: 'totalSupply',
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
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
  
  const contratoAddress = '0x2104101d72D8Fb0AA9851c096Bf0aFdD9a243478';
  let provider;
  let contrato;
  let signer;
  
  document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
      contrato = new ethers.Contract(contratoAddress, contratoAbi, signer);
  
      const address = await signer.getAddress();
      document.getElementById(
        'accountAddress'
      ).textContent = `Dirección: ${address}`;
      document.getElementById('accountInfo').classList.remove('hidden');
      document.getElementById('transactionInfo').classList.remove('hidden');
    } else {
      alert('Metamask no está instalado');
    }
  });
  
  document.getElementById('checkBalance').addEventListener('click', async () => {
    const address = await signer.getAddress();
    const balance = await contrato.balanceOf(address);
    document.getElementById(
      'balance'
    ).textContent = `Saldo: ${ethers.utils.formatUnits(balance, 18)} tokens`;
  });
  
  document
    .getElementById('transferButton')
    .addEventListener('click', async () => {
      const recipient = document.getElementById('recipient').value;
      const amount = document.getElementById('amount').value;
      if (ethers.utils.isAddress(recipient) && amount > 0) {
        try {
          const tx = await contrato.transfer(
            recipient,
            ethers.utils.parseUnits(amount, 18)
          );
          await tx.wait();
          document.getElementById('transferResult').textContent =
            'Transferencia exitosa';
        } catch (error) {
          document.getElementById(
            'transferResult'
          ).textContent = `Error: ${error.message}`;
        }
      } else {
        document.getElementById('transferResult').textContent =
          'Dirección o cantidad inválida';
      }
    });
  
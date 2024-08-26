// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistroHashDocumentos {
    // Mapa que almacena los hashes registrados y la dirección del registrante
    mapping(bytes32 => address) private documentosRegistrados;

    // Evento que se emite cuando un nuevo hash es registrado
    event DocumentoRegistrado(bytes32 hash, address registrante);

    // Función para registrar un hash de un documento
    function registrarDocumento(bytes32 _hash) public {
        require(documentosRegistrados[_hash] == address(0), "El hash ya ha sido registrado.");
        documentosRegistrados[_hash] = msg.sender;
        emit DocumentoRegistrado(_hash, msg.sender);
    }

    // Función para verificar si un hash ya ha sido registrado
    function verificarDocumento(bytes32 _hash) public view returns (bool registrado, address registrante) {
        if (documentosRegistrados[_hash] != address(0)) {
            return (true, documentosRegistrados[_hash]);
        } else {
            return (false, address(0));
        }
    }
}

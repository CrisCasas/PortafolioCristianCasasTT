// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Votacion {
    struct Candidato {
        uint id;
        string nombre;
        uint conteoVotos;
    }

    mapping(uint => Candidato) public candidatos;
    mapping(address => bool) public votantes;
    uint public cantidadCandidatos;
    uint public totalVotos;

    constructor() {
        agregarCandidato("Alicia");
        agregarCandidato("Roberto");
    }

    function agregarCandidato(string memory _nombre) private {
        cantidadCandidatos++;
        candidatos[cantidadCandidatos] = Candidato(cantidadCandidatos, _nombre, 0);
    }

    function votar(uint _idCandidato) public {
        require(!votantes[msg.sender], "Ya has votado.");
        require(_idCandidato > 0 && _idCandidato <= cantidadCandidatos, "El ID del candidato esta fuera del rango permitido.");

        votantes[msg.sender] = true;
        candidatos[_idCandidato].conteoVotos++;
        totalVotos++;
    }

    function obtenerCandidato(uint _idCandidato) public view returns (string memory nombre, uint conteoVotos) {
        Candidato memory candidato = candidatos[_idCandidato];
        return (candidato.nombre, candidato.conteoVotos);
    }

    function obtenerTotalVotos() public view returns (uint) {
        return totalVotos;
    }

    function mostrarCandidatos() public view returns (Candidato[] memory) {
        Candidato[] memory listaCandidatos = new Candidato[](cantidadCandidatos);
        for (uint i = 1; i <= cantidadCandidatos; i++) {
            listaCandidatos[i - 1] = candidatos[i];
        }
        return listaCandidatos;
    }
}

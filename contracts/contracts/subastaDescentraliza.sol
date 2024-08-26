// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubastaDescentralizada {
    struct Subasta {
        address creador;
        string bienDigital;
        uint256 precioMinimo;
        uint256 tiempoLimite;
        address mejorPostor;
        uint256 mejorOferta;
        bool activa;
        bool cancelada;
    }

    mapping(uint256 => Subasta) public subastas;
    mapping(address => uint256) public ofertasActivas;
    uint256 public idSubasta;

    event SubastaCreada(uint256 id, address creador, string bienDigital, uint256 precioMinimo, uint256 tiempoLimite);
    event OfertaRealizada(uint256 id, address postor, uint256 oferta);
    event SubastaFinalizada(uint256 id, address ganador, uint256 oferta);
    event SubastaCancelada(uint256 id);

    modifier soloCreador(uint256 _id) {
        require(subastas[_id].creador == msg.sender, "Solo el creador puede realizar esta accion");
        _;
    }

    modifier soloActiva(uint256 _id) {
        require(subastas[_id].activa, "La subasta no esta activa");
        _;
    }

    modifier soloNoCancelada(uint256 _id) {
        require(!subastas[_id].cancelada, "La subasta ha sido cancelada");
        _;
    }

    constructor() {
        idSubasta = 1;
    }

    function crearSubasta(string memory _bienDigital, uint256 _precioMinimo, uint256 _tiempoLimite) public {
        subastas[idSubasta] = Subasta({
            creador: msg.sender,
            bienDigital: _bienDigital,
            precioMinimo: _precioMinimo,
            tiempoLimite: block.timestamp + _tiempoLimite,
            mejorPostor: address(0),
            mejorOferta: 0,
            activa: true,
            cancelada: false
        });

        emit SubastaCreada(idSubasta, msg.sender, _bienDigital, _precioMinimo, _tiempoLimite);
        idSubasta++;
    }

    function ofertar(uint256 _id) public payable soloActiva(_id) soloNoCancelada(_id) {
        Subasta storage subasta = subastas[_id];
        
        require(block.timestamp < subasta.tiempoLimite, "La subasta ha terminado");
        require(msg.value > subasta.mejorOferta, "La oferta debe ser mayor que la oferta actual");
        require(msg.sender != subasta.creador, "El creador de la subasta no puede ofertar en su propia subasta");

        if (subasta.mejorOferta > 0) {
            // Devolver la oferta anterior al postor anterior
            payable(subasta.mejorPostor).transfer(subasta.mejorOferta);
        }

        subasta.mejorPostor = msg.sender;
        subasta.mejorOferta = msg.value;
        ofertasActivas[msg.sender] = _id;

        emit OfertaRealizada(_id, msg.sender, msg.value);
    }

    function finalizarSubasta(uint256 _id) public soloCreador(_id) {
        Subasta storage subasta = subastas[_id];

        require(block.timestamp >= subasta.tiempoLimite, "La subasta aun esta en curso");
        require(subasta.activa, "La subasta ya ha sido finalizada o cancelada");

        subasta.activa = false;

        if (subasta.mejorPostor != address(0)) {
            // Transferir el bien digital al mejor postor
            // Aquí puedes agregar la lógica para la transferencia del bien digital

            emit SubastaFinalizada(_id, subasta.mejorPostor, subasta.mejorOferta);
        }
    }

    function cancelarSubasta(uint256 _id) public soloCreador(_id) soloActiva(_id) soloNoCancelada(_id) {
        Subasta storage subasta = subastas[_id];
        
        require(block.timestamp < subasta.tiempoLimite, "La subasta ya ha terminado");

        subasta.cancelada = true;

        if (subasta.mejorOferta > 0) {
            // Devolver la oferta al postor
            payable(subasta.mejorPostor).transfer(subasta.mejorOferta);
        }

        emit SubastaCancelada(_id);
    }

    function obtenerSubasta(uint256 _id) public view returns (address, string memory, uint256, uint256, address, uint256, bool, bool) {
        Subasta memory subasta = subastas[_id];
        return (
            subasta.creador,
            subasta.bienDigital,
            subasta.precioMinimo,
            subasta.tiempoLimite,
            subasta.mejorPostor,
            subasta.mejorOferta,
            subasta.activa,
            subasta.cancelada
        );
    }
}

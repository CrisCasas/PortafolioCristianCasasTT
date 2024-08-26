// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface AggregatorV3Interface {
    function latestAnswer() external view returns (int256);
    function latestTimestamp() external view returns (uint256);
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function version() external view returns (uint256);
}

contract PrecioBTCUSD {
    AggregatorV3Interface internal precioFeed;

    // Variables de estado para almacenar los datos del oráculo
    int256 public precio;
    uint256 public timestamp;
    uint8 public decimales;
    string public descripcion;
    uint256 public version;

    constructor() public {
        // Dirección del contrato del oráculo para BTC/USD en la red Sepolia
        precioFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
    }

    // Función para actualizar los valores almacenados
    function actualizarDatos() public {
        precio = precioFeed.latestAnswer();
        timestamp = precioFeed.latestTimestamp();
        decimales = precioFeed.decimals();
        descripcion = precioFeed.description();
        version = precioFeed.version();
    }

    // Función para obtener el precio más reciente de BTC/USD sin conversión
    function obtenerPrecio() public view returns (int256) {
        return precio;
    }

    // Función para obtener el precio más reciente de BTC/USD y convertirlo a dólares utilizando los decimales del oráculo
    function obtenerPrecioDolares() public view returns (int256) {
        int256 dolar = precio;
        int256 factor = int256(10 ** uint256(decimales));
        return dolar / factor;
    }

    // Función para obtener el número de decimales que el oráculo utiliza para el precio
    function obtenerDecimales() public view returns (uint8) {
        return decimales;
    }

    // Función para obtener una descripción del oráculo
    function obtenerDescripcion() public view returns (string memory) {
        return descripcion;
    }

    // Función para obtener la versión del oráculo
    function obtenerVersion() public view returns (uint256) {
        return version;
    }

    // Función para obtener la marca de tiempo de la última actualización del precio
    function obtenerTimestamp() public view returns (uint256) {
        return timestamp;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Próposito: Crear un contrato Simple para un caso de trazabilidad de productos

contract TrazabilidadSimple{


    struct Estado{

        string ubicacion;
        uint marcaTiempo;

    }

    struct Producto{

        string nombre;
        Estado[] historialEstados;

    }

    
    mapping (uint => Producto) public productos;

    uint public contadorProductos;

    //función para registrar un producto
    function registrarProducto(string memory _nombre) public {

        contadorProductos++;
        productos[contadorProductos].nombre = _nombre;

    }


    //función para actulizar el estado del producto
    function actualizarEstado(uint _idProducto, string memory _ubicacion) public {

        require(_idProducto>0 && _idProducto<=contadorProductos, "El producto no existe");

        productos[_idProducto].historialEstados.push(Estado(
            {
                ubicacion: _ubicacion,
                marcaTiempo: block.timestamp
            }
        ));

    }
    

    //Función para obtener historial del producto

    function obtenerHistorial(uint _idProducto) public view returns (Estado[] memory){
        
        require(_idProducto>0 && _idProducto<=contadorProductos, "El producto no existe");

        return productos[_idProducto].historialEstados;
    }

    //función para obtener lista de productos
    function obtenerListaProdcutos() public view returns (string[] memory){
        
        string[] memory listaProductos = new string[](contadorProductos);


        for (uint i=1;i<=contadorProductos;i++){
            listaProductos[i - 1] = productos[i].nombre;
        }

        return listaProductos;
    }
}
import TarjetaProducto from "./TarjetaProducto";

export function ProductoList({productos}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
            {productos.map(prod => (
                <TarjetaProducto key={prod.id} {...prod} />
            ))}
        </div>
    );
}

using LogisticaApp.Models;
using LogisticaApp.Models.Enums;

namespace LogisticaApp.StateMachine;

public class PackageStateMachine
{
    /// <summary>
    /// Valida si se puede transitar de un estado a otro.
    /// Sigue el flujo: Created -> InWarehouse -> InRoute -> Delivered
    /// Excepción: De cualquier estado se puede ir a "Failed"
    /// </summary>
    public bool CanTransition(PackageStatus current, PackageStatus next)
    {
        // Si el paquete falló, no se puede cambiar de estado
        if (current == PackageStatus.Failed)
            return false;

        // Desde cualquier estado (excepto Failed y Delivered), se puede marcar como fallido
        if (next == PackageStatus.Failed && current != PackageStatus.Delivered)
            return true;

        // Transiciones válidas en orden
        if (current == PackageStatus.Created && next == PackageStatus.InWarehouse)
            return true;

        if (current == PackageStatus.InWarehouse && next == PackageStatus.InRoute)
            return true;

        if (current == PackageStatus.InRoute && next == PackageStatus.Delivered)
            return true;

        return false;
    }

    /// <summary>
    /// Obtiene el siguiente estado válido (para navegar automáticamente)
    /// </summary>
    public PackageStatus? GetNextValidState(PackageStatus current)
    {
        return current switch
        {
            PackageStatus.Created => PackageStatus.InWarehouse,
            PackageStatus.InWarehouse => PackageStatus.InRoute,
            PackageStatus.InRoute => PackageStatus.Delivered,
            _ => null
        };
    }
}
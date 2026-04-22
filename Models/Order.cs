using LogisticaApp.Models.Enums;

namespace LogisticaApp.Models;

public class Order
{
    public int OrderId { get; set; }

    // Usuario que hizo la orden
    public int UserId { get; set; }
    public User User { get; set; }

    // Estado de la orden
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    // Monto total
    public decimal TotalAmount { get; set; }

    // Detalles de entrega
    public string ShippingAddress { get; set; }
    public double ShippingLatitude { get; set; }
    public double ShippingLongitude { get; set; }

    // Items en la orden
    public List<OrderItem>? OrderItems { get; set; }

    // Paquetes asociados
    public List<Package>? Packages { get; set; }

    // Timestamps
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
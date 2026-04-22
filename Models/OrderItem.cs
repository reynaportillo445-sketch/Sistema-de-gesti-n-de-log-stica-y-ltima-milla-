namespace LogisticaApp.Models;

public class OrderItem
{
    public int OrderItemId { get; set; }
    
    public int OrderId { get; set; }
    public Order Order { get; set; }
    
    // Producto (nombre, precio en ese momento)
    public string ProductName { get; set; }
    public decimal PriceAtPurchase { get; set; }
    public int Quantity { get; set; }
}
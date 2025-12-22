// Número de WhatsApp de la tienda (cambia este número por el de la panadería)
const WHATSAPP_NUMBER = '9531049193'; // Formato: código país + número sin espacios ni guiones

export function sendCartToWhatsApp(cartItems) {
  const message = createCartMessage(cartItems);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

function createCartMessage(cartItems) {
  let message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;

  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    message += `${index + 1}. *${item.name}*\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio unitario: $${item.price}`;

    if (item.unit) {
      message += ` ${item.unit}`;
    }

    message += `\n   Subtotal: $${subtotal}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL: $${total}*\n\n`;
  message += `¿Está disponible para este pedido?`;

  return message;
}

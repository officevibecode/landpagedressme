import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, API_BASE_URL, PRODUCT_CONFIG } from '../config/stripe';

// Inicializa o Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Valida se o Stripe está configurado
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe não foi inicializado corretamente. Verifique as configurações.');
      }

      // Chama a API para criar a sessão de checkout
      const response = await fetch(`${API_BASE_URL}/create-checkout-session.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: PRODUCT_CONFIG.name,
          product_description: PRODUCT_CONFIG.description,
          amount: PRODUCT_CONFIG.finalPrice * 100, // Converte para centavos (1515.00 EUR = 151500)
          currency: PRODUCT_CONFIG.currency.toLowerCase(),
        }),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Valida a resposta da API
      if (!data.success) {
        throw new Error(data.error || 'Erro ao criar sessão de checkout no servidor');
      }

      if (!data.sessionId) {
        throw new Error('Sessão de checkout inválida. ID da sessão não foi retornado.');
      }

      // Log para debug (remover em produção)
      console.log('✅ Sessão de checkout criada:', data.sessionId);

      // Redireciona para o Stripe Checkout usando a URL direta
      // Nota: redirectToCheckout() foi descontinuado, agora usamos window.location
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não foi retornada pelo servidor');
      }

    } catch (err) {
      console.error('❌ Erro no checkout:', err);
      
      // Mensagens de erro mais amigáveis
      let errorMessage = 'Erro desconhecido ao processar o pagamento.';
      
      if (err instanceof TypeError && err.message.includes('fetch')) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        error,
        addItem,
        removeItem,
        clearCart,
        checkout,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};


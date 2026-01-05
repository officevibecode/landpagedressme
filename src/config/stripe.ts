/**
 * Configuração do Stripe para o frontend
 */

// Chave publicável do Stripe (carregada das variáveis de ambiente)
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QdPBfJk7sVYB4qn4test_key_aqui';

// URL da API backend (carregada das variáveis de ambiente)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Configuração do produto DressMe
export const PRODUCT_CONFIG = {
  name: 'DressMe by TGOO',
  description: 'Licença completa do DressMe - Sistema de criação de looks para e-commerce com 10 anos de suporte',
  regularPrice: 1670,
  discountPrice: 155,
  finalPrice: 1515,
  currency: 'EUR',
  maxInstallments: 3, // Máximo de parcelas no cartão de crédito
};

// Validação básica da configuração
export const isStripeConfigured = (): boolean => {
  return STRIPE_PUBLISHABLE_KEY.startsWith('pk_');
};

// Mensagens de erro customizadas
export const ERROR_MESSAGES = {
  stripe_not_configured: 'Stripe não está configurado. Por favor, configure as chaves de API.',
  checkout_creation_failed: 'Erro ao criar sessão de checkout. Por favor, tente novamente.',
  network_error: 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.',
  unknown_error: 'Ocorreu um erro inesperado. Por favor, entre em contato com o suporte.',
};


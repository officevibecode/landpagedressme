<?php
/**
 * Cria uma sessão de checkout do Stripe
 * 
 * Este endpoint cria uma sessão de checkout do Stripe com suporte a parcelamento em até 3x
 */

require_once 'config.php';
require_once 'stripe-php/autoload.php';

try {
    // Define a chave secreta do Stripe
    \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
    
    // Recebe os dados do produto
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Dados inválidos');
    }
    
    $productName = $input['product_name'] ?? 'DressMe by TGOO';
    $productDescription = $input['product_description'] ?? 'Licença completa do DressMe - Sistema de criação de looks para e-commerce';
    $amount = $input['amount'] ?? 151500; // 1515.00 EUR em centavos
    $currency = $input['currency'] ?? 'eur';
    
    // Cria a sessão de checkout
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => $currency,
                'product_data' => [
                    'name' => $productName,
                    'description' => $productDescription,
                ],
                'unit_amount' => $amount,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => SUCCESS_URL,
        'cancel_url' => CANCEL_URL,
        'locale' => 'pt',
        // Metadados para rastreamento
        'metadata' => [
            'product' => 'dressme',
            'version' => '1.0',
        ],
        // Informações de cobrança
        'billing_address_collection' => 'required',
        'phone_number_collection' => [
            'enabled' => true,
        ],
        // Nota: Parcelamento removido temporariamente
        // Para habilitar em produção, configure no dashboard do Stripe
        // e adicione: 'payment_method_options' => ['card' => ['installments' => ['enabled' => true]]]
    ]);
    
    // Retorna o ID da sessão
    echo json_encode([
        'success' => true,
        'sessionId' => $session->id,
        'url' => $session->url,
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}


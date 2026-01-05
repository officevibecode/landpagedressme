<?php
/**
 * Versão simplificada do checkout (sem parcelamento)
 */

require_once 'config.php';
require_once 'stripe-php/autoload.php';

try {
    \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
    
    $input = json_decode(file_get_contents('php://input'), true);
    $amount = $input['amount'] ?? 151500;
    
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => 'DressMe by TGOO',
                    'description' => 'Licença completa do DressMe',
                ],
                'unit_amount' => $amount,
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => SUCCESS_URL,
        'cancel_url' => CANCEL_URL,
        'locale' => 'pt',
    ]);
    
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


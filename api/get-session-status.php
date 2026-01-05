<?php
/**
 * Verifica o status de uma sessão de checkout
 * 
 * Este endpoint retorna o status de pagamento de uma sessão do Stripe
 */

require_once 'config.php';
require_once 'stripe-php/autoload.php';

try {
    // Define a chave secreta do Stripe
    \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
    
    // Obtém o ID da sessão
    $sessionId = $_GET['session_id'] ?? null;
    
    if (!$sessionId) {
        throw new Exception('ID da sessão não fornecido');
    }
    
    // Busca a sessão no Stripe
    $session = \Stripe\Checkout\Session::retrieve($sessionId);
    
    // Busca informações do pagamento se existir
    $paymentIntent = null;
    if ($session->payment_intent) {
        $paymentIntent = \Stripe\PaymentIntent::retrieve($session->payment_intent);
    }
    
    // Busca informações do cliente
    $customer = null;
    if ($session->customer) {
        $customer = \Stripe\Customer::retrieve($session->customer);
    }
    
    // Retorna as informações
    echo json_encode([
        'success' => true,
        'session' => [
            'id' => $session->id,
            'status' => $session->status,
            'payment_status' => $session->payment_status,
            'amount_total' => $session->amount_total,
            'currency' => $session->currency,
            'customer_email' => $session->customer_details->email ?? null,
            'customer_name' => $session->customer_details->name ?? null,
            'customer_phone' => $session->customer_details->phone ?? null,
        ],
        'payment' => $paymentIntent ? [
            'id' => $paymentIntent->id,
            'status' => $paymentIntent->status,
            'amount' => $paymentIntent->amount,
            'currency' => $paymentIntent->currency,
            'created' => date('Y-m-d H:i:s', $paymentIntent->created),
        ] : null,
        'customer' => $customer ? [
            'id' => $customer->id,
            'email' => $customer->email,
            'name' => $customer->name,
        ] : null,
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}


<?php
/**
 * Configuração do Stripe
 * 
 * IMPORTANTE: Configure suas chaves do Stripe no arquivo .env
 */

// Permite CORS para desenvolvimento local
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Responde às requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Carrega variáveis de ambiente
function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!array_key_exists($name, $_ENV)) {
            $_ENV[$name] = $value;
        }
    }
}

// Carrega o arquivo .env
loadEnv(__DIR__ . '/../.env');

// Configurações do Stripe
// Carrega as chaves do arquivo .env (NUNCA commite chaves reais!)
define('STRIPE_SECRET_KEY', $_ENV['STRIPE_SECRET_KEY'] ?? '');
define('STRIPE_PUBLISHABLE_KEY', $_ENV['STRIPE_PUBLISHABLE_KEY'] ?? '');

// URLs de retorno (ajuste conforme seu domínio)
$baseUrl = $_ENV['BASE_URL'] ?? 'http://localhost:3002';
// Usando query parameters pois o Vite dev não serve HTML estático
define('SUCCESS_URL', $baseUrl . '/?payment=success&session_id={CHECKOUT_SESSION_ID}');
define('CANCEL_URL', $baseUrl . '/?payment=cancel');

// Verifica se as chaves estão configuradas
if (empty(STRIPE_SECRET_KEY) || empty(STRIPE_PUBLISHABLE_KEY)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Stripe não configurado. Por favor, configure as chaves no arquivo .env'
    ]);
    exit();
}


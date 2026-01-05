/**
 * Script de verificação de renderização do React
 * Execute: node check-render.js
 */

const http = require('http');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║   Verificação de Renderização - DressMe React             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Cores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    reset: '\x1b[0m'
};

function log(message, type = 'info') {
    const color = type === 'success' ? colors.green : 
                  type === 'error' ? colors.red : 
                  type === 'warning' ? colors.yellow : colors.blue;
    console.log(`${color}${message}${colors.reset}`);
}

// Teste 1: Verificar se o servidor está rodando
function checkServer() {
    return new Promise((resolve, reject) => {
        log('\n📡 Teste 1: Verificando servidor...', 'info');
        
        const req = http.get('http://localhost:3000', (res) => {
            if (res.statusCode === 200) {
                log('✅ Servidor respondendo (Status 200)', 'success');
                
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve(data);
                });
            } else {
                log(`❌ Servidor retornou status: ${res.statusCode}`, 'error');
                reject(new Error(`Status ${res.statusCode}`));
            }
        });

        req.on('error', (err) => {
            log('❌ Servidor não está rodando', 'error');
            log(`   Erro: ${err.message}`, 'error');
            reject(err);
        });

        req.setTimeout(5000, () => {
            log('❌ Timeout ao conectar ao servidor', 'error');
            req.destroy();
            reject(new Error('Timeout'));
        });
    });
}

// Teste 2: Analisar HTML retornado
function analyzeHTML(html) {
    log('\n🔍 Teste 2: Analisando HTML...', 'info');
    
    // Verificar elementos essenciais
    const checks = [
        { name: 'DOCTYPE', pattern: /<!DOCTYPE html>/i, critical: true },
        { name: 'Tag <html>', pattern: /<html/i, critical: true },
        { name: 'Tag <head>', pattern: /<head>/i, critical: true },
        { name: 'Tag <body>', pattern: /<body/i, critical: true },
        { name: 'Div #root', pattern: /<div id="root">/i, critical: true },
        { name: 'Script main.tsx', pattern: /src="\/src\/main\.tsx"/i, critical: true },
        { name: 'Tailwind CSS', pattern: /tailwindcss\.com/i, critical: false },
        { name: 'React import', pattern: /react@/i, critical: true },
        { name: 'Stripe import', pattern: /@stripe\/stripe-js/i, critical: true },
    ];

    let passed = 0;
    let failed = 0;

    checks.forEach(check => {
        if (check.pattern.test(html)) {
            log(`  ✅ ${check.name} encontrado`, 'success');
            passed++;
        } else {
            const symbol = check.critical ? '❌' : '⚠️';
            const type = check.critical ? 'error' : 'warning';
            log(`  ${symbol} ${check.name} NÃO encontrado`, type);
            failed++;
        }
    });

    log(`\n📊 Resultado: ${passed} passou, ${failed} falhou`, 'info');
    return { passed, failed };
}

// Teste 3: Verificar se há erros comuns
function checkCommonIssues(html) {
    log('\n🔍 Teste 3: Verificando problemas comuns...', 'info');
    
    const issues = [];

    // Verificar se há mensagens de erro visíveis
    if (html.includes('Cannot find module') || html.includes('Module not found')) {
        issues.push('❌ Erro de módulo não encontrado detectado');
    }

    // Verificar se o React está configurado corretamente
    if (!html.includes('type="module"')) {
        issues.push('⚠️ Script não está marcado como type="module"');
    }

    // Verificar importmap
    if (!html.includes('importmap')) {
        issues.push('⚠️ ImportMap não encontrado (pode causar problemas de imports)');
    }

    // Verificar se há referências quebradas
    if (html.includes('404') || html.includes('Not Found')) {
        issues.push('❌ Possíveis referências quebradas (404)');
    }

    if (issues.length === 0) {
        log('  ✅ Nenhum problema comum detectado', 'success');
    } else {
        issues.forEach(issue => log(`  ${issue}`, 'warning'));
    }

    return issues;
}

// Teste 4: Verificar estrutura de arquivos
const fs = require('fs');
const path = require('path');

function checkFiles() {
    log('\n📁 Teste 4: Verificando arquivos essenciais...', 'info');
    
    const files = [
        'src/App.tsx',
        'src/main.tsx',
        'src/index.css',
        'src/context/CartContext.tsx',
        'src/config/stripe.ts',
        'index.html',
        'vite.config.ts',
        'package.json',
    ];

    let allFound = true;

    files.forEach(file => {
        if (fs.existsSync(file)) {
            log(`  ✅ ${file}`, 'success');
        } else {
            log(`  ❌ ${file} NÃO ENCONTRADO`, 'error');
            allFound = false;
        }
    });

    return allFound;
}

// Executar todos os testes
async function runTests() {
    try {
        // Teste 1
        const html = await checkServer();
        
        // Teste 2
        const { passed, failed } = analyzeHTML(html);
        
        // Teste 3
        const issues = checkCommonIssues(html);
        
        // Teste 4
        const filesOk = checkFiles();
        
        // Resumo final
        log('\n╔════════════════════════════════════════════════════════════╗', 'info');
        log('║   RESUMO DOS TESTES                                        ║', 'info');
        log('╚════════════════════════════════════════════════════════════╝', 'info');
        
        if (failed === 0 && issues.length === 0 && filesOk) {
            log('\n✅ TODOS OS TESTES PASSARAM!', 'success');
            log('   A aplicação React deve estar renderizando corretamente.', 'success');
            log('\n💡 Próximos passos:', 'info');
            log('   1. Abra http://localhost:3000 no navegador', 'info');
            log('   2. Pressione F12 para abrir DevTools', 'info');
            log('   3. Verifique a aba Console por erros', 'info');
            log('   4. Verifique a aba Network por requisições falhadas', 'info');
        } else {
            log('\n⚠️ ALGUNS TESTES FALHARAM', 'warning');
            log('   Revise os erros acima e corrija os problemas.', 'warning');
            
            if (failed > 0) {
                log(`\n   - ${failed} verificações de HTML falharam`, 'error');
            }
            if (issues.length > 0) {
                log(`   - ${issues.length} problemas comuns detectados`, 'warning');
            }
            if (!filesOk) {
                log('   - Alguns arquivos essenciais estão faltando', 'error');
            }
        }
        
        log('\n📝 Para mais detalhes, abra test-render.html no navegador.', 'info');
        log('');
        
    } catch (error) {
        log('\n❌ ERRO CRÍTICO:', 'error');
        log(`   ${error.message}`, 'error');
        log('\n💡 Certifique-se de que:', 'info');
        log('   1. O servidor está rodando: npm run dev', 'info');
        log('   2. A porta 3000 está disponível', 'info');
        log('   3. Não há erros no terminal do Vite', 'info');
        log('');
        process.exit(1);
    }
}

// Executar
runTests();


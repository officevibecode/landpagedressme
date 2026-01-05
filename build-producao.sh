#!/bin/bash

echo "============================================"
echo "   BUILD PARA PRODUCAO - DressMe"
echo "============================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERRO] Node.js não encontrado!"
    echo "Instale Node.js e tente novamente."
    exit 1
fi

echo "[1/5] Verificando dependências..."
if [ ! -d "node_modules" ]; then
    echo "[INFO] Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERRO] Falha ao instalar dependências!"
        exit 1
    fi
fi

echo ""
echo "[2/5] Criando arquivo .env.production.local..."
cat > .env.production.local << EOF
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_SEU_PUBLISHABLE_KEY_AQUI
VITE_API_BASE_URL=https://seudominio.com/api
EOF
echo "[AVISO] Edite .env.production.local com suas chaves LIVE!"
echo ""
read -p "Pressione Enter para continuar..."

echo ""
echo "[3/5] Limpando build anterior..."
rm -rf dist/

echo ""
echo "[4/5] Gerando build de produção..."
npm run build
if [ $? -ne 0 ]; then
    echo "[ERRO] Falha ao gerar build!"
    exit 1
fi

echo ""
echo "[5/5] Criando arquivo TAR.GZ para deploy..."
rm -f dressme-deploy.tar.gz

# Criar estrutura temporária
mkdir -p deploy-temp
cp -r dist/* deploy-temp/
cp -r public deploy-temp/
cp -r api deploy-temp/

# Remover arquivos desnecessários
rm -rf deploy-temp/api/vendor
rm -f deploy-temp/api/.env
rm -f deploy-temp/api/.env.local

# Compactar
tar -czf dressme-deploy.tar.gz -C deploy-temp .

# Limpar
rm -rf deploy-temp

echo ""
echo "============================================"
echo "          BUILD CONCLUÍDO!"
echo "============================================"
echo ""
echo "Arquivos gerados:"
echo "  - Pasta dist/ (build otimizado)"
echo "  - dressme-deploy.tar.gz (pronto para upload)"
echo ""
echo "Próximo passo:"
echo "  1. Edite .env.production.local com suas chaves LIVE"
echo "  2. Envie dressme-deploy.tar.gz para o servidor"
echo "  3. Siga o guia: GUIA-DEPLOY-PRODUCAO.md"
echo ""
echo "Deseja visualizar o build localmente? (s/n)"
read -p "> " resposta

if [ "$resposta" = "s" ] || [ "$resposta" = "S" ]; then
    npm run preview
fi


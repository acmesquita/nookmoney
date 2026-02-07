# Plano: Funcionalidade de Edição de Pagamento

## Contexto

- **Modelo** (`Payment`): `id`, `currentMonth`, `category`, `description`, `dueDate`, `amount`, `paid`, `userId`, timestamps.
- **Fluxo atual**: criação em `/payments/new` (remix-forms + Zod + `CreatePayment`); listagem em `/payments` com botão "Edit" que hoje envia POST para `{id}/edit` (rota ainda inexistente).
- **Convenções**: serviços em `app/services/payments/`, rotas em `app/routes/payments/`, páginas em `app/pages/payments/`, testes em `tests/` espelhando `app/`.

---

## Objetivo

Permitir editar um pagamento existente (category, description, dueDate, amount, currentMonth), com acesso apenas ao dono (`userId`), seguindo o padrão já usado em criação e listagem.

---

## Etapas do plano

### 1. Serviço: carregar um pagamento por ID

- **Onde**: `app/services/payments/load.ts` (estender `LoadPayments`) ou novo arquivo, conforme preferência do time.
- **O quê**:
  - Método que recebe `id` e `userId`, retorna um único `Payment` ou `null`.
  - Usar `findFirst` com `where: { id, userId }` para garantir que só o dono acessa.
  - Lançar `InvalidParams` se `id` ou `userId` forem vazios.
- **Testes**: `tests/services/payments/load.test.ts` — adicionar casos para “encontra pagamento por id e userId” e “retorna null quando id não existe ou userId não é dono”.

---

### 2. Serviço: atualizar pagamento

- **Onde**: `app/services/payments/update.ts` (novo).
- **O quê**:
  - Classe `UpdatePayment` (recebe `db` no construtor).
  - `execute({ id, userId, category, description, dueDate, amount, currentMonth })`.
  - Validar presença de `id`, `userId` e demais campos obrigatórios; em falha, lançar `InvalidParams`.
  - `db.payment.update` com `where: { id, userId }` e `data` com os campos editáveis (não alterar `paid` na edição).
  - Retornar o `Payment` atualizado.
- **Testes**: `tests/services/payments/update.test.ts` — criar pagamento, atualizar e checar valores; tentar atualizar com `userId` diferente e esperar falha/not found.

---

### 3. Rota e página de edição

- **Rota**: `app/routes/payments/$paymentId/edit.tsx`.
  - **Loader**:
    - Obter `userId` (ex.: `getUserId(request)`); se não houver, redirecionar para login ou retornar 404.
    - Obter `paymentId` dos `params`.
    - Chamar o serviço de “load one” com `id: paymentId` e `userId`.
    - Se não houver pagamento, retornar 404 (ou redirect `/payments`).
    - Retornar o `Payment` (e, se precisar, `userId`) para a página.
  - **Action**:
    - Usar o mesmo schema Zod da criação (description, category, currentMonth, dueDate, amount), acrescentando `id` e `userId` para a mutation.
    - `formAction` com mutation que chama `UpdatePayment(db).execute(...)`.
    - Em sucesso: redirect para `/payments` (ou para `/payments?month=...` do mês do pagamento).
    - Em erro de validação/domínio: retornar os erros do `formAction`.
- **Página**: `app/pages/payments/edit.tsx` (nova).
  - Receber `payment` (e `schema`/config se vier da rota).
  - Reutilizar a mesma estrutura de campos do formulário de `NewPayment` (category, description, dueDate, amount, currentMonth), com valores iniciais preenchidos a partir de `payment`.
  - Datas e `currentMonth` no formato esperado pelo input (ex.: `YYYY-MM-DD` para date, formato do mês usado em `new`).
  - Botão “Save” submete o form; link “Back” para `/payments` ou para a lista do mês.
- **Estilo**: reutilizar `payments.new.css` (ou um `payments.edit.css` que importe/estenda o mesmo) e declarar em `links()` da rota.

---

### 4. Ajuste na listagem de pagamentos

- **Onde**: `app/pages/payments/index.tsx`.
- **O quê**: O botão “Edit” hoje usa `<form action={\`${payment.id}/edit\`} method="post">`. Para edição, o fluxo típico é GET para exibir o formulário e POST na action da rota de edit.
  - Trocar para um **Link** (GET) para `/payments/${payment.id}/edit` (ou `payment.id + '/edit'` em relação à rota atual), para abrir a tela de edição.
  - Manter o POST apenas no submit do formulário dentro da página de edição.

---

### 5. Testes e validação

- **Serviços**: testes unitários para load-by-id e update (incluindo segurança por `userId`).
- **Rota edit**: teste de loader (com e sem payment, com e sem userId); teste de action (submit válido e inválido).
- **Página**: teste de renderização com payment preenchido e que os valores iniciais aparecem nos campos (opcional, mas recomendado).

---

## Ordem sugerida de implementação

1. Serviço de carregar um pagamento por ID + testes.  
2. Serviço de atualização + testes.  
3. Rota `payments/$paymentId/edit.tsx` (loader + action) e página `payments/edit.tsx`.  
4. Ajuste do botão Edit na listagem (Link GET).  
5. Revisão e testes manuais (incl. usuário não dono não edita).

---

## Resumo de arquivos

| Ação        | Arquivo |
|------------|---------|
| Criar/estender | `app/services/payments/load.ts` (load by id) |
| Criar      | `app/services/payments/update.ts` |
| Criar      | `app/routes/payments/$paymentId/edit.tsx` |
| Criar      | `app/pages/payments/edit.tsx` |
| Alterar    | `app/pages/payments/index.tsx` (Link para edit) |
| Criar      | `tests/services/payments/update.test.ts` |
| Alterar    | `tests/services/payments/load.test.ts` (casos load by id) |
| Opcional   | `tests/routes/payments/edit` ou testes de integração da rota |

---

## Observações

- **Segurança**: Sempre filtrar por `userId` em load e update para que um usuário não edite pagamento de outro.
- **paid**: A edição não deve alterar o campo `paid`; o fluxo “marcar como pago” continua em `/payments/$paymentId/pay`.
- **currentMonth**: Tratar no mesmo formato usado em `new` (ex.: string `MM/YYYY` ou `YYYY-MM-01` no banco) para evitar inconsistências.

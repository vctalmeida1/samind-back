import { hashSenha, compararSenha, gerarToken } from '../utils/token';

async function test() {
  const senha = '123456';
  
  // criar hash
  const hash = await hashSenha(senha);
  console.log('Hash gerado:', hash);

  // comparar senha correta
  const check1 = await compararSenha(senha, hash);
  console.log('Senha correta bate?', check1); // true

  // comparar senha incorreta
  const check2 = await compararSenha('senhaErrada', hash);
  console.log('Senha incorreta bate?', check2); // false

  // gerar token
  const token = gerarToken(1); // id do usuário fictício
  console.log('Token JWT:', token);
}

test();

// resultado esperado
// Hash gerado: $2a$10$...
// Senha correta bate? true
// Senha incorreta bate? false
// Token JWT: eyJhbGciOi...
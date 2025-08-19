import { registrarUsuario, loginUsuario } from '../services/auth.service';

async function test() {
  try {
    console.log('--- Registrando usuário ---');
    const registro = await registrarUsuario({
      nome: 'Victor Almeida',
      email: 'victor@test.com',
      senha: '123456',
    });
    console.log('Registro:', registro);

    console.log('--- Fazendo login ---');
    const login = await loginUsuario({
      email: 'victor@test.com',
      senha: '123456',
    });
    console.log('Login:', login);

    console.log('--- Tentando login com senha errada ---');
    try {
      await loginUsuario({
        email: 'victor@test.com',
        senha: 'senhaErrada',
      });
    } catch (err) {
      console.log('Erro esperado:', (err as Error).message);
    }
  } catch (err) {
    console.error('Erro no teste:', (err as Error).message);
  }
}

test();

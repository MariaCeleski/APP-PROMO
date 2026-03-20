import { z } from 'zod';

// ======================
// LOGIN
// ======================
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email ou CPF é obrigatório'),

  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// ======================
// FUNÇÃO CPF
// ======================
function isValidCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;

  return rest === parseInt(cpf.substring(10, 11));
}

// ======================
// CADASTRO
// ======================
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nome deve ter pelo menos 3 caracteres'),

    email: z
      .string()
      .email('Email inválido'),

    cpf: z
      .string()
      .min(11, 'CPF inválido')
      .refine(isValidCPF, 'CPF inválido'),

    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Deve ter uma letra maiúscula')
      .regex(/[0-9]/, 'Deve ter um número')
      .regex(/[^A-Za-z0-9]/, 'Deve ter um caractere especial'),

    confirmPassword: z
      .string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
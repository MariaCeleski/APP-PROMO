import { useState } from 'react';
import { View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUp } from '../../services/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { registerSchema } from '../../utils/validators';

type FormData = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      await signUp(
        data.email,
        data.password,
        data.name,
        data.cpf
      );

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              reset();
              navigation.navigate('Home');
            },
          },
        ]
      );

    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0F172A' }}>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="Digite seu email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <Input
            label="CPF"
            placeholder="Digite seu CPF"
            value={value}
            onChangeText={onChange}
            error={errors.cpf?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

    </View>
  );
}
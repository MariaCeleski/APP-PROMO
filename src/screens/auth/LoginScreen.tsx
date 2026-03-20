import { View, Alert } from 'react-native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signIn } from '../../services/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { loginSchema } from '../../utils/validators';

type FormData = {
  email: string; // email OU CPF
  password: string;
};

export default function LoginScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      await signIn(data.email, data.password);

      //navigation.navigate('Home');

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
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email ou CPF"
            placeholder="Digite seu email ou CPF"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            autoCapitalize="none"
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

      <Button
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <Button
        title="Criar conta"
        onPress={() => navigation.navigate('Register')}
      />

    </View>
  );
}
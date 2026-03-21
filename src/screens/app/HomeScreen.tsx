import { View, Text, StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from '../../services/auth';
import { getUserProfile } from '../../services/user';
import Button from '../../components/ui/Button';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      if (user?.id) {
        const data = await getUserProfile(user.id);
        setProfile(data);
      }
    }

    loadUser();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bem-vinda!</Text>

      <Text style={styles.subtitle}>
        {profile?.name || 'Carregando...'}
      </Text>

      <Text style={styles.email}>
        {profile?.email}
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Sair"
          onPress={async () => {
            await signOut();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: '#38BDF8',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
});
import React from 'react';
import { Text, View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useAuth } from 'src/_hooks/useAuth';
import { useI18n } from 'src/_hooks/useI18n';
import { Login } from 'src/_lib/_types/authTypes';
import { customValidationCallbacks, isValidPassword } from 'src/_lib/validation';
import TextField from '../_inputs/TextField';
import DefaultButton from '../_buttons/DefaultButton';
import ErrorBanner from '../_banners/ErrorBanner';

// refactor this

const LoginForm: React.FC = () => {
  const { getResource } = useI18n();
  const { styles } = useAppContext();
  const { onLogin } = useAuth();
  const [login, setLogin] = React.useState<Login>({
    email: '',
    password: '',
  });

  const [hasError, setHasError] = React.useState<boolean>(false);

  const handleEmailChanged = React.useCallback(
    (value: string) => {
      setLogin({ ...login, email: value });
    },
    [login]
  );

  const handlePasswordChanged = React.useCallback(
    (value: string) => {
      setLogin({ ...login, password: value });
    },
    [login]
  );

  const handleLogin = React.useCallback(async () => {
    if (!(await onLogin({ email: login.email.toLocaleLowerCase(), password: login.password }))) {
      setHasError(true);
    }
  }, [login, onLogin]);

  const loginDisabled = React.useMemo(() => {
    const disabled = !customValidationCallbacks.isEmail(login.email) || !isValidPassword(login.password) || hasError;

    return disabled;
  }, [login, hasError]);

  return (
    <View style={{ width: '70%', padding: 10, borderRadius: 8, backgroundColor: '#ffffff', elevation: 10 }}>
      <View style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            color: styles.colors.blueAccent[400],
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          {getResource('common:labelLogin')}
        </Text>
      </View>
      <View>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            color: styles.colors.blueAccent[400],
            fontSize: 16,
            fontStyle: 'italic',
            fontWeight: '400',
          }}
        >
          {getResource('common:labelIntoYourAccount')}
        </Text>
      </View>
      <TextField
        sx={{ padding: 2 }}
        placeholder={getResource('common:labelEmail')}
        value={login.email}
        disabled={hasError}
        placeholderColor={styles.colors.blueAccent[400]}
        onChange={handleEmailChanged}
      />
      <TextField
        sx={{ padding: 2 }}
        value={login.password}
        disabled={hasError || !customValidationCallbacks.isEmail(login.email)}
        placeholder={getResource('common:labelPassword')}
        placeholderColor={styles.colors.blueAccent[400]}
        isPassword
        onChange={handlePasswordChanged}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 10,
          paddingTop: 25,
          gap: 10,
        }}
      >
        <DefaultButton
          label={getResource('common:labelLogin')}
          disabled={loginDisabled}
          backgroundColor={styles.colors.blueAccent[500]}
          disabledColor={styles.colors.gray[200]}
          onPress={handleLogin}
        />
      </View>
      {hasError && <ErrorBanner error={getResource('common:labelLoginFailed')} onClose={setHasError} />}
    </View>
  );
};

export default LoginForm;

import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from '@mui/material';
import React from 'react';
import FormInput from 'src/Components/Input/Form/FormInput';
import SaveCancelButtons from 'src/Components/Input/Form/SaveCancelButtons';
import { TValue } from 'src/customTypes';
import { Login } from 'src/form';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { useFormModel } from 'src/Hooks/useFormModel';
import { useI18n } from 'src/Hooks/useI18n';
import { DataTypeEnum } from 'src/Lib/Enums/DataTypeEnum';
import { tokens } from 'src/Lib/theme';
import { emailValidation, passwordValidation } from 'src/Lib/validation';
import { AccountCircleOutlined } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const { login, onLogin } = useAuthentication();
  const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const form = useFormModel<Login, TValue>(login, [
    { key: 'email', required: true, type: DataTypeEnum.Text, validationCallback: emailValidation },
    { key: 'password', required: true, type: DataTypeEnum.Password, validationCallback: passwordValidation },
    { key: 'remember', required: false, type: DataTypeEnum.Boolean },
  ]);

  const handleLogin = React.useCallback(async (): Promise<void> => {
    await onLogin({ email: form.state.email, password: form.state.password, remember: form.state.remember });
  }, [form.state, onLogin]);

  return (
    <Box
      width="100%"
      sx={{ width: '100%' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <List disablePadding sx={{ width: '30%' }}>
        <ListItem style={{ display: 'flex', justifyItems: 'center', flexDirection: 'column' }}>
          <ListItemAvatar
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: 100,
              borderRadius: '50%',
              backgroundColor: colors.gray[100],
            }}
          >
            <AccountCircleOutlined sx={{ height: '100%', width: '100%', color: colors.gray[500] }} />
          </ListItemAvatar>
          <ListItemText style={{ textAlign: 'center' }}>
            <Typography variant="h3" color={colors.gray[600]}>
              {getResource('common:captionLogin')}
            </Typography>
          </ListItemText>
        </ListItem>
        <FormInput
          label={getResource('common:labelEmail')}
          error={getResource('common:errorInvalidEmailAddress')}
          fullWidth
          {...form.formMembers.email}
        />
        <FormInput
          label={getResource('common:labelPassword')}
          error={getResource('common:errorInvalidPassword')}
          fullWidth
          {...form.formMembers.password}
        />
        <FormInput
          label={getResource('common:labelRememberLoginData')}
          error=""
          fullWidth
          {...form.formMembers.remember}
        />
        <SaveCancelButtons
          saveDisabled={!form.formIsValid}
          cancelDisabled={!form.isModified}
          cancelLabel={getResource('common:labelCancel')}
          actionLabel={getResource('common:labelLogin')}
          cancelAction={form.resetForm}
          onAction={handleLogin}
        />
      </List>
    </Box>
  );
};

export default LoginPage;

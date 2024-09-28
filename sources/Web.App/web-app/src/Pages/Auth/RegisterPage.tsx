import { Grid2, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import FormInput from 'src/Components/Input/Form/FormInput';
import SaveCancelButtons from 'src/Components/Input/Form/SaveCancelButtons';
import { TValue } from 'src/customTypes';
import { Registration } from 'src/form';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { useFormModel } from 'src/Hooks/useFormModel';
import { useI18n } from 'src/Hooks/useI18n';
import { DataTypeEnum } from 'src/Lib/Enums/DataTypeEnum';
import { emailValidation, passwordValidation } from 'src/Lib/validation';

const RegisterPage: React.FC = () => {
  const { getResource } = useI18n();
  const { onRegistration } = useAuthentication();
  const form = useFormModel<Registration, TValue>(
    { firstName: '', lastName: '', dateOfBirth: null, email: '', password: '', confirmPassword: '' },
    [
      { key: 'firstName', required: true, type: DataTypeEnum.Text },
      { key: 'lastName', required: true, type: DataTypeEnum.Password },
      { key: 'dateOfBirth', required: true, type: DataTypeEnum.Date },
      { key: 'email', required: true, type: DataTypeEnum.Text, validationCallback: emailValidation },
      { key: 'password', required: true, type: DataTypeEnum.Password, validationCallback: passwordValidation },
      { key: 'confirmPassword', required: true, type: DataTypeEnum.Password, validationCallback: passwordValidation },
    ]
  );

  const handleRegistration = React.useCallback(async () => {
    if (form.state.password === form.state.confirmPassword) {
      await onRegistration({
        firstName: form.state.firstName,
        lastName: form.state.lastName,
        email: form.state.email,
        dateOfBirth: form.state.dateOfBirth,
        password: form.state.password,
      });
    }
  }, [form, onRegistration]);

  return (
    <Grid2
      sx={{ width: '100%', height: '100vh', display: 'flex' }}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <List disablePadding sx={{ width: '30%' }}>
        <ListItem style={{ display: 'flex', justifyItems: 'center', flexDirection: 'column' }}>
          <ListItemAvatar
            style={{ height: 100, width: 100, borderRadius: '50%', backgroundColor: 'red' }}
          ></ListItemAvatar>
          <ListItemText style={{ textAlign: 'center', color: '#3236a8' }}>
            <Typography variant="h6">{getResource('common:captionRegistration')}</Typography>
          </ListItemText>
        </ListItem>
        <FormInput
          label={getResource('common:labelFirstName')}
          error={getResource('common:errorInvalidFirstName')}
          fullWidth
          {...form.formMembers.firstName}
        />
        <FormInput
          label={getResource('common:labelLastName')}
          error={getResource('common:errorInvalidLastName')}
          fullWidth
          {...form.formMembers.lastName}
        />
        <FormInput
          label={getResource('common:labelDateOfBirth')}
          error={getResource('common:errorInvalidDateOfBirth')}
          fullWidth
          {...form.formMembers.dateOfBirth}
        />
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
          label={getResource('common:labelConfirmPassword')}
          error={getResource('common:errorPasswordsDoesNotMatch')}
          fullWidth
          {...form.formMembers.confirmPassword}
        />
        <SaveCancelButtons
          width="100%"
          actionLabel={getResource('common:labelRegister')}
          cancelLabel={getResource('common:labelCancel')}
          cancelDisabled={!form.isModified}
          saveDisabled={!form.formIsValid}
          cancelAction={form.resetForm}
          onAction={handleRegistration}
        />
      </List>
    </Grid2>
  );
};

export default RegisterPage;

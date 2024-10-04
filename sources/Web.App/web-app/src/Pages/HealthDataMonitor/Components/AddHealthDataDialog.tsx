import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import FormInput from 'src/Components/Input/Form/FormInput';
import SaveCancelButtons from 'src/Components/Input/Form/SaveCancelButtons';
import { TValue } from 'src/customTypes';
import { HealthData } from 'src/dataTypes';
import { useFormModel } from 'src/Hooks/useFormModel';
import { useI18n } from 'src/Hooks/useI18n';
import { colors, fontsStyles } from 'src/Lib/colors';
import { DataTypeEnum } from 'src/Lib/Enums/DataTypeEnum';
import { getBmi, toCaption } from 'src/Lib/utils';
import { numberValidation } from 'src/Lib/validation';

interface IProps {
  data: HealthData;
  dialogRef: React.MutableRefObject<HTMLDivElement>;
  open: boolean;
  onSave: (data: HealthData) => Promise<boolean>;
  onClose: () => void;
  refreshLastHealthDataSet: () => Promise<void>;
}

const AddHealthDataDialog: React.FC<IProps> = (props) => {
  const { dialogRef, open, data, onClose, onSave, refreshLastHealthDataSet } = props;
  const { getResource } = useI18n();

  const initialData: HealthData = React.useMemo(() => {
    return {
      date: '',
      height: data.height ?? 0,
      weight: data.weight ?? 0,
      bodyFat: 0,
      muscleMass: 0,
      heartBeat: 0,
      bmi: 0,
    };
  }, [data]);

  const form = useFormModel<HealthData, TValue>(initialData, [
    { key: 'date', required: true, type: DataTypeEnum.Date },
    { key: 'height', required: true, type: DataTypeEnum.Number, validationCallback: numberValidation },
    { key: 'weight', required: true, type: DataTypeEnum.Number, validationCallback: numberValidation },
    { key: 'bodyFat', required: false, type: DataTypeEnum.Number, validationCallback: numberValidation },
    { key: 'muscleMass', required: false, type: DataTypeEnum.Number, validationCallback: numberValidation },
    { key: 'bmi', required: false, type: DataTypeEnum.Number, validationCallback: numberValidation },
    { key: 'heartBeat', required: false, type: DataTypeEnum.Number, validationCallback: numberValidation },
  ]);

  React.useEffect(() => {
    if (form.state.height && form.state.weight) {
      const bmi = getBmi(form.state.height, form.state.weight);

      form.formMembers.bmi.updateFunction(bmi.toFixed(1));
    }
  }, [form]);

  const onCancel = React.useCallback(() => {
    onClose();
    form.resetForm();
  }, [form, onClose]);

  const handleSave = React.useCallback(async () => {
    if (await onSave(form.state)) {
      await refreshLastHealthDataSet().then(() => {
        onClose();
      });
    }
  }, [form, onSave, onClose, refreshLastHealthDataSet]);

  return (
    <Dialog ref={dialogRef} open={open}>
      <DialogTitle>
        <Typography
          sx={{
            color: colors.text.dialogCaption,
            fontStyle: fontsStyles.normal,
            fontFamily: fontsStyles.family.primary,
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          {toCaption(getResource('common:captionAddNewHealthData'))}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid2 container padding={2} size={12}>
          <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelDate')}
              error={getResource('common:errorDateMustBeSet')}
              maxDate={moment().endOf('day')}
              fullWidth
              {...form.formMembers.date}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelHeight')}
              error={getResource('common:errorNotNumber')}
              fullWidth
              {...form.formMembers.height}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelWeight')}
              error={getResource('common:errorNotNumber')}
              fullWidth
              {...form.formMembers.weight}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelBodyFat')}
              error={getResource('common:errorNotNumber')}
              fullWidth
              {...form.formMembers.bodyFat}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelMuscleMass')}
              error={getResource('common:errorNotNumber')}
              fullWidth
              {...form.formMembers.muscleMass}
            />
          </Grid2>
          <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelBodyMassIndex')}
              error={getResource('common:errorNotNumber')}
              fullWidth
              disabled
              {...form.formMembers.bmi}
            />
          </Grid2>
          <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormInput
              label={getResource('common:labelHeartBeat')}
              error={getResource('common:errorNotNumber')}
              fullWidth
              {...form.formMembers.heartBeat}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <Divider />
      <DialogActions>
        <SaveCancelButtons
          actionLabel={getResource('common:labelSave')}
          onAction={handleSave}
          cancelLabel={getResource('common:labelCancel')}
          cancelAction={onCancel}
          cancelDisabled={false}
          saveDisabled={!form.formIsValid}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddHealthDataDialog;

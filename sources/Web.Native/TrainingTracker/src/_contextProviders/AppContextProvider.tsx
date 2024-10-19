import React, { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { FontSizeEnum } from 'src/_lib/_enums/FontSizeEnum';
import { AppContextModel } from 'src/_lib/_types/contextTypes';
import { ContextStyles } from 'src/_lib/styles';
import { colorTokens } from 'src/_lib/theme';

const _transparent = 'transparent';
export const AppContext = React.createContext<AppContextModel>({} as AppContextModel);

interface IProps extends PropsWithChildren {}

const AppContextProvider: React.FC<IProps> = (props) => {
  const { children } = props;
  const scheme = useColorScheme();
  const colors = colorTokens(scheme);

  const contextStyles: ContextStyles = {
    containerStyles: {
      pageContainerStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.gray[600],
        display: 'flex',
        paddingTop: 50,
        padding: 10,
      },
      formStyle: {
        display: 'flex',
        padding: 0,
        borderRadius: 8,
        backgroundColor: colors.gray[700],
        elevation: 0,
      },
      flexContainerStyle: {
        width: '100%',
        flex: 4,
        backgroundColor: _transparent,
      },
      gridRow: {
        gap: 10,
        flexDirection: 'row',
      },
    },
    inputStyles: {
      formItemContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 1,
        margin: 0,
        backgroundColor: _transparent,
      },
      formInputField: {
        fontSize: FontSizeEnum.Medium,
        color: colors.gray[400],
        borderRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        padding: 2,
        borderColor: colors.chartColors.green,
        backgroundColor: _transparent,
      },
      placeholderStyle: {
        color: colors.blueAccent[100],
        paddingLeft: 5,
        fontSize: FontSizeEnum.Small,
        paddingBottom: 4,
      },
      saveCancelButton: {
        borderWidth: 1,
        borderColor: colors.gray[200],
        borderRadius: 4,
        padding: 5,
      },
      saveCancelButtonLabel: {
        color: colors.gray[200],
        fontSize: FontSizeEnum.Medium,
      },
    },
    labelStyles: {
      formHeaderContainer: {
        padding: 10,
      },
      formHeader: {
        color: colors.gray[200],
        fontSize: FontSizeEnum.Large,
        fontStyle: 'italic',
        fontWeight: '600',
        textAlign: 'auto',
        marginBottom: 5,
        marginTop: 5,
      },
    },
    colors: colors,
  };

  const model: AppContextModel = {
    styles: contextStyles,
  };

  return <AppContext.Provider value={model}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

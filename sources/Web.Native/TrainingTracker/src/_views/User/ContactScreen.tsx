import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import ContactFormInitializationContainer from './Components/ContactScreenContainer';

const ContactScreen: React.FC = () => {
  const { styles } = useAppContext();

  return (
    <View style={[styles.containerStyles.pageContainerStyle, { padding: 0, height: '100%', borderRadius: 0 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 60}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ContactFormInitializationContainer />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ContactScreen;

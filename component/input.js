import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CurrencyPicker from "../component/currencies";

const CurrencyInput = ({isOutput, value,  onValueChange, currency, onCurrencyChange}) => {
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value ? value.toString() : '');
  }, [value])
  console.log("CurrencyInput called of type ouput:", isOutput, "value: ", value)
  
  // console.log("getCurrency:", getCurrency)


  function onChangeInput (text){
    // console.error("onChangeInput called with text:", text);
    if (!isOutput)
    {
     onValueChange(text);
     console.log("Output input")
    }
    setText(text)
   
  }
  return (
  <View style = {styles.container}>
    <TextInput
          style={styles.input}
          onChangeText={(text) => {onChangeInput(text)}} 
          value={text}
          editable={!isOutput}
          keyboardType='numeric'
          placeholder={isOutput ? 'Converted value' : 'Enter amount'}
          />
    <CurrencyPicker onSelectCurrency={onCurrencyChange} currency={currency} />
  </View>
  )
 
   
};

const styles = StyleSheet.create({
  container:{
    border:1,
    borderColor: "blue"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
});

export default CurrencyInput;
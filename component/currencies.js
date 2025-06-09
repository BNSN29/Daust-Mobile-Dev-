import React from 'react';

import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from 'react-native';

let currencies = ["USD", "EUR", "GBP", "JPY", "XOF"]
 
const Currency = ({currency, onSelectCurrency}) => {
    // console.log("currency called")
    console.log("currency", currency)

    function handlePickerChange(value){
        console.log("handlePickerChange called with value:", value);
        if (onSelectCurrency) {
            onSelectCurrency(value);
        }
    }
    return (
          <Picker
          selectedValue={currency.toUpperCase()}
          style={styles.picker}
          mode="dropdown"
          onValueChange={(currencyPicked) => handlePickerChange(currencyPicked)}
          >
            {currencies.map((cur, idx) =>
                <Picker.Item key ={idx} label={cur} value={cur.toUpperCase()} />
              )}
                
            {/* {console.log("currency pick", Enable)} */}
              {console.log("within picker: ", currency.toUpperCase())}
          </Picker>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red"
    },

    picker: {
        height: 50,
        width: 250,
      backgroundColor: "blue"

    }
  });

export default Currency;
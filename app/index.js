import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import CurrencyInput from "../component/input";

function getCurrencyFactors(inputCurrency){
  return(
    fetch("https://api.exchangerate-api.com/v4/latest/" + inputCurrency)
    .then(response => response.json())
    .then(data => {
      console.log("Currency factors fetched:", data);
      return data.rates;
    })
    .catch(error => {
      console.error("Error fetching currency factors:", error);
      return {};
    })
  )

  // const dummyfactors = {
  //   "XOF": 1,
  //   "GBP": 1.79,
  //   "EUR": 917.51,
  //   "USD": 10.25,
  //   "JPY": 1.54,
  //   // Add more currencies and their factors as needed
  // };
  // return dummyfactors
}

function getOutputValue(amnt, inputCurrency, outPutCurrency, factors = {}) {
  /**
   * From the api, the value output currency presented is the value of 1 unit of the input currency
   * for example, if the input currency is XOF and the output AMD":383.95,"ANG":1.79,"AOA":917.51,"ARS":1190,"AUD":1.54,"AWG":1.79,"AZN":1.7,"BAM":1.72,"BBD":2,"BDT":122.15,"BGN":1.72,"BHD":0.376,"BIF":2976.18,"BMD":1,"BND":1.29,"BOB":6.93,"BRL":5.6,"BSD":1,"BTN":85.81,"BWP":13.4,"BYN":3.27
   */

  if (amnt === 0) return 0;
  if (inputCurrency === outPutCurrency) return amnt;
  if (!factors[inputCurrency] || !factors[outPutCurrency]) return 0;
  const factor = factors[outPutCurrency]
  console.log("Input Currency:", inputCurrency, "Output Currency:", outPutCurrency, "Factor:", factor);

  return amnt * factor;
  
}


export default function Index() {
  
  console.log("Index Component Called")
  const [inputAmnt, setInputAmnt] = useState(0)
  const [outputAmnt, setOutputAmnt] = useState(0)
  
  const [inputCurrency, setInputCurrency] = useState("XOF")
  const [outPutCurrency, setOutputCurrency] = useState("JPY")
  const [factors, setFactores] = useState(getCurrencyFactors(inputCurrency))
  const [isLoading, setIsloading] = useState(false)
  // const [fetchedFactors, setFetchedFactors] = useState({});

  useEffect(() => {
    console.log("useEffect called with inputCurrency:", inputCurrency, "outPutCurrency:", outPutCurrency);
    setIsloading(true);
    getCurrencyFactors(inputCurrency)
      .then(factors => {
        setFactores(factors)
        // console.log("Fetched factors:", factors);
        const result = getOutputValue(inputAmnt, inputCurrency, outPutCurrency, factors);
        setOutputAmnt(result);
        setIsloading(false);
    }).catch(error => {
      console.error("Error fetching currency factors:", error);
      setIsloading(false);
    });
  }, [inputCurrency, outPutCurrency])


  
  const handleInputChange = (value) => {
    console.log("previous input value:", inputAmnt)
    console.log("previous output value:", outputAmnt)
    console.log("Input value changed:", value);
    const result = getOutputValue(value, inputCurrency, outPutCurrency, factors);
    console.log("Output value:", result);
    
    setInputAmnt(value);
    setOutputAmnt(result);
    
  }
  const handleOutputChange = ()=>{}
  
  const handleCurrencyChange = (currency, isOutput = true) =>{

    if (isOutput) {
      setOutputCurrency(currency);
      const result = getOutputValue(inputAmnt, inputCurrency, currency, factors);
      setOutputAmnt(result);

    } else {
      setInputCurrency(currency);
      const result = getOutputValue(inputAmnt, currency, outPutCurrency, factors);
      setOutputAmnt(result); 
    } 
    console.log("Currency changed:", currency, "Is output:", isOutput);
  }
  

    return (
    <View style={styles.container}>

     <CurrencyInput currency = {inputCurrency} isOutput={false} onValueChange={(value) => handleInputChange(value)}
     onCurrencyChange = {(currency) => handleCurrencyChange(currency, false)}
     />

     <CurrencyInput currency = {outPutCurrency} isOutput={true} value = {outputAmnt} onValueChange={handleOutputChange}
      onCurrencyChange = {(currency) => handleCurrencyChange(currency, true)}
     />
     {
      isLoading ?
      <ActivityIndicator
        size="large"
        color="red"
        animating={isLoading}
        style={{ marginTop: 20 }}
      />:
      <TouchableOpacity></TouchableOpacity>
    }

      {/* {console.log("================")} */}
    </View>
  );

 
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "flex-start"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

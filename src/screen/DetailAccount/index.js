import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile } from '../../redux/actions/User'

function DetailAccount(props) {
  console.log(props, '78')
  const { data } = useSelector((s) => s.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProfile())
  }, [dispatch])

  console.log(data, '89')
  return (
    <ScrollView>
      <View style={styles.wrapperTotalPayment}>
        <Text style={styles.textTax}>Total Payment</Text>
        <Text style={styles.tax}>$ {props.route.params.result.data.total_payment}</Text>
      </View>
      <View style={styles.wrapperPaymentMethod}>
        <Text style={styles.textPayment}>Payment Method</Text>
        <View style={styles.wrapperCardPaymentMethod} >

          <Text>ghjk</Text><Text>ghjk</Text><Text>ghjk</Text><Text>ghjk</Text><Text>ghjk</Text><Text>ghjk</Text>
        </View>
      </View>
      <View style={styles.wrapperProfile}>
        <Text style={styles.textProfile}>Personal Info</Text>
        <View style={styles.wrapperCardProfile} >
          <Text style={styles.wrapperCardProfileLabel}>Full Name</Text>
          <Text style={styles.wrapperCardProfileText}>{`${data[0].first_name} ${data[0].last_name}`}</Text>
          <Text style={styles.wrapperCardProfileLabel}>Email</Text>
          <Text style={styles.wrapperCardProfileText}>{data[0].email}</Text>
          <Text style={styles.wrapperCardProfileLabel}>Phone Number</Text>
          <Text style={styles.wrapperCardProfileText}>{data[0].phone_number}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonPayment} activeOpacity={1}>
        <Text style={styles.textButtonPayment} >Pay Your Order</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  wrapperTotalPayment: {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '6%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTax: {
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
  },
  tax: {
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
    color: 'black'
  },
  wrapperPaymentMethod: {
    marginHorizontal: '5%',
    marginVertical: '8%',
  },
  textPayment: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    marginVertical: '5%'
  },
  wrapperCardPaymentMethod: {
    backgroundColor: 'white',
    padding: '7%',
    borderRadius: 20
  },
  wrapperProfile: {
    marginHorizontal: '5%',
    marginVertical: '4%',
  },
  textProfile: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    marginVertical: '5%'
  },
  wrapperCardProfile: {
    backgroundColor: 'white',
    padding: '7%',
    borderRadius: 20
  },
  wrapperCardProfileLabel: {
    marginVertical: '5%',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
  },
  wrapperCardProfileText: {
    marginVertical: '2%',
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
    color: 'black',
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 10,
    padding: '4%',
  },
  buttonPayment: {
    backgroundColor: '#5F2EEA',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#5F2EEA',
    borderRadius: 15,
    paddingVertical: '3%',
    margin: '5%'
  },
  textButtonPayment: {
    textAlign: 'center',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    color: 'white'
  }
})

export default DetailAccount
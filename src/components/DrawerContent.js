import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLogout } from '../redux/actions/Auth'
import { GetProfile } from '../redux/actions/User';


const DrawerContent = (props) => {
  const { data } = useSelector((s) => s.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProfile())
  }, [dispatch])
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.containerProfile}>
          <View style={styles.avatar} >
            {data[0]?.photo === null && <Image source={require('../assets/image/Profile-default.png')} style={styles.profileDefault} />
            }
          </View>
          <View style={styles.biodata}>
            <Text style={styles.title}>{`${data[0]?.first_name} ${data[0]?.last_name}`}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <DrawerItemList {...props} />

      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem label="Logout" icon={({ size }) => (
          <Icon size={size} name='log-out' />
        )}
          onPress={() => {
            dispatch(AuthLogout())
          }}
        />

      </View>
    </View>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    margin: 10,
    paddingVertical: '5%',
    paddingHorizontal: '2%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileDefault: {
    width: 100,
    height: 100,
    borderRadius: 80,
    marginBottom: '5%',
  },
  line: {
    borderColor: '#dedede',
    borderWidth: 1,
    marginBottom: '5%',
  },
  biodata: {
    marginLeft: 15,
  },
  title: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 18,
    marginBottom: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
});

export default DrawerContent;
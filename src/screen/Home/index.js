import React, { useEffect } from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleNow, ScheduleUpcoming } from '../../redux/actions/Schedule'
import messaging from '@react-native-firebase/messaging';

function Home({ props, navigation }) {
  let { data, loading } = useSelector((s) => s.schedule)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(ScheduleNow())
  }, [dispatch])
  const handleDetail = (movie_id) => {
    navigation.navigate('DetailMovie', { movie_id })
  };
  const listMonth = ['September', 'October', 'November', 'December', 'December', 'February', 'March', 'April', 'May', 'June', 'July', 'Agust']
  // useEffect(() => {
  //   dispatch(ScheduleUpcoming())
  // }, [dispatch])
  return (
    <ScrollView style={styles.container}>
      <View >
        <Text style={styles.font1}>
          Nearest Cinema, Newest Movie,
        </Text>
        <Text style={styles.font2}>Find out now!</Text>
      </View>
      <Image source={require('../../assets/image/Group14.png')} style={styles.logo} />
      <View style={styles.wrapper}>
        <View style={styles.wrapperText}>
          <Text style={styles.wrapperHeader}>Now Showing</Text>
          <Text style={styles.all}>View All</Text>
        </View>
        {loading ? <ActivityIndicator size="large" color="#5F2EEA" style={{ margin: '5%' }} /> :
          <ScrollView horizontal style={styles.wrapperScrollCard}
            showsHorizontalScrollIndicator={false} >
            {data?.result?.map((movie) => {
              return (
                <View style={styles.wrapperCard} key={movie.id}>
                  <View >
                    <Image crossOrigin="anonymous" source={{ uri: `https://deploy-tickitz-be.herokuapp.com/static/upload/movie/${movie.cover}` }} style={styles.film} />
                  </View>
                  <View>
                    <Text style={styles.name}>{movie.title}</Text>
                    <Text style={styles.genre}>{movie.categories}</Text>
                  </View>
                  <Pressable style={styles.buttonDetail} onPress={() => handleDetail(movie.movie_id)}>
                    <Text style={styles.buttonTextDetail}>DETAILS</Text>
                  </Pressable>
                </View >
              )
            })}


            {/* </View > */}
          </ScrollView>
        }
      </View >
      <View style={styles.wrapperContainerUpcoming}>
        <View style={styles.upcoming}>
          <Text style={styles.wrapperHeader}>Upcoming Movies</Text>
          <Text style={styles.all}>View All</Text>
        </View>
        <ScrollView horizontal={true} style={styles.month} showsHorizontalScrollIndicator={false}>
          {listMonth.map((month, index) => {
            return (
              <Pressable style={styles.buttonMonth} onPress={handleDetail} key={index}>
                <Text style={styles.buttonTextMonth}>{month}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
        {loading ? <ActivityIndicator size="large" color="#5F2EEA" style={{ margin: '5%' }} /> :
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.result?.map((movie, index) => {
              return (
                <View style={styles.wrapperCardUpcoming} key={index}>
                  <View >
                    <Image source={require('../../assets/image/Photo.png')} style={styles.film} />
                  </View>
                  <Text style={styles.name}>{movie.title}</Text>
                  <Text style={styles.genre}>Action, Adventure,
                    Sci-Fi</Text>
                  <Pressable style={styles.buttonDetail} onPress={handleDetail}>
                    <Text style={styles.buttonTextDetail}>DETAILS</Text>
                  </Pressable>
                </View >
              )
            })}

          </ScrollView>
        }
      </View>
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 12,
  },
  font1: {
    fontFamily: 'Mulish-Regular',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 30,

  },
  font2: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 50,
    color: '#5F2EEA',
    letterSpacing: 2,
    marginLeft: 20,
  },

  logo: {
    width: 380,
    height: 420,
    margin: '5%',
  },
  wrapper: {
    backgroundColor: '#D6D8E7',
    padding: 20,

  },
  wrapperText: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperContainerUpcoming: {
    padding: 20,

  },
  upcoming: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapperHeader: {
    fontFamily: 'Mulish-Regular',
    color: '#5F2EEA',
    fontSize: 20,
  },
  all: {
    fontFamily: 'Mulish-Regular',
    color: '#5F2EEA',
    fontSize: 16,
  },
  wrapperScrollCard: {
    height: 400,
    // width: 2000,
    padding: 10,
  },
  month: {
    flex: 1,
    margin: 15,
    flexDirection: 'row',

  },
  stylingMonth: {
    width: 100,
    margin: 15,
    padding: 20,
    borderRadius: 8,
    justifyContent: 'space-between'

  },
  // Card
  containerCard: {
    margin: 15,

  },

  wrapperCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    width: 200,
    justifyContent: 'space-between'
  },
  wrapperCardUpcoming: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    width: 200,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#dedede'
  },
  film: {
    margin: 15,
    borderRadius: 9,
  },
  name: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Mulish-ExtraBold',

  },
  genre: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Mulish-Regular',

  },
  buttonDetail: {
    backgroundColor: '#5F2EEA',
    padding: 8,
    borderRadius: 4,
    elevation: 3,

  },
  buttonTextDetail: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Mulish-Regular',

  },
  buttonMonth: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#5F2EEA',
    margin: 10,
  },
  buttonTextMonth: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    fontFamily: 'Mulish-ExtraBold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

export default Home;



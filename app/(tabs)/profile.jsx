import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Link href={"/okay"}>pkay page</Link>
    </View>
  )
}

export default Profile
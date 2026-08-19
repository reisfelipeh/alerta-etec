import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

type Props = {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export default function Choicechip({ label, selected, onPress}: Props) {
 return (
    <View>
      <Text>Choicechip</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
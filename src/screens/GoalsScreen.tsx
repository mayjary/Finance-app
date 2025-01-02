import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Alert,
  Modal
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addGoal, updateGoal, deleteGoal } from '../redux/financesSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';

type GoalsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Goals'>;

type Props = {
  navigation: GoalsScreenNavigationProp;
};

const GoalsScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.finances.goals);

  const handleAddGoal = () => {
    if (name && targetAmount) {
      if (editingId) {
        dispatch(updateGoal({
          id: editingId,
          currentAmount: parseFloat(targetAmount),
        }));
        setEditingId(null);
      } else {
        dispatch(addGoal({
          id: Date.now().toString(),
          name,
          targetAmount: parseFloat(targetAmount),
          currentAmount: 0,
          deadline: deadline.toISOString(),
        }));
      }
      setName('');
      setTargetAmount('');
      setDeadline(new Date());
    }
  };

  const handleUpdateGoal = (id: string, currentAmount: number) => {
    dispatch(updateGoal({ id, currentAmount }));
  };

  const handleDeleteGoal = (id: string) => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(deleteGoal(id)) }
      ]
    );
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Financial Goals</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Goal Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Target Amount"
          value={targetAmount}
          onChangeText={setTargetAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>
            Set Deadline: {deadline.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <Text style={styles.buttonText}>{editingId ? 'Update Goal' : 'Add Goal'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalName}>{item.name}</Text>
            <Text style={styles.goalAmount}>
              ${item.currentAmount.toFixed(2)} / ${item.targetAmount.toFixed(2)}
            </Text>
            <Text style={styles.goalDeadline}>
              Deadline: {new Date(item.deadline).toLocaleDateString()}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(item.currentAmount / item.targetAmount) * 100}%` }
                ]} 
              />
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.updateButton} 
                onPress={() => handleUpdateGoal(item.id, item.currentAmount + 100)}
              >
                <Text style={styles.updateButtonText}>Add $100</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDeleteGoal(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={deadline}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8e1ff', // Light pink-purplish background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20, // More curved border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20, // More curved border radius
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20, // More curved border radius
    marginBottom: 10,
  },
  dateButtonText: {
    textAlign: 'center',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 25, // 50% border radius for circular appearance
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 20, // More curved border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  goalAmount: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  goalDeadline: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  updateButton: {
    color: '#2196F3',
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 15, // More curved border radius
  },
  updateButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#F44336',
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 15, // More curved border radius
  },
  deleteButtonText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default GoalsScreen;


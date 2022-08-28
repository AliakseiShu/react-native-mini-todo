import React, {useState} from 'react';
import {
	FlatList,
	ListRenderItem,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

type TasksType = {
	key: string,
	title: string,
	isDone: boolean,
}
const Main = () => {
	const [tasks, setTasks] = useState<TasksType[]>([
		{
			key: "1",
			title: 'HTML',
			isDone: true
		},
		{
			key: "2",
			title: 'REACT',
			isDone: false
		},
		{
			key: "3",
			title: 'REACT NATIVE',
			isDone: false
		}
	])
	const [title, setTitle] = useState('')
	const render: ListRenderItem<TasksType> = ({item}) => {
		return <View>
			<TouchableOpacity style={[styles.item, {opacity: item.isDone ? 0.2 : 1}]}
												onLongPress={() => removeTask(item.key)}
												onPress={() => updateTask(item.key)}>
				<>
					<Text style={[styles.title, {
						textDecorationLine: item.isDone ? 'line-through' : "none",
						textDecorationStyle: 'double'
					}]}>{item.title}</Text>
					<Text>{item.isDone ? 'true' : 'false'}</Text>
				</>
			</TouchableOpacity>
		</View>
	}

	let addTask = () => {
		const newTask: TasksType = {
			key: `${title}${tasks.length + 1}`,
			title,
			isDone: false
		}
		setTasks([newTask, ...tasks])
		setTitle('')
	};
	const removeTask = (key: string) => {
		setTasks(tasks.filter(el => el.key !== key))
	}
	const updateTask = (key: string) => {
		setTasks(tasks.map(el => el.key === key ? {...el, isDone: !el.isDone} : el))
	}

	return (
		<View>
			<View style={styles.header}>
				<TextInput value={title} onChangeText={setTitle} style={styles.input}/>
				<TouchableOpacity>
					<Text onPress={addTask}>
						ADD
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={tasks}
				renderItem={render}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: '#7aa4ca',
		paddingVertical: 5,
		marginVertical: 5,
		borderWidth: 1,
		borderRadius: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		letterSpacing: 3
	},
	input: {
		width: 200,
		height: 30,
		borderWidth: 1,
		backgroundColor: '#9be993',
		borderRadius: 5
	},
	header: {
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'center',
		marginBottom: 15,
	}
})

export default Main;
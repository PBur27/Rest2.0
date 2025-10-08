import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import CustomText from './CustomText'


export default function AddEntryModal({ isVisible, onClose }) {

    const exercises = [
        { id: '1', name: 'Push Ups' },
        { id: '2', name: 'Squats' },
        { id: '3', name: 'Burpees' },
        { id: '4', name: 'Plank' },
        { id: '5', name: 'Jumping Jacks' },
        { id: '6', name: 'Lunges' },
        { id: '7', name: 'Crunches' },
        { id: '8', name: 'Mountain Climbers' },
        { id: '9', name: 'Pull Ups' },
        { id: '10', name: 'Chin Ups' },
        { id: '11', name: 'Bench Press' },
        { id: '12', name: 'Deadlift' },
        { id: '13', name: 'Bicep Curls' },
        { id: '14', name: 'Tricep Dips' },
        { id: '15', name: 'Leg Press' },
        { id: '16', name: 'Calf Raises' },
        { id: '17', name: 'Russian Twists' },
        { id: '18', name: 'High Knees' },
        { id: '19', name: 'Butt Kicks' },
        { id: '20', name: 'Side Plank' },
        { id: '21', name: 'Flutter Kicks' },
        { id: '22', name: 'V-Ups' },
        { id: '23', name: 'Jump Rope' },
        { id: '24', name: 'Step Ups' },
        { id: '25', name: 'Hip Thrusts' },
        { id: '26', name: 'Wall Sit' },
        { id: '27', name: 'Incline Push Ups' },
        { id: '28', name: 'Decline Push Ups' },
        { id: '29', name: 'Diamond Push Ups' },
        { id: '30', name: 'Wide Push Ups' },
        { id: '31', name: 'Reverse Crunch' },
        { id: '32', name: 'Superman' },
        { id: '33', name: 'Bicycle Crunches' },
        { id: '34', name: 'Side Lunges' },
        { id: '35', name: 'Sumo Squats' },
        { id: '36', name: 'Goblet Squats' },
        { id: '37', name: 'Front Squats' },
        { id: '38', name: 'Back Squats' },
        { id: '39', name: 'Hack Squats' },
        { id: '40', name: 'Overhead Press' },
        { id: '41', name: 'Arnold Press' },
        { id: '42', name: 'Lateral Raises' },
        { id: '43', name: 'Front Raises' },
        { id: '44', name: 'Rear Delt Fly' },
        { id: '45', name: 'Barbell Row' },
        { id: '46', name: 'T-Bar Row' },
        { id: '47', name: 'Dumbbell Row' },
        { id: '48', name: 'Inverted Row' },
        { id: '49', name: 'Face Pulls' },
        { id: '50', name: 'Cable Crossover' },
        { id: '51', name: 'Chest Fly' },
        { id: '52', name: 'Incline Bench Press' },
        { id: '53', name: 'Decline Bench Press' },
        { id: '54', name: 'Cable Curl' },
        { id: '55', name: 'Hammer Curl' },
        { id: '56', name: 'Concentration Curl' },
        { id: '57', name: 'Preacher Curl' },
        { id: '58', name: 'Skull Crusher' },
        { id: '59', name: 'Overhead Tricep Extension' },
        { id: '60', name: 'Kickbacks' },
        { id: '61', name: 'Tricep Pushdown' },
        { id: '62', name: 'Cable Lateral Raise' },
        { id: '63', name: 'Front Cable Raise' },
        { id: '64', name: 'Chest Dip' },
        { id: '65', name: 'Pull Down' },
        { id: '66', name: 'Seated Row' },
        { id: '67', name: 'Good Morning' },
        { id: '68', name: 'Romanian Deadlift' },
        { id: '69', name: 'Sumo Deadlift' },
        { id: '70', name: 'Hip Abduction' },
        { id: '71', name: 'Hip Adduction' },
        { id: '72', name: 'Leg Curl' },
        { id: '73', name: 'Leg Extension' },
        { id: '74', name: 'Jump Squats' },
        { id: '75', name: 'Box Jumps' },
        { id: '76', name: 'Power Clean' },
        { id: '77', name: 'Snatch' },
        { id: '78', name: 'Clean and Jerk' },
        { id: '79', name: 'Kettlebell Swing' },
        { id: '80', name: 'Farmer’s Carry' },
        { id: '81', name: 'Battle Ropes' },
        { id: '82', name: 'Sled Push' },
        { id: '83', name: 'Sled Pull' },
        { id: '84', name: 'Tire Flip' },
        { id: '85', name: 'Bear Crawl' },
        { id: '86', name: 'Crab Walk' },
        { id: '87', name: 'Windmill' },
        { id: '88', name: 'Turkish Get Up' },
        { id: '89', name: 'Wall Ball' },
        { id: '90', name: 'Medicine Ball Slam' },
        { id: '91', name: 'Sprints' },
        { id: '92', name: 'Jogging' },
        { id: '93', name: 'Cycling' },
        { id: '94', name: 'Rowing' },
        { id: '95', name: 'Swimming' },
        { id: '96', name: 'Jump Rope Double Unders' },
        { id: '97', name: 'Shadow Boxing' },
        { id: '98', name: 'Punching Bag' },
        { id: '99', name: 'Speed Bag' },
        { id: '100', name: 'Elliptical' },
        { id: '101', name: 'Treadmill Run' },
        { id: '102', name: 'Stair Climber' },
        { id: '103', name: 'Row Machine' },
        { id: '104', name: 'Assault Bike' },
        { id: '105', name: 'Pilates Roll Up' },
        { id: '106', name: 'Yoga Sun Salutation' },
        { id: '107', name: 'Downward Dog' },
        { id: '108', name: 'Cobra Pose' },
        { id: '109', name: 'Bridge Pose' },
        { id: '110', name: 'Child’s Pose' },
        { id: '111', name: 'Cat Cow Stretch' },
        { id: '112', name: 'Seated Twist' },
        { id: '113', name: 'Side Stretch' },
        { id: '114', name: 'Forward Fold' },
        { id: '115', name: 'Standing Twist' },
        { id: '116', name: 'Hip Opener' },
        { id: '117', name: 'Hamstring Stretch' },
        { id: '118', name: 'Quad Stretch' },
        { id: '119', name: 'Shoulder Stretch' },
        { id: '120', name: 'Chest Stretch' },
        { id: '121', name: 'Neck Rotation' },
        { id: '122', name: 'Arm Circles' },
        { id: '123', name: 'Knee Tucks' },
        { id: '124', name: 'Toe Touch' },
        { id: '125', name: 'Side Bends' },
        { id: '126', name: 'Bear Plank' },
        { id: '127', name: 'Reverse Lunge' },
        { id: '128', name: 'Curtsy Lunge' },
        { id: '129', name: 'Pistol Squat' },
        { id: '130', name: 'Handstand Hold' },
        { id: '131', name: 'Handstand Push Up' },
        { id: '132', name: 'Wall Walk' },
        { id: '133', name: 'Planche Lean' },
        { id: '134', name: 'Tuck Planche' },
        { id: '135', name: 'Muscle Up' },
        { id: '136', name: 'Front Lever' },
        { id: '137', name: 'Back Lever' },
        { id: '138', name: 'Human Flag' },
        { id: '139', name: 'Dragon Flag' },
        { id: '140', name: 'Hollow Hold' },
        { id: '141', name: 'Arch Hold' },
        { id: '142', name: 'L-Sit' },
        { id: '143', name: 'V-Sit' },
        { id: '144', name: 'Body Row' },
        { id: '145', name: 'Inchworm' },
        { id: '146', name: 'Bear Shoulder Tap' },
        { id: '147', name: 'Commandos' },
        { id: '148', name: 'Plank Jacks' },
        { id: '149', name: 'Side Kick' },
        { id: '150', name: 'Donkey Kicks' },
        { id: '151', name: 'Fire Hydrant' },
        { id: '152', name: 'Leg Circles' },
        { id: '153', name: 'Wall Push Up' },
        { id: '154', name: 'Seated Leg Lift' },
        { id: '155', name: 'Bird Dog' },
        { id: '156', name: 'Glute Bridge' },
        { id: '157', name: 'Bridge March' },
        { id: '158', name: 'Plank Reach' },
        { id: '159', name: 'Shoulder Tap Push Up' },
        { id: '160', name: 'Chest Press' },
        { id: '161', name: 'Incline Row' },
        { id: '162', name: 'Chest Supported Row' },
        { id: '163', name: 'Cable Row' },
        { id: '164', name: 'Machine Fly' },
        { id: '165', name: 'Machine Chest Press' },
        { id: '166', name: 'Cable Kickback' },
        { id: '167', name: 'Machine Shoulder Press' },
        { id: '168', name: 'Upright Row' },
        { id: '169', name: 'Cable Upright Row' },
        { id: '170', name: 'Reverse Fly' },
        { id: '171', name: 'Bent Over Fly' },
        { id: '172', name: 'Kettlebell Clean' },
        { id: '173', name: 'Kettlebell Snatch' },
        { id: '174', name: 'Kettlebell Deadlift' },
        { id: '175', name: 'Kettlebell Lunge' },
        { id: '176', name: 'Kettlebell Press' },
        { id: '177', name: 'Kettlebell Squat' },
        { id: '178', name: 'Kettlebell Halo' },
        { id: '179', name: 'Kettlebell Row' },
        { id: '180', name: 'Kettlebell Goblet Clean' },
        { id: '181', name: 'Kettlebell Step Up' },
        { id: '182', name: 'Kettlebell Dead Clean' },
        { id: '183', name: 'Kettlebell Front Squat' },
        { id: '184', name: 'Kettlebell Push Press' },
        { id: '185', name: 'Kettlebell Windmill' },
        { id: '186', name: 'Kettlebell Swing High Pull' },
        { id: '187', name: 'Kettlebell Side Swing' },
        { id: '188', name: 'Kettlebell Lateral Raise' },
        { id: '189', name: 'Kettlebell Clean and Press' },
        { id: '190', name: 'Kettlebell Overhead Squat' },
        { id: '191', name: 'Kettlebell Snatch Balance' },
        { id: '192', name: 'Kettlebell Turkish Get Up' },
        { id: '193', name: 'Kettlebell Split Jerk' },
        { id: '194', name: 'Kettlebell Dead High Pull' },
        { id: '195', name: 'Kettlebell Bent Row' },
        { id: '196', name: 'Kettlebell Clean Squat' },
        { id: '197', name: 'Kettlebell Deadlift High Pull' },
        { id: '198', name: 'Kettlebell Clean and Jerk' },
        { id: '199', name: 'Kettlebell Power Snatch' },
        { id: '200', name: 'Kettlebell Jump Squat' },
    ];



    const [selectedNumber, setSelectedNumber] = useState();

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPressOut={onClose} // close on background press
            >
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={styles.modalContent}>
                        <View style={styles.container}>
                            <CustomText style={styles.title}>ADD ENTRY</CustomText>
                            <View style={styles.row}>
                                <FlatList
                                    data={exercises}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity>
                                            <CustomText style={styles.exerciseText}>{item.name}</CustomText>
                                        </TouchableOpacity>
                                    )}
                                />

                                <View style={styles.pickerSection}>
                                    <CustomText style={styles.exerciseText}>Intensity</CustomText>
                                    <View>
                                        <Picker
                                            selectedValue={selectedNumber}
                                            onValueChange={(itemValue) => setSelectedNumber(itemValue)}
                                            style={styles.picker}
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
                                            ))}
                                        </Picker>
                                    </View>
                                    
                                </View>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <CustomText style={styles.save}>SAVE</CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FBF1E6",
        height: "60%",
        width: "90%",
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 32,
        color: "#5B4B45",
    },
    save: {
        textAlign: "center",
        fontSize: 24,
        color: "#FBF1E6",
        backgroundColor: "transparent",
    },
    closeButton: {
        backgroundColor: "#5B4B45",
        justifyContent: "center",
        width: "80%",
        height: 50,
        borderRadius: 10,
    },
    row: {
        gap: 100,
        height: "60%",
        flexDirection: "row",
    },
    exerciseText: {
        fontSize: 20,
        color: "#5B4B45",
        padding: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    pickerSection: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    picker: {
        height: 60,
        width: 80,
        color: "#5B4B45",
    },
})
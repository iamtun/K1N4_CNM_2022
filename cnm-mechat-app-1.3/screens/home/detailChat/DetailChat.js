import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import DetailFeature from '../../../components/DetailFeature/DetailFeature';
import Header from '../../../components/Header';
import userInfoSlice from '../../../redux/slice/userInfoSlice';
import { conversationBlockBySelector, userInfoSelector } from '../../../redux/selector';
import {
    fetchBlockConversation,
    fetchChangeNameGroup,
    fetchDeleteConversations,
    fetchDeleteConversationYourSide,
    fetchOutGroup,
    fetchUnBlockConversation,
    fetchUpdateAvatarGroup,
} from '../../../redux/slice/conversationSlice';
import useDebounce from '../../../hooks/useDebounce';
import { Alert } from 'react-native';

export default function DetailChat({ route, navigation }) {
    const dispatch = useDispatch();

    const userInfo = useSelector(userInfoSelector);
    const listBlockBy = useSelector(conversationBlockBySelector);
    
    const { isGroup, members, name, image, createdBy, idConversation } = route.params;
    const idFriend = userInfo._id === members[0] ? members[1] : members[0];
    //use state
    const [isOutGroup, setIsOutGroup] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNameGroup, setNewNameGroup] = useState(name);
    const [imageUpdate, setImageUpdate] = useState(image);
    
    const debounce = useDebounce(isOutGroup, 1000);

    //click info chat
    const handleClickInfo = () => {
        if (!isGroup) {
            dispatch(userInfoSlice.actions.clickSearchItem(idFriend));
            navigation.navigate('PersonalScreen', { isMe: false });
        }
    };

    // add member
    const handleAddMembers = () => {
        navigation.navigate('NewGroupChat', { isCreate: false, members: members, idConversation });
    };

    //out group
    const outGroup = () => {
        const data = {
            idConversation: idConversation,
            userId: userInfo._id,
        };

        //console.log(data);
        dispatch(fetchOutGroup(data));
        setIsOutGroup(true);
    };

    // change name group
    const changeNameGroup = () => {
        const data = {
            idConversation: idConversation,
            newName: newNameGroup,
            userId: userInfo._id,
        };
        //console.log(data);
        dispatch(fetchChangeNameGroup(data));

        setModalVisible(!modalVisible);
        setNewNameGroup(data.newName);
    };

    //update avartar group
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const data = {
                key1: 'userId',
                key2: 'imageLink',
                userId: userInfo._id,
                imageLink: result.uri,
                idConversation: idConversation,
            };
            setImageUpdate(result.uri);
            dispatch(fetchUpdateAvatarGroup(data));
        }
    };

    //change  screen home
    useEffect(() => {
        if (isOutGroup) {
            navigation.navigate('HomeScreen');
        }
    }, [debounce]);

    // remove conversation
    const handleRemoveConversation = () => {
        const data = {
            idConversation: idConversation,
            mainId: createdBy,
        };
        dispatch(fetchDeleteConversations(data));
        navigation.navigate('HomeScreen');
    };

    //Block user
    const handleBlockMember = () => {
        const data = {
            idConversation: idConversation,
            userId: idFriend,
        };
        dispatch(fetchBlockConversation(data));
    };

    const handleUnBlockMember = () => {
        const data = {
            idConversation: idConversation,
            userId: idFriend,
        };

        dispatch(fetchUnBlockConversation(data));
    };

    const showConfirmDialogBlockUser = () => {
        Alert.alert('Ch???n ng?????i d??ng', 'B???n c?? mu???n ch???n ng?????i d??ng n??y ?', [
            {
                text: 'C??',
                onPress: () => {
                    handleBlockMember();
                },
            },
            {
                text: 'Kh??ng',
            },
        ]);
    };
    
    //delete conversation
    const handleDeleteConversation = () => {
        const data = {
            idConversation: idConversation,
            userId: userInfo._id,
        };
        dispatch(fetchDeleteConversationYourSide(data));
        navigation.navigate('LoadingScreen');
    }

    const showConfirmDialogDeleteConversation = () => {
        Alert.alert('X??a cu???c tr?? chuy???n', 'B???n c?? mu???n x??a cu???c tr?? chuy???n n??y ?', [
            {
                text: 'C??',
                onPress: () => {
                    handleDeleteConversation();
                },
            },
            {
                text: 'Kh??ng',
            },
        ]);
    };
    
    //Question out group
    const showConfirmDialogOutGroup = () => {
        Alert.alert('Tho??t nh??m', 'B???n c?? mu???n tho??t kh???i nh??m n??y?', [
            {
                text: 'C??',
                onPress: () => {
                    outGroup();
                },
            },
            {
                text: 'Kh??ng',
            },
        ]);
    };

    //Question remove group
    const showConfirmDialogRemove = () => {
        Alert.alert('Gi???i t??n nh??m', 'B???n c?? mu???n gi???i t??n nh??m ?', [
            {
                text: 'C??',
                onPress: () => {
                    handleRemoveConversation();
                },
            },
            {
                text: 'Kh??ng',
            },
        ]);
    };

    //UI
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.frameNameGroup}>
                            <Icon style={{ marginRight: 10 }} name="pencil" color="black" size={22} />
                            <TextInput
                                value={newNameGroup}
                                style={{ fontSize: 18, width: '90%', height: '100%' }}
                                onChangeText={(value) => {
                                    setNewNameGroup(value);
                                }}
                                placeholder="?????t t??n nh??m"
                            ></TextInput>
                        </View>
                        <View style={styles.handle}>
                            <TouchableOpacity
                                style={styles.buttonRemove}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text>H???y</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonAdd} onPress={() => changeNameGroup()}>
                                <Text style={{ color: 'white' }}>?????ng ??</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Header />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Icon style={{ marginLeft: 10 }} name="arrow-back-outline" color="white" size={20} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>T??y ch???n</Text>
                </View>
                <View style={styles.infoUser}>
                    <View style={styles.avatar}>
                        <TouchableOpacity onPress={isGroup ? pickImage : null}>
                            <Avatar rounded size={90} source={{ uri: imageUpdate }}></Avatar>
                        </TouchableOpacity>

                        {isGroup ? (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>{newNameGroup}</Text>
                                <TouchableOpacity style={styles.editName} onPress={() => setModalVisible(true)}>
                                    <Icon name="pencil-outline" color="black" size={18} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                        )}
                    </View>
                    <View style={styles.feature}>
                        <DetailFeature nameIcon="search-outline" nameFeature="T??m tin nh???n"></DetailFeature>
                        {isGroup ? (
                            <DetailFeature
                                onPress={handleAddMembers}
                                nameIcon="person-add-outline"
                                nameFeature="Th??m h??nh vi??n"
                            ></DetailFeature>
                        ) : (
                            <DetailFeature
                                nameIcon="person-outline"
                                nameFeature="Trang c?? nh??n"
                                onPress={handleClickInfo}
                            ></DetailFeature>
                        )}

                        <DetailFeature nameIcon="brush-outline" nameFeature="?????i h??nh n???n"></DetailFeature>
                        <DetailFeature nameIcon="notifications-outline" nameFeature="T???t th??ng b??o"></DetailFeature>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.photo}
                    onPress={() => {
                        navigation.navigate('ImageScreen');
                    }}
                >
                    <Icon name="images-outline" color="black" size={20}></Icon>
                    <Text style={{ marginLeft: 10 }}>???nh,file,video ???? g???i</Text>
                </TouchableOpacity>
                {isGroup ? (
                    <>
                        <TouchableOpacity
                            style={styles.photo}
                            onPress={() =>
                                navigation.navigate('AllMembers', {
                                    name,
                                    image,
                                    listBlockBy,
                                    idConversation,
                                    createdBy,
                                    isGroup,
                                    members: members,
                                })
                            }
                        >
                            <Icon name="people-outline" color="black" size={20}></Icon>
                            <Text style={{ marginLeft: 10 }}>Xem th??nh vi??n</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.photo} onPress={showConfirmDialogOutGroup}>
                            <Icon name="enter-outline" color="red" size={20}></Icon>
                            <Text style={{ marginLeft: 10, color: 'red' }}>R???i nh??m</Text>
                        </TouchableOpacity>
                        {createdBy == userInfo._id ? (
                            <TouchableOpacity style={styles.photo} onPress={showConfirmDialogRemove}>
                                <Icon name="trash-outline" color="red" size={20}></Icon>
                                <Text style={{ marginLeft: 10, color: 'red' }}>Gi???i t??n nh??m</Text>
                            </TouchableOpacity>
                        ) : null}
                    </>
                ) : (
                    <TouchableOpacity style={styles.photo} onPress={listBlockBy.includes(idFriend) ? handleUnBlockMember : showConfirmDialogBlockUser}>
                        <Icon name={listBlockBy.includes(idFriend) ? "close-circle-outline": "remove-circle-outline"} color="black" size={20}></Icon>
                        <Text style={{ marginLeft: 10 }}>{listBlockBy.includes(idFriend) ? "B??? ch???n" : "Ch???n tin nh???n"}</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.photo} onPress={showConfirmDialogDeleteConversation}>
                    <Icon name="trash-bin-outline" color="red" size={20}></Icon>
                    <Text style={{ marginLeft: 10, color: 'red' }}>X??a cu???c tr?? chuy???n</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1E2E3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#3475F5',
    },
    infoUser: {
        backgroundColor: 'white',
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        marginTop: 10,
    },
    feature: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    photo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        marginTop: 10,
        padding: 10,
    },
    editName: {
        marginLeft: 10,
        marginTop: 15,
        backgroundColor: '#E5E5E5',
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        bottom: '15%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    frameNameGroup: {
        padding: 5,
        height: 60,
        borderBottomColor: '#CCE8FF',
        alignItems: 'center',
        borderBottomWidth: 2,
        flexDirection: 'row',
        width: '100%',
    },
    handle: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 150,
    },
    buttonRemove: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#33B0E0',
        marginRight: 30,
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#3475F5',
    },
});

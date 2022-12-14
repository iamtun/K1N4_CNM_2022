import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import filterSlice from '~/redux/features/filter/filterSlice';
import { fetchApiRecallRequestAddFriend, friendRequests } from '~/redux/features/friend/friendRequestSlice';
import { addMember, createGroup } from '~/redux/features/Group/GroupSlice';
import {
    addFriendRequest,
    conversationSlice,
    filterFriendGroup,
    listFriend,
    searchFilterFriend,
    userLogin,
    usersRemainingSelector,
} from '~/redux/selector';
import useDebounce from '../hooks/useDebounce';
import styles from './AddGroup.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function AddGroup({ addMemerber }) {
    const [searchPhone, setSearchPhone] = useState('');
    const [nameGroup, setNameGroup] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultShow, setSearchResultShow] = useState(false);
    const [tam12, settam12] = useState(false);
    const [checked, setChecked] = useState([]);
    const [error, setError] = useState(searchPhone);

    const debouncedValue = useDebounce(searchPhone, 500);

    const listFriends = useSelector(listFriend);
    const conversation = useSelector(conversationSlice);
    const infoUser = useSelector(userLogin);
    const searchFilterFriends = useSelector(searchFilterFriend);
    const listMeRequest = useSelector(addFriendRequest);

    const meRequest = listMeRequest.filter((friend) => friend.receiverId.includes(searchResult._id));
    const handleBtnClearText = (e) => {
        setNameGroup('');
    };
    const dispatch = useDispatch();

    // console.log('39', conversation);

    useEffect(() => {
        dispatch(filterSlice.actions.searchFilterChange(searchPhone));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);
    const userSearching = useSelector(usersRemainingSelector);
    const filterFriendGroups = useSelector(filterFriendGroup);

    // handle add member to group
    const handleAddMemberToGroup = () => {
        const dataAddMember = {
            memberAddID: infoUser._id,
            newMemberID: checked,
            conversationId: conversation.id,
        };

        if (checked.length === 0) {
            toast.error('B???n c???n ch???n ??t nh???t 1 ng?????i ????? th??m v??o nh??m!');
        } else {
            dispatch(addMember(dataAddMember));
            toast.success(`Th??m th??nh vi??n th??nh c??ng v??o nh??m.`);
        }
    };

    // handle create group
    const handleCreateGroup = () => {
        const data = { members: checked, createdBy: infoUser._id, name: nameGroup };

        if (nameGroup === '') {
            toast.error('B???n c???n ph???i ?????t t??n nh??m ????? t???o nh??m. Vui l??ng th??? l???i!');
            return;
        }

        if (checked.length < 2) {
            toast.error('B???n c???n ch???n ??t nh???t 2 ng?????i ????? t???o nh??m!');
        } else {
            dispatch(createGroup(data));
            toast.success(`T???o nh??m th??nh c??ng v???i t??n nh??m l??: ${nameGroup}.`);
        }
    };

    const handleCheck = (e) => {
        var updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    };

    //tim kiem
    const searchNamePhoneNumber = (e) => {
        if (e.key === 'Enter') {
            if (searchPhone === infoUser.phoneNumber) {
                setError('T??i Kho???n c???a b???n');
            } else {
                if (userSearching && userSearching !== 1) {
                    setSearchResultShow(true);
                    setSearchResult(userSearching[0]);
                    setError('');
                } else {
                    setError('T??i kho???n kh??ng t???n t???i');
                }
            }
        }
    };
    useEffect(() => {
        if (searchPhone === '') {
            setError('');
            dispatch(filterSlice.actions.searchFilterChange(null));
            setSearchResultShow(false);
        }
    }, [searchPhone]);

    const handleRequest = () => {
        console.log(searchResult);
        console.log(searchResult._id);
        const data = { senderID: infoUser._id, receiverID: searchResult._id };
        let tam = dispatch(friendRequests(data));
        if (tam) {
            toast.success('G???i l???i m???i k???t b???n th??nh c??ng.');
            // window.location.reload(true);
        }
    };
    const handlCancle = (e) => {
        setError('');
        dispatch(filterSlice.actions.searchFilterChange(null));
        setSearchResultShow(false);
        setChecked('');
        setSearchPhone('');
        setNameGroup('');
    };
    // thu hoi ket ban
    const handleCallback = () => {
        const data = {
            status: true,
            senderID: infoUser._id,
            idRequest: meRequest[0].idFriendRequest,
        };
        dispatch(fetchApiRecallRequestAddFriend(data));
        toast.success('B???n ???? thu h???i l???i m???i k???t b???n.');
    };
    return (
        <div>
            {addMemerber ? null : (
                <div className={cx('add-Group')}>
                    <label>Nh???p t??n nh??m: </label>
                    <input
                        type="text"
                        placeholder="Nh???p t??n nh??m"
                        value={nameGroup}
                        onChange={(e) => setNameGroup(e.target.value)}
                    />
                    {!!nameGroup && (
                        <button className={cx('clear-btn1')} onClick={handleBtnClearText}>
                            <FontAwesomeIcon className={cx('clear-icon')} icon={faCircleXmark} />
                        </button>
                    )}
                </div>
            )}
            <div className={cx('title-add-Group')}>
                <label>Th??m b???n v??o nh??m</label>
            </div>

            <div className={cx('search')}>
                <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                <input
                    type="text"
                    className={cx('input-search')}
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    placeholder="Nh???p s??? ??i???n tho???i..."
                    onKeyPress={searchNamePhoneNumber}
                />
            </div>
            <div className={cx('validate')}>
                {checked.length > 0 ? (
                    <div className={cx('numberCheck')}>S??? ng?????i ???? ch???n:({checked.length})</div>
                ) : null}
                <span className={cx('error')}>{error}</span>
            </div>
            <div className={cx('list-friend')}>
                <label>Danh s??ch b???n b??</label>
                {!!searchResultShow ? (
                    <div className={cx('conversations')}>
                        <div className={cx('list-conversation')}>
                            <div className={cx('input-radio')}>
                                {addMemerber ? (
                                    <input
                                        type="checkBox"
                                        value={searchResult._id}
                                        onChange={handleCheck}
                                        checked={conversation.members.includes(searchResult._id) ? true : null}
                                    />
                                ) : (
                                    <input type="checkBox" value={searchResult._id} onChange={handleCheck} />
                                )}
                            </div>

                            <img
                                className={cx('avatar-img')}
                                src={searchResult?.avatar ? searchResult.avatar : images.noImg}
                                alt="avatar"
                            />
                            <div className={cx('content')}>
                                <h4 className={cx('username')}>{searchResult?.fullName} </h4>
                            </div>
                            {searchFilterFriends === true ? (
                                <>
                                    {meRequest?.length !== 0 ? (
                                        <div className={cx('result-add-friend')}>
                                            <button onClick={handleCallback}>Thu h???i</button>
                                        </div>
                                    ) : (
                                        <div className={cx('result-add-friend')}>
                                            <button onClick={handleRequest}>K???t b???n</button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={cx('result-friend')}>
                                    <p>B???n b??</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('conversations')}>
                        {listFriends?.map((user) => {
                            return (
                                <div className={cx('list-conversation')} key={user?._id}>
                                    {addMemerber ? (
                                        <div className={cx('input-radio')}>
                                            <input
                                                type="checkBox"
                                                value={user._id}
                                                onChange={handleCheck}
                                                checked={filterFriendGroups.find((fr) =>
                                                    fr._id === user._id ? true : false,
                                                )}
                                            />
                                        </div>
                                    ) : (
                                        <div className={cx('input-radio')}>
                                            <input
                                                type="checkBox"
                                                value={user._id}
                                                onChange={handleCheck}
                                                // checked={filterFriendGroups.find((fr) =>
                                                //     fr._id === user._id ? true : false,
                                                // )}
                                            />
                                        </div>
                                    )}
                                    <img
                                        className={cx('avatar-img')}
                                        src={user?.imageLinkOfConver ? user.imageLinkOfConver : images.noImg}
                                        alt="avatar"
                                    />
                                    <div className={cx('content')}>
                                        <h4 className={cx('username')}>{user?.name} </h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {addMemerber ? (
                <div className={cx('add-friend-bottom')}>
                    <div className={cx('bottom-button')}>
                        <button className={cx('btn-cancel-group')} onClick={handlCancle}>
                            H???y
                        </button>
                        <button className={cx('btn-add-group')} onClick={handleAddMemberToGroup}>
                            Th??m
                        </button>
                    </div>
                </div>
            ) : (
                <div className={cx('add-friend-bottom')}>
                    <div className={cx('bottom-button')}>
                        <button className={cx('btn-cancel-group')} onClick={handlCancle}>
                            H???y
                        </button>
                        <button className={cx('btn-add-group')} onClick={handleCreateGroup}>
                            T???o
                        </button>
                    </div>
                </div>
            )}

            {/* Show toast status */}
            <ToastContainer position="top-right" autoClose={4000} closeOnClick={false} />
        </div>
    );
}
export default AddGroup;

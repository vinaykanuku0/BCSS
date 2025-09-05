import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dec, getList, returningValue, urls } from './Config';
import { changeModalState, changeDataState } from '../Store/action';
import Modal from "react-bootstrap/Modal";

export const ConfigFunctions = () => {
    const n = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(s => s)

    const navigate = (url) => n(url)

    const checkLoginStatus = () => {
        let token = sessionStorage.getItem("token") ||
            state?.token
        let decodedData = returningValue(token, "") != '' ? jwtDecode(sessionStorage.getItem("token")) : {};
        let user = JSON.parse(dec(sessionStorage.getItem("user") || state?.user) || "{}")
        let loginStatus = (Object.keys(decodedData)?.length > 0 && decodedData?.UserId?.[0] == user?.userId) || false
        return loginStatus
    }

    const changeModal = (data) => {
       
        if ([data?.keys, data?.clearData]?.some((e) => returningValue(e, "Array")?.length > 0)) {
            callorUpdateDataList(data?.keys, data?.clearData);
        }
        dispatch(changeModalState(data));
    };



    // const callorUpdateDataList = async (keys, clearData = []) => {
    //     if (returningValue(keys, "Array")?.length > 0) {
    //         keys?.map(async (e) => {
    //             let url = urls?.[e?.type]?.['getAll']
    //             if (e?.update == true || (!returningValue(state?.[e?.type]?.isLoaded, "Bool"))) {
    //                 let res = await tgetList(url, e?.body || {});
    //                 dispatch(changeDataState({ [e?.type]: { data: res, isLoaded: true } }));
    //             }
    //         })
    //     }
    //     if (returningValue(clearData, "Array")?.length > 0) {
    //         let temp = {}
    //         clearData?.map((e) => {
    //             temp[e?.type] = { data: [], isLoaded: false }
    //         })
    //         dispatch(changeDataState(temp));
    //     }
    // }
    const callorUpdateDataList = async (keys, clearData = []) => {
        if (returningValue(keys, "Array")?.length > 0) {
            keys?.map(async (e) => {
                if (
                    e?.update == true ||
                    !returningValue(state?.[e?.type]?.isLoaded, "Bool") ||
                    e?.update == update
                ) {
                    let res = await getList(e?.url, e?.body || {});
                    dispatch(
                        changeDataState({
                            [e?.type]: {
                                data: [...res],
                                isLoaded: true,
                                loadedAt: Date.now(),
                            },
                        })
                    );
                }
            });
        }
        if (returningValue(clearData, "Array")?.length > 0) {
            let temp = {};
            clearData?.map((e) => {
                temp[e?.type] = { data: [], isLoaded: false };
            });
            dispatch(changeDataState(temp));
        }
    };



    return { navigate, checkLoginStatus, changeModal, callorUpdateDataList }
}


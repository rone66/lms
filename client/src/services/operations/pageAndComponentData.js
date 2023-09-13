import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { catalogData } from '../api';

export const getCatalogPageData = async(catagoryId) => {
    const toastId=toast.loading("loading")
    let result=[];
    try {
       const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:catagoryId});
        
        if(response?.data?.data?.success){
            throw new Error("could not fetch catagory page data")
        }
        result=response?.data;
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....");
        toast.error(error.message);
        result=error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}


import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const webinarRecored = createApi({
    reducerPath:'webinarapirecorded',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_API}`,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('authToken')

            if(token){
                headers.set("authorization", `Bearer ${token}`)
            }
        },
    }),
    endpoints:(builder)=>({
        getUpcomingRecordedWebinar:builder.query({
            query:({limit,page}) =>
                `/webinar/get-recorded-webinar?limit=${limit}&page=${page}`
        }),
        getStatesDegreeTyperecorded:builder.query({
         query:()=> `seeders?state=true&degreeType=true`
        }),
        addRecordedWebinar:builder.mutation({
        query:(createrecordedwebinar)=>({
            url:`webinar/add-recorded-webinar`,
            method:"POST",
            body:createrecordedwebinar,
        }),
        }),
        updateRecord:builder.mutation({
             query:({id,updateWebinardata})=>({
                url:`webinar/recorded/${id}`,
                method:"PUT",
                body:updateWebinardata
             }),
        }),
        deleterecordedwebinar:builder.mutation({
            query:(id)=>({},{
                url:`webinar/recorded/${id}`,
                method:"DELETE"
            }),
        }),
        
    }),
     

})

export const {
 useGetUpcomingRecordedWebinarQuery,
 useUpdateRecordMutation,
 useAddRecordedWebinarMutation,
 useDeleterecordedwebinarMutation,
 useGetStatesDegreeTyperecordedQuery,
} = webinarRecored
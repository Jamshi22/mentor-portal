import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const ApplicationLinkRtk = createApi({
    reducerPath:'applicationLink',
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
        getApplicationlinkdata:builder.query({
            query:() =>
                `/applicationLink/application-links
`
        }),
        getApplicationlinkstatequery:builder.query({
         query:()=> `seeders?state=true&degreeType=true`
        }),
        addapplicationLink:builder.mutation({
        query:(createapplicationLink)=>({
            url:`/applicationLink/add-application-link`,
            method:"POST",
            body:createapplicationLink,
        }),
        }),
        updateapplicationLink:builder.mutation({
             query:({id,updateApplication})=>({
                url:`applicationLink/update-application-links/${id}`,
                method:"PUT",
                body:updateApplication
             }),
        }),
        deleteapplicationLink:builder.mutation({
            query:(id)=>({},{
                url:`applicationLink/delete-application-links/${id}`,
                method:"DELETE"
            }),
        }),
        
    }),
     

})

export const {
useAddapplicationLinkMutation,
useUpdateapplicationLinkMutation,
useDeleteapplicationLinkMutation,
useGetApplicationlinkstatequeryQuery,
useGetApplicationlinkdataQuery
} = ApplicationLinkRtk
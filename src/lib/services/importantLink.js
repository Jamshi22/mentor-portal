import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const ImportantLinkRtk = createApi({
    reducerPath:'importantlink',
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
        getImportantLinkAll:builder.query({
            query:(data) => 
                `otherlink/other-links`
        }),
        getStatesDegreeTyperecorded:builder.query({
         query:()=> `seeders?state=true&degreeType=true`
        }),
       addimportantLink:builder.mutation({
        query:(importantLinkcreate)=>({
            url:`otherlink/add-other-link`,
            method:"POST",
            body:importantLinkcreate,
        }),
        }),
updateimportantLink: builder.mutation({
  query: ({ id, updateImportantlink }) => {
    // console.log("Update Payload:", updateImportantlink); // ✅ Console log added
    return {
      url: `otherlink/update-other-links/${id}`,
      method: "PUT",
      body: updateImportantlink,
    };
  },
}),
        deleteimportantLink:builder.mutation({
            query:(id)=>({},{
                url:`otherlink/delete-other-links/${id}`,
                method:"DELETE"
            }),
        }),
        
    }),
     

})

export const {
useGetImportantLinkAllQuery,
 useGetStatesDegreeTyperecordedQuery,
 useAddimportantLinkMutation,
 useDeleteimportantLinkMutation,
 useUpdateimportantLinkMutation
} = ImportantLinkRtk
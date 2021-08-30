import React from 'react'
import { useQuery } from 'react-apollo'
import GET_LEADS from './getLeads.graphql'

interface leadData {
    email: string
    type: string
}

interface queryData {
    leads: {
        body: leadData[]
    }
}

export default function ListLeads() {

    const { loading, error, data, refetch } = useQuery<queryData>(GET_LEADS, 
        {
            ssr: false
        })

    if (loading) console.log('Loading...')
    if (error) console.log(`Error ${error}`)
    console.log(data);

    return (
        <>
            <button onClick={() => refetch()}>Atualizar</button>
            <ul>
                {!loading && (data && data.leads.body.map((l: leadData, idx: number) => {
                    return (<li key={idx}>{l.email} | {l.type}</li>)
                }))}
            </ul>
        </>
    )
}


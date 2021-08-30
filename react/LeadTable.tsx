import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import GET_LEADS from './getLeads.graphql'

interface LeadTableProps {
  title: string
}

interface leadData {
  email: string
  type: string
}

interface queryData {
  leads: {
      body: leadData[]
  }
}

const LeadTable: StorefrontFunctionComponent<LeadTableProps> = ({title}) => {
  const titleText = title || <FormattedMessage id="leadtable.title" />

  const { loading, error, data, refetch } = useQuery<queryData>(GET_LEADS, 
    {
        ssr: false
    })

  if (loading) console.log('Loading...')
  if (error) console.log(`Error ${error}`)

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

LeadTable.schema = {
  title: 'editor.leadtable.title',
  description: 'editor.leadtable.description',
  type: 'object',
  properties: {},
}

export default LeadTable

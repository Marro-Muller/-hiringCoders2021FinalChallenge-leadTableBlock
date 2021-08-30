import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-apollo";
import GET_LEADS from "./queries/getLeads.graphql";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Page, PaperStyled, TableStyled } from "./LeadTable.style";
import { Button } from "@material-ui/core";

interface LeadTableProps {
  title: string;
}

interface leadData {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  type?: string;
}

interface queryData {
  leads: {
    body: leadData[];
  };
}

const LeadTable: StorefrontFunctionComponent<LeadTableProps> = ({ title }) => {
  const titleText = title || <FormattedMessage id="leadtable.title" />;

  const { loading, error, data, refetch } = useQuery<queryData>(GET_LEADS, {
    ssr: false,
  });

  if (loading) console.log("Loading...");
  if (error) console.log(`Error ${error}`);

  return (
    <Page>
      <Button variant="contained" onClick={() => refetch()}>Atualizar</Button>
      <TableContainer component={PaperStyled}>
        <TableStyled>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nome Completo</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              data &&
              data.leads.body.map((l: leadData, idx: number) => {
                return (
                  <TableRow>
                    <TableCell align="center">{l.id}</TableCell>
                    <TableCell align="center">{l.name}</TableCell>
                    <TableCell align="center">{l.email}</TableCell>
                    <TableCell align="center">{l.phoneNumber}</TableCell>
                    <TableCell align="center">{l.type}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </TableStyled>
      </TableContainer>
    </Page>
  );
};

LeadTable.schema = {
  title: "editor.leadtable.title",
  description: "editor.leadtable.description",
  type: "object",
  properties: {},
};

export default LeadTable;

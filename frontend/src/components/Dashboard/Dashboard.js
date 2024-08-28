import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';

function Dashboard() {
  return (
    <DashboardStyled>
        <InnerLayout>
          <h1>Dashboard</h1>
        </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  h1 {
    color: rgba(34, 34, 96);
  }
`;

export default Dashboard

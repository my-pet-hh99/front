import styled from "styled-components";
import Layout from "../components/common/Layout";
import Header from "../components/Header"
import DetailContents from "../components/detail/DetailContents"
const Detail = () => {
    return (
        <Layout>
            <Box>
                <Header/>
                <DetailContents />
            </Box>
        </Layout>
    )
}

export default Detail

const Box = styled.div`
  display: flex;
  flex-direction:column;
  width: 800px ;
  margin: auto;
`;


